'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import styles from './Portfolio.module.css'
import data from '../data/portfolio.json'

const PHONE_QUERY = '(max-width: 736px)'
const isDev = process.env.NODE_ENV !== 'production'

// Incomplete entries live in portfolio.drafts.json and show, with a Draft
// badge and a "needs" note, in development only. The condition is written
// inline on purpose: the bundler folds process.env.NODE_ENV at build time
// and drops the require, so drafts are not in the production JavaScript at
// all (check: grep .next/static/chunks for a draft-only title after a build).
const drafts =
  process.env.NODE_ENV !== 'production' ? require('../data/portfolio.drafts.json').projects : []
const projects = [...drafts, ...data.projects]
const groups = data.groups.filter((g) => projects.some((p) => p.group === g.id))
const groupById = Object.fromEntries(data.groups.map((g) => [g.id, g]))

function subscribePhone(onChange) {
  const mq = window.matchMedia(PHONE_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}
const usePhone = () =>
  useSyncExternalStore(
    subscribePhone,
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false
  )

function Dot({ group }) {
  const g = groupById[group]
  return <span className={styles.dot} style={{ background: g.color }} title={g.name} aria-hidden="true" />
}

function Picture({ file, alt, className, eager }) {
  if (!file) {
    return (
      <span className={`${className} ${styles.noImage}`} aria-hidden="true">
        {isDev ? 'Image needed' : ''}
      </span>
    )
  }
  const convertible = /\.(png|jpe?g)$/i.test(file)
  return (
    <span className={className}>
      <picture>
        {convertible && (
          <source srcSet={`/images/${file.replace(/\.(png|jpe?g)$/i, '.webp')}`} type="image/webp" />
        )}
        <img
          src={`/images/${file}`}
          alt={alt}
          width={400}
          height={300}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </picture>
    </span>
  )
}

function Detail({ project }) {
  return (
    <>
      <p>{project.description}</p>
      {project.technologies.length > 0 && (
        <ul className={styles.tech}>
          {project.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      {project.url && (
        <a className={styles.view} href={project.url} aria-label={`View ${project.title}`}>
          View
        </a>
      )}
    </>
  )
}

const Portfolio = () => {
  const phone = usePhone()
  const [filter, setFilter] = useState('all')
  const [activeId, setActiveId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [more, setMore] = useState(0)
  const [atEnd, setAtEnd] = useState(true)
  const scrollerRef = useRef(null)

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.group === filter)),
    [filter]
  )
  const active = visible.find((p) => p.id === activeId) ?? visible[0]
  const expanded = visible.find((p) => p.id === expandedId)?.id ?? null

  const choose = (p) => {
    setActiveId(p.id)
    setExpandedId((prev) => (prev === p.id ? null : p.id))
  }

  // "N more" cue: how many cards are cut off below the visible edge.
  const measure = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const bottom = el.scrollTop + el.clientHeight
    let hidden = 0
    el.querySelectorAll('[data-id]').forEach((card) => {
      if (card.offsetTop + card.offsetHeight > bottom + 2) hidden += 1
    })
    setMore(hidden)
    setAtEnd(bottom >= el.scrollHeight - 2)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return undefined
    // ResizeObserver fires once on observe() and on size changes; the
    // deferred call covers content changes (filter, opened card) that
    // don't resize the scroller.
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const raf = requestAnimationFrame(measure)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [measure, visible, phone, expanded])

  // On a phone, bring a newly opened card fully into view.
  useEffect(() => {
    const el = scrollerRef.current
    if (!phone || !expanded || !el) return
    const card = el.querySelector(`[data-id="${expanded}"]`)
    if (!card) return
    const top = card.offsetTop
    if (top < el.scrollTop || top + card.offsetHeight > el.scrollTop + el.clientHeight) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollTo({ top: Math.max(0, top - 8), behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [expanded, phone])

  const changeFilter = (next) => {
    setFilter(next)
    setActiveId(null)
    setExpandedId(null)
    if (scrollerRef.current) scrollerRef.current.scrollTop = 0
  }

  const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.group === id).length)

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        {phone ? (
          <div className={styles.menu}>
            <label htmlFor="portfolio-filter">Show</label>
            <select
              id="portfolio-filter"
              value={filter}
              onChange={(e) => changeFilter(e.target.value)}
            >
              <option value="all">All projects ({count('all')})</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({count(g.id)})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className={styles.chips} role="group" aria-label="Filter projects">
            {[{ id: 'all', name: 'All' }, ...groups].map((g) => (
              <button
                key={g.id}
                type="button"
                className={styles.chip}
                aria-pressed={filter === g.id}
                onClick={() => changeFilter(g.id)}
              >
                {g.id !== 'all' && <span className={styles.dot} style={{ background: g.color }} />}
                {g.name} <span className={styles.n}>{count(g.id)}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.split}>
        <div className={styles.listWrap}>
          <ul
            className={`${styles.scroller} ${atEnd ? styles.atEnd : ''}`}
            ref={scrollerRef}
            onScroll={measure}
            aria-label="Projects"
          >
            {visible.map((p) => {
              const isActive = !phone && active?.id === p.id
              const isOpen = phone && expanded === p.id
              return (
                <li
                  key={p.id}
                  data-id={p.id}
                  className={`${styles.card} ${isActive ? styles.selected : ''} ${isOpen ? styles.open : ''}`}
                  onClick={() => choose(p)}
                >
                  <Picture file={p.image} alt="" className={styles.thumb} />
                  <div className={styles.body}>
                    <div className={styles.top}>
                      <h3>
                        <button
                          type="button"
                          className={styles.titleBtn}
                          {...(phone ? { 'aria-expanded': isOpen } : { 'aria-pressed': isActive })}
                          onClick={(e) => {
                            e.stopPropagation()
                            choose(p)
                          }}
                        >
                          {p.title}
                        </button>
                      </h3>
                      <span className={styles.year}>
                        <Dot group={p.group} />
                        <span className={styles.srOnly}>{groupById[p.group].name}, </span>
                        {p.year}
                        {phone && <span className={styles.chev} aria-hidden="true" />}
                      </span>
                    </div>
                    <p className={styles.hook}>{p.hook}</p>
                    {isDev && p.draft && <span className={styles.flag}>{p.draft}</span>}
                  </div>
                  {isOpen && (
                    <div className={styles.more}>
                      <div className={styles.groupLine}>
                        <Dot group={p.group} />
                        {groupById[p.group].name}
                      </div>
                      <Detail project={p} />
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
          {!phone && !atEnd && more > 0 && (
            <div className={styles.cue} aria-hidden="true">
              <span>{'↓'} {more} more</span>
            </div>
          )}
        </div>

        {!phone && active && (
          <aside className={styles.pane} aria-label="Selected project" aria-live="polite">
            <Picture file={active.image} alt={active.alt} className={styles.paneImg} eager />
            <h3>{active.title}</h3>
            <div className={styles.meta}>
              <span>{active.year}</span>
              <span className={styles.metaGroup}>
                <Dot group={active.group} />
                {groupById[active.group].name}
              </span>
            </div>
            <Detail project={active} />
            {isDev && active.draft && (
              <>
                <span className={styles.flag}>{active.draft}</span>
                {active.todo && <p className={styles.todo}>{active.todo}</p>}
              </>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}

export default Portfolio

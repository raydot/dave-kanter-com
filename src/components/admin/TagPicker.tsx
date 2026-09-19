'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './TagPicker.module.css'

interface Tag {
  id: string
  name: string
}

interface TagPickerProps {
  value: string[]
  onChange: (tagIds: string[]) => void
}

export default function TagPicker({ value, onChange }: TagPickerProps) {
  const [allTags, setAllTags] = useState<Tag[]>([])
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/tags')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setAllTags(data) })
      .catch(() => {})
  }, [])

  function toggle(id: string) {
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id])
  }

  async function createAndSelect(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmed }),
    })
    if (!res.ok) return
    const tag: Tag = await res.json()
    setAllTags((prev) =>
      prev.some((t) => t.id === tag.id) ? prev : [...prev, tag].sort((a, b) => a.name.localeCompare(b.name))
    )
    onChange(value.includes(tag.id) ? value : [...value, tag.id])
    setInput('')
    setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmed = input.trim()
      if (!trimmed) return
      const exact = allTags.find((t) => t.name.toLowerCase() === trimmed.toLowerCase())
      if (exact) {
        toggle(exact.id)
        setInput('')
        setOpen(false)
      } else {
        createAndSelect(trimmed)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const filtered = input
    ? allTags.filter((t) => t.name.toLowerCase().includes(input.toLowerCase()))
    : allTags

  const hasExactMatch = allTags.some((t) => t.name.toLowerCase() === input.trim().toLowerCase())
  const showCreate = input.trim().length > 0 && !hasExactMatch

  const selectedTags = allTags.filter((t) => value.includes(t.id))

  return (
    <div className={styles.wrapper}>
      {selectedTags.length > 0 && (
        <div className={styles.selected}>
          {selectedTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggle(tag.id)}
              className={styles.chip}
            >
              {tag.name}
              <span className={styles.chipRemove}>×</span>
            </button>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => { setInput(e.target.value); setOpen(true) }}
        onKeyDown={handleKeyDown}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search or create tags…"
        className={styles.input}
      />

      {open && (filtered.length > 0 || showCreate) && (
        <div className={styles.dropdown}>
          {filtered.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onMouseDown={() => { toggle(tag.id); setInput(''); setOpen(false) }}
              className={`${styles.option} ${value.includes(tag.id) ? styles.optionSelected : ''}`}
            >
              {tag.name}
              {value.includes(tag.id) && (
                <span className={styles.optionHint}>selected</span>
              )}
            </button>
          ))}
          {showCreate && (
            <>
              {filtered.length > 0 && <div className={styles.divider} />}
              <button
                type="button"
                onMouseDown={() => createAndSelect(input)}
                className={styles.option}
              >
                Create <span className={styles.createLabel}>&ldquo;{input.trim()}&rdquo;</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

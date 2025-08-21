'use client'

import React, { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'

export default function Home() {
  const [isArticleVisible, setIsArticleVisible] = useState(false)
  const [timeout, setTimeoutState] = useState(false)
  const [articleTimeout, setArticleTimeout] = useState(false)
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState('is-loading')
  const [isAnimating, setIsAnimating] = useState(false)
  
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const handleCloseArticle = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setArticleTimeout(!articleTimeout)

      setTimeout(() => {
        setTimeoutState(!timeout)
      }, 325)

      setTimeout(() => {
        setIsArticleVisible(false)
        setIsAnimating(false) // Animation complete
      }, 350)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading('')
    }, 100)

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        if (isArticleVisible) {
          handleCloseArticle()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isArticleVisible, handleCloseArticle])

  const handleOpenArticle = (articleName: string | Event) => {
    // Ensure articleName is a string, not an event object
    const article = typeof articleName === 'string' ? articleName : (articleName.target as HTMLElement)?.dataset?.article || '';
    // console.log('handleOpenArticle called with:', article, typeof article);

    // Prevent double-click issues by checking if already animating or visible
    if (!isArticleVisible && !isAnimating) {
      setIsAnimating(true)
      setIsArticleVisible(true)
      setArticle(article)

      setTimeout(() => {
        setTimeoutState(!timeout)
      }, 325)

      setTimeout(() => {
        setArticleTimeout(!articleTimeout)
        setIsAnimating(false) // Animation complete
      }, 350)
    }
  }

  const setWrapperRef = (node: HTMLDivElement | null) => {
    wrapperRef.current = node
  }

  return (
    <div className={`body ${loading} ${isArticleVisible ? 'is-article-visible' : ''}`}>
      <div id="wrapper">
        <Header
          onOpenArticle={handleOpenArticle}
          timeout={timeout}
        />
        <Main
          isArticleVisible={isArticleVisible}
          timeout={timeout}
          articleTimeout={articleTimeout}
          article={article}
          onCloseArticle={handleCloseArticle}
          setWrapperRef={setWrapperRef}
        />
        <Footer timeout={timeout} />
      </div>
      <div id="bg"></div>
    </div>
  )
}

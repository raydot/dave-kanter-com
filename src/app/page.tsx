'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Header from '@/components/Header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
import { AskDave } from '@/components/AskDave'

export default function Home() {
  const [isArticleVisible, setIsArticleVisible] = useState(false)
  const [timeout, setTimeoutState] = useState(false)
  const [articleTimeout, setArticleTimeout] = useState(false)
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState('is-loading')
  const [isAnimating, setIsAnimating] = useState(false)
  
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const handleCloseArticle = useCallback(() => {
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
  }, [isAnimating, articleTimeout, timeout])

  const handleOpenArticle = useCallback((articleName: string | Event) => {
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
  }, [isArticleVisible, isAnimating, timeout, articleTimeout])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading('')
    }, 100)

    // Defer URL parameter checking to avoid blocking initial render
    const checkUrlParams = setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('submitted') === 'true') {
        // Open contact article and show success message
        handleOpenArticle('contact')
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }, 200)

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
      clearTimeout(checkUrlParams)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isArticleVisible, handleCloseArticle, handleOpenArticle])

  const setWrapperRef = (node: HTMLDivElement | null) => {
    wrapperRef.current = node
  }

  return (
    <div className={`body ${loading} ${isArticleVisible ? 'is-article-visible' : ''}`}>
      {/* Background image moved to top for immediate render */}
      <picture id="bg">
        <source media="(max-width: 768px)" srcSet="/images/dhalia-768.webp" type="image/webp" />
        <source media="(min-width: 769px) and (max-width: 1199px)" srcSet="/images/dhalia-1024.webp" type="image/webp" />
        <source media="(min-width: 1200px)" srcSet="/images/dhalia.webp" type="image/webp" />
        <img 
          src="/images/dhalia.webp" 
          alt="Background" 
          fetchPriority="high"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1
          }}
        />
      </picture>
      
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
      <AskDave />
    </div>
  )
}

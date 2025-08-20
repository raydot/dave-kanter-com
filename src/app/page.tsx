'use client'

import React, { useState, useEffect, useRef } from 'react'
import Header from '@/components/header'
import Main from '@/components/Main'
import Footer from '@/components/Footer'

export default function Home() {
  const [isArticleVisible, setIsArticleVisible] = useState(false)
  const [timeout, setTimeoutState] = useState(false)
  const [articleTimeout, setArticleTimeout] = useState(false)
  const [article, setArticle] = useState('')
  const [loading, setLoading] = useState('is-loading')
  
  const wrapperRef = useRef(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading('')
    }, 100)

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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
  }, [isArticleVisible])

  const handleOpenArticle = (articleName: string) => {
    // Ensure articleName is a string, not an event object
    const article = typeof articleName === 'string' ? articleName : articleName.target?.dataset?.article || '';
    // console.log('handleOpenArticle called with:', article, typeof article);

    setIsArticleVisible(!isArticleVisible)
    setArticle(article)

    setTimeout(() => {
      setTimeoutState(!timeout)
    }, 325)

    setTimeout(() => {
      setArticleTimeout(!articleTimeout)
    }, 350)
  }

  const handleCloseArticle = () => {
    setArticleTimeout(!articleTimeout)

    setTimeout(() => {
      setTimeoutState(!timeout)
    }, 325)

    setTimeout(() => {
      setIsArticleVisible(!isArticleVisible)
    }, 350)

    setTimeout(() => {
      setArticle('')
    }, 375)
  }

  const setWrapperRef = (node) => {
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

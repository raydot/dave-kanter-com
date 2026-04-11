'use client'

import { useEffect, useRef, useState } from 'react'
import { normalizeTag, levenshtein } from '@/lib/tags'

interface ExistingTag {
  id: string
  name: string
}

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
}

export default function TagInput({ value, onChange }: TagInputProps) {
  const [allTags, setAllTags] = useState<ExistingTag[]>([])
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/tags')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setAllTags(data)
      })
      .catch(() => {})
  }, [])

  function addTag(name: string) {
    const trimmed = name.trim()
    if (!trimmed) return
    // Don't add if already selected (case-insensitive)
    if (value.some((t) => normalizeTag(t) === normalizeTag(trimmed))) return
    onChange([...value, trimmed])
    setInputValue('')
    setOpen(false)
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && inputValue === '') {
      onChange(value.slice(0, -1))
    }
  }

  const normalizedInput = normalizeTag(inputValue)

  // Suggestions: existing tags not already selected, filtered by input
  const exactMatch = allTags.find((t) => normalizeTag(t.name) === normalizedInput)
  const suggestions = inputValue
    ? allTags.filter((t) => {
        if (value.some((v) => normalizeTag(v) === normalizeTag(t.name))) return false
        return t.name.toLowerCase().includes(inputValue.toLowerCase())
      })
    : []

  // Near-duplicate warnings: existing tags with levenshtein ≤ 2 on normalized forms,
  // not already in suggestions, not already selected
  const similar = inputValue && !exactMatch
    ? allTags.filter((t) => {
        if (value.some((v) => normalizeTag(v) === normalizeTag(t.name))) return false
        if (suggestions.some((s) => s.id === t.id)) return false
        const dist = levenshtein(normalizedInput, normalizeTag(t.name))
        return dist > 0 && dist <= 2
      })
    : []

  return (
    <div className="tw-relative">
      <div
        className="tw-flex tw-flex-wrap tw-gap-1.5 tw-px-3 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-cursor-text tw-min-h-10"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag, i) => (
          <span
            key={i}
            className="tw-inline-flex tw-items-center tw-gap-1 tw-px-2 tw-py-0.5 tw-text-sm tw-rounded tw-border tw-border-border tw-bg-muted"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(i) }}
              className="tw-text-muted-foreground hover:tw-text-foreground tw-leading-none"
              style={{ lineHeight: 1 }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setOpen(true) }}
          onKeyDown={handleKeyDown}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={value.length === 0 ? 'Add tags…' : ''}
          className="tw-flex-1 tw-min-w-24 tw-bg-transparent tw-text-foreground tw-outline-none tw-text-sm"
          style={{ border: 'none', padding: 0 }}
        />
      </div>

      {open && (suggestions.length > 0 || similar.length > 0) && (
        <div className="tw-absolute tw-z-10 tw-w-full tw-mt-1 tw-rounded tw-border tw-border-border tw-bg-background tw-shadow-md">
          {suggestions.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onMouseDown={() => addTag(tag.name)}
              className="tw-w-full tw-text-left tw-px-3 tw-py-2 tw-text-sm hover:tw-bg-muted"
            >
              {tag.name}
            </button>
          ))}
          {similar.length > 0 && (
            <>
              {suggestions.length > 0 && (
                <div className="tw-border-t tw-border-border" />
              )}
              <p className="tw-px-3 tw-py-1 tw-text-xs tw-text-muted-foreground" style={{ marginBottom: 0 }}>
                Similar existing tags:
              </p>
              {similar.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onMouseDown={() => addTag(tag.name)}
                  className="tw-w-full tw-text-left tw-px-3 tw-py-2 tw-text-sm hover:tw-bg-muted tw-text-muted-foreground"
                >
                  {tag.name}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

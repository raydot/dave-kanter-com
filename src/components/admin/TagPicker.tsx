'use client'

import { useEffect, useRef, useState } from 'react'

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
    <div className="tw-relative">
      <div className="tw-flex tw-flex-wrap tw-gap-1.5 tw-mb-2">
        {selectedTags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggle(tag.id)}
            className="tw-inline-flex tw-items-center tw-gap-1 tw-px-2 tw-py-0.5 tw-text-sm tw-rounded tw-border tw-border-primary tw-bg-primary tw-text-primary-foreground"
          >
            {tag.name}
            <span className="tw-text-xs tw-leading-none">×</span>
          </button>
        ))}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => { setInput(e.target.value); setOpen(true) }}
        onKeyDown={handleKeyDown}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search or create tags…"
        className="tw-w-full tw-px-3 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground tw-text-sm tw-outline-none"
      />

      {open && (filtered.length > 0 || showCreate) && (
        <div className="tw-absolute tw-z-10 tw-w-full tw-mt-1 tw-rounded tw-border tw-border-border tw-bg-background tw-shadow-md tw-max-h-56 tw-overflow-y-auto">
          {filtered.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onMouseDown={() => { toggle(tag.id); setInput(''); setOpen(false) }}
              className={`tw-w-full tw-text-left tw-px-3 tw-py-2 tw-text-sm hover:tw-bg-muted tw-flex tw-items-center tw-justify-between ${value.includes(tag.id) ? 'tw-font-medium' : ''}`}
            >
              {tag.name}
              {value.includes(tag.id) && (
                <span className="tw-text-xs tw-text-muted-foreground">selected</span>
              )}
            </button>
          ))}
          {showCreate && (
            <>
              {filtered.length > 0 && <div className="tw-border-t tw-border-border" />}
              <button
                type="button"
                onMouseDown={() => createAndSelect(input)}
                className="tw-w-full tw-text-left tw-px-3 tw-py-2 tw-text-sm hover:tw-bg-muted tw-text-primary"
              >
                Create &ldquo;{input.trim()}&rdquo;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

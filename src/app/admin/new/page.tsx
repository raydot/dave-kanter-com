'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface StarForm {
  situation: string
  task: string
  action: string
  result: string
}

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [phase, setPhase] = useState<'form' | 'editor'>('form')
  const [star, setStar] = useState<StarForm>({
    situation: '',
    task: '',
    action: '',
    result: '',
  })
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const [error, setError] = useState('')

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-64 focus:outline-none p-4',
      },
    },
  })

  function generateDraft() {
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    setError('')

    editor?.commands.setContent(
      `<p>${star.situation}</p>
       <p>${star.task}</p>
       <p>${star.action}</p>
       <p>${star.result}</p>`
    )

    setPhase('editor')
  }

  async function publish() {
    if (!editor) return
    setPublishing(true)
    setError('')

    const content = editor.getHTML()

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        excerpt: star.situation.slice(0, 160),
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        slug,
      }),
    })

    if (res.ok) {
      setPublished(true)
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
    }
    setPublishing(false)
  }

  if (published) {
    return (
      <div className="tw-min-h-screen tw-bg-background tw-flex tw-items-center tw-justify-center">
        <div className="tw-text-center">
          <h1 className="tw-text-3xl tw-font-bold tw-mb-4">Published! 🎉</h1>
          <p className="tw-text-muted-foreground tw-mb-6">
            Your post is live at{' '}
            <a href={`/blog/${slug}`} className="tw-text-primary tw-underline">
              /blog/{slug}
            </a>
          </p>
          <button
            onClick={() => {
              setPublished(false)
              setPhase('form')
              setTitle('')
              setTags('')
              setStar({ situation: '', task: '', action: '', result: '' })
              editor?.commands.setContent('')
            }}
            className="tw-px-4 tw-py-2 tw-bg-primary tw-text-primary-foreground tw-rounded hover:tw-opacity-90"
          >
            Write another post
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="tw-min-h-screen tw-bg-background">
      <div className="tw-max-w-3xl tw-mx-auto tw-px-4 tw-py-8">
        <h1 className="tw-text-3xl tw-font-bold tw-mb-8">New Post</h1>

        {/* Title always visible */}
        <div className="tw-mb-6">
          <label className="tw-block tw-text-sm tw-font-medium tw-mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's this post about?"
            className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground tw-text-xl"
          />
        </div>

        {phase === 'form' && (
          <>
            <div className="tw-space-y-6 tw-mb-6">
              {[
                {
                  key: 'situation',
                  label: 'Situation',
                  hint: 'What was the context? What problem existed?',
                },
                {
                  key: 'task',
                  label: 'Task',
                  hint: 'What were you trying to do?',
                },
                {
                  key: 'action',
                  label: 'Action',
                  hint: 'What did you build, decide, or change?',
                },
                {
                  key: 'result',
                  label: 'Result',
                  hint: 'What happened? What did you learn?',
                },
              ].map(({ key, label, hint }) => (
                <div key={key}>
                  <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                    {label}
                  </label>
                  <p className="tw-text-xs tw-text-muted-foreground tw-mb-2">
                    {hint}
                  </p>
                  <textarea
                    value={star[key as keyof StarForm]}
                    onChange={(e) =>
                      setStar((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    rows={3}
                    className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground tw-resize-y"
                  />
                </div>
              ))}
            </div>

            <div className="tw-mb-6">
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-2">
                Tags{' '}
                <span className="tw-text-muted-foreground tw-font-normal">
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ai, nextjs, career"
                className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground"
              />
            </div>

            {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}

            <button
              onClick={generateDraft}
              className="tw-w-full tw-py-3 tw-bg-primary tw-text-primary-foreground tw-rounded tw-font-medium hover:tw-opacity-90"
            >
              Generate Draft →
            </button>
          </>
        )}

        {phase === 'editor' && (
          <>
            <div className="tw-mb-4 tw-flex tw-gap-2 tw-flex-wrap">
              {['Bold', 'Italic', 'H2', 'H3', 'Bullet list', 'Code'].map(
                (control) => (
                  <button
                    key={control}
                    onClick={() => {
                      if (control === 'Bold')
                        editor?.chain().focus().toggleBold().run()
                      if (control === 'Italic')
                        editor?.chain().focus().toggleItalic().run()
                      if (control === 'H2')
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 2 })
                          .run()
                      if (control === 'H3')
                        editor
                          ?.chain()
                          .focus()
                          .toggleHeading({ level: 3 })
                          .run()
                      if (control === 'Bullet list')
                        editor?.chain().focus().toggleBulletList().run()
                      if (control === 'Code')
                        editor?.chain().focus().toggleCode().run()
                    }}
                    className="tw-px-3 tw-py-1 tw-text-sm tw-border tw-border-border tw-rounded hover:tw-bg-muted"
                  >
                    {control}
                  </button>
                )
              )}
            </div>

            <div className="tw-border tw-border-border tw-rounded tw-mb-6 tw-min-h-96">
              <EditorContent editor={editor} />
            </div>

            <div className="tw-mb-6">
              <label className="tw-block tw-text-sm tw-font-medium tw-mb-2">
                Tags{' '}
                <span className="tw-text-muted-foreground tw-font-normal">
                  (comma separated)
                </span>
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ai, nextjs, career"
                className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground"
              />
            </div>

            {error && <p className="tw-text-red-500 tw-mb-4">{error}</p>}

            <div className="tw-flex tw-gap-4">
              <button
                onClick={() => setPhase('form')}
                className="tw-px-6 tw-py-3 tw-border tw-border-border tw-rounded hover:tw-bg-muted"
              >
                ← Back to form
              </button>
              <button
                onClick={publish}
                disabled={publishing}
                className="tw-flex-1 tw-py-3 tw-bg-primary tw-text-primary-foreground tw-rounded tw-font-medium hover:tw-opacity-90 disabled:tw-opacity-50"
              >
                {publishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

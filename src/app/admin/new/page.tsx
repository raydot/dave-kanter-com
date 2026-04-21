'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import { type Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from '@tiptap/markdown'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import styles from './page.module.css'
import TagPicker from '@/components/admin/TagPicker'

interface StarForm {
  situation: string
  task: string
  action: string
  result: string
}

const TOOLBAR: { label: string; action: (e: Editor | null) => void }[] = [
  { label: 'Bold',          action: (e) => e?.chain().focus().toggleBold().run() },
  { label: 'Italic',        action: (e) => e?.chain().focus().toggleItalic().run() },
  { label: 'H1',            action: (e) => e?.chain().focus().toggleHeading({ level: 1 }).run() },
  { label: 'H2',            action: (e) => e?.chain().focus().toggleHeading({ level: 2 }).run() },
  { label: 'H3',            action: (e) => e?.chain().focus().toggleHeading({ level: 3 }).run() },
  { label: 'Bullet list',   action: (e) => e?.chain().focus().toggleBulletList().run() },
  { label: 'Ordered list',  action: (e) => e?.chain().focus().toggleOrderedList().run() },
  { label: 'Code',          action: (e) => e?.chain().focus().toggleCode().run() },
  { label: 'Code block',    action: (e) => e?.chain().focus().toggleCodeBlock().run() },
  { label: 'Insert table',  action: (e) => e?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
]

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [displayDate, setDisplayDate] = useState('')
  const [tagIds, setTagIds] = useState<string[]>([])
  const [phase, setPhase] = useState<'form' | 'editor'>('form')
  const [star, setStar] = useState<StarForm>({
    situation: '',
    task: '',
    action: '',
    result: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Markdown,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
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

  async function save(publish: boolean) {
    if (!editor) return
    setSaving(true)
    setError('')

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: editor.getMarkdown(),
        excerpt: excerpt.trim() || editor.getText().slice(0, 160),
        published_at: displayDate ? new Date(displayDate).toISOString() : undefined,
        slug,
        publish,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
      setSaving(false)
      return
    }

    const { post } = await res.json()
    await fetch(`/api/posts/${post.id}/tags`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag_ids: tagIds }),
    })

    router.refresh()
    router.push('/admin/posts')
  }

  return (
    <div className="tw-min-h-screen tw-bg-background">
      <div className={`tw-max-w-3xl tw-mx-auto tw-px-4 tw-py-8 ${styles.form}`}>
        <h1 className="tw-text-3xl tw-font-bold tw-mb-8">New Post</h1>

        {/* Title always visible */}
        <div>
          <label className="tw-block tw-text-sm tw-font-medium">
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
            <div>
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
                <div key={key} className={styles.section}>
                  <label className="tw-block tw-text-sm tw-font-medium">
                    {label}
                  </label>
                  <p className="tw-text-xs tw-text-muted-foreground">
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

            <div className={styles.section}>
              <label className="tw-block tw-text-sm tw-font-medium">Tags</label>
              <TagPicker value={tagIds} onChange={setTagIds} />
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
            <div className={`tw-mb-4 tw-flex tw-gap-2 tw-flex-wrap ${styles.section}`}>
              {TOOLBAR.map(({ label, action }) => (
                <button
                  key={label}
                  onClick={() => action(editor)}
                  className="tw-px-3 tw-py-1 tw-text-sm tw-border tw-border-border tw-rounded hover:tw-bg-muted"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="tw-border tw-border-border tw-rounded tw-mb-6 tw-min-h-96">
              <EditorContent editor={editor} />
            </div>

            <div className={styles.section}>
              <label className="tw-block tw-text-sm tw-font-medium">Excerpt</label>
              <p className="tw-text-xs tw-text-muted-foreground">
                Optional. If blank, auto-generated from first 160 characters.
              </p>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary shown on the blog index..."
                className="tw-w-full tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground"
              />
            </div>

            <div className={styles.section}>
              <label className="tw-block tw-text-sm tw-font-medium">Display date</label>
              <p className="tw-text-xs tw-text-muted-foreground">
                Optional. Useful for backdating. Defaults to publish date if blank.
              </p>
              <input
                type="date"
                value={displayDate}
                onChange={(e) => setDisplayDate(e.target.value)}
                className="tw-px-4 tw-py-2 tw-rounded tw-border tw-border-border tw-bg-background tw-text-foreground"
              />
            </div>

            <div className={styles.section}>
              <label className="tw-block tw-text-sm tw-font-medium">Tags</label>
              <TagPicker value={tagIds} onChange={setTagIds} />
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
                onClick={() => save(false)}
                disabled={saving}
                className="tw-px-6 tw-py-3 tw-border tw-border-border tw-rounded hover:tw-bg-muted disabled:tw-opacity-50"
              >
                Save Draft
              </button>
              <button
                onClick={() => save(true)}
                disabled={saving}
                className="tw-flex-1 tw-py-3 tw-bg-primary tw-text-primary-foreground tw-rounded tw-font-medium hover:tw-opacity-90 disabled:tw-opacity-50"
              >
                Publish
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

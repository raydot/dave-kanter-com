'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, useEditorState, EditorContent } from '@tiptap/react'
import { type Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from '@tiptap/markdown'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  SquareCode,
  Table as TableIcon,
  type LucideIcon,
} from 'lucide-react'
import styles from './page.module.css'
import TagPicker from '@/components/admin/TagPicker'

const TOOLBAR: {
  label: string
  icon: LucideIcon
  action: (e: Editor | null) => void
  isActive: (e: Editor) => boolean
}[] = [
  {
    label: 'Bold',
    icon: Bold,
    action: (e) => e?.chain().focus().toggleBold().run(),
    isActive: (e) => e.isActive('bold'),
  },
  {
    label: 'Italic',
    icon: Italic,
    action: (e) => e?.chain().focus().toggleItalic().run(),
    isActive: (e) => e.isActive('italic'),
  },
  {
    label: 'Heading 1',
    icon: Heading1,
    action: (e) => e?.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (e) => e.isActive('heading', { level: 1 }),
  },
  {
    label: 'Heading 2',
    icon: Heading2,
    action: (e) => e?.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (e) => e.isActive('heading', { level: 2 }),
  },
  {
    label: 'Heading 3',
    icon: Heading3,
    action: (e) => e?.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (e) => e.isActive('heading', { level: 3 }),
  },
  {
    label: 'Bullet list',
    icon: List,
    action: (e) => e?.chain().focus().toggleBulletList().run(),
    isActive: (e) => e.isActive('bulletList'),
  },
  {
    label: 'Ordered list',
    icon: ListOrdered,
    action: (e) => e?.chain().focus().toggleOrderedList().run(),
    isActive: (e) => e.isActive('orderedList'),
  },
  {
    label: 'Code',
    icon: Code,
    action: (e) => e?.chain().focus().toggleCode().run(),
    isActive: (e) => e.isActive('code'),
  },
  {
    label: 'Code block',
    icon: SquareCode,
    action: (e) => e?.chain().focus().toggleCodeBlock().run(),
    isActive: (e) => e.isActive('codeBlock'),
  },
  {
    label: 'Insert table',
    icon: TableIcon,
    action: (e) => e?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    isActive: (e) => e.isActive('table'),
  },
]

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [prompt, setPrompt] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [displayDate, setDisplayDate] = useState('')
  const [tagIds, setTagIds] = useState<string[]>([])
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
  })

  // Subscribes to just the active-mark slice of editor state, so the
  // toolbar re-renders on selection change without the parent re-rendering
  // on every keystroke.
  const activeToolbarLabels = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      e ? TOOLBAR.filter(({ isActive }) => isActive(e)).map(({ label }) => label) : [],
  })

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
    <div className={styles.form}>
      <h1 className={styles.title}>New Post</h1>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          className={styles.titleInput}
        />
      </div>

      <div className={styles.section}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What's this post about?"
        />
      </div>

      <div className={styles.section}>
        <label>Excerpt <span className={styles.hint}>(optional)</span></label>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="A one-sentence description shown in the post list"
        />
      </div>

      <div className={styles.section}>
        <label>Display date</label>
        <p className={styles.hint}>
          Optional. Useful for backdating. Defaults to publish date if blank.
        </p>
        <input
          type="date"
          value={displayDate}
          onChange={(e) => setDisplayDate(e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <label>Tags</label>
        <TagPicker value={tagIds} onChange={setTagIds} />
      </div>

      <div className={styles.section}>
        <div className={styles.toolbar}>
          {TOOLBAR.map(({ label, icon: Icon, action }) => {
            const isActive = (activeToolbarLabels ?? []).includes(label)
            return (
              <button
                key={label}
                type="button"
                onClick={() => action(editor)}
                title={label}
                aria-label={label}
                aria-pressed={isActive}
                className={`${styles.toolbarButton} ${isActive ? styles.toolbarButtonActive : ''}`}
              >
                <Icon size={16} strokeWidth={2} aria-hidden="true" />
              </button>
            )
          })}
        </div>

        <div className={styles.editor}>
          <EditorContent editor={editor} />
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="button" onClick={() => save(false)} disabled={saving}>
          Save Draft
        </button>
        <button type="button" onClick={() => save(true)} disabled={saving} className="primary">
          Publish
        </button>
      </div>
    </div>
  )
}

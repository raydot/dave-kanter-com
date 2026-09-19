'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
import styles from '../../new/page.module.css'
import TagPicker from '@/components/admin/TagPicker'

interface SyndicationEntry {
  platform: string
  url: string
  date: string
}

const SYNDICATION_PLATFORMS = ['dev.to', 'LinkedIn', 'Medium', 'Hashnode', 'Other']

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

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [displayDate, setDisplayDate] = useState('')
  const [tagIds, setTagIds] = useState<string[]>([])
  const [syndicatedTo, setSyndicatedTo] = useState<SyndicationEntry[]>([])
  const [newPlatform, setNewPlatform] = useState(SYNDICATION_PLATFORMS[0])
  const [newUrl, setNewUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

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

  const activeToolbarLabels = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      e ? TOOLBAR.filter(({ isActive }) => isActive(e)).map(({ label }) => label) : [],
  })

  useEffect(() => {
    Promise.all([
      fetch(`/api/posts/${id}`).then((r) => r.json()),
      fetch(`/api/posts/${id}/tags`).then((r) => r.json()),
    ])
      .then(([post, ids]) => {
        setTitle(post.title)
        setExcerpt(post.excerpt || '')
        setDisplayDate(post.published_at ? post.published_at.slice(0, 10) : '')
        setTagIds(Array.isArray(ids) ? ids : [])
        setSyndicatedTo(Array.isArray(post.syndicated_to) ? post.syndicated_to : [])
        const contentType = post.content.trim().startsWith('<') ? 'html' : 'markdown'
        editor?.commands.setContent(post.content, { contentType })
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load post')
        setLoading(false)
      })
  }, [id, editor])

  async function saveChanges() {
    if (!editor) return
    setSaving(true)
    setError('')

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const res = await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: editor.getMarkdown(),
        excerpt: excerpt.trim() || undefined,
        published_at: displayDate ? new Date(displayDate).toISOString() : undefined,
        slug,
        syndicated_to: syndicatedTo,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
      setSaving(false)
      return
    }

    await fetch(`/api/posts/${id}/tags`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag_ids: tagIds }),
    })

    router.refresh()
    router.push('/admin/posts')
  }

  function addSyndication() {
    const url = newUrl.trim()
    if (!url) return
    setSyndicatedTo([
      ...syndicatedTo,
      { platform: newPlatform, url, date: new Date().toISOString() },
    ])
    setNewUrl('')
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <p className={styles.hint}>Loading...</p>
      </div>
    )
  }

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Edit Post</h1>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
      </div>

      <div className={styles.section}>
        <label>Excerpt</label>
        <p className={styles.hint}>
          Optional. Shown in the frontmatter card and blog index.
        </p>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="A short summary or pull quote..."
        />
      </div>

      <div className={styles.section}>
        <label>Display date</label>
        <p className={styles.hint}>
          Shown on the post. Useful for backdating. Defaults to publish date if blank.
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

      <div className={styles.section}>
        <label>Syndicated to</label>
        <p className={styles.hint}>
          Where this post was cross-posted. Add the URL once it&apos;s live there.
          Saved with the post.
        </p>

        {syndicatedTo.length > 0 && (
          <ul className={styles.syndicationList}>
            {syndicatedTo.map((entry, i) => (
              <li key={`${entry.platform}-${entry.url}`} className={styles.syndicationItem}>
                <span className={styles.syndicationPlatform}>{entry.platform}</span>
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.syndicationLink}
                >
                  {entry.url}
                </a>
                <span className={styles.syndicationDate}>
                  {entry.date?.slice(0, 10)}
                </span>
                <button
                  type="button"
                  onClick={() => setSyndicatedTo(syndicatedTo.filter((_, j) => j !== i))}
                  className={styles.syndicationRemove}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.syndicationAdd}>
          <select
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
          >
            {SYNDICATION_PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="https://dev.to/..."
          />
          <button
            type="button"
            onClick={addSyndication}
            disabled={!newUrl.trim()}
          >
            Add
          </button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="button" onClick={() => router.push('/admin/posts')}>
          Cancel
        </button>
        <button type="button" onClick={saveChanges} disabled={saving} className="primary">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

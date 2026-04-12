# Blog Admin

## Overview

Single-user blog admin at `/admin/login`. Password authentication with a signed JWT cookie. Posts are stored in Supabase.

## Getting Started

Run locally:

```bash
npm run dev
```

Required environment variables:

| Variable | Purpose |
|---|---|
| `ADMIN_PASSWORD` | Login password for the admin |
| `ADMIN_COOKIE_SECRET` | Secret used to sign the JWT session cookie |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (bypasses RLS) |

## Admin Routes

| Route | Purpose |
|---|---|
| `/admin/login` | Login page |
| `/admin/new` | Create a new post |
| `/admin/posts` | List all posts and drafts |
| `/admin/posts/[id]` | Edit a post, publish, convert to draft, or delete |

## Writing a Post

1. Fill in the **Title**
2. Use the **STAR** prompts as a starting point: Situation → Task → Action → Result
3. Click **Generate Draft →** to move to the editor
4. Write and edit using markdown syntax or the toolbar
5. Add an optional **Excerpt** — if left blank, auto-generated from the first 160 characters of the post
6. Add **Tags**
7. Click **Save Draft** or **Publish**

## Editor Shortcuts

Markdown syntax works inline as you type:

| Syntax | Result |
|---|---|
| `**text**` | Bold |
| `_text_` | Italic |
| `# text` | H1 |
| `## text` | H2 |
| `### text` | H3 |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `` `code` `` | Inline code |
| `\| col \|` | Table |

## Toolbar Buttons

Bold, Italic, H1, H2, H3, Bullet list, Ordered list, Code, Code block, Insert table

Insert table creates a 3×3 table with a header row.

## Post States

| State | Condition | Visibility |
|---|---|---|
| Draft | `publish: false` | Not visible on public blog |
| Published | `publish: true` | Visible at `/blog/[slug]` |

## Tags

Free-text tags associated with each post. Tag deduplication and fuzzy matching are handled server-side. Full tag management UI is planned.

## Database

Supabase. Primary table: `posts`.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `title` | text | |
| `content` | text | Stored as markdown |
| `excerpt` | text | Manual or auto-generated |
| `tags` | text[] | Legacy; use `post_tags` join table |
| `slug` | text | URL-safe, derived from title |
| `publish` | boolean | |
| `published_at` | timestamptz | Set on first publish |
| `created_at` | timestamptz | |

Tag relationships are stored in `tags` and `post_tags` join tables.

## Security

- Password auth with a JWT signed cookie (30-day expiry)
- Rate limiting on `/admin/login` via Upstash Redis: 5 attempts per 15 minutes

## Deployment

Netlify. Push to `main` triggers an auto-deploy. All environment variables must be set in the Netlify dashboard under **Site configuration → Environment variables**.

## Known Issues / Planned

- Tag management UI (browse, rename, merge tags)
- Image upload support

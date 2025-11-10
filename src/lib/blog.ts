import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags?: string[]
  content: string
}

export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)

  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Get file stats for creation time
      const stats = fs.statSync(fullPath)
      
      // If date doesn't include time, append file creation time
      let postDate = data.date
      if (postDate && !postDate.includes('T')) {
        // Date is just YYYY-MM-DD, add file creation time
        const fileTime = stats.birthtime.toISOString().split('T')[1]
        postDate = `${postDate}T${fileTime}`
      } else if (!postDate) {
        // No date provided, use file creation time
        postDate = stats.birthtime.toISOString()
      }

      return {
        slug,
        title: data.title,
        date: postDate,
        excerpt: data.excerpt,
        tags: data.tags || [],
        content,
      }
    })

  // Sort posts by date with time (newest first)
  return allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      content,
    }
  } catch (error) {
    return null
  }
}

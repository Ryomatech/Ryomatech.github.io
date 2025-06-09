import fs from 'fs'
import path from 'path'

export interface NewsItem {
  id: string
  title: string
  date: string
  category: string
  content: {
    en: string
    ja: string
  }
}

export interface Publication {
  id: string
  title: string
  authors: string
  journal?: string
  conference?: string
  volume?: string
  pages: string
  doi?: string
  date: string
  category: 'Journal Article' | 'Conference Paper' | 'Book Chapter'
  citations: number
  location?: string
  abstract: {
    en: string
    ja: string
  }
}

export function parseNewsMarkdown(content: string): NewsItem[] {
  const items: NewsItem[] = []
  const sections = content.split('---').filter(section => section.trim())
  
  sections.forEach((section, index) => {
    const lines = section.trim().split('\n')
    let title = ''
    let date = ''
    let category = ''
    let englishContent = ''
    let japaneseContent = ''
    
    let currentSection = ''
    let isCollectingContent = false
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      
      if (trimmedLine.startsWith('## ')) {
        title = trimmedLine.replace('## ', '')
      } else if (trimmedLine.startsWith('**日付**:')) {
        date = trimmedLine.replace('**日付**:', '').trim()
      } else if (trimmedLine.startsWith('**カテゴリ**:')) {
        category = trimmedLine.replace('**カテゴリ**:', '').trim()
      } else if (trimmedLine === '### English') {
        currentSection = 'english'
        isCollectingContent = true
      } else if (trimmedLine === '### 日本語') {
        currentSection = 'japanese'
        isCollectingContent = true
      } else if (isCollectingContent && trimmedLine) {
        if (currentSection === 'english') {
          englishContent += (englishContent ? ' ' : '') + trimmedLine
        } else if (currentSection === 'japanese') {
          japaneseContent += (japaneseContent ? ' ' : '') + trimmedLine
        }
      }
    })
    
    if (title && date) {
      items.push({
        id: `news-${index}`,
        title,
        date,
        category,
        content: {
          en: englishContent,
          ja: japaneseContent
        }
      })
    }
  })
  
  return items
}

export function parsePublicationsMarkdown(content: string): Publication[] {
  const publications: Publication[] = []
  const sections = content.split('---').filter(section => section.trim())
  
  sections.forEach((section, index) => {
    const lines = section.trim().split('\n')
    let title = ''
    let authors = ''
    let journal = ''
    let conference = ''
    let volume = ''
    let pages = ''
    let doi = ''
    let date = ''
    let category: 'Journal Article' | 'Conference Paper' | 'Book Chapter' = 'Journal Article'
    let citations = 0
    let location = ''
    let englishAbstract = ''
    let japaneseAbstract = ''
    
    let currentSection = ''
    let isCollectingAbstract = false
    
    lines.forEach(line => {
      const trimmedLine = line.trim()
      
      if (trimmedLine.startsWith('### ') && !trimmedLine.startsWith('#### ')) {
        title = trimmedLine.replace('### ', '')
      } else if (trimmedLine.startsWith('**著者**:')) {
        authors = trimmedLine.replace('**著者**:', '').trim()
      } else if (trimmedLine.startsWith('**雑誌**:')) {
        journal = trimmedLine.replace('**雑誌**:', '').trim()
        category = 'Journal Article'
      } else if (trimmedLine.startsWith('**会議**:')) {
        conference = trimmedLine.replace('**会議**:', '').trim()
        category = 'Conference Paper'
      } else if (trimmedLine.startsWith('**巻号**:')) {
        volume = trimmedLine.replace('**巻号**:', '').trim()
      } else if (trimmedLine.startsWith('**ページ**:')) {
        pages = trimmedLine.replace('**ページ**:', '').trim()
      } else if (trimmedLine.startsWith('**DOI**:')) {
        doi = trimmedLine.replace('**DOI**:', '').trim()
      } else if (trimmedLine.startsWith('**日付**:')) {
        date = trimmedLine.replace('**日付**:', '').trim()
      } else if (trimmedLine.startsWith('**被引用数**:')) {
        citations = parseInt(trimmedLine.replace('**被引用数**:', '').trim()) || 0
      } else if (trimmedLine.startsWith('**場所**:')) {
        location = trimmedLine.replace('**場所**:', '').trim()
      } else if (trimmedLine === '#### Abstract (English)') {
        currentSection = 'english'
        isCollectingAbstract = true
      } else if (trimmedLine === '#### 概要 (日本語)') {
        currentSection = 'japanese'
        isCollectingAbstract = true
      } else if (isCollectingAbstract && trimmedLine && !trimmedLine.startsWith('####')) {
        if (currentSection === 'english') {
          englishAbstract += (englishAbstract ? ' ' : '') + trimmedLine
        } else if (currentSection === 'japanese') {
          japaneseAbstract += (japaneseAbstract ? ' ' : '') + trimmedLine
        }
      }
    })
    
    if (title && authors && date) {
      publications.push({
        id: `pub-${index}`,
        title,
        authors,
        journal,
        conference,
        volume,
        pages,
        doi,
        date,
        category,
        citations,
        location,
        abstract: {
          en: englishAbstract,
          ja: japaneseAbstract
        }
      })
    }
  })
  
  return publications
}

export async function getNewsData(): Promise<NewsItem[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'news.md')
    const content = fs.readFileSync(filePath, 'utf-8')
    return parseNewsMarkdown(content)
  } catch (error) {
    console.error('Error reading news data:', error)
    return []
  }
}

export async function getPublicationsData(): Promise<Publication[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'publications.md')
    const content = fs.readFileSync(filePath, 'utf-8')
    return parsePublicationsMarkdown(content)
  } catch (error) {
    console.error('Error reading publications data:', error)
    return []
  }
}

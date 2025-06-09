"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, FileText, Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SwimmingPenguin } from "@/components/swimming-penguin"
import { getPublicationsData, type Publication } from "@/lib/data-utils"

export default function Publications() {
  const [language, setLanguage] = useState<"en" | "ja">("en")
  const [isSwimming, setIsSwimming] = useState(false)
  const [publications, setPublications] = useState<Publication[]>([])

  useEffect(() => {
    const loadPublicationsData = async () => {
      const data = await getPublicationsData()
      setPublications(data)
    }
    loadPublicationsData()
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ja" : "en"))
  }

  const handlePenguinClick = () => {
    setIsSwimming(true)
  }

  const content = {
    en: {
      backToCv: "Back to CV",
      publications: "Publications",
      journalArticles: "Journal Articles",
      journalDesc: "Peer-reviewed publications in academic journals",
      conferenceTitle: "Conference Papers",
      conferenceDesc: "Papers presented at academic conferences",
      booksTitle: "Books & Chapters",
      booksDesc: "Published books and contributions to edited volumes",
      citationMetrics: "Citation Metrics",
      citationDesc: "Academic impact statistics",
      totalCitations: "Total Citations",
      hIndex: "h-index",
      publicationsCount: "Publications",
      yearsPublishing: "Years Publishing",
      languageButton: "日本語",
      viewAbstract: "View Abstract",
      citations: "Citations",
    },
    ja: {
      backToCv: "履歴書に戻る",
      publications: "研究業績",
      journalArticles: "学術論文",
      journalDesc: "査読付き学術雑誌への掲載論文",
      conferenceTitle: "会議論文",
      conferenceDesc: "学術会議で発表された論文",
      booksTitle: "著書・章",
      booksDesc: "出版された書籍と編集書籍への寄稿",
      citationMetrics: "引用指標",
      citationDesc: "学術的影響力の統計",
      totalCitations: "総引用数",
      hIndex: "h指数",
      publicationsCount: "論文数",
      yearsPublishing: "研究年数",
      languageButton: "English",
      viewAbstract: "概要を見る",
      citations: "引用数",
    },
  }

  const t = content[language]

  // Filter publications by category
  const journalArticles = publications.filter(pub => pub.category === 'Journal Article')
  const conferencePapers = publications.filter(pub => pub.category === 'Conference Paper')
  const books = publications.filter(pub => pub.category === 'Book Chapter')

  // Calculate metrics
  const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0)
  const totalPublications = publications.length
  const sortedByCitations = [...publications].sort((a, b) => b.citations - a.citations)
  const hIndex = calculateHIndex(sortedByCitations)

  return (
    <>
      <SwimmingPenguin isActive={isSwimming} onComplete={() => setIsSwimming(false)} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="outline" size="sm" className="penguin-button">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t.backToCv}
                </Button>
              </Link>
              <h1 className="text-3xl font-bold ml-4 text-slate-800 flex items-center gap-2">
                {t.publications}
                <span className="text-2xl penguin-slide penguin-clickable" onClick={handlePenguinClick}>
                  🐧
                </span>
              </h1>
            </div>
            <Button onClick={toggleLanguage} variant="outline" size="sm" className="penguin-button">
              <Languages className="mr-2 h-4 w-4" />
              {t.languageButton}
            </Button>
          </div>

          <Tabs defaultValue="journal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100">
              <TabsTrigger value="journal" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                {t.journalArticles}
              </TabsTrigger>
              <TabsTrigger
                value="conference"
                className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
              >
                {t.conferenceTitle}
              </TabsTrigger>
              <TabsTrigger value="books" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
                {t.booksTitle}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="journal" className="space-y-6 mt-6">
              <Card className="penguin-card">
                <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
                  <div className="absolute top-2 right-4 text-white/20 text-xl">
                    <span className="penguin-pulse penguin-clickable" onClick={handlePenguinClick}>
                      🐧
                    </span>
                  </div>
                  <CardTitle className="text-lg text-white">{t.journalArticles}</CardTitle>
                  <CardDescription className="text-slate-200">{t.journalDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {journalArticles.map((article) => (
                    <PublicationItem 
                      key={article.id} 
                      publication={article} 
                      language={language} 
                      t={t} 
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conference" className="space-y-6 mt-6">
              <Card className="penguin-card">
                <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
                  <div className="absolute top-2 right-4 text-white/20 text-xl">
                    <span className="penguin-pulse penguin-clickable" onClick={handlePenguinClick}>
                      🐧
                    </span>
                  </div>
                  <CardTitle className="text-lg text-white">{t.conferenceTitle}</CardTitle>
                  <CardDescription className="text-slate-200">{t.conferenceDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {conferencePapers.map((paper) => (
                    <PublicationItem 
                      key={paper.id} 
                      publication={paper} 
                      language={language} 
                      t={t} 
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="books" className="space-y-6 mt-6">
              <Card className="penguin-card">
                <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
                  <div className="absolute top-2 right-4 text-white/20 text-xl">
                    <span className="penguin-pulse penguin-clickable" onClick={handlePenguinClick}>
                      🐧
                    </span>
                  </div>
                  <CardTitle className="text-lg text-white">{t.booksTitle}</CardTitle>
                  <CardDescription className="text-slate-200">{t.booksDesc}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {books.map((book) => (
                    <PublicationItem 
                      key={book.id} 
                      publication={book} 
                      language={language} 
                      t={t} 
                    />
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8 penguin-card">
            <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
              <div className="absolute top-2 right-4 text-white/20 text-xl">
                <span className="penguin-pulse penguin-clickable" onClick={handlePenguinClick}>
                  🐧
                </span>
              </div>
              <CardTitle className="text-white">{t.citationMetrics}</CardTitle>
              <CardDescription className="text-slate-200">{t.citationDesc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-100 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-slate-800">{totalCitations}+</p>
                  <p className="text-sm text-slate-600">{t.totalCitations}</p>
                </div>
                <div className="bg-slate-100 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-slate-800">{hIndex}</p>
                  <p className="text-sm text-slate-600">{t.hIndex}</p>
                </div>
                <div className="bg-slate-100 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-slate-800">{totalPublications}</p>
                  <p className="text-sm text-slate-600">{t.publicationsCount}</p>
                </div>
                <div className="bg-slate-100 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-slate-800">12</p>
                  <p className="text-sm text-slate-600">{t.yearsPublishing}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function PublicationItem({ 
  publication, 
  language, 
  t 
}: { 
  publication: Publication
  language: "en" | "ja"
  t: any 
}) {
  const [showAbstract, setShowAbstract] = useState(false)

  return (
    <div className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
      <h3 className="font-semibold text-lg text-slate-800">{publication.title}</h3>
      <p className="text-sm text-slate-600 mt-1">{publication.authors}</p>
      <p className="text-sm font-medium mt-2 text-slate-700">
        {publication.journal || publication.conference}
        {publication.volume && `, ${publication.volume}`}
        {publication.pages && `, ${publication.pages}`}
        {publication.location && `, ${publication.location}`}
        , {publication.date}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant="outline" className="penguin-badge">
          {publication.category}
        </Badge>
        <Badge className="penguin-badge">
          {publication.citations} {t.citations}
        </Badge>
      </div>
      
      {showAbstract && (
        <div className="mt-3 p-3 bg-slate-50 rounded-md">
          <p className="text-sm text-slate-700">
            {language === "en" ? publication.abstract.en : publication.abstract.ja}
          </p>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowAbstract(!showAbstract)}
          className="penguin-nav-button"
        >
          <FileText className="mr-2 h-4 w-4" />
          {t.viewAbstract}
        </Button>
        {publication.doi && (
          <Button variant="outline" size="sm" asChild className="penguin-nav-button">
            <Link href={`https://doi.org/${publication.doi}`}>
              <ExternalLink className="mr-2 h-4 w-4" />
              DOI
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

function calculateHIndex(publications: Publication[]): number {
  let h = 0
  for (let i = 0; i < publications.length; i++) {
    if (publications[i].citations >= i + 1) {
      h = i + 1
    } else {
      break
    }
  }
  return h
}

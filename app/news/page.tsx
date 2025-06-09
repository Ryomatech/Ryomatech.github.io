"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, ExternalLink, Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SwimmingPenguin } from "@/components/swimming-penguin"
import { getNewsData, type NewsItem } from "@/lib/data-utils"

export default function News() {
  const [language, setLanguage] = useState<"en" | "ja">("en")
  const [isSwimming, setIsSwimming] = useState(false)
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])

  useEffect(() => {
    const loadNewsData = async () => {
      const data = await getNewsData()
      setNewsItems(data)
    }
    loadNewsData()
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
      newsUpdates: "News & Updates",
      languageButton: "日本語",
      upcomingEvents: "Upcoming Events",
      eventsDesc: "Conferences, talks, and workshops",
      mediaMentions: "Media Mentions",
      mediaDesc: "Recent coverage in press and media",
      readMore: "Read More",
    },
    ja: {
      backToCv: "履歴書に戻る",
      newsUpdates: "ニュース・更新情報",
      languageButton: "English",
      upcomingEvents: "今後のイベント",
      eventsDesc: "会議、講演、ワークショップ",
      mediaMentions: "メディア掲載",
      mediaDesc: "最近の報道・メディア掲載",
      readMore: "続きを読む",
    },
  }

  const t = content[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <SwimmingPenguin isActive={isSwimming} onComplete={() => setIsSwimming(false)} />
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
              {t.newsUpdates}
            </h1>
          </div>
          <Button onClick={toggleLanguage} variant="outline" size="sm" className="penguin-button">
            <Languages className="mr-2 h-4 w-4" />
            {t.languageButton}
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, index) => (
            <Card key={item.id} className={`penguin-card ${index === 0 ? 'col-span-full' : ''}`}>
              {index === 0 && (
                <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
                  <div className="absolute top-2 right-4 text-white/20 text-2xl">
                    <span className="penguin-float penguin-clickable" onClick={handlePenguinClick}>
                      🐧
                    </span>
                  </div>
                  <div className="absolute top-4 right-12 text-white/10 text-lg">
                    <span className="penguin-waddle penguin-delay-1">🐧</span>
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="text-slate-200">
                    {item.category} • {item.date}
                  </CardDescription>
                </CardHeader>
              )}
              {index > 0 && (
                <CardHeader>
                  <CardTitle className="text-slate-800">{item.title}</CardTitle>
                </CardHeader>
              )}
              <CardContent className="pt-6">
                <div className="flex items-center text-sm text-slate-600 mb-4">
                  <Calendar className="mr-2 h-4 w-4" />
                  {item.date}
                </div>
                <p className="text-slate-700">
                  {language === "en" ? item.content.en : item.content.ja}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge className="penguin-badge">{item.category}</Badge>
                <Button variant="outline" size="sm" className="penguin-nav-button">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t.readMore}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="mt-8 penguin-card">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
            <div className="absolute top-2 right-4 text-white/20 text-xl">
              <span className="penguin-swim penguin-clickable" onClick={handlePenguinClick}>
                🐧
              </span>
            </div>
            <CardTitle className="text-white">{t.upcomingEvents}</CardTitle>
            <CardDescription className="text-slate-200">{t.eventsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">{event.title}</h3>
                      <p className="text-sm text-slate-600">{event.location}</p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <Calendar className="mr-2 h-4 w-4 text-slate-600" />
                      <span className="text-sm text-slate-600">{event.date}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-2 text-slate-700">{event.description}</p>
                  {index < events.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 penguin-card">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
            <div className="absolute top-2 right-4 text-white/20 text-xl">
              <span className="penguin-swim penguin-clickable" onClick={handlePenguinClick}>
                🐧
              </span>
            </div>
            <CardTitle className="text-white">{t.mediaMentions}</CardTitle>
            <CardDescription className="text-slate-200">{t.mediaDesc}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {mediaMentions.map((mention, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="bg-slate-100 p-2 rounded-md flex-shrink-0">
                    <Image
                      src={mention.logo || "/placeholder.svg"}
                      alt={mention.source}
                      width={80}
                      height={40}
                      className="h-8 w-20 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{mention.title}</h3>
                    <p className="text-sm text-slate-600">
                      {mention.source} • {mention.date}
                    </p>
                    <p className="text-sm mt-1 text-slate-700">{mention.excerpt}</p>
                    <Link href={mention.link} className="text-sm text-blue-700 hover:text-blue-800 mt-1 inline-block">
                      Read article →
                    </Link>
                  </div>
                  {index < mediaMentions.length - 1 && <Separator className="md:hidden my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const events = [
  {
    title: "International Conference on Machine Learning (ICML)",
    location: "Toronto, Canada",
    date: "July 15-20, 2025",
    description:
      "Presenting our paper on 'Self-Supervised Learning for Medical Image Analysis' and participating in the workshop on AI in Healthcare.",
  },
  {
    title: "Guest Lecture Series: The Future of AI",
    location: "Stanford University",
    date: "June 5, 2025",
    description:
      "Delivering a series of three lectures on recent advances in deep learning and their implications for society.",
  },
  {
    title: "Workshop on Ethical AI Development",
    location: "Virtual Event",
    date: "May 22, 2025",
    description:
      "Organizing and moderating a workshop bringing together researchers, ethicists, and policymakers to discuss responsible AI development.",
  },
]

const mediaMentions = [
  {
    title: "AI Researchers Make Breakthrough in Medical Diagnostics",
    source: "Tech Today",
    logo: "/placeholder.svg?height=40&width=80",
    date: "April 10, 2025",
    excerpt:
      "Dr. Smith's team has developed a new algorithm that can detect early signs of disease with unprecedented accuracy while maintaining patient privacy.",
    link: "#",
  },
  {
    title: "The Ethical Implications of AI in Education",
    source: "Education Weekly",
    logo: "/placeholder.svg?height=40&width=80",
    date: "March 5, 2025",
    excerpt:
      "In an in-depth interview, Professor Smith discusses how AI is transforming education and the ethical considerations that must be addressed.",
    link: "#",
  },
  {
    title: "Top Researchers to Watch in 2025",
    source: "Science Magazine",
    logo: "/placeholder.svg?height=40&width=80",
    date: "January 15, 2025",
    excerpt:
      "Dr. Jane Smith was named one of the top 10 researchers to watch this year for her groundbreaking work in explainable AI systems.",
    link: "#",
  },
]

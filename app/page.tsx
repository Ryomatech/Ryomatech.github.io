"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Mail, Twitter, Linkedin, BookOpen, Newspaper, Languages, Heart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SwimmingPenguin } from "@/components/swimming-penguin"

type Language = "en" | "ja"

export default function Home() {
  const [language, setLanguage] = useState<Language>("en")
  const [isSwimming, setIsSwimming] = useState(false)

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ja" : "en"))
  }

  const handlePenguinClick = () => {
    setIsSwimming(true)
  }

  const content = {
    en: {
      name: "Ryoma Yamamoto",
      title: "Master's Student in Materials Science",
      email: "yamamoto.r.ff57@m.isct.ac.jp",
      selfIntroduction: "Self-Introduction",
      selfIntroText:
        "I am currently a student at the Ohba Laboratory in the Department of Materials Science at the Institute of Science Tokyo, research in Materials Informatics. I aim to understand materials from new perspectives by utilizing knowledge from both materials science and information engineering.",
      researchInterests: "Research Interests",
      researchText:
        "Materials Informatics, Inorganic Materials, Machine Learning, LLM, GNN",
      navigation: "Navigation",
      cvCareer: "CV & Career History",
      publications: "Publications",
      newsUpdates: "News & Updates",
      skills: "Skills",
      likes: "Likes & Interests",
      careerHistory: "Career History",
      careerDesc: "Academic experience, education, and achievements",
      filterAll: "All",
      filterEducation: "Education",
      filterExperience: "Experience",
      filterAwards: "Awards",
      languageButton: "日本語",
    },
    ja: {
      name: "山本 竜馬(やまもと りょうま)",
      title: "修士課程(材料科学)",
      email: "yamamoto.r.ff57@m.isct.ac.jp",
      selfIntroduction: "自己紹介",
      selfIntroText:
        "私は現在、東京科学大学理工学系材料系の大場研究室に所属する学生であり、マテリアルズインフォマティクスの研究を行っています。 材料科学と情報工学の双方の知見を活用することで、新たな視点からの材料の理解を目指しています。",
      researchInterests: "研究分野",
      researchText: "マテリアルズインフォマティクス、無機材料、機械学習、LLM、GNN",
      navigation: "ナビゲーション",
      cvCareer: "履歴書・経歴",
      publications: "研究業績",
      newsUpdates: "ニュース・更新情報",
      skills: "スキル",
      likes: "好きなもの・興味",
      careerHistory: "経歴",
      careerDesc: "学歴、職歴、受賞歴",
      filterAll: "すべて",
      filterEducation: "学歴",
      filterExperience: "職歴",
      filterAwards: "受賞歴",
      languageButton: "English",
    },
  }

  const t = content[language]
  const likes = language === "en" ? likesEn : likesJa

  return (
    <>
      <SwimmingPenguin isActive={isSwimming} onComplete={() => setIsSwimming(false)} />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <Button onClick={toggleLanguage} variant="outline" size="sm" className="penguin-button">
              <Languages className="mr-2 h-4 w-4" />
              {t.languageButton}
            </Button>
          </div>

          <div className="space-y-8">
            {/* Introduction Section - Center Top */}
            <div className="flex justify-center">
              <Card className="overflow-hidden penguin-card max-w-4xl w-full penguin-shaped-card">
                {/* Header section */}
                <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 h-24 relative penguin-head">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-slate-900/20"></div>
                </div>

                {/* Profile picture */}
                <div className="flex justify-center -mt-12 relative z-10">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=150&width=150"
                      alt="Profile"
                      width={150}
                      height={150}
                      className="rounded-full border-4 border-orange-400 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-slate-800 rounded-full p-2 border-2 border-white">
                      <span className="text-lg penguin-pulse penguin-clickable" onClick={handlePenguinClick}>
                        🐧
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-slate-800">{t.name}</CardTitle>
                  <CardDescription className="text-lg text-slate-600">{t.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Contact & Navigation */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3 text-slate-800 text-lg">Contact Information</h3>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-600" />
                            <span className="text-sm">{t.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Github className="h-4 w-4 text-slate-600" />
                            <Link href="https://github.com/Ryomatech" className="text-sm hover:underline text-blue-700">
                              github.com/janesmith
                            </Link>
                          </div>
                          <div className="flex items-center gap-2">
                            <Twitter className="h-4 w-4 text-slate-600" />
                            <Link
                              href="https://twitter.com/penguin_mat_ML"
                              className="text-sm hover:underline text-blue-700"
                            >
                              @penguin_mat_ML
                            </Link>
                          </div>
                          <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 text-slate-600" />
                            <Link
                              href="https://linkedin.com/in/ryoma-yamamoto-600112367"
                              className="text-sm hover:underline text-blue-700"
                            >
                              linkedin.com/in/ryoma-yamamoto-600112367
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 text-slate-800 text-lg">{t.navigation}</h3>
                        <div className="flex flex-col gap-2">
                          <Link href="/">
                            <Button variant="outline" className="w-full justify-start penguin-nav-button">
                              <BookOpen className="mr-2 h-4 w-4" />
                              {t.cvCareer}
                            </Button>
                          </Link>
                          <Link href="/publications">
                            <Button variant="outline" className="w-full justify-start penguin-nav-button">
                              <BookOpen className="mr-2 h-4 w-4" />
                              {t.publications}
                            </Button>
                          </Link>
                          <Link href="/news">
                            <Button variant="outline" className="w-full justify-start penguin-nav-button">
                              <Newspaper className="mr-2 h-4 w-4" />
                              {t.newsUpdates}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Introduction & Research */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <User className="h-5 w-5 text-slate-600" />
                          <h3 className="font-medium text-slate-800 text-lg">{t.selfIntroduction}</h3>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {t.selfIntroText}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-3 text-slate-800 text-lg">{t.researchInterests}</h3>
                        <p className="text-sm text-slate-700">{t.researchText}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Career History Section - Full Width */}
            <div className="w-full">
              <CareerHistorySection language={language} />
            </div>

            {/* Skills and Likes Section - Side by Side */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="penguin-card">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800">{t.skills}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="penguin-badge">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      TensorFlow
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      PyTorch
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      R
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      MATLAB
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      Data Analysis
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      Statistical Modeling
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      Research Methods
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      Grant Writing
                    </Badge>
                    <Badge variant="secondary" className="penguin-badge">
                      Project Management
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="penguin-card">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <CardTitle className="text-lg text-slate-800">{t.likes}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {likes.map((like, index) => (
                      <Badge key={index} variant="outline" className="penguin-like-badge">
                        {like}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function CareerHistorySection({ language }: { language: Language }) {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const content = {
    en: {
      careerHistory: "Career History",
      careerDesc: "Academic experience, education, and achievements",
      filterAll: "All",
      filterEducation: "Education",
      filterExperience: "Experience",
      filterAwards: "Awards",
    },
    ja: {
      careerHistory: "経歴",
      careerDesc: "学歴、職歴、受賞歴",
      filterAll: "すべて",
      filterEducation: "学歴",
      filterExperience: "職歴",
      filterAwards: "受賞歴",
    },
  }

  const t = content[language]

  const careerData = language === "en" ? careerDataEn : careerDataJa

  const filteredData = activeFilter === "all" ? careerData : careerData.filter((item) => item.category === activeFilter)

  return (
    <Card className="penguin-card">
      <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white relative overflow-hidden">
        <div className="absolute top-2 right-4 text-white/20 text-xl">
          <span className="penguin-slide penguin-clickable">🐧</span>
        </div>
        <CardTitle className="text-white">{t.careerHistory}</CardTitle>
        <CardDescription className="text-slate-200">{t.careerDesc}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("all")}
            className="penguin-filter-button"
          >
            {t.filterAll}
          </Button>
          <Button
            variant={activeFilter === "education" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("education")}
            className="penguin-filter-button"
          >
            {t.filterEducation}
          </Button>
          <Button
            variant={activeFilter === "experience" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("experience")}
            className="penguin-filter-button"
          >
            {t.filterExperience}
          </Button>
          <Button
            variant={activeFilter === "awards" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("awards")}
            className="penguin-filter-button"
          >
            {t.filterAwards}
          </Button>
        </div>

        <div className="space-y-6">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className={`border-l-4 pl-4 py-1 ${getCategoryColor(item.category)} penguin-timeline-item`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{item.title}</h3>
                  <p className="text-sm text-slate-600">
                    {item.organization}, {item.period}
                  </p>
                  {item.description && (
                    <div className="mt-2">
                      {Array.isArray(item.description) ? (
                        <ul className="list-disc list-inside text-sm space-y-1 text-slate-700">
                          {item.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-slate-700">{item.description}</p>
                      )}
                    </div>
                  )}
                </div>
                <Badge variant="outline" className="ml-4 penguin-category-badge">
                  {getCategoryLabel(item.category, language)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function getCategoryColor(category: string) {
  switch (category) {
    case "education":
      return "border-blue-600"
    case "experience":
      return "border-slate-700"
    case "awards":
      return "border-amber-500"
    default:
      return "border-slate-400"
  }
}

function getCategoryLabel(category: string, language: Language) {
  const labels = {
    en: {
      education: "Education",
      experience: "Experience",
      awards: "Awards",
    },
    ja: {
      education: "学歴",
      experience: "職歴",
      awards: "受賞歴",
    },
  }
  return labels[language][category as keyof typeof labels.en]
}

const likesEn = [
  "🐧 Penguins",
  "🐟 Aquarium",
  "🍫 Chocolate",
  "🍰 Pastry Making",
  "🎶 Avicii",
  "🎶 IVE, NMIXX",
  "🎶 Soutaiseiriron"
]

const likesJa = [
  "🐧 ペンギン",
  "🐟 水族館",
  "🍫 チョコレート",
  "🍰 お菓子作り",
  "🎶 Avicii",
  "🎶 IVE, NMIXX",
  "🎶 相対性理論"
]

const careerDataEn = [
  {
    category: "education",
    title: "Bachelor's Degree in Materials Science",
    organization: "Tokyo Institute of Technology",
    period: "2020 - 2025",
    description: [
      "Focused on inorganic materials",
      "University name changed during studies",
    ],
  },
  {
    category: "education",
    title: "Bachelor's Degree in Materials Science",
    organization: "Institute of Science Tokyo",
    period: "2021 - 2025",
    description: [
      "Focused on inorganic materials",
    ],
  },
  {
    category: "experience",
    title: "Pastry Chef & Chocolatier",
    organization: "Minimal -Bean to Bar Chocolate-",
    period: "2022 - Present",
    description: [
      "Chocolate manufacturing, cake production using chocolate",
    ],
  },
  {
    category: "education",
    title: "Master's Degree in Materials Science",
    organization: "Institute of Science Tokyo",
    period: "2025 - Present",
    description: [
      "Focused on inorganic materials",
    ],
  },
]

const careerDataJa = [
  {
    category: "education",
    title: "学士課程（材料科学）",
    organization: "東京工業大学",
    period: "2020年 - 2025年",
    description: [
      "無機材料フォーカス",
      "途中から大学の名前が変わりました",
    ],
  },
  {
    category: "education",
    title: "学士課程（材料科学）",
    organization: "東京科学大学",
    period: "2021年 - 2025年",
    description: [
      "無機材料フォーカス",
    ],
  },
  {
    category: "experience",
    title: "パティシエ・ショコラティエ",
    organization: "Minimal -Bean to Bar Chocolate-",
    period: "2022年 - 現在",
    description: [
      "チョコレートの製造、チョコレートを用いたケーキの製造",
    ],
  },
  {
    category: "education",
    title: "修士課程（材料科学）",
    organization: "東京科学大学",
    period: "2025年 - 現在",
    description: [
      "無機材料フォーカス",
    ],
  },
]

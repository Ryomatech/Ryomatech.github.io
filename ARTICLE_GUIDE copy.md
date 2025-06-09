# 記事追加ガイド

このプロジェクトでは、ニュース記事と論文情報を簡単に追加できる仕組みを用意しています。

## 📝 記事追加の方法

### 方法1: 自動化スクリプトを使用（推奨）

```bash
# ニュース記事または論文を追加
npm run add-article

# または直接スクリプトを実行
node scripts/add-article.js
```

スクリプトを実行すると、対話形式で記事の情報を入力できます：
- ニュース記事の場合：タイトル、日付、カテゴリ、言語、内容
- 論文の場合：タイトル、著者、雑誌名、DOI、年、月、カテゴリ、アブストラクトなど

### 方法2: テンプレートを使用して手動追加

#### ニュース記事の場合
1. `data/news_template_simple.md` のテンプレートをコピー
2. 必要な情報を入力
3. `data/news.md` の最上部（`# News & Updates`の直後）に貼り付け

#### 論文の場合
1. `data/publications_template_simple.md` のテンプレートをコピー
2. 必要な情報を入力
3. `data/publications.md` の適切な年のセクションに貼り付け

## 📂 ファイル構造

```
data/
├── news.md                      # 実際のニュース記事
├── news_template.md             # 詳細なニューステンプレート
├── news_template_simple.md      # 簡単なニューステンプレート
├── publications.md              # 実際の論文リスト
├── publications_template.md     # 詳細な論文テンプレート
└── publications_template_simple.md # 簡単な論文テンプレート
```

## 🔧 カテゴリ一覧

### ニュース記事のカテゴリ
- イベント
- 助成金
- 講演
- 出版
- 受賞
- その他

### 論文のカテゴリ
- Journal Article
- Conference Paper
- Book Chapter
- Preprint

## 💡 使用例

### ニュース記事の例
```markdown
## 2025年06月 - 国際AI会議で発表
**日付**: 2025年6月15日
**カテゴリ**: 講演
**言語**: 両方

### English
Presented our latest research on explainable AI at the International AI Conference.

### 日本語
国際AI会議で説明可能AIに関する最新の研究を発表しました。
```

### 論文の例
```markdown
### Deep Learning Approaches to Educational Data Mining
**著者**: 田中太郎, 佐藤花子
**雑誌**: Journal of Educational Technology
**巻号**: Vol. 15, Issue 2
**ページ**: 123-145
**DOI**: 10.1234/jet.2025.001
**日付**: 2025年6月
**カテゴリ**: Journal Article
**被引用数**: 5
```

## 🚀 自動化の利点

- **一貫したフォーマット**: スクリプトが自動的に正しい形式で記事を生成
- **時系列順の配置**: 新しい記事が自動的に適切な位置に挿入
- **入力ミスの防止**: 対話形式で必要な情報を確実に収集
- **時間短縮**: 手動でのコピー＆ペーストが不要

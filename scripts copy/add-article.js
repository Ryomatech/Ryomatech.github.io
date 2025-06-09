#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function addNewsArticle() {
  console.log('🗞️  新しいニュース記事を追加します\n');
  
  const title = await question('記事タイトル: ');
  const date = await question('日付 (YYYY年MM月DD日): ');
  const category = await question('カテゴリ (イベント/助成金/講演/出版/受賞/その他): ');
  const language = await question('言語 (英語のみ/日本語のみ/両方): ');
  
  let englishContent = '';
  let japaneseContent = '';
  
  if (language === '英語のみ' || language === '両方') {
    englishContent = await question('英語での記事内容: ');
  }
  
  if (language === '日本語のみ' || language === '両方') {
    japaneseContent = await question('日本語での記事内容: ');
  }
  
  const currentDate = new Date();
  const yearMonth = `${currentDate.getFullYear()}年${String(currentDate.getMonth() + 1).padStart(2, '0')}月`;
  
  let article = `## ${yearMonth} - ${title}\n`;
  article += `**日付**: ${date}\n`;
  article += `**カテゴリ**: ${category}\n`;
  article += `**言語**: ${language}\n\n`;
  
  if (englishContent) {
    article += `### English\n${englishContent}\n\n`;
  }
  
  if (japaneseContent) {
    article += `### 日本語\n${japaneseContent}\n\n`;
  }
  
  article += '---\n\n';
  
  // news.mdファイルを読み込み
  const newsPath = path.join(__dirname, '..', 'data', 'news.md');
  let newsContent = '';
  
  if (fs.existsSync(newsPath)) {
    newsContent = fs.readFileSync(newsPath, 'utf8');
  } else {
    newsContent = '# News & Updates\n\n';
  }
  
  // ヘッダーの後に新しい記事を挿入
  const lines = newsContent.split('\n');
  const headerIndex = lines.findIndex(line => line.startsWith('# News & Updates'));
  
  if (headerIndex !== -1) {
    lines.splice(headerIndex + 2, 0, article);
    newsContent = lines.join('\n');
  } else {
    newsContent = '# News & Updates\n\n' + article + newsContent;
  }
  
  fs.writeFileSync(newsPath, newsContent);
  console.log('\n✅ ニュース記事が正常に追加されました！');
  
  rl.close();
}

async function addPublication() {
  console.log('📚 新しい論文を追加します\n');
  
  const title = await question('論文タイトル: ');
  const authors = await question('著者 (カンマ区切り): ');
  const journal = await question('雑誌名: ');
  const volume = await question('巻号情報: ');
  const pages = await question('ページ番号: ');
  const doi = await question('DOI番号: ');
  const year = await question('発表年 (YYYY): ');
  const month = await question('発表月 (MM): ');
  const category = await question('カテゴリ (Journal Article/Conference Paper/Book Chapter/Preprint): ');
  const citations = await question('被引用数: ');
  
  const language = await question('言語 (英語のみ/日本語のみ/両方): ');
  
  let englishAbstract = '';
  let japaneseAbstract = '';
  
  if (language === '英語のみ' || language === '両方') {
    englishAbstract = await question('英語アブストラクト: ');
  }
  
  if (language === '日本語のみ' || language === '両方') {
    japaneseAbstract = await question('日本語概要: ');
  }
  
  let publication = `### ${title}\n`;
  publication += `**著者**: ${authors}\n`;
  publication += `**雑誌**: ${journal}\n`;
  publication += `**巻号**: ${volume}\n`;
  publication += `**ページ**: ${pages}\n`;
  publication += `**DOI**: ${doi}\n`;
  publication += `**日付**: ${year}年${month}月\n`;
  publication += `**カテゴリ**: ${category}\n`;
  publication += `**被引用数**: ${citations}\n\n`;
  
  if (englishAbstract) {
    publication += `#### Abstract (English)\n${englishAbstract}\n\n`;
  }
  
  if (japaneseAbstract) {
    publication += `#### 概要 (日本語)\n${japaneseAbstract}\n\n`;
  }
  
  publication += '---\n\n';
  
  // publications.mdファイルを読み込み
  const pubsPath = path.join(__dirname, '..', 'data', 'publications.md');
  let pubsContent = '';
  
  if (fs.existsSync(pubsPath)) {
    pubsContent = fs.readFileSync(pubsPath, 'utf8');
  } else {
    pubsContent = '# Publications\n\n';
  }
  
  // 該当年のセクションを探すか作成
  const lines = pubsContent.split('\n');
  const yearHeaderIndex = lines.findIndex(line => line === `## ${year}`);
  
  if (yearHeaderIndex !== -1) {
    // 既存の年のセクションに追加
    lines.splice(yearHeaderIndex + 2, 0, publication);
  } else {
    // 新しい年のセクションを作成
    const headerIndex = lines.findIndex(line => line.startsWith('# Publications'));
    if (headerIndex !== -1) {
      lines.splice(headerIndex + 2, 0, `## ${year}\n\n${publication}`);
    } else {
      pubsContent = `# Publications\n\n## ${year}\n\n${publication}` + pubsContent;
      fs.writeFileSync(pubsPath, pubsContent);
      console.log('\n✅ 論文が正常に追加されました！');
      rl.close();
      return;
    }
  }
  
  pubsContent = lines.join('\n');
  fs.writeFileSync(pubsPath, pubsContent);
  console.log('\n✅ 論文が正常に追加されました！');
  
  rl.close();
}

async function main() {
  console.log('🎓 Academic CV 記事追加ツール\n');
  console.log('1. ニュース記事を追加');
  console.log('2. 論文を追加\n');
  
  const choice = await question('選択してください (1 または 2): ');
  
  if (choice === '1') {
    await addNewsArticle();
  } else if (choice === '2') {
    await addPublication();
  } else {
    console.log('無効な選択です。');
    rl.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

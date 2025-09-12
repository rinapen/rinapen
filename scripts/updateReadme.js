const fs = require('fs');
const axios = require('axios');
require('dotenv').config();
// 暗号化されたメッセージ（Base64）
const secretMessage = Buffer.from('ぺろぺろぺろぺろぺろ。このREADMEを見てくれたのか...お前も鬼にならないか?', 'utf8').toString('base64');

// ASCII アート
const getAsciiArt = () => {
  const arts = [
    `    ╔═══════════════════════════════╗
    ║       ようこそ 俺の世界へ        ║
    ║                                   ║
    ║  プログラミング歴: 2022年10月〜     ║
    ║  出身地: 東京                     ║
    ║  現在: 飽きた                     ║
    ║                                   ║
    ║          一緒に作ろうよ            ║
    ╚═══════════════════════════════╝`,
    
    `    ┌───────────────────────────────┐
    │    開発者プロフィール              │
    ├───────────────────────────────┤
    │  名前: おれ                     │
    │  年齢: 18歳                     │
    │  場所: 東京                     │
    │  経験: 2年以上                  │
    │  状況: 夜職wwwwwww             │
    └───────────────────────────────┘`,
    
    `    ╭───────────────────────────────╮
    │      俺 の GitHub                │
    ├───────────────────────────────┤
    │  無駄なものばかり                │
    │  なんも考えてない               │
    │  なんも考えてない               │
    │  なんも考えてない               │
    ╰───────────────────────────────╯`
  ];
  
  return arts[Math.floor(Math.random() * arts.length)];
};

const getWeatherInfo = async () => {
  try {
    // OpenWeatherMap APIを使用（無料プラン）
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: 'Tokyo,JP',
          appid: process.env.WEATHER_API_KEY || 'demo', // 実際のAPIキーが必要
          units: 'metric',
          lang: 'ja'
        }
      });
      
      const weather = response.data;
      console.log(weather);
      const weatherText = getWeatherEmoji(weather.weather[0].main);
      return `${weatherText} ${weather.main.temp.toFixed(1)}°C | ${weather.weather[0].description}`;
  } catch (error) {
    return '天気は金なしだから表示できないでちゅ';
  }
};

// 天気に応じた表示
const getWeatherEmoji = (weather) => {
  const weatherText = {
    'Clear': '晴れ',
    'Clouds': '曇り',
    'Rain': '雨',
    'Snow': '雪',
    'Thunderstorm': '雷雨',
    'Drizzle': '霧雨',
    'Mist': '霧',
    'Fog': '霧'
  };
  return weatherText[weather] || '天気不明';
};

// 現在時刻を取得
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('ja-JP', { 
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// ランダムな愚痴を取得
const getRandomQuote = () => {
  const quotes = [
    'あつい...もう死にそう...',
    'つらい...プログラミングなんてやめたい...',
    '死にたい...でもまだ死ねない...',
    '眠い...夜勤きつい...',
    'お金ほしい...でも働きたくない...',
    'コード書くの飽きた...もう嫌だ...',
    '暑すぎて頭が働かない...',
    '今日も一日無駄だった...',
    '明日も仕事か...もう嫌だ...',
    'プログラミングなんてクソだ...',
    'なんでこんなに暑いんだ...',
    'クーラーつけてても汗が止まらない...',
    'もう何もしたくない...',
    '生きてるだけで精一杯...',
    '今日も生きててごめんなさい...',
    '俺はこれでいいや',
    '最初は動くコードを書け、後で美しくする',
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

// メイン実行関数
(async () => {
  const today = new Date();
  const currentDate = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentTime = getCurrentTime();

  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const daysLeft = Math.ceil((endOfYear - today) / (1000 * 60 * 60 * 24));
  
  const weatherInfo = await getWeatherInfo();
  const asciiArt = getAsciiArt();
  const randomQuote = getRandomQuote();

  const content = `\
<div align="center">

# tabemono の GitHub プロフィール

${asciiArt}

## ${currentDate} | ${currentTime}
**残り ${daysLeft} 日で今年が終わる... 早く終わってくれ** | ${weatherInfo}

---

## 自己紹介

- **居住地:** 東京、日本 もうすぐ大阪引っ越す 
- **年齢:** 18歳  
- **プログラミング開始:** 2022年10月から  
- **現在学習中:** うーん、、SNSのチートwwwww
- **興味分野:** Web開発、AI/ML、オープンソース
- **目標:** お金持ちになってニートになりたい！！！！！！

---

## 技術スタック

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![C](https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## GitHub 統計

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=xbkv&show_icons=true&theme=tokyonight&hide_border=true" alt="GitHub Stats" width="400"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=xbkv&layout=compact&theme=tokyonight&hide_border=true" alt="Top Languages" width="300"/>
</div>

---

## 今日の一言

${randomQuote}

---

## 隠しメッセージ

\`\`\`
${secretMessage}
\`\`\`
*ヒント: Base64デコードしろや！*

---

## 連絡先

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/xbkv)
[![X](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/arca_rina)

---

### 豆知識
このREADMEは毎日自動更新されるとおもう。多分、知らんけど

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=61DAFB&center=true&vCenter=true&width=435&lines=訪問ありがとう！;一緒に素晴らしいものを作ろう！;コーディングし続け、学び続けよう！" alt="Typing SVG" />
</div>

</div>
`;

  fs.writeFileSync('README.md', content);
})();

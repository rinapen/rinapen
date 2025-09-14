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
      │      俺 の GitHub              │
    ├───────────────────────────────┤
      │  無駄なものばかり              │
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
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=Rinapen&fontSize=50&fontAlign=50&fontAlignY=40&desc=Developer%20Profile&descAlign=50&descAlignY=55" alt="Header" />
</div>

<div align="center">

# りなぺんのGitHub

${asciiArt}

<table>
  <tr>
    <td align="center">
      <strong>${currentDate}</strong><br/>
      <sub>現在時刻: ${currentTime}</sub>
    </td>
    <td align="center">
      <strong>今年の残り日数</strong><br/>
      <sub>${daysLeft} 日で今年が終わる... 早く終わってくれ</sub>
    </td>
    <td align="center">
      <strong>現在の天気</strong><br/>
      <sub>${weatherInfo}</sub>
    </td>
  </tr>
</table>

---

## 自己紹介

<table>
  <tr>
    <td><strong>居住地</strong></td>
    <td>東京、日本 もうすぐ大阪引っ越す</td>
  </tr>
  <tr>
    <td><strong>年齢</strong></td>
    <td>18歳</td>
  </tr>
  <tr>
    <td><strong>プログラミング開始</strong></td>
    <td>2022年10月から</td>
  </tr>
  <tr>
    <td><strong>現在学習中</strong></td>
    <td>うーん、、SNSのチートwwwww</td>
  </tr>
  <tr>
    <td><strong>興味分野</strong></td>
    <td>Web開発、AI/ML、オープンソース</td>
  </tr>
  <tr>
    <td><strong>目標</strong></td>
    <td>お金持ちになってニートになりたい！！！！！</td>
  </tr>
</table>

---

## 技術スタック

<div align="center">

### プログラミング言語
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![C](https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white)
![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)

### フレームワーク・ツール
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

---

## GitHub 統計

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=rinapen&show_icons=true&theme=tokyonight&hide_border=true&include_all_commits=true&count_private=true" alt="GitHub Stats" width="450"/>
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=rinapen&layout=compact&theme=tokyonight&hide_border=true" alt="Top Languages" width="350"/>
</div>

<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=rinapen&theme=tokyonight&hide_border=true" alt="GitHub Streak" width="450"/>
</div>

---

## 今日の一言

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=3000&pause=1000&color=61DAFB&center=true&vCenter=true&width=500&lines=${encodeURIComponent(randomQuote)}" alt="Typing SVG" />
</div>

---

## 隠しメッセージ

<div align="center">
  <img src="https://img.shields.io/badge/Secret-Message-blue?style=for-the-badge" alt="Secret" />
</div>

\`\`\`text
${secretMessage}
\`\`\`

<div align="center">
  <sub><em>ヒント: Base64デコードしろや！</em></sub>
</div>

---

## 連絡先

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rinapen)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/arca_rina)

</div>

---

### 豆知識
<div align="center">
  <img src="https://img.shields.io/badge/README-自動更新-blue?style=for-the-badge" alt="Auto Update" />
  <br/>
  <sub>このREADMEは毎日自動更新されるとおもう。多分、知らんけど</sub>
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" alt="Footer" />
</div>

</div>
`;

  fs.writeFileSync('README.md', content);
})();

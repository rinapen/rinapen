const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

(async () => {
  const date = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${WEATHER_API_KEY}&units=metric`);
  const weather = weatherRes.data.weather[0].description;
  const temp = weatherRes.data.main.temp;

  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  const newsRes = await axios.get(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${NEWS_API_KEY}`);
  const topNews = newsRes.data.articles.slice(0, 3);

  const newsList = topNews.map(article => `- [${article.title}](${article.url})`).join('\n');

  const content = `
# 👋 Hi there, I'm Tabemono!

- 🎂 **Age:** 18  
- 🏡 **Location:** Tokyo, Japan  
- 💻 **Started Coding:** Since October 2022  
- 💬 I love coding, exploring new technologies, and automating things.  
- 🌟 Always curious and passionate about learning new skills.

---

# 🌍 Dynamic Updates

- 📅 **Current Date & Time:** ${date}  
- 🌤️ **Weather in Tokyo:** ${weather}, ${temp}°C  

---

# 📰 Latest News in Japan
${newsList}

---

_This README is automatically updated using **GitHub Actions**._
`;

  fs.writeFileSync('README.md', content);
})();

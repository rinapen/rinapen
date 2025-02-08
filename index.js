const fs = require('fs');

(() => {
  const today = new Date();
  const currentDate = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

  const endOfYear = new Date(today.getFullYear(), 11, 31); // 12月31日
  const daysLeft = Math.ceil((endOfYear - today) / (1000 * 60 * 60 * 24));

  const content = `
# 📅 ${currentDate}
**🎯 残り ${daysLeft} 日で今年が終わります！**

---

# 👋 Hi there, I'm Tabemono!

- 🏡 **Location:** Tokyo, Japan  
- 🎂 **Age:** 18  
- 💻 **Started Coding:** Since October 2022  

---

_This README is automatically updated using **GitHub Actions**._
`;

  fs.writeFileSync('README.md', content);
})();

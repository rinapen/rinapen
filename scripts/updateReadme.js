const fs = require('fs');
require('dotenv').config();

const getYearProgress = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
  const progress = ((now - start) / (end - start)) * 100;
  return progress.toFixed(2);
};

const generateProgressLine = (percentage, daysElapsed, totalDays, year, width = 30) => {
  const pct = Math.max(0, Math.min(percentage, 100));
  const units = Math.max(width - 1, 1);
  const filled = Math.min(units, Math.floor((pct / 100) * units));
  const remaining = Math.max(units - filled, 0);
  const bar = `${'='.repeat(filled)}>${'.'.repeat(remaining)}`;
  const safeDaysElapsed = Math.min(daysElapsed, totalDays);
  return `${year}: [${bar}] ${pct.toFixed(2)} %（${safeDaysElapsed}/${totalDays}）`;
};

(async () => {
  const today = new Date();
  const currentDate = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const yearProgress = parseFloat(getYearProgress());
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const startOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
  const dayMs = 1000 * 60 * 60 * 24;
  const totalDays = Math.round((startOfNextYear - startOfYear) / dayMs);
  const daysElapsed = Math.min(Math.round((today - startOfYear) / dayMs) + 1, totalDays);
  const progressLine = generateProgressLine(yearProgress, daysElapsed, totalDays, today.getFullYear());

  const content = `\
<pre>
┌──┤ whoami ├─────────▰▰▰
|
|-▣ R
|-▣ 18yo
|-▣ live in Osaka, Japan
|-▣ linden.classes_7e@icloud.com
|
└───────────────────────────────▰▰▰

${progressLine}
</pre>
<p align="center"> 
  <img alt="Top Langs" height="200px" src="https://github-readme-stats.vercel.app/api/top-langs/?username=rinapen&layout=donut&hide_border=true&show_icons=true&theme=tokyonight&bg_color=0d1117" />
  <img alt="github stats" height="200px" src="https://github-readme-stats.vercel.app/api?username=rinapen&theme=tokyonight&hide_border=true&show_icons=ture&bg_color=0d1117" />
</p>

<div align="center">

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![C](https://img.shields.io/badge/-C-A8B9CC?style=flat-square&logo=c&logoColor=black)
![C++](https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-005739?style=flat-square&logo=mongodb&logoColor=green)
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=rinapen&theme=onedark&show_icons=ture)](https://github.com/anuraghazra/github-readme-stats)
</div>

<div align="center">
  <sub>Updated daily via GitHub Actions | ${currentDate}</sub>
</div>
`;

  fs.writeFileSync('README.md', content);
})();

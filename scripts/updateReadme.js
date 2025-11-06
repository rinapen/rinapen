const fs = require('fs');
const axios = require('axios');
require('dotenv').config();
// 暗号化されたメッセージ（Base64）
const secretMessage = Buffer.from('継続的な学習と実践が、エンジニアとしての成長を支えます。', 'utf8').toString('base64');

// このコードはもう使用しません（モダンデザインに変更）

const getWeatherInfo = async () => {
  try {
    // OpenWeatherMap APIを使用（無料プラン）
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: 'Osaka,JP',
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
    return '天気情報を取得できませんでした';
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

// ランダムな豆知識を取得
const getRandomTip = () => {
  const tips = [
    'DRY原則：Don\'t Repeat Yourself - コードの重複を避けることで保守性が向上します',
    'SOLID原則を意識することで、拡張性の高い設計が実現できます',
    'コードレビューは品質向上だけでなく、知識共有の場としても重要です',
    'テスト駆動開発(TDD)により、バグを早期に発見し、リファクタリングが容易になります',
    'CI/CDパイプラインの導入で、デプロイメントの自動化と品質保証が実現します',
    'セマンティックバージョニングで依存関係の管理がより明確になります',
    'Gitのブランチ戦略を明確にすることで、チーム開発の効率が向上します',
    'コードの可読性は保守性に直結します。明確な命名規則を心がけましょう',
    'パフォーマンス最適化は計測から。推測ではなくプロファイリング結果を基に改善しましょう',
    'セキュリティは後付けではなく、設計段階から組み込むべき要素です',
    'ドキュメントはコードと同様に重要な成果物です。定期的な更新を心がけましょう',
    'モジュール化により、コードの再利用性とテストの容易性が向上します',
    'エラーハンドリングを適切に実装することで、システムの堅牢性が高まります',
    '技術的負債は早期に返済することで、長期的な開発速度を維持できます',
    'ペアプログラミングは知識共有と品質向上に効果的な手法です',
    'コードの複雑度を低く保つことで、バグの混入を防ぎ保守性が向上します',
    'APIの設計ではRESTful原則やGraphQLのベストプラクティスに従いましょう',
    'データベース設計では正規化と非正規化のバランスを考慮することが重要です',
    'マイクロサービスアーキテクチャは、スケーラビリティと独立したデプロイを可能にします',
    'キャッシュ戦略を適切に実装することで、システムのレスポンス速度が大幅に向上します',
    'ログは問題解決の鍵です。適切なレベルと情報量を心がけましょう',
    'コンテナ化により、環境の一貫性と移植性が向上します',
    'Infrastructure as Codeで、インフラ管理の自動化と再現性が実現します',
    '定期的なリファクタリングで、コードベースの健全性を維持できます',
    'アジャイル開発では、継続的なフィードバックと改善が成功の鍵です',
    'コードメトリクスを定期的に確認し、品質の傾向を把握しましょう',
    'デザインパターンは問題解決の共通言語です。適切に活用しましょう',
    'APIのバージョニング戦略は、後方互換性の維持に重要です',
    'モニタリングとアラートにより、問題の早期発見と迅速な対応が可能になります',
    '依存関係の定期的な更新で、セキュリティリスクを低減できます',
    'コードカバレッジは品質の指標の一つですが、100%が目標ではありません',
    '関心の分離により、コードの理解と保守が容易になります',
    'イミュータブルなデータ構造は、バグの防止と並行処理の安全性に寄与します',
    'エッジケースのテストを忘れずに。本番環境で予期しない動作を防げます',
    'コードフォーマッターの導入で、スタイルの議論に時間を費やさず開発に集中できます',
    '静的解析ツールは、潜在的なバグを早期に発見する強力な味方です',
    'プログレッシブエンハンスメントにより、幅広いユーザーに対応できます',
    'Webアクセシビリティは、すべてのユーザーのための必須要件です',
    'レスポンシブデザインで、多様なデバイスに対応したUXを提供しましょう',
    '非同期処理を適切に実装し、UIのブロッキングを避けましょう',
    'サーバーサイドレンダリングとクライアントサイドレンダリングの使い分けが重要です',
    'Webパフォーマンスの最適化は、ユーザー体験とSEOに直結します',
    'データベースインデックスの適切な設計で、クエリパフォーマンスが劇的に向上します',
    'N+1問題を避けるため、ORMの動作を理解し適切にクエリを最適化しましょう',
    'トランザクション管理により、データの一貫性と整合性を保証できます',
    'バックアップ戦略は災害復旧の要です。定期的なテストも忘れずに',
    'スケーリング戦略は、垂直と水平の両方を検討しましょう',
    'セキュアコーディング規約に従い、一般的な脆弱性を防ぎましょう',
    '最小権限の原則により、セキュリティリスクを最小化できます',
    '暗号化は保存時と転送時の両方で実装することが重要です',
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};

// メイン実行関数
(async () => {
  const today = new Date();
  const currentDate = today.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentTime = getCurrentTime();

  const endOfYear = new Date(today.getFullYear(), 11, 31);
  const daysLeft = Math.ceil((endOfYear - today) / (1000 * 60 * 60 * 24));
  
  const weatherInfo = await getWeatherInfo();
  const randomTip = getRandomTip();

  const content = `\
<div align="center">

# 👨‍💻 Rinapen

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=61DAFB&center=true&vCenter=true&width=600&lines=Full-Stack+Developer;Open+Source+Enthusiast;Continuous+Learner" alt="Typing SVG" />

[![Profile Views](https://komarev.com/ghpvc/?username=rinapen&color=61dafb&style=flat-square&label=Profile+Views)](https://github.com/rinapen)
![Location](https://img.shields.io/badge/📍_大阪,_日本-black?style=flat-square)
![Experience](https://img.shields.io/badge/💼_4年以上-black?style=flat-square)
![Status](https://img.shields.io/badge/🚀_Learning-black?style=flat-square)

</div>

## 📊 GitHub Stats

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=rinapen&show_icons=true&theme=tokyonight&hide_border=true&include_all_commits=true&count_private=true&rank_icon=github&bg_color=0d1117" alt="GitHub Stats"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=rinapen&layout=compact&theme=tokyonight&hide_border=true&langs_count=8&bg_color=0d1117" alt="Top Languages"/>
</div>

<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=rinapen&theme=tokyonight&hide_border=true&background=0d1117" alt="GitHub Streak"/>
</div>

## 🛠️ Tech Stack

<div align="center">

![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![C](https://img.shields.io/badge/-C-A8B9CC?style=flat-square&logo=c&logoColor=black)
![C++](https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Git](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)

</div>

## 💡 Daily Tech Tip

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&duration=4000&pause=1000&color=61DAFB&center=true&vCenter=true&width=900&height=60&lines=${encodeURIComponent(randomTip)}" alt="Tech Tip" />
</div>

## 📫 Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github)](https://github.com/rinapen)
[![X](https://img.shields.io/badge/-X-000000?style=flat-square&logo=x)](https://x.com/arca_rina)

</div>

<div align="center">
  <sub>⚡ Updated daily via GitHub Actions | ${currentDate}</sub>
</div>
`;

  fs.writeFileSync('README.md', content);
})();

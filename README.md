# YT Analysis - YouTube Channel Analytics App

<p style="text-align: center;">
  <img src="./assets/icon.png" alt="YT Analysis Logo" width="80" />
</p>

<div style="display: flex; justify-content: center; align-items: center;">
  <img src="./assets/Frame 1.png" alt="AI Chat" width="300" style="margin: 10px;"/>
  <img src="./assets/Frame 2.png" alt="AI Chat" width="300" style="margin: 10px;"/>
  <img src="./assets/Frame 3.png" alt="AI Chat" width="300" style="margin: 10px;"/>
</div>


YT Analysis is a powerful mobile application that provides comprehensive analytics and insights for YouTube channels. Built with React Native and Expo, it offers an intuitive interface to analyze channel performance, video metrics, and audience engagement.

## Features

### 1. Instant Channel Analysis

- Enter any YouTube channel URL to get immediate insights
- View detailed subscriber counts, video views, and engagement metrics
- Track channel growth and performance statistics

### 2. Video Analytics

- Comprehensive video performance metrics
- View likes, comments, and engagement rates
- Access video descriptions and transcripts
- AI-powered video summaries and topic extraction


### 3. Interactive AI Chat Assistant

- Natural language conversations about any video
- Get instant insights and answers about content
- AI-powered analysis of video context and themes


### 4. Comment Analysis

- Fetch and analyze video comments
- View engagement metrics for comments
- Track audience sentiment and interactions

### 5. Detailed Statistics

- Real-time subscriber counts
- Video view analytics
- Engagement metrics tracking
- Historical performance data

## Technical Stack

- **Frontend Framework**: React Native with Expo
- **State Management**: React Query
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS (NativeWind)
- **Analytics**: Custom YouTube Data API integration

## Getting Started

1. Clone the repository:
   `bash
git clone [https://github.com/Sahil2720kumar/youtube-analyis](https://github.com/Sahil2720kumar/youtube-analyis)
`

`
cd yt-analysis
`

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
 .env
```

Edit `.env` with your API keys and configuration.

4. Start the development server:

```bash
npx expo start
```

## Project Structure

```
└── 📁YT_Analysis
    └── 📁app
        └── _layout.tsx
        └── +html.tsx
        └── +not-found.tsx
        └── 📁channel
            └── [channel_id].tsx
            └── 📁videos
                └── [video_id].tsx
                └── 📁comments
                    └── index.tsx
                └── index.tsx
        └── index.tsx
        └── 📁job
            └── [snapshotId].tsx
    └── 📁assets
        └── adaptive-icon.png
        └── favicon.png
        └── Frame 1.png
        └── Frame 2.png
        └── Frame 3.png
        └── icon.png
        └── 📁json
            └── youtubeAnimation.json
        └── splash.png
        └── splashTest.png
    └── 📁components
        └── AnimatedSplashScreen.tsx
        └── Button.tsx
        └── Container.tsx
        └── EditScreenInfo.tsx
        └── ScreenContent.tsx
        └── VideoAnalysisButton.tsx
    └── 📁lib
        └── supabase.ts
    └── 📁store
        └── store.ts
    └── 📁supabase
        └── .gitignore
        └── 📁.temp
            └── cli-latest
            └── gotrue-version
            └── pooler-url
            └── postgres-version
            └── project-ref
            └── rest-version
            └── storage-version
        └── config.toml
        └── 📁functions
            └── .env
            └── 📁ai_chat_bot
                └── .npmrc
                └── deno.json
                └── index.ts
            └── 📁ai_video_analysis
                └── .npmrc
                └── deno.json
                └── index.ts
            └── 📁trigger_collection_api
                └── .npmrc
                └── deno.json
                └── index.ts
            └── 📁trigger_collection_webhook
                └── .npmrc
                └── deno.json
                └── index.ts
        └── 📁migrations
            └── 20250225131229_remote_schema.sql
    └── 📁utils
        └── constants.ts
        └── formatNumber.ts
    └── .env
    └── .gitignore
    └── app-env.d.ts
    └── app.json
    └── babel.config.js
    └── cesconfig.json
    └── eas.json
    └── expo-env.d.ts
    └── global.css
    └── metro.config.js
    └── nativewind-env.d.ts
    └── package-lock.json
    └── package.json
    └── prettier.config.js
    └── README.md
    └── tailwind.config.js
    └── tsconfig.json
```


<!-- ## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- YouTube Data API
- Expo Team
- React Native Community
- Supabase Team

## Support

For support, email support@ytanalysis.com or join our Discord community.

<p align="center">
  <a href="https://discord.gg/ytanalysis">
    <img src="./assets/images/discord-badge.png" alt="Join Discord" width="150"/>
  </a>
</p> -->

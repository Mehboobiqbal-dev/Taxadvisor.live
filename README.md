# 🧾 TaxAdvisor — AI-powered US tax calculator & assistant

An all-in-one US tax web app: a step-by-step **tax calculator**, an **AI tax chatbot (SmartTaxBot, powered by Google Gemini)**, real-time **tax news**, and an auto-generated **tax blog**. Built with **Next.js, React, MongoDB, NextAuth and Socket.IO**.

**Live demo:** https://usa-tax-advisor.vercel.app

## ✨ Features

- 🧮 **Tax calculator**: multi-step flow covering filing status & income, deductions, credits and state, then shows your results
- 🤖 **SmartTaxBot**: an AI tax assistant built on the Google Gemini API
- 💬 **Real-time chat** with Socket.IO
- 📰 **Live tax news** from RSS / Google News feeds
- ✍️ **AI blog posts**: a cron job generates tax articles with Gemini; posts are written in Markdown/MDX
- 🔐 **Auth**: email sign-up with reCAPTCHA, plus Google and GitHub sign-in via NextAuth
- 📊 Charts with Chart.js / Recharts, SEO, sitemap and RSS feed
- 🎨 UI with Tailwind CSS, MUI and Radix UI

## 🧱 Tech stack

| Layer | Tools |
|---|---|
| Frontend | Next.js, React, Tailwind CSS, MUI, Radix UI, Framer Motion |
| Backend | Next.js API routes, GraphQL (Apollo), Socket.IO, node-cron |
| Data & Auth | MongoDB / Mongoose, NextAuth, Firebase Admin |
| AI | Google Gemini (`@google/generative-ai`) |

## 🚀 Getting started

```bash
git clone https://github.com/Mehboobiqbal-dev/Taxadvisor.live.git
cd Taxadvisor.live
npm install
# create .env.local (see below)
npm run dev
```

Open http://localhost:3000.

### Environment variables

```
MONGODB_URI=
NEXTAUTH_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
GEMINI_API_KEY=
NEWS_API_KEY=
RECAPTCHA_SECRET_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

> Never commit real keys. Keep them in `.env.local` or your hosting provider's environment settings.

## ⚠️ Disclaimer

TaxAdvisor gives general information and estimates only. It is not professional tax, legal or financial advice.

## 🤝 Contributing

Issues and pull requests are welcome.

---

Made by [Mehboob Iqbal](https://github.com/Mehboobiqbal-dev). If you find it useful, please ⭐ the repo!

<div align="center">

# ⚡ SolPrep

### Senior Solana Smart Contract Developer Interview Preparation Platform

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_SolPrep-6366F1?style=for-the-badge)](https://upendra-eth.github.io/sol-prep/)
[![GitHub Stars](https://img.shields.io/github/stars/upendra-eth/sol-prep?style=for-the-badge&color=F59E0B)](https://github.com/upendra-eth/sol-prep/stargazers)
[![License](https://img.shields.io/badge/License-MIT-14F195?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-EC4899?style=for-the-badge)](https://github.com/upendra-eth/sol-prep/pulls)

<br />

**Master Solana development. Ace your interview. Land the job.**

A free, open-source, zero-dependency platform to prepare for senior-level Solana smart contract developer interviews — with structured courses, 30+ interview questions, hands-on coding labs, mock interviews, and revision tools.

<br />

[**🚀 Launch SolPrep →**](https://upendra-eth.github.io/sol-prep/)

<br />

<img src="https://img.shields.io/badge/Solana-14F195?style=flat&logo=solana&logoColor=white" alt="Solana" />
<img src="https://img.shields.io/badge/Rust-000000?style=flat&logo=rust&logoColor=white" alt="Rust" />
<img src="https://img.shields.io/badge/Anchor-9945FF?style=flat&logoColor=white" alt="Anchor" />
<img src="https://img.shields.io/badge/Web3-6366F1?style=flat&logoColor=white" alt="Web3" />

</div>

---

## 🎯 What is SolPrep?

SolPrep is a **production-grade, single-page application** that transforms deep Solana research into an interactive learning and interview prep experience. It's designed for developers targeting **senior-level positions** at top Web3 companies.

> **No login. No backend. No tracking. Just learn.**

Your progress is saved locally in your browser — start learning instantly.

---

## ✨ Features

### 📚 Structured Course — 6 Modules
Beginner → Advanced → Senior progression covering everything you need:

| Module | Topics | Level |
|--------|--------|-------|
| ⚡ Solana Fundamentals | PoH, Sealevel, Account Model, Rent, Gulf Stream | Beginner → Mid |
| 🦀 Rust for Solana | Ownership, Lifetimes, Error Handling, Traits | Beginner → Mid |
| ⚓ Anchor Framework | Macros, PDAs, CPI, Dynamic Accounts, IDL | Mid → Advanced |
| 🛡️ Smart Contract Security | Revival Attacks, CPI Depth, Integer Overflow, Confused Deputy | Advanced |
| 🏛️ System Design | Prediction Markets, Sharding, Off-chain Indexing | Senior |
| 🔬 Advanced Topics | MEV & Jito Bundles, Firedancer, ZK Compression | Senior |

### ✏️ Practice System — 30+ Interview Questions
- Categorized by **module** and **difficulty** (Easy → Senior)
- Expandable answers with **code examples** and **common mistakes**
- 🔍 Full-text search and multi-filter support
- 🔖 Bookmark system for quick revision
- ✅ Completion tracking

### 💻 Coding Lab — 6 Hands-On Challenges
| Challenge | Difficulty |
|-----------|-----------|
| Escrow Program | Senior |
| PDA Counter | Easy |
| Token Minting CPI | Medium |
| Debug: Seed Mismatch | Medium |
| Prevent Revival Attack | Hard |
| Compute Optimization | Hard |

Each challenge includes: starter code, progressive hints, full solution, and step-by-step walkthrough.

### 🔄 Revision System
- **16 Flashcards** — Click to flip, navigate with prev/next
- **5 Cheat Sheets** — Anchor constraints, Solana limits, Rust quick ref, PDA patterns, Security checklist
- **Last Day Guide** — Core concepts, security must-knows, behavioral prep tips

### 🎯 Mock Interview Engine — 3 Timed Rounds
| Round | Duration | Focus |
|-------|----------|-------|
| DSA + Rust | 30 min | Ownership, lifetimes, algorithms |
| Solana Deep Dive | 45 min | Architecture, Anchor, security |
| System Design | 45 min | Protocol architecture, scalability |

Real-time countdown timer, submit → compare with ideal answers, follow-up questions, and scoring.

### 🏗️ Project Builder — 3 Senior-Level Portfolios
- **DeFi**: Concentrated Liquidity AMM (CLAMM)
- **NFT**: ZK-Compressed Marketplace
- **DAO**: Time-Locked Governance Architecture

Each includes: account hierarchy, key challenges, and interview talking points.

---

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Just visit: **[https://upendra-eth.github.io/sol-prep/](https://upendra-eth.github.io/sol-prep/)**

### Option 2: Run Locally
```bash
# Clone the repo
git clone https://github.com/upendra-eth/sol-prep.git
cd sol-prep

# Open in browser (no build step needed!)
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

That's it. **No npm, no node, no dependencies.** Just a browser.

---

## 🏗️ Architecture

```
sol-prep/
├── index.html     # HTML shell + full CSS design system
├── data.js        # All content (modules, questions, challenges, flashcards)
├── app.js         # SPA engine (routing, state, rendering)
└── README.md      # You are here
```

### Design Decisions
- **Zero dependencies** — No React, no frameworks, no build tools
- **IIFE architecture** — Clean module pattern, no global pollution
- **localStorage persistence** — Progress saved automatically, no registration
- **Glassmorphism UI** — Modern, premium design with warm pearl aesthetic
- **Static deployment** — Works on GitHub Pages, Netlify, Vercel, or any static host

---

## 🤝 Contributing

**We'd love your help making SolPrep even better!** Here's how you can contribute:

### 📝 Content Contributions
- **Add interview questions** — Share real questions from your interviews
- **Improve answers** — Make explanations clearer or more accurate
- **Add coding challenges** — Create new hands-on exercises
- **Update for 2026+** — Keep content current with Solana ecosystem changes

### 🎨 Feature Ideas
- [ ] Spaced repetition for flashcards
- [ ] Dark mode toggle
- [ ] Export progress as PDF
- [ ] Community question voting
- [ ] Interview experience stories
- [ ] More coding challenges (Token-2022, Blinks, ZK)

### How to Contribute
1. **⭐ Star this repo** — It helps others discover SolPrep
2. **🍴 Fork** the repository
3. **📝 Make your changes** (add questions, fix bugs, improve UI)
4. **🔀 Submit a Pull Request** with a clear description

```bash
# Fork → Clone → Branch → Code → Push → PR
git clone https://github.com/YOUR_USERNAME/sol-prep.git
cd sol-prep
git checkout -b feature/your-feature-name
# Make your changes...
git commit -m "feat: add new security question about token-2022"
git push origin feature/your-feature-name
# Open a PR on GitHub
```

> **First time contributing to open source?** This is a great project to start with! The codebase is small (3 files) and well-structured.

---

## 🌟 Show Your Support

If SolPrep helped you prepare for your interview, please consider:

- ⭐ **Star this repository** — Takes 1 second, means a lot
- 🔗 **Share with friends** — Help other Solana developers
- 🐛 **Report bugs** — Open an issue if something doesn't work
- 💡 **Suggest features** — We read every suggestion
- 📢 **Spread the word** — Tweet about it, share in Discord servers

---

## 📊 Content Coverage

| Topic Area | Questions | Concepts | Challenges |
|-----------|-----------|----------|------------|
| Solana Fundamentals | 7 | 5 | — |
| Rust for Solana | 6 | 4 | — |
| Anchor Framework | 4 | 4 | 3 |
| Security | 6 | 5 | 2 |
| System Design | 3 | 3 | — |
| Advanced Topics | 4 | 3 | 1 |
| **Total** | **30** | **24** | **6** |

Plus: **16 flashcards**, **5 cheat sheets**, **12 mock interview questions**, **3 project architecture guides**.

---

## 📜 License

This project is open source under the [MIT License](LICENSE). Use it, modify it, share it.

---

<div align="center">

**Built with ⚡ by [Upendra](https://github.com/upendra-eth)**

If you found this helpful, drop a ⭐ on [GitHub](https://github.com/upendra-eth/sol-prep)

</div>

# Benefit — blog

Source for **https://blog.blevin.cc**, a Jekyll site hosted free on GitHub Pages with an automatically renewed Let's Encrypt HTTPS certificate.

Sections: **Life Lessons · Cyber Security · Information Technology · Finance · Other**

---

## ✍️ Writing a post

You can write a post in any of three ways. Pick whichever suits you.

### 1. Visual editor (easiest)

1. Go to **https://blog.blevin.cc/admin/**
2. The first time, choose **Sign In Using Access Token** and paste a GitHub token:
   - Create one at <https://github.com/settings/personal-access-tokens/new> (fine-grained)
   - Repository access: **Only select repositories → Benefit00.github.io**
   - Permissions: **Contents → Read and write**
   - The browser remembers it, so you only do this once per device.
3. Click **Posts → New Post**, pick a **Section**, write, add a cover image if you like, and hit **Publish**.

The post is committed to GitHub and goes live about a minute later.

### 2. On GitHub.com

Open [`_posts`](https://github.com/Benefit00/Benefit00.github.io/tree/master/_posts) → **Add file → Create new file**, name it `YYYY-MM-DD-my-title.md`, and start it with:

```yaml
---
title: "My post title"
date: 2026-11-22 09:00:00 +0200
categories: [cyber-security]     # life-lessons | cyber-security | it | finance | other
description: "One or two sentences shown on cards and in Google."
tags: [phishing, awareness]
# image: /images/posts/cover.jpg   # optional, about 1600×700
---

Your post in Markdown…
```

### 3. From your computer

```bash
./scripts/new-post.sh "My post title" cyber-security
```

This creates the file in `_posts/` with the right name and front matter. Write it, then commit and push.

**Tips:** use `##` for headings, and fenced code blocks with a language (e.g. ```` ```powershell ````) for syntax highlighting. Images go in `images/posts/`. Posts dated in the future won't appear until that date.

---

## 🧩 Show the latest posts on the company website

Paste this into any page:

```html
<div data-benefit-blog data-limit="3"></div>
<script src="https://blog.blevin.cc/embed.js" async></script>
```

It shows the newest posts as cards, updates by itself when you publish, and its styling is kept separate so it can't clash with the company site's. For options (filter by section, list layout, dark/light) and a live preview, see **https://blog.blevin.cc/embed/**.

There's also an RSS feed at `/feed.xml` and a JSON feed at `/feed.json`.

---

## 🔒 Domain & HTTPS (Let's Encrypt, auto-renewing)

GitHub Pages requests and **renews the Let's Encrypt certificate automatically**. All it needs is DNS pointing at GitHub. You set it up once:

1. **Cloudflare → blevin.cc → DNS → Add record**
   | Type | Name | Target | Proxy status |
   |---|---|---|---|
   | `CNAME` | `blog` | `benefit00.github.io` | **DNS only (grey cloud)** |

   ⚠️ Keep the cloud **grey**. With Cloudflare's orange-cloud proxy turned on, GitHub can't complete the Let's Encrypt check, so the certificate won't be issued or renewed.
2. If you ever add **CAA** records to blevin.cc, include `0 issue "letsencrypt.org"`.
3. **GitHub → repo Settings → Pages**: the custom domain should read `blog.blevin.cc` (taken from the `CNAME` file). Once the DNS check passes and the certificate is ready (usually under 30 minutes, at most 24 hours), tick **Enforce HTTPS**.
4. Optional but recommended: verify the domain at **GitHub → your profile Settings → Pages → Add a domain** so no one else can claim it.

After that there's nothing to maintain: GitHub renews the certificate before it expires, for as long as the DNS record stays in place.

---

## 🛠 Running it locally (optional)

```bash
bundle install && bundle exec jekyll serve
```

Then open <http://localhost:4000>. The Gemfile uses the `github-pages` gem so your build matches GitHub's. Use Ruby 3.x and a UTF-8 locale (`export LANG=en_US.UTF-8`).

## 🗂 Where things live

| Path | What it is |
|---|---|
| `_config.yml` | Site title, author, links, company URL |
| `_data/sections.yml` | The five sections: names, blurbs, colours |
| `_data/navigation.yml` | Extra header links |
| `_posts/` | Blog posts |
| `_layouts/`, `_includes/` | HTML templates |
| `assets/css/main.scss` | All styling (colours/fonts are at the top) |
| `admin/` | Visual editor (Sveltia CMS) |
| `embed.js`, `feed.json` | Company-website widget and its data |
| `game/` | Cyber Defense educational games |

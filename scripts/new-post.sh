#!/usr/bin/env bash
# Create a new post with the right file name and front matter.
#   ./scripts/new-post.sh "My post title" cyber-security
# Sections: life-lessons | cyber-security | it | finance | other
set -euo pipefail
title="${1:?Usage: $0 \"Post title\" [section]}"
section="${2:-other}"
case "$section" in life-lessons|cyber-security|it|finance|other) ;; *)
  echo "Unknown section '$section'. Use: life-lessons, cyber-security, it, finance, other" >&2; exit 1;; esac
slug=$(printf '%s' "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
file="$(dirname "$0")/../_posts/$(date +%Y-%m-%d)-$slug.md"
[ -e "$file" ] && { echo "Already exists: $file" >&2; exit 1; }
cat > "$file" <<POST
---
title: "$title"
date: $(date '+%Y-%m-%d %H:%M:%S %z')
categories: [$section]
description: "One or two sentences that sum up the post — shown on cards and in Google."
tags: []
# image: /images/posts/your-cover.jpg   # optional, ~1600x700
---

Start writing here. Use ## for section headings.
POST
echo "Created $file"

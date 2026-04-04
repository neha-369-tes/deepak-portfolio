#!/bin/bash

# Git commit script for auto-scroll functionality

cd /vercel/share/v0-project

# Add the changes
git add src/components/Skills.jsx src/components/Skills.css

# Commit with message
git commit -m "Add continuous auto-scroll to expertise skill cards with pause on interaction

- Implement auto-scroll animation that continuously scrolls skill cards
- Pause scrolling when user interacts (touch/click/drag)
- Resume scrolling automatically after 3 seconds of inactivity
- Smooth scroll behavior for better UX
- Works on both desktop and mobile"

# Push to the branch
git push origin v0/neha-369-tes-48154d87

echo "Changes committed and pushed successfully!"

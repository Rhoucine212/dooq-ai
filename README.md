# Dooq AI

Dooq AI is a WhatsApp-first food recommendation assistant focused initially on Moroccan Darija.

## MVP goals
- Understand food preferences from text or voice
- Build a dynamic taste profile
- Avoid repeating questions already answered
- Filter dishes by allergies before ranking
- Rank nearby dishes by taste, budget, cuisine, distance, and feedback
- Return 3 concise WhatsApp recommendations at a time

## Core flow
WhatsApp → Webhook → AI Parser → Taste Profile → Matching Engine → Restaurant/Dish Database → Top 3 Results → WhatsApp

## Current scope
The first version targets Casablanca and a curated restaurant/menu dataset rather than broad unverified coverage.

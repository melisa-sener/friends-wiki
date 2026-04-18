# Friends Wiki

A simple React + Vite project inspired by the TV show *Friends*.

This app lets users explore characters, episodes, seasons, and locations from the show through a warm editorial-style interface. It uses the TVmaze API for show, cast, episode, and person data, and mixes that with a small amount of local curated content for character and location presentation.

## Features

- Browse the main cast of *Friends*
- Open character detail pages
- Search and filter episodes
- Explore seasons and episode detail pages
- View iconic show locations

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- TVmaze API
- Vercel

## Live Demo

This project is deployed on Vercel:

- https://friends-wiki-nu.vercel.app/

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at the local Vite URL shown in the terminal.

## Project Structure

```text
src/
  components/   reusable UI pieces
  data/         local curated data
  pages/        route pages
  services/     API helpers
  hooks/        custom React hooks
```

## Routes

- `/` home page
- `/characters` cast page
- `/characters/:personId` character detail page
- `/episodes` episodes page
- `/episodes/:episodeId` episode detail page
- `/seasons` seasons page
- `/seasons/:seasonId` season detail page
- `/locations` locations page

## Notes

- API requests are handled through `src/services/tvmaze.js`.
- Some character descriptions and location content are stored locally in `src/data/`.
- Deployment is handled through Vercel.

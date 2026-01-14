---
title: Hello World  
timestamp: 2025-12-25 00:00:00+00:00  
series: "Tinkering"  
tags: [Edgeone, Astro]  
description: The first post of this site, mainly introducing how to build a simple blog using the Thought Lite theme.  
---

Welcome to my blog!

After half a day of tinkering, I’ve finally managed to set up this blog 😭

This blog is built using the [Astro](https://astro.build/) framework and the [Thought Lite](https://github.com/tuyuritio/astro-theme-thought-lite) theme.

It is deployed via EdgeOne Pages.

The general process is as follows:

### Clone the repository

Log into your GitHub account, open [tuyuritio/astro-theme-thought-lite](https://github.com/tuyuritio/astro-theme-thought-lite), and click the Fork button in the upper right corner to clone the repository to your own account.

Copy the repository address, open a terminal, and use the `git clone` command to clone it locally.

### Install dependencies

Open a terminal in the project directory.

```sh
pnpm install
```

### Local development commands

| Command      | Action                                      |
| ------------ | ------------------------------------------- |
| pnpm i       | Install dependencies                        |
| pnpm dev     | Start the local dev server at localhost:4321 |
| pnpm build   | Build your production site to ./dist/       |
| pnpm preview | Preview your build locally before deploying |
| pnpm format  | Format code with Prettier                   |

### Configuration

Thought Lite’s configuration is stored in `site.config.ts`.

Below is an example configuration for Thought Lite:

```typescript
- `title` - Site title
- `prologue` - Homepage tagline, supports `\n` for line breaks
- `author`
    - **string** - Author name
    - **object**
        - `name` - Author name
        - `email` - Author email
        - `link` - Author’s personal website
- `description` - Site description
- `copyright` - Copyright information
    - `type` - CC license type
    - `year` - Copyright year or year range
- `feed` - Feed settings
    - `section` - Content sections to include in the feed
        - **`*`** - All sections
        - **array**
            - `note` - Notes section
            - `jotting` - Jottings section
    - `limit` - Limit on the number of items
- `latest` - Display latest content
    - `note` - Whether to show latest notes
    - `jotting` - Whether to show latest jottings
```

### EdgeOne Pages Deployment

In the EdgeOne Pages interface, select “Import GitHub Repository” and choose the previously forked Thought Lite template repository.

EdgeOne will automatically recognize the project as Astro for the remaining configuration. Simply click “Start Deployment” and you’re good to go! ✅

Once deployment is complete, you can enter the Pages management page to configure features like custom domain binding.
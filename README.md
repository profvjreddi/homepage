# profvjreddi.github.io

This repository serves as the root GitHub Pages site for `profvjreddi.github.io` and handles custom domain redirection.

## Purpose

This repository redirects visitors from:
- `https://profvjreddi.github.io` → `https://profvjreddi.github.io/Homepage/`
- `https://vijay.seas.harvard.edu` → `https://profvjreddi.github.io/Homepage/`

## Setup

The main website content is hosted in the [Homepage](https://github.com/profvjreddi/Homepage) repository, which deploys to `profvjreddi.github.io/Homepage/`.

This root repository contains:
- `index.html` - Redirect page with multiple fallback methods
- `CNAME` - Custom domain configuration for `vijay.seas.harvard.edu`

## Custom Domain Configuration

The CNAME record `vijay.seas.harvard.edu` points to `profvjreddi.github.io` (configured by Harvard SEAS IT).

## Deployment

Simply push changes to the `main` branch and GitHub Pages will automatically deploy.

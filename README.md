# BayamSell E-commerce Platform

BayamSell is a lightweight starter marketplace with:

- **Marketplace storefront** for customers
- **Seller Admin dashboard** to create/manage products
- **Super Admin dashboard** for moderation + owner analytics

## What is included

- Role-based views in one app (Marketplace / Seller / Super Admin)
- Product listing workflow: `pending`, `active`, `blocked`
- Owner controls to approve or block listings
- Browser `localStorage` persistence (no backend required for demo)

## Run locally

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Local web server (recommended)

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

## Publish (GitHub Pages)

I configured automated publishing through GitHub Actions.

### Steps

1. Push this branch to your GitHub repository.
2. Open your repo settings: **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Merge this branch to `main` (or `master`) or run the workflow manually from **Actions**.
5. After deployment, GitHub will give you a live URL such as:
   - `https://<your-username>.github.io/<your-repo>/`

Workflow file: `.github/workflows/deploy-pages.yml`

## Production next steps

- Add authentication + role-based access control
- Add backend APIs + database
- Add cart / checkout / payments
- Add seller onboarding and commission logic
- Add audit logs and analytics exports

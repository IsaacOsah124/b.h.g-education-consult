# Deployment Plan — B.H.G Education Consult

**Project:** By His Grace Education Consult Website  
**Stack:** React 19 + Vite + TypeScript + Tailwind CSS v4  
**Target:** Vercel (via GitHub)  
**Prepared:** 2026-06-04  
**Status:** Ready for approval — one path fix required before build will pass

---

## 1. What This App Is

**By His Grace (B.H.G) Education Consult** is a professional, client-facing website for a Ghanaian educational consultancy based in Greater Accra. It is a **React SPA (Single-Page Application)** with four pages:

| Route | Page |
|---|---|
| `/` | Home — Hero, About, Services overview, Contact |
| `/service/bece` | BECE Private Registration form |
| `/service/home-tuition` | Home Tuition Request form |
| `/service/online-tuition` | Online Virtual Classroom Registration form |

**Design:** Navy + Gold luxury aesthetic using Playfair Display (serif) + Inter (sans-serif) from Google Fonts. Animations via Motion. Icons via Lucide React.

**Forms:** All three service forms collect student details and show a "Your application is under review" confirmation on submit. They are **client-side only** — no data is sent to a server or database. Contact information (phone: 0205103678 / 0555284520, email: bhgeduconsult7@gmail.com) is displayed statically.

**No backend, no database, no payment gateway, no auth system.**

---

## 2. Source Code Status

| File | Status |
|---|---|
| `App.tsx` | Present — complete, 4 pages + navbar + footer |
| `index.css` | Present — Tailwind v4 + Google Fonts + brand theme |
| `main.tsx` | Present — React root entry point |
| `index.html` | Present — HTML shell |
| `vite.config.ts` | Present — Vite + React + Tailwind plugins |
| `package.json` | Present — all dependencies declared |
| `deployment.md` | Present — this file |

All source files are present. However, there are **two issues to resolve before the build will pass** (see Section 3).

---

## 3. Blockers — Must Fix Before Deployment

### Blocker 1 — Path Mismatch in index.html (Critical)

`index.html` currently references:
```html
<script type="module" src="/src/main.tsx"></script>
```

But `main.tsx` lives at the **repository root**, not inside a `src/` folder. Vite will fail to find the entry point and the build will error.

**Fix required (one-line edit):** Change the script src in `index.html` from `/src/main.tsx` to `/main.tsx`.

I will make this fix only after you approve the deployment plan.

### Blocker 2 — Files Not Yet Committed to GitHub

The following files exist locally but are **not tracked by git** and not yet on GitHub:

```
App.tsx
index.css
deployment.md
```

These must be committed and pushed to `origin/main` before Vercel can build the project.

---

## 4. A Note on the Gemini API

`@google/genai` and `express` are listed in `package.json` as dependencies, but **neither is used anywhere in the current application code**. `App.tsx` makes no API calls. The `GEMINI_API_KEY` environment variable is wired up in `vite.config.ts` but nothing in the app reads it.

**Conclusion:** `GEMINI_API_KEY` is **not required** for this deployment. The app will run perfectly without it. You may skip it entirely in Vercel's environment variable settings unless you plan to add AI features later.

---

## 5. GitHub Repository

The repository is already connected to GitHub:

```
https://github.com/IsaacOsah124/b.h.g-education-consult.git
```

Branch: `main`  
No additional GitHub setup is needed — Vercel will import directly from this repo.

---

## 6. Vercel Build Configuration

These are the exact settings to enter when creating the Vercel project:

| Setting | Value |
|---|---|
| **Framework Preset** | Vite |
| **Root Directory** | `.` (repository root — leave as default) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Node.js Version** | 20.x |

**SPA routing:** Vercel's Vite preset automatically configures all routes to fall back to `index.html`, which is what React Router needs. No `vercel.json` required.

---

## 7. Environment Variables

Given that no API calls are made in the current code, **no environment variables are strictly required** to deploy.

| Variable | Required Now | Notes |
|---|---|---|
| `GEMINI_API_KEY` | No | Not used in current code. Add later if AI features are implemented. |
| `APP_URL` | No | Not referenced in current code. |

You may leave Vercel's environment variables empty for now.

---

## 8. Deployment Steps (In Order)

Everything below requires your approval first.

### Step 1 — Fix the index.html path (one-line change)
Edit `index.html`: change `/src/main.tsx` → `/main.tsx`.

### Step 2 — Commit all untracked files
```
git add App.tsx index.css index.html deployment.md
git commit -m "Add application source files and deployment plan"
git push origin main
```

### Step 3 — Import project in Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Click **Import Git Repository** → authorize GitHub if prompted
3. Select `IsaacOsah124/b.h.g-education-consult`
4. Confirm build settings from Section 6
5. Click **Deploy**

### Step 4 — Verify the live deployment
- Home page loads and logo animates
- Navbar scroll effect works
- All three service routes (`/service/bece`, `/service/home-tuition`, `/service/online-tuition`) load correctly
- Forms submit and show the confirmation screen
- Mobile menu opens and closes

### Step 5 — Custom Domain (optional, whenever you're ready)
1. Vercel → Project → **Settings → Domains**
2. Add your domain and follow the DNS instructions at your registrar
3. Vercel handles the SSL certificate automatically

---

## 9. Connections and Permissions Needed

| Connection | What For | Action Required |
|---|---|---|
| GitHub push access | Upload source files to `origin/main` | Grant me permission to run `git push` |
| Vercel ↔ GitHub OAuth | Vercel reads the repo to build | You authorize in Vercel UI (one-time) |

That's it. No database credentials, no API keys, no third-party services.

---

## 10. Pre-Deployment Checklist

- [ ] `index.html` path fixed (`/src/main.tsx` → `/main.tsx`)
- [ ] `App.tsx`, `index.css`, `index.html`, `deployment.md` committed and pushed to GitHub
- [ ] Vercel project created and connected to the GitHub repo
- [ ] Vercel build completes without errors
- [ ] All 4 routes verified in the live preview URL
- [ ] (Optional) Custom domain added

---

**Awaiting your approval to proceed with Step 1 (the path fix) and Step 2 (commit + push).**

# GitHub Pages & GitHub Actions Deployment Guide

## 📚 Understanding the Concepts

### What is GitHub Pages?
GitHub Pages is a free hosting service that lets you host static websites directly from your GitHub repository. Your React app will be accessible at:
`https://pradeepnp10.github.io/counter_webapp/`

### What is GitHub Actions?
GitHub Actions is a CI/CD (Continuous Integration/Continuous Deployment) platform that automates your software workflows. It can:
- Build your application
- Run tests
- Deploy to various platforms
- Run on every push, pull request, or on a schedule

---

## 🔧 What We Just Set Up

### 1. GitHub Actions Workflow (`.github/workflows/deploy.yml`)

This file tells GitHub Actions **what to do** when you push code. Let's break it down:

#### **Trigger Section** (Lines 3-9)
```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch:
```
- **What it does**: Runs the workflow when you push to the `main` branch
- **`workflow_dispatch`**: Allows manual triggering from GitHub's Actions tab

#### **Permissions** (Lines 11-15)
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```
- **What it does**: Grants necessary permissions to read code and write to GitHub Pages

#### **Build Job** (Lines 23-50)
This job builds your React app:

1. **Checkout code**: Downloads your repository code
2. **Setup Node.js**: Installs Node.js version 20
3. **Install dependencies**: Runs `npm ci` (clean install)
4. **Build application**: Runs `npm run build` to create production files
5. **Upload artifact**: Saves the built files (`dist` folder) for deployment

#### **Deploy Job** (Lines 52-72)
This job deploys to GitHub Pages:

1. **Waits for build**: Only runs after build job succeeds
2. **Deploys**: Uploads the built files to GitHub Pages

### 2. Vite Configuration Update (`vite.config.ts`)

```typescript
base: '/counter_webapp/',
```

- **What it does**: Sets the base path for all assets (CSS, JS, images)
- **Why needed**: GitHub Pages serves your site at `username.github.io/repository-name/`, not at the root
- **Important**: The base path must match your repository name exactly

---

## 🚀 Step-by-Step Deployment Process

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/pradeepnp10/counter_webapp
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Click **Save**

### Step 2: Push Your Code (Already Done!)

We've already pushed the workflow file. GitHub Actions will automatically:
1. Detect the workflow file
2. Start the build process
3. Deploy to GitHub Pages

### Step 3: Monitor the Deployment

1. Go to your repository
2. Click the **Actions** tab
3. You'll see a workflow run called "Deploy to GitHub Pages"
4. Click on it to see the progress:
   - ✅ Green checkmark = Success
   - ❌ Red X = Failed (check logs)

### Step 4: Access Your Live Site

Once deployment completes (usually 1-2 minutes), your site will be live at:
**https://pradeepnp10.github.io/counter_webapp/**

---

## 📖 Understanding Each Component

### Workflow File Structure

```
.github/
└── workflows/
    └── deploy.yml    ← This file defines your CI/CD pipeline
```

### The Deployment Flow

```
You push code
    ↓
GitHub detects workflow trigger
    ↓
Build Job starts
    ├── Checkout code
    ├── Setup Node.js
    ├── Install dependencies (npm ci)
    ├── Build app (npm run build)
    └── Upload dist folder
    ↓
Deploy Job starts
    └── Deploy to GitHub Pages
    ↓
Your site is live! 🎉
```

### Key Commands Explained

- **`npm ci`**: Clean install - faster and more reliable than `npm install` for CI/CD
- **`npm run build`**: Creates optimized production files in the `dist` folder
- **Artifact**: A file or collection of files produced by a workflow run

---

## 🔄 How It Works Going Forward

### Automatic Deployment

Every time you:
1. Push code to `main` branch
2. The workflow automatically:
   - Builds your app
   - Deploys to GitHub Pages
   - Your site updates within 1-2 minutes

### Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Click the green **Run workflow** button

---

## 🐛 Troubleshooting

### Issue: Site shows 404 or blank page

**Solution**: 
- Check that `base` in `vite.config.ts` matches your repository name exactly
- Ensure GitHub Pages is enabled in repository settings
- Check the Actions tab for errors

### Issue: Build fails

**Solution**:
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Issue: Assets not loading

**Solution**:
- Verify the `base` path in `vite.config.ts` is correct
- Check that paths start with `/counter_webapp/` (not just `/`)

---

## 📝 Important Notes

1. **Repository Name**: If you rename your repository, update the `base` path in `vite.config.ts`

2. **Custom Domain**: You can add a custom domain in GitHub Pages settings

3. **Build Time**: First deployment takes longer (2-3 minutes), subsequent ones are faster

4. **Branch Protection**: The workflow only runs on the `main` branch by default

---

## 🎯 Summary

**What we created:**
- ✅ GitHub Actions workflow for automatic deployment
- ✅ Updated Vite config for GitHub Pages compatibility
- ✅ Committed and pushed to repository

**What happens now:**
- ✅ Every push to `main` automatically deploys
- ✅ Your site is live at: `https://pradeepnp10.github.io/counter_webapp/`
- ✅ You can monitor deployments in the Actions tab

**Next steps:**
1. Enable GitHub Pages in repository settings (Source: GitHub Actions)
2. Wait for the first deployment to complete
3. Visit your live site!

---

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)

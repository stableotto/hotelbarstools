# Hotel Bar Stools - Live Deployment Guide

## Prerequisites for Live DecapCMS
✅ **GitHub account** (for OAuth authentication)  
✅ **Cloudflare account** (for hosting)  
✅ **GitHub repository** (for content storage)

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and create a new repository:
   - Name: `hotelbarstools`
   - Visibility: Public (required for DecapCMS OAuth)
   - Initialize: Don't initialize (we have existing code)

2. **Add GitHub remote to your local project:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/hotelbarstools.git
git push -u origin main
```

## Step 2: GitHub OAuth App Setup

1. **Go to GitHub Settings** → Developer settings → OAuth Apps
2. **Click "New OAuth App"** with these settings:
   - **Application name:** `Hotel Bar Stools CMS`
   - **Homepage URL:** `https://hotelbarstools.pages.dev` (your future Cloudflare URL)
   - **Authorization callback URL:** `https://hotelbarstools.pages.dev/admin/`

3. **Save the credentials:**
   - **Client ID:** (copy this)
   - **Client Secret:** (copy this)

## Step 3: Cloudflare Pages Deployment

1. **Go to Cloudflare Dashboard** → Pages → Create a project
2. **Connect to Git** → Select your GitHub repository
3. **Build settings:**
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 18.x

4. **Environment variables** (in Cloudflare Pages settings):
   - Add any needed environment variables

## Step 4: Update DecapCMS Config for Live

Once deployed, update the `backend` configuration in `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/hotelbarstools
  branch: main
  auth_endpoint: https://hotelbarstools.pages.dev/admin/
  
# For local development, keep:
local_backend: true
```

## Step 5: Test Live CMS

1. **Visit:** `https://your-site.pages.dev/admin`
2. **Login with GitHub** (OAuth flow)
3. **Test creating/editing content**
4. **Verify changes save to GitHub repository**

## Features Available in Live Version

### ✅ **Content Management**
- Edit all collection content (Executive, Modern Minimalist, etc.)
- Upload and manage images through CMS
- Rich text editing with preview
- Instant publishing to live site

### ✅ **Editorial Workflow**
- Draft → Review → Publish workflow
- Multiple user collaboration
- Content approval process
- Version history via Git

### ✅ **Authentication & Security**
- GitHub OAuth authentication
- Repository-based permissions
- Secure content saving
- Access control via GitHub teams

## Automatic Updates

**When you edit content in the live CMS:**
1. Changes save to GitHub repository
2. Cloudflare Pages auto-rebuilds
3. Live site updates within 1-2 minutes
4. Zero downtime deployments

## Next Steps After Deployment

1. **Test all CMS functionality** in live environment
2. **Add team members** via GitHub repository access
3. **Configure custom domain** if desired
4. **Set up analytics** (Cloudflare Analytics included)
5. **Add real product images** through CMS media manager

---

**Ready to deploy?** Follow Step 1 to create your GitHub repository! 
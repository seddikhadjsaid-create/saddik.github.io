# Seddik Hadj Said — Portfolio Website

A modern, dark-themed personal portfolio website for Seddik Hadj Said — Embedded Systems & Robotics Enthusiast from Algeria.

---

## 📁 File Structure

```
seddik-portfolio/
├── index.html          — Main HTML file (all sections)
├── style.css           — Complete stylesheet with animations
├── script.js           — JavaScript (particles, typing, scroll reveals, etc.)
├── images/             — Place your images here
│   ├── profile.jpg             ← Your profile photo
│   ├── cyclon-game.jpg         ← Cyclon Game project image
│   ├── smart-plug.jpg          ← Smart Plug project image
│   ├── line-follower.jpg       ← Line Follower Car image
│   ├── avoid-obstacles.jpg     ← Obstacle Avoidance Car image
│   ├── smart-door-lock.jpg     ← Smart Door Lock image
│   ├── arc4-competition.jpg    ← ARC4 competition photo
│   ├── ghardaia-exhibition.jpg ← Ghardaia exhibition photo
│   ├── eloued-competition.jpg  ← El Oued competition photo
│   ├── book-fair.jpg           ← Book Fair exhibition photo
│   └── nabtakir-graduation.jpg ← نبتكر graduation/association photo
└── README.md           — This file
```

---

## 🖼️ Adding Your Images

1. Open the `images/` folder.
2. Add your photos using **exactly** these filenames (or update the `src=""` attributes in `index.html`):

| Filename                  | Used For                             |
|---------------------------|--------------------------------------|
| `profile.jpg`             | Hero section — your main photo       |
| `cyclon-game.jpg`         | Projects — Cyclon Game               |
| `smart-plug.jpg`          | Projects — Smart Plug                |
| `line-follower.jpg`       | Projects — Line Follower Car         |
| `avoid-obstacles.jpg`     | Projects — Avoid Obstacles Car       |
| `smart-door-lock.jpg`     | Projects — Smart Door Lock           |
| `arc4-competition.jpg`    | Achievements — ARC4 competition      |
| `ghardaia-exhibition.jpg` | Achievements — Ghardaia exhibition   |
| `eloued-competition.jpg`  | Achievements — El Oued competition   |
| `book-fair.jpg`           | Achievements — Book Fair exhibition  |
| `nabtakir-graduation.jpg` | Achievements — نبتكر graduation      |

> ✅ **Tip:** Recommended image sizes:
> - Profile photo: 800×1000px (portrait)
> - Project images: 1200×800px (landscape)
> - Achievement images: 1200×720px (landscape)
>
> Use `.jpg` or `.webp` for best performance. If missing, placeholder images will load automatically.

---

## 🚀 Deploying to GitHub Pages — Step by Step

### Step 1: Create a GitHub Account
If you don't have one, go to [github.com](https://github.com) and sign up.

### Step 2: Create a New Repository
1. Click the **"+"** icon at the top right → **"New repository"**
2. Name it: `seddikhadjsaid.github.io` (replace with your username)  
   OR any name like `portfolio`
3. Set it to **Public**
4. Click **"Create repository"**

### Step 3: Upload Your Files
**Option A — Using GitHub Web Interface (easiest):**
1. Open your new repository
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop ALL files: `index.html`, `style.css`, `script.js`
4. Then create the `images/` folder by clicking **"Add file"** → **"Create new file"**  
   Type: `images/.gitkeep` → Commit
5. Upload all your images the same way inside the `images/` folder

**Option B — Using Git CLI (recommended):**
```bash
# 1. Initialize git in your portfolio folder
cd seddik-portfolio
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial portfolio deployment"

# 4. Connect to GitHub (replace URL with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# 5. Push
git branch -M main
git push -u origin main
```

### Step 4: Activate GitHub Pages
1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Choose branch: **"main"** and folder: **"/ (root)"**
6. Click **"Save"**

### Step 5: Access Your Live Website
After 1–3 minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

Or if you named the repo `YOUR-USERNAME.github.io`:
```
https://YOUR-USERNAME.github.io/
```

---

## ✏️ Customizing the Website

### Update Personal Info
Open `index.html` and search for the relevant sections:

```html
<!-- Change your name, title, tagline -->
<h1 class="hero-name">...</h1>

<!-- Change contact details -->
<a href="mailto:seddikhadjsaid@gmail.com" ...>
<a href="https://instagram.com/saddik.hadj.said" ...>
```

### Add or Edit Projects
Find the `Projects Section` comment in `index.html`:
```html
<!-- Each project is an <article class="project-card" data-category="..."> -->
```
Duplicate any project card and update: title, description, image src, and tags.

**Data categories for filtering:**
- `data-category="robotics"` — Robotics projects
- `data-category="iot"` — IoT/Smart device projects
- `data-category="games"` — Game projects

### Change Colors
Open `style.css` and edit the `:root` variables at the top:
```css
:root {
  --accent:  #00d4aa;    /* Main teal/green color */
  --accent-2: #00aaff;  /* Secondary blue accent */
  --gold:    #f59e0b;    /* Achievement gold color */
  ...
}
```

### Add More Typing Phrases
Open `script.js` and find the `phrases` array:
```javascript
const phrases = [
  'Embedded Systems Enthusiast',
  'Robotics & Arduino Developer',
  // Add your own here
];
```

---

## ⚙️ Technical Details

- **No build tools required** — Pure HTML, CSS, JavaScript
- **No dependencies** — All external resources load from CDN (Google Fonts, Font Awesome)
- **Offline-ready structure** — Works even without internet after loading once
- **Cross-browser compatible** — Chrome, Firefox, Safari, Edge
- **Mobile-first responsive** — Looks great on phones, tablets, and desktops
- **Accessibility** — Semantic HTML, alt tags, ARIA labels, keyboard navigation
- **Performance** — Lazy loading images, throttled scroll events, efficient animations

---

## 📞 Support

If you need help with the website, contact:
**seddikhadjsaid@gmail.com**

---

*Built with ♥ in Algeria — Powered by creativity & circuits*

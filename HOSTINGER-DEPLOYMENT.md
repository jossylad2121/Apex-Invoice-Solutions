# 🚀 Deploy to Hostinger - Step by Step Guide

## Quick Overview

You'll upload your invoice generator files to your Hostinger website using their File Manager or FTP. It takes about 5-10 minutes.

## Method 1: Using Hostinger File Manager (Easiest)

### Step 1: Access File Manager
1. Log in to your [Hostinger account](https://hpanel.hostinger.com)
2. Go to **Hosting** → Select your website
3. Click on **File Manager**

### Step 2: Choose Upload Location

**Option A: Main Domain** (e.g., `yourdomain.com/invoice-generator`)
- Navigate to `public_html` folder
- Create a new folder called `invoice-generator`
- Open that folder

**Option B: Subdomain** (e.g., `invoices.yourdomain.com`)
- First create a subdomain in Hostinger (Domains → Subdomains)
- Navigate to the subdomain folder (usually `public_html/invoices`)

### Step 3: Upload Files
1. Click **Upload Files** button in File Manager
2. Select ALL these files from your computer:
   - `index.html`
   - `index.css`
   - `app.js`
   - `README.md` (optional)
   - `embed-example.html` (optional)

3. Wait for upload to complete (should be quick, files are small)

### Step 4: Set Permissions (Important!)
1. Select all uploaded files
2. Right-click → **Permissions**
3. Set to **644** (this is usually default)

### Step 5: Test Your Invoice Generator
Visit your URL:
- If main domain: `https://yourdomain.com/invoice-generator/`
- If subdomain: `https://invoices.yourdomain.com/`

**Done!** Your invoice generator is now live! 🎉

---

## Method 2: Using FTP (FileZilla)

### Step 1: Get FTP Credentials
1. In Hostinger hPanel, go to **Hosting** → Your website
2. Click **FTP Accounts**
3. Note down:
   - **Hostname** (usually ftp.yourdomain.com)
   - **Username**
   - **Password** (or create new FTP account)
   - **Port** (usually 21)

### Step 2: Connect with FileZilla
1. Download [FileZilla](https://filezilla-project.org/) if you don't have it
2. Open FileZilla
3. Enter your FTP credentials:
   - Host: `ftp.yourdomain.com`
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
4. Click **Quickconnect**

### Step 3: Upload Files
1. On the **left side** (Local site): Navigate to:
   `C:\Users\Ayinke\.gemini\antigravity\scratch\invoice-generator\`

2. On the **right side** (Remote site): Navigate to:
   - `public_html/invoice-generator/` (create folder if needed)
   - OR your subdomain folder

3. Select these files on the left:
   - `index.html`
   - `index.css`
   - `app.js`

4. Drag them to the right side to upload

### Step 4: Test
Visit `https://yourdomain.com/invoice-generator/`

---

## Embedding into Existing Hostinger Pages

### Option 1: Embed with Iframe
If you want to add the invoice generator to an existing page on your site:

1. Edit the page where you want to embed it
2. Add this HTML code:

```html
<div style="max-width: 1400px; margin: 0 auto; padding: 20px;">
    <iframe 
        src="https://yourdomain.com/invoice-generator/index.html" 
        width="100%" 
        height="1400px" 
        frameborder="0"
        style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    </iframe>
</div>
```

3. Replace `yourdomain.com` with your actual domain
4. Save the page

### Option 2: Direct Integration
If you're using WordPress on Hostinger:

1. Install **Insert Headers and Footers** plugin OR use a **Custom HTML** block
2. Copy the content from `index.html` (between `<body>` tags)
3. Add to your page
4. In **Appearance → Customize → Additional CSS**, paste content from `index.css`
5. Add `app.js` content using a **Custom HTML** block with `<script>` tags

---

## Troubleshooting

### Issue: "403 Forbidden" Error
**Solution**: Check file permissions - should be 644 for files, 755 for folders

### Issue: Page Shows Code Instead of App
**Solution**: Make sure file is named exactly `index.html` (not index.html.txt)

### Issue: Styles Not Loading
**Solution**: 
- Verify `index.css` and `app.js` are in the same folder as `index.html`
- Check file names are exactly: `index.css` and `app.js` (case-sensitive)

### Issue: Can't Access File Manager
**Solution**: 
- Clear browser cache
- Try different browser
- Use FTP method instead

---

## Quick Checklist

- [ ] Log in to Hostinger hPanel
- [ ] Access File Manager
- [ ] Navigate to `public_html/invoice-generator/`
- [ ] Upload `index.html`, `index.css`, `app.js`
- [ ] Set permissions to 644
- [ ] Visit `https://yourdomain.com/invoice-generator/`
- [ ] Test creating an invoice

---

## Files to Upload (Minimum Required)

**Essential** (Must upload):
- ✅ `index.html` - Main application
- ✅ `index.css` - Styles
- ✅ `app.js` - Functionality

**Optional** (Nice to have):
- `README.md` - Documentation
- `embed-example.html` - Example

---

## Your Files Are Located Here

All files ready to upload:
`C:\Users\Ayinke\.gemini\antigravity\scratch\invoice-generator\`

---

## Need Help?

**Hostinger Support**:
- Live Chat: Available 24/7 in hPanel
- Knowledge Base: [support.hostinger.com](https://support.hostinger.com)

**Common Questions**:
- **Q: Do I need a database?** A: No! This app runs entirely in the browser
- **Q: Will it work on mobile?** A: Yes! Fully responsive design
- **Q: Can I customize it?** A: Yes! Edit the files before uploading

---

**Estimated Time**: 5-10 minutes
**Difficulty**: Beginner-friendly ⭐⭐☆☆☆

Good luck! Your invoice generator will be live soon! 🚀

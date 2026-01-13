# InvoiceAI - Professional Invoice Generator

A modern web application that helps small business owners create professional invoices in 2 minutes.

## 🚀 Quick Start

### Option 1: Open Locally
Simply open `index.html` in your web browser.

### Option 2: Deploy to a Website

#### Using GitHub Pages (Free)
1. Create a new repository on GitHub
2. Upload all files from this folder
3. Go to Settings → Pages
4. Select "Deploy from main branch"
5. Your site will be live at `https://yourusername.github.io/repository-name`

#### Using Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this entire folder
3. Your site will be live instantly with a custom URL

#### Using Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import this folder
3. Deploy with one click

#### Using Any Web Host
1. Upload all files to your web hosting via FTP
2. Access via your domain name

## 📁 Files Structure

```
invoice-generator/
├── index.html          # Main application
├── index.css           # Styles and design system
├── app.js              # Application logic
├── README.md           # This file
└── assets/             # (optional) Add images/logos here
```

## 🌐 Embedding in an Existing Website

### Method 1: Iframe Embed
Add this code to any page on your website:

```html
<iframe 
    src="https://your-domain.com/invoice-generator/index.html" 
    width="100%" 
    height="1200px" 
    frameborder="0"
    style="border: none; border-radius: 12px;">
</iframe>
```

### Method 2: Direct Integration
Copy the contents of `index.html`, `index.css`, and `app.js` into your existing website structure.

### Method 3: Subdomain
Host the invoice generator on a subdomain like `invoices.yourdomain.com`

## ✨ Features

- 3-step invoice creation process
- Real-time calculations
- Multi-currency support (USD, EUR, GBP, CAD)
- Professional PDF generation
- Mobile responsive design
- No backend required - runs entirely in the browser

## 🎨 Customization

### Change Colors
Edit the CSS variables in `index.css`:
```css
:root {
    --color-primary: #3B82F6;
    --color-primary-light: #60A5FA;
    /* ... more colors */
}
```

### Change Tax Rate
Edit line 347 in `app.js`:
```javascript
const tax = subtotal * 0.10; // Change 0.10 to your tax rate
```

### Add Your Logo
Replace the SVG logo in `index.html` (lines 17-26) with your own logo image.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- All modern mobile browsers

## 🔒 Privacy

All data is processed locally in the user's browser. No information is sent to any server.

## 📄 License

Free to use for personal and commercial projects.

## 🆘 Support

For issues or questions, refer to the walkthrough documentation included in the project.

---

**Built with vanilla HTML, CSS, and JavaScript - No frameworks required!**

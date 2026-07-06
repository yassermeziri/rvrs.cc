# RVRS — website

Static site, no build step. Open `index.html` or deploy as-is.

## Folder structure
```
rvrs-website/
  index.html              home page
  admin.html               admin dashboard (orders / products / shipping prices)
  css/styles.css           all styles
  js/
    wilayas.js             58 wilayas (EN + AR names)
    i18n.js                English/Arabic dictionary + language switch
    products-store.js       product catalog (localStorage-backed CRUD)
    shipping-store.js       per-wilaya, per-method shipping prices
    store.js                order storage + CSV export
    main.js                  site behavior (rendering, forms, animations)
  products/product.html      ONE template for every product — /products/product.html?id=void-tee
```

## Run locally (Visual Studio)
Install the **Live Server** extension (VS Code) → right-click `index.html` → "Open with Live Server".
Opening the file directly (`file://`) mostly works too, but some browsers restrict `fetch`/localStorage on `file://` — Live Server avoids that.

## Deploy (GitHub Pages, Netlify, Vercel, any static host)
1. Push this folder to a GitHub repo.
2. GitHub Pages: repo Settings → Pages → deploy from `main` branch, root folder. Done — no build step.
3. Netlify/Vercel: drag-and-drop the folder, or connect the repo. No build command needed.

## Admin dashboard
Go to `/admin.html`. Default passcode: **rvrs2026** — change it in `admin.html` (`const PASSCODE = ...`, near the top of the script).
Three tabs:
- **Orders** — every Cash-on-Delivery order placed on the site, with status, CSV export, delete.
- **Products** — add, edit, delete products. Changes appear instantly on the home page and product pages.
- **Shipping prices** — set the price per wilaya, per method (home delivery / office pickup).

## ⚠️ Important: this runs entirely in the browser
Orders, products, and shipping prices are stored in **localStorage** — they live only on the device/browser that created them. That means:
- An order placed by a customer on their phone won't appear in your admin dashboard automatically (different browser).
- The passcode gate is a basic deterrent, not real security — anyone who can read the page source can find it.

This is fine for a demo or single-device setup, but for a real store you'll want a small backend (a form endpoint like Formspree, a Google Sheet via Apps Script, Airtable, or a proper database) so orders actually reach you from any device. Happy to help wire that up when you're ready — just say the word.

## Language
EN/AR switch is in the header (top right). Arabic flips the layout to RTL. Preference is remembered per browser.

## Currency & shipping
All prices are in DZD. Each order total = product price × quantity + shipping price (based on selected wilaya and method — set in Admin → Shipping prices).

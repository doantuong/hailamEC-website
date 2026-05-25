# WordPress & Flatsome Integration Guide (Cache & Optimization Safe)

This guide documents how to safely embed the React widgets (AI Chatbot, Calculators, Dashboard) into your live WordPress site using the Flatsome theme, bypassing optimization plugin conflicts (like LiteSpeed Cache, WP Rocket, Cloudflare).

## The Core Interaction Issue
In WordPress environments, JavaScript optimization plugins aggressively minify, defer, and combine Javascript files. When `type="module"` scripts are present (which Vite outputs), these optimizations often break them or run them out of order—causing the React app to initialize *before* the `<div id="...-root">` is actually laid out in the HTML by Flatsome.

**We have implemented a `MutationObserver` in the source code.** This means the script will actively watch the webpage and "wait" natively for WordPress to render the target `div` elements, even if deferred or lazily loaded. 

However, you *must* follow these shortcode/script embedding guidelines to ensure they fire correctly.

---

## 1. Embedding the AI Chatbot Widget

The AI Widget injects itself globally and doesn't explicitly need a container root in the page, as it appends to `document.body`.

**To install it globally on your site:**
1. Navigate to **Flatsome > Advanced > Global Settings > Footer Scripts** (or use an "Insert Headers and Footers" plugin).
2. Insert the bundled Javascript file. Note the `data-no-optimize="1"` and `data-cfasync="false"` attributes—these are magic attributes that tell WP Rocket, LiteSpeed, and Cloudflare to *ignore* this script and not to break it.

```html
<!-- HAI LAM AI CHATBOT -->
<script type="module" data-no-optimize="1" data-cfasync="false" src="YOUR_HOSTED_URL/assets/index-xxx.js"></script>
```

---

## 2. Embedding the Engineering Calculator

Unlike the Chatbot, the calculator needs a specific place on the page to mount. 

1. On the specific Page/Post in the Flatsome UX Builder, add a **Row / Column**.
2. Add a **HTML element** inside the column.
3. Paste the following exact snippet into the HTML element:

```html
<div id="calculators-root" style="min-height: 500px; display: block;">
   <!-- Fallback message while script loads -->
   <p style="text-align: center; color: #666; padding: 2rem;">Loading Engineering Calculator...</p>
</div>

<!-- CALCULATOR SCRIPT -->
<script type="module" data-no-optimize="1" data-cfasync="false" src="YOUR_HOSTED_URL/assets/calculators/main-xxx.js"></script>
```
*Note: Setting a `min-height` prevents Layout Shifts (CLS) while Flatsome calculates the page height during script execution.*

---

## 3. LiteSpeed Cache / WP Rocket Exclusions

If you still experience issues where the widgets disappear on cache refresh, you need to explicitly exclude the scripts in your caching plugin.

### For LiteSpeed Cache:
1. Go to **LiteSpeed Cache > Page Optimization > Tuning**.
2. Find the **JS Excludes** option.
3. Add the exact filenames or the string `/assets/` (if you host the files on your server inside an assets folder) so LiteSpeed knows to skip optimizing them.
4. Also, check **Exclude JS Module** if available.

### For Cloudflare:
The `data-cfasync="false"` tag in the script tag bypasses Rocket Loader automatically! You do not need to do anything else.

---

## 4. Verification & Troubleshooting
1. Open up your live WordPress page in **Google Chrome Incognito** mode.
2. Right-click anywhere and select **Inspect**, then go to the **Console** tab.
3. Look for the message: `[HAI LAM E&C AI] Initializing Chatbot Widget...` or `[HAI LAM E&C] Engineering Calculator successfully mounted.`
4. If you see it, the script successfully detected the root DOM and bypassed caching delays!

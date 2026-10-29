# How Are You, Really? ♡

A gentle pastel check-in form using HTML, CSS, JavaScript, Google Apps Script, and Google Sheets.

## Connect Google Sheets
1. Create a Google Sheet and keep its sharing access set to **Restricted**.
2. Open **Extensions → Apps Script**.
3. Replace the editor contents with the code in `Code.gs`.
4. Save, select `setupSheet`, click **Run**, and approve access if prompted.
5. Click **Deploy → New deployment → Web app**.
6. Set **Execute as** to **Me**. Set access to **Anyone** only if you intend the public website to accept submissions and your account allows it.
7. Deploy and copy the Web app URL ending in `/exec`.
8. In `script.js`, replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with the URL. Save.

## Test before publishing
Open `index.html` with VS Code Live Server or a local browser, submit a test check-in, then verify a new row appears in the `Check-ins` tab. The browser uses `no-cors`, so the success screen alone does not prove the row was saved.

## Privacy
- The form tells respondents the owner can read their answers and asks for consent.
- Keep the Sheet **Restricted**. Do not publish the Sheet or share its link with respondents.
- The Apps Script URL is visible in `script.js` on a public site. Anyone who gets it may try to submit spam. This starter project is for a small personal project, not confidential or high-risk information.
- Anonymous means no name is required; free-text answers may still identify someone.
- Do not ask for passwords or sensitive details. This form is not a crisis service; someone in immediate danger should contact a trusted person or local emergency services.

## GitHub Pages
Upload `index.html`, `style.css`, and `script.js` to a GitHub repository, then enable **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Do not upload private files or your spreadsheet.

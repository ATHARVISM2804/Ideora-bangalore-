# PT SmartTrack survey: response sheet

`/survey` posts to `api/survey.js`, which forwards each response to a Google
Apps Script web app. The script appends one row per response to a private
Google Sheet: the admin-only view, and File → Download → .xlsx / .csv is the
spreadsheet export. No emails are sent.

Nothing is shown publicly. Only people the Sheet is shared with can see it.

## Setup (about 5 minutes, once)

Do this from the Google account that should own the responses, then share
the Sheet with anyone else who needs to read it.

1. Create a new Google Sheet named **PT SmartTrack survey responses**.
2. In the Sheet: **Extensions → Apps Script**. Delete what is there, paste the
   script below, and change `SECRET` to a long random string.
3. **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, approve the permission (Google Sheets), copy the **Web app URL**.
4. In Vercel → the ideora-web project → Settings → Environment Variables, add:
   - `SURVEY_WEBHOOK_URL` = the Web app URL
   - `SURVEY_WEBHOOK_SECRET` = the same string as `SECRET` in the script
5. Redeploy the site, then submit one test response at `/survey` and check
   that a row appears in the Sheet.

Until `SURVEY_WEBHOOK_URL` is set, the form tells respondents it could not
save their answers instead of pretending it worked.

If the script is edited later, use **Deploy → Manage deployments → Edit →
New version** so the URL stays the same.

## The script

```js
const SECRET = 'change-me-to-a-long-random-string';

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: 'bad_json' });
  }
  if (body.secret !== SECRET) return reply({ ok: false, error: 'unauthorised' });

  const r = body.response;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  // Two gyms submitting at the same moment must not both write the header row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Response ID', 'Submitted at (IST)', 'Gym name', 'Contact name',
      ...r.answers.map((a) => a.n + '. ' + a.question),
      'Additional feedback', 'Consent',
    ]);
    sheet.setFrozenRows(1);
  }

  const when = Utilities.formatDate(new Date(r.submittedAt), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm');
  sheet.appendRow([
    r.id, when, r.gymName, r.contactName,
    ...r.answers.map((a) => a.answer),
    r.feedback, r.consent ? 'Yes' : 'No',
  ]);
  lock.releaseLock();

  return reply({ ok: true });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```

const SHEET_NAME = "Check-ins";

function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Mood", "Day", "Need", "Message", "Name", "Consent"]);
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      setupSheet();
      sheet = spreadsheet.getSheetByName(SHEET_NAME);
    }

    const mood = safeCell(data.mood, 40);
    const day = safeCell(data.day, 100);
    const need = safeCell(data.need, 100);
    const message = safeCell(data.message, 3000);
    const name = safeCell(data.name, 80);
    const consent = data.consent === true ? "Yes" : "No";

    if (!mood || !day || !need || consent !== "Yes") {
      return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Required fields missing." })).setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([new Date(), mood, day, need, message, name, consent]);
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Unable to save response." })).setMimeType(ContentService.MimeType.JSON);
  }
}

function safeCell(value, maxLength) {
  let text = String(value || "").trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

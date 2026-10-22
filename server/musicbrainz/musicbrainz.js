

// Fetch data from MusicBrainz API to verify listing's barcode (EAN number)
// https://musicbrainz.org/ws/2/release/?query=artist:"The Velvet Underground" AND release:"White Light/White Heat"&fmt=json

// Search by title, primary type, artist, date
// releases["title"]
// releases["release-group"]["primary-type"]
// releases["artist-credit"]["name"]
// releases["date"]
// releases["barcode"]

BASE = "http://musicbrainz.org/ws/2/release/"

headers = {
  "User-Agent": "Bulldog Records 1.0 (University Class Assignment, jek305@msstate.edu)"
}

params = {
  "query": "",
  "fmt": "json"
}

export function validateBarcode(headers, title, artist, primary_type, date, barcode) {
  query = BASE + "?query=release:" + title + " AND " + "artist:" + artist + " AND " + "date:" + date + " AND " + ""
  fetch(query)
  result = {"barcode": 1}

  if (result["barcode"] == barcode) {
    return true
  }

  return false
}


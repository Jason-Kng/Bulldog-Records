

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

export async function validateBarcode(headers, title, artist, barcode) {
  const params = {
  "query": "",
  "fmt": "json"
  }

  const query = BASE + "?query=barcode:" + barcode

  try {
    const response = await fetch(query);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    if (result["title"] == title && result["artist-credit"]["name"] == artist) {
    return true
    }
    
  } catch (error) {

    console.error(error.message);
      
  }


  

  return false
}


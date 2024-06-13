// metadata.js
// get metadata from radiomast endpoint

const metadataEndpoint = 'https://streams.radiomast.io/d12679e5-06b3-4f6c-ae90-4fe125e30dfb/metadata';
const metadataArtistDiv = document.getElementById('metadataArtist');
const metadataTitleDiv = document.getElementById('metadataTitle');
const artworkImage = document.getElementById('npimage'); // Get the artwork image element

function updateMetadataEvent() {
    document.addEventListener("DOMContentLoaded", function() {
        try {
            const eventSource = new EventSource(metadataEndpoint);
    
            eventSource.onmessage = function(event) {
                const metadata = JSON.parse(event.data);
                const [artist, title] = metadata['metadata'].split(" - ").map(decodeURIComponent);
                
                metadataArtistDiv.textContent = artist;
                metadataTitleDiv.textContent = title;

                // Update the artwork using both artist and title
                updateArtwork(artist, title);
            }
        } catch (error) {
            console.error("EventSource initialization failed:", error);
        }
    });
}

function updateArtwork(artist, title) {
    const token = 'VkJoZfzGyhZxRblBoguQZPREgeeGRjrtuhIsnQds'; // Your Discogs API token
    const searchTerm = encodeURIComponent(`${artist} ${title}`);
    const apiURL = `https://api.discogs.com/database/search?q=${searchTerm}&token=${token}`;

    fetch(apiURL, {
        headers: {
            'User-Agent': 'ExpertsLiveRadio/1.0 +http://expertslive.radio'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let artworkUrl = data.results.length > 0 ? data.results[0].cover_image : './img/placeholder.png';
        // Update the artwork URL to include the size parameters for a 300x300 image
        artworkUrl = artworkUrl.replace(/(.*)(-)([0-9]+)(x)([0-9]+)(.*)/, '$1300x300$6');
        artworkImage.src = artworkUrl;
        // Set the width and height attributes to ensure the image is displayed as 300x300 pixels
        artworkImage.width = 150;
        artworkImage.height = 150;
    })
    .catch(error => {
        console.error('Error fetching artwork:', error);
        artworkImage.src = './img/placeholder.png';
        // Set the width and height attributes for the placeholder image as well
        artworkImage.width = 150;
        artworkImage.height = 150;
    });
}


// Initial load
updateMetadataEvent();

// metadata.js
// get metadata from radiomast endpoint

const metadataEndpoint = 'https://streams.radiomast.io/d12679e5-06b3-4f6c-ae90-4fe125e30dfb/metadata';
const metadataArtistDiv = document.getElementById('metadataArtist');
const metadataTitleDiv = document.getElementById('metadataTitle');

function updateMetadataEvent() {
    document.addEventListener("DOMContentLoaded", function() {

           
        try {
            var url = metadataEndpoint;
            var eventSource = new EventSource(url);
    
            eventSource.onmessage = function(event) {
                var metadata = JSON.parse(event.data);
                var artistTitle = metadata['metadata'];
    
                // split artist and title
            metadataSplit = artistTitle.split(" - ");

            metadataArtistDiv.textContent = decodeURIComponent(metadataSplit[0]);
            metadataTitleDiv.textContent = decodeURIComponent(metadataSplit[1]);
        
        }
        } catch (error) {
            console.log("EventSource initialization failed");
            console.log(error);
        }
    });
}

// Initial load
updateMetadataEvent()

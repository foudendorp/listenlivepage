// scripts.js
const hlsPlayer = document.getElementById('hlsPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const volumeControl = document.getElementById('volumeControl');
const airPlay = document.getElementById('airplay');
const castButton = document.getElementById('cast');
const watchLiveUrl = './video.html';

// HLS stream url
const HLSStreamUrl = 'https://streams.radiomast.io/d12679e5-06b3-4f6c-ae90-4fe125e30dfb/hls.m3u8';

// stream url
const StreamUrl = 'https://streams.radiomast.io/d12679e5-06b3-4f6c-ae90-4fe125e30dfb';

// Initialize HLS.js
if (hlsPlayer.canPlayType('application/vnd.apple.mpegurl')) {
    hlsPlayer.src = StreamUrl;
}
else if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(HLSStreamUrl);
    hls.attachMedia(hlsPlayer);
} 

// Play/Pause button functionality
playPauseButton.addEventListener('click', () => {
    if (hlsPlayer.paused) {
        hlsPlayer.play();
        playPauseButton.textContent = 'Pause';
    } else {
        hlsPlayer.pause();
        playPauseButton.textContent = 'Play';
    }
});

// Play/Pause button functionality
watchLiveButton.addEventListener('click', () => {    
    window.open(watchLiveUrl, '_blank').focus();
});

// Volume control
volumeControl.addEventListener('input', () => {
    hlsPlayer.volume = volumeControl.value;
});

// Airplay
if (window.WebKitPlaybackTargetAvailabilityEvent) {
    hlsPlayer.addEventListener('webkitplaybacktargetavailabilitychanged', function(event) {
        switch (event.availability) {
            case "available":
                airPlay.style.display = 'block';
                castButton.style.display = 'none';
                break;
            default:
                airPlay.style.display = 'none';
        }
        airPlay.addEventListener('click', function() {
            hlsPlayer.webkitShowPlaybackTargetPicker();
        });
    });
}else {
    airPlay.style.display = 'none';
}


//Chromecast
// Create new Castjs instance
    const cjs = new Castjs();
                
    // Wait for user interaction
        document.getElementById('cast').addEventListener('click', function() {
                    // Check if casting is available
                    if (cjs.available) {
                        // Initiate new cast session with a simple video
                        cjs.cast(StreamUrl, {
                            poster          : 'https://expertslive.radio/img/logo.png',
                            title           : 'Experts Live Radio',
                            description     : 'Het radiostation van en door de Microsoft community!'
                        });
                       
        }})



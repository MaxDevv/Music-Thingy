document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audioPlayer");
    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const skipButton = document.getElementById("skipButton");
    const darkModeButton = document.getElementById("darkModeButton");
    const modeButton = document.getElementById("modeButton");
    modes = ["Neo-Soul Mode", "Jazz Mode", "Full Neo-Soul"];
    modesFolder = ["mp3s", "ezmp3s", "fullNeoSoulMp3s"];
    mode = localStorage.getItem('mode');

    if (mode) {
        modeButton.textContent = getNextMode();
    } else {
        mode = modes[1];
    }

    let audioPlayedOnce = false;
    let fileList = [];

    audioPlayer.addEventListener('pause',function() { audioPlayer.isPlaying = false },false);
    audioPlayer.addEventListener('playing',function() { audioPlayer.isPlaying = true },false); 

    
    // Load dark mode preference from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#333');
        document.getElementById("darkModeIcon").textContent = "☀️";
    }

    darkModeButton.addEventListener("click", function() {
        toggleDarkMode();
    });

    startButton.addEventListener("click", function() {
        if (audioPlayedOnce) {
            // Replay audio
            audioPlayer.currentTime = 0;
            playAudioWithTimeout();
        } else {
            // Play random MP3
            playRandomMP3();
            audioPlayedOnce = true;
            startButton.textContent = "Replay";
        }
    });

    nextButton.addEventListener("click", function() {
        // Make a GET request to trigger the function for incrementing the counter
        fetch('https://script.google.com/macros/s/AKfycbzUtqxNn8g98Z85Vih_V6eOkz3mBqzGmYhEWieHHj0YcpsjS1fnk_OUmBCRzx-ZEpRZWw/exec?action=increment')
            .then(response => {
                if (response.ok) {
                    console.log('Counter incremented successfully.');
                } else {
                    console.error('Error incrementing counter:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error incrementing counter:', error);
            });

        playRandomMP3();
    });

    skipButton.addEventListener("click", function() {
        playRandomMP3();
    });
    modeButton.addEventListener("click", function() {
        mode = getNextMode();
        localStorage.setItem('mode', mode);
        modeButton.textContent = getNextMode();
        fileList = [];
    });

    document.addEventListener("keydown", function(event) {
        // Check if the pressed key is the spacebar (keyCode 32 or key " ")
        if (event.keyCode === 32 || event.key === " ") {
            // Prevent default behavior (e.g., scrolling the page)
            event.preventDefault();
            if (!audioPlayer.isPlaying) {
                playAudioWithTimeout();
            } else {
                audioPlayer.pause(); 
            }
        }
    });
    document.addEventListener("click", function(event) {
        // Check if the clicked element is the document body
        if (event.target === document.body) {
            
            if (!audioPlayer.isPlaying) {
                playAudioWithTimeout();
            } else {
                audioPlayer.pause(); 
            }
        }
    });

    var timeoutID;
    var startTime = null;
    var currentSource = null;
    
    // Event listener for the loadedmetadata event
    audioPlayer.addEventListener('loadedmetadata', handleMetadataLoaded);
    
    // Event listener for the play button
    audioPlayer.addEventListener("play", handlePlay);
    
    // Event listener for the pause button
    audioPlayer.addEventListener("pause", handlePause);
    
    // Function to handle loadedmetadata event
    function handleMetadataLoaded() {
      clearTimeout(timeoutID); // Clear timeout when metadata is loaded
      var duration = audioPlayer.duration;
      
      // Check if the source has changed
      if (audioPlayer.currentSrc !== currentSource) {
        currentSource = audioPlayer.currentSrc;
        // Set a new random start time if the source is new
        startTime = getRandomStartTime(duration);
      }
      
      // Call playAudioWithTimeout when metadata is loaded
      playAudioWithTimeout();
    }
    
    // Function to handle play event
    function handlePlay() {
      clearTimeout(timeoutID); // Clear existing timeout
      playAudioWithTimeout(); // Call playAudioWithTimeout when play button is clicked
    }
    
    // Function to handle pause event
    function handlePause() {
      clearTimeout(timeoutID); // Clear existing timeout
    }
    
    // Function to get a random start time
    function getRandomStartTime(duration) {
      // If duration is less than 5 seconds, start at 0
      if (duration < 5) {
        return 0;
      }
      // Generate a random start time between 0 and duration - 5
      return Math.floor(Math.random() * (duration - 5));
    }
    
    // Function to handle playing the audio and setting timeout
    function playAudioWithTimeout() {
      audioPlayer.currentTime = startTime;
      audioPlayer.play();
      // Set timeout to pause after 5 seconds
      timeoutID = setTimeout(function() {
        pauseAfter5Secs();
      }, 1000);
    }
    
    function pauseAfter5Secs() {
        if ((audioPlayer.currentTime - startTime) >= 5){
            audioPlayer.pause();
        } else {
            timeoutID = setTimeout(function() {
                pauseAfter5Secs();
            }, 100);
        }
    }

    function getNextMode(){
        modeIndex = modes.indexOf(mode)+1;
        if (modeIndex == modes.length){
            modeIndex = 0;
        }
        return modes[modeIndex];
    }

    function playRandomMP3() {
        if (fileList.length === 0){
            fetch(`${modesFolder[modes.indexOf(mode)]}/list.txt`)
                .then(response => response.text())
                .then(text => {
                    fileList = text.trim().split('\n');
                    const randomIndex = Math.floor(Math.random() * fileList.length);
                    const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                    audioPlayer.src = `${modesFolder[modes.indexOf(mode)]}/${randomFile}`;
                    playAudioWithTimeout();
                })
                .catch(error => {
                    console.error('Error fetching file list:', error);
                });
        } else {
            const randomIndex = Math.floor(Math.random() * fileList.length);
            const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
            audioPlayer.src = `${modesFolder[modes.indexOf(mode)]}/${randomFile}`;

            playAudioWithTimeout();
        }
    }

    function toggleDarkMode() {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        const darkModeIcon = document.getElementById("darkModeIcon");
        darkModeIcon.textContent = isDarkMode ? "☀️" : "🌙";
        
        // Update theme color in the HTML head
        const themeColor = isDarkMode ? "#333" : "#f0f0f0";
        document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
        
        // Save dark mode preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
    }
});


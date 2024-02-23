document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audioPlayer");
    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const skipButton = document.getElementById("skipButton");
    const darkModeButton = document.getElementById("darkModeButton");
    const jazzModeButton = document.getElementById("jazzMode");
    jazzMode = localStorage.getItem('jazzMode') === 'true';
    if (jazzMode) {
        jazzModeButton.textContent = "Neo-Soul Mode";
    } else {
        jazzModeButton.textContent = "Jazz Mode";
    }
    let audioPlayedOnce = false;
    let fileList = [];

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
            audioPlayer.play();
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
    jazzModeButton.addEventListener("click", function() {
        jazzMode = !jazzMode;
        fileList = [];
        localStorage.setItem('jazzMode', jazzMode);
        if (jazzMode) {
            jazzModeButton.textContent = "Neo-Soul Mode";
        } else {
            jazzModeButton.textContent = "Jazz Mode";
        }
    });

    document.addEventListener("keydown", function(event) {
        // Check if the pressed key is the spacebar (keyCode 32 or key " ")
        if (event.keyCode === 32 || event.key === " ") {
            // Prevent default behavior (e.g., scrolling the page)
            event.preventDefault();
            
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        }
    });
    document.addEventListener("click", function(event) {
        // Check if the clicked element is the document body
        if (event.target === document.body) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        }
    });
    
    

    function playRandomMP3() {
        if (jazzMode){playRandomjazzMode();return}
        
        if (fileList.length === 0) {
            // Fetch the list of MP3 files from x.txt
            fetch('x.txt')
                .then(response => response.text())
                .then(text => {
                    fileList = text.trim().split('\n');
                    playRandomMP3(); // Retry playing a random MP3 after fetching the list
                })
                .catch(error => {
                    console.error('Error fetching file list:', error);
                });
            return;
        }

        const randomIndex = Math.floor(Math.random() * fileList.length);
        const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
        audioPlayer.src = `mp3s/${randomFile}`;
        audioPlayer.play();
    }
    function playRandomjazzMode() {
        if (fileList.length === 0) {
            // Fetch the list of MP3 files from x.txt
            fetch('y.txt')
                .then(response => response.text())
                .then(text => {
                    fileList = text.trim().split('\n');
                    playRandomjazzMode(); // Retry playing a random MP3 after fetching the list
                })
                .catch(error => {
                    console.error('Error fetching file list:', error);
                });
            return;
        }

        const randomIndex = Math.floor(Math.random() * fileList.length);
        const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
        audioPlayer.src = `ezmp3s/${randomFile}`;
        audioPlayer.play();
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
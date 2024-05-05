document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audioPlayer");
    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const rewardButton = document.getElementById("rewardButton");
    const skipButton = document.getElementById("skipButton");
    const darkModeButton = document.getElementById("darkModeButton");
    const modeButton = document.getElementById("modeButton");
    const completedSpan = document.getElementById("completionCounter");
    const vibeModeButton = document.getElementById("vibeButton");
    const numberInput = document.getElementById("numberInput");
    const currentModeSpan = document.getElementById("currentMode");
    const sheetImage = document.getElementById("sheetImage");
    const techniqueText = document.getElementById("techniqueText");
    
    keepGoing = true;
    modes = ["All", "Jazz", "Full Neo-Soul", "Everything I Wanted", "Studio-Ghibi", "Literally Just Ichikia", "Nintendo", "Toby Fox", "sheet-music"];
    modesFolder = ["all", "ezmp3s", "fullNeoSoulMp3s", "everything-i-ever-wanted", "studio-ghibi", "nito", "nintendo", "undertalexdeltarune", "sheet-music"];
    mode = localStorage.getItem('mode');
    vibeMode = localStorage.getItem('vibeMode');
    if (vibeMode!="true") {vibeMode = false;}
    vibeModeButton.textContent = "Vibe "+((vibeMode) ? "Off" : "On");
    vibeTime = parseInt(numberInput.value);
    celebrateMode = false;
    completed = 0;
    //completionsNeeded = 5;
    completionsNeeded = Math.round(20*1.01**Math.trunc(((Date.now()/1000)-1714708800)/86400));
    if (mode) {
        modeButton.textContent = getNextMode();
        currentModeSpan.textContent = mode+" - ";
    } else {
        mode = modes[1];
    }
    if (mode == "sheet-music"){
        hideAudioShowSheet();
    }
    let audioPlayedOnce = false;
    let fileList = [];
    inspireOnLoad();
    audioPlayer.addEventListener('pause',function() { audioPlayer.isPlaying = false },false);
    audioPlayer.addEventListener('playing',function() { audioPlayer.isPlaying = true },false); 

    
    // Load dark mode preference from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#333');
        document.getElementById("darkModeIcon").textContent = "☀️";
    }
    function parseQueryString() {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      var queryString = {};
      for (var i=0; i<vars.length; i++) {
        var pair = vars[i].split("=");
        queryString[pair[0]] = pair[1];
      }
      return queryString;
    }

    
      var queryParams = parseQueryString();
      var hash = queryParams["hash"];
      if (hash) {
        // Use hash to navigate to content
        window.location.href = "#" + hash;
      }
    

    darkModeButton.addEventListener("click", function() {
        toggleDarkMode();
    });

    numberInput.addEventListener("change", function() {
        vibeTime = parseInt(numberInput.value);
    })

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
            // Mark hour as completed
            fetch('https://practice-reminder.azurewebsites.net/api/completed_hour?code=uweYVDnQ30h3dNkQhm6X7xVDtVycyiQah1GMoIL9gmzkAzFuViCmLQ==&completed=true', {
                method: 'GET',
                mode: 'no-cors' // This mode prevents CORS errors
              })
              .then(() => {
                console.log('Ping request sent successfully');
              })
              .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
              });
        }
    });
    vibeModeButton.addEventListener("click", function(){
        vibeMode = !vibeMode;
        localStorage.setItem('vibeMode', vibeMode);
        vibeModeButton.textContent = "Vibe "+((vibeMode) ? "Off" : "On");
    })
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
        startTime = getRandomStartTime(audioPlayer.duration);
        playRandomMP3();
        
        completed += 1;
        completedSpan.textContent = completed+"/"+completionsNeeded+" Completed"
        if (completed >= completionsNeeded){
            completedSpan.textContent = completed+"/"+completionsNeeded+" Completed :D 🎉🎉🎉"
            finishedSession();
        }
    });
    rewardButton.addEventListener("click", function() {
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
    });

    skipButton.addEventListener("click", function() {
        if (modesFolder[modes.indexOf(mode)] != "sheet-music") {
            startTime = getRandomStartTime(audioPlayer.duration);
        }
        playRandomMP3();
    });
    modeButton.addEventListener("click", function() {
        mode = getNextMode();
        localStorage.setItem('mode', mode);
        modeButton.textContent = getNextMode();
        currentModeSpan.textContent = mode+" - ";
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


    function inspireOnLoad() {
        if (window.location.hash.indexOf("inspire") > -1) {
            vibeMode = true;
            playRandomMP3();
            vibeMode = false;
        }
    }
    
        function quickSession() {
        if (window.location.hash.indexOf("quick") > -1) {
            completionsNeeded = 5
            completedSpan.textContent = completed+"/"+completionsNeeded+" Completed"
        }
    }
    quickSession()
    
    var timeoutID;
    var startTime = null;
    var currentSource = null;
    firstLoop = true;
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
      firstLoop = true;
      
      // Check if the source has changed
      if (audioPlayer.currentSrc !== currentSource) {
        currentSource = audioPlayer.currentSrc;
        // Set a new random start time if the source is new
        startTime = getRandomStartTime(duration);
      }
      
      // Call playAudioWithTimeout when metadata is loaded
      playAudioWithTimeout();
    }
    
    function finishedSession() {
        if (keepGoing == true) return;
        alert("Session completed :D")
        if (confirm("Wanna Celebrate with some music?")) {
            const randomIndex = Math.floor(Math.random() * fileList.length);
            const randomFile = fileList[randomIndex].trim();
            audioPlayer.src = `${modesFolder[modes.indexOf(mode)]}/${randomFile}`;
            audioPlayer.play();
            celebrateMode = true;
        } else if (confirm("Then wanna keep going?")) {
            keepGoing = true
        } else {
            if(!alert("alright, have fun :D")) window.open('', '_parent', '').close();;
        }
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

        clearTimeout(timeoutID);
        if (celebrateMode) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else if (vibeMode) {
            if (firstLoop) {
                audioPlayer.currentTime = (((startTime - vibeTime)>0) ? startTime - vibeTime : 0);
            
                audioPlayer.play();
                // Set timeout to pause after 5 seconds
                timeoutID = setTimeout(function() {
                    pauseAfterCertainTimeInSecs((Date.now()/1000), (((startTime - vibeTime)>0) ? vibeTime : startTime)+5)
                }, 1000);
                firstLoop = false;
            } else {
                audioPlayer.currentTime = startTime;
                audioPlayer.play();
                // Set timeout to pause after 5 seconds
                timeoutID = setTimeout(function() {
                    pauseAfterCertainTimeInSecs((Date.now()/1000), 5)
                }, 1000);
            }
        } else {
            audioPlayer.currentTime = startTime;
            audioPlayer.play();
            // Set timeout to pause after 5 seconds
            timeoutID = setTimeout(function() {
                pauseAfterCertainTimeInSecs((Date.now()/1000), 5)
            }, 1000);
            firstLoop = false;
        }
    }
    
    function pauseAfterCertainTimeInSecs(actualStartTime, timeInSecs) {
        console.log(timeInSecs);
        if (((Date.now()/1000) - actualStartTime) >= timeInSecs){
            audioPlayer.pause();
        } else {
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function() {
                pauseAfterCertainTimeInSecs(actualStartTime,timeInSecs);
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

    function hideAudioShowSheet() {
        audioPlayer.src = "";
        techniqueText.classList.add("hidden");
        techniqueText.classList.remove("shown");
        audioPlayer.classList.add("hidden");
        audioPlayer.classList.remove("shown");
        sheetImage.classList.remove("hidden");
        sheetImage.classList.add("shown");
    }
    function hideSheetShowAudio() {
        techniqueText.classList.add("hidden");
        techniqueText.classList.remove("shown");
        sheetImage.classList.add("hidden");
        sheetImage.classList.remove("shown");
        audioPlayer.classList.remove("hidden");
        audioPlayer.classList.add("shown");
    }
    function hideAllShowText() {
        techniqueText.classList.add("shown");
        techniqueText.classList.remove("hidden");
        sheetImage.classList.add("hidden");
        sheetImage.classList.remove("shown");
        audioPlayer.classList.remove("shown");
        audioPlayer.classList.add("hidden");
    }
    function playRandomMP3() {
        list = "list.txt"
        
        if (modesFolder[modes.indexOf(mode)] == "all/..") {
            modesFolder[modes.indexOf(mode)] = "all"
        }
        if (modesFolder[modes.indexOf(mode)] == "all") {
            if (Math.random() > 0.20){
                fetch(`${modesFolder[modes.indexOf(mode)]}/${list}`)
                    .then(response => response.text())
                    .then(text => {
                        fileList = text.trim().split('\n');
                        index = fileList.indexOf('sheet-music');
                        if (index !== -1) {
                            removedItem = fileList.splice(index, 1)[0];
                            randomIndex = Math.floor(Math.random() * fileList.length);
                            randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                            fileList.splice(index, 0, removedItem);
                        } else {
                            randomIndex = Math.floor(Math.random() * fileList.length);
                            randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        }
                        list = randomFile
                        modesFolder[modes.indexOf(mode)] = "all/.."
                        fileList = []
                        fetch(`${modesFolder[modes.indexOf(mode)]}/${list}`)
                        // fetch("all/../studio-ghibi/list.txt")
                            .then(response => response.text())
                            .then(text => {
                                fileList = text.trim().split('\n');
                                const randomIndex = Math.floor(Math.random() * fileList.length);
                                randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                                audioPlayer.src = `${list.replace("/list.txt", "")}/${randomFile.replace("/list.txt", "")}`;
                                hideSheetShowAudio();
                                playAudioWithTimeout();
                            })
                            .catch(error => {
                                console.error('Error fetching file list:', error);
                            });
                        })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                });
            } else if (Math.random() > 0.10) {
                fileList= [];
                if (fileList.length === 0){
                    fetch(`${modesFolder[modes.indexOf("sheet-music")]}/${list}`)
                    // fetch("all/../studio-ghibi/list.txt")
                        .then(response => response.text())
                        .then(text => {
                
                            fileList = text.trim().split('\n');
                            console.log(fileList)
                            const randomIndex = Math.floor(Math.random() * fileList.length);
                            randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                            sheetImage.src = `${modesFolder[modes.indexOf("sheet-music")]}/${randomFile}`;
                            hideAudioShowSheet();
                        })
                        .catch(error => {
                            console.error('Error fetching file list:', error);
                        });
                } else {
                    const randomIndex = Math.floor(Math.random() * fileList.length);
                    const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                    sheetImage.src = `${modesFolder[modes.indexOf(mode)]}/${randomFile}`;
                    hideAudioShowSheet();
                    playAudioWithTimeout();
                }
            } else {
                hideAllShowText();
                chords = ["Ascending Chords in A major", "Ascending Chords in A minor", "Ascending Chords in A# major", "Ascending Chords in A# minor", "Ascending Chords in B major", "Ascending Chords in B minor", "Ascending Chords in C major", "Ascending Chords in C minor", "Ascending Chords in C# major", "Ascending Chords in C# minor", "Ascending Chords in D major", "Ascending Chords in D minor", "Ascending Chords in D# major", "Ascending Chords in D# minor", "Ascending Chords in E major", "Ascending Chords in E minor", "Ascending Chords in F major", "Ascending Chords in F minor", "Ascending Chords in F# major", "Ascending Chords in F# minor", "Ascending Chords in G major", "Ascending Chords in G minor", "Ascending Chords in G# major", "Ascending Chords in G# minor", "Descending Chords in A major", "Descending Chords in A minor", "Descending Chords in A# major", "Descending Chords in A# minor", "Descending Chords in B major", "Descending Chords in B minor", "Descending Chords in C major", "Descending Chords in C minor", "Descending Chords in C# major", "Descending Chords in C# minor", "Descending Chords in D major", "Descending Chords in D minor", "Descending Chords in D# major", "Descending Chords in D# minor", "Descending Chords in E major", "Descending Chords in E minor", "Descending Chords in F major", "Descending Chords in F minor", "Descending Chords in F# major", "Descending Chords in F# minor", "Descending Chords in G major", "Descending Chords in G minor", "Descending Chords in G# major", "Descending Chords in G# minor"]
                chords = ['Ascending 7th Chords in Bb Minor', 'Ascending 7th Chords in C Major', 'Ascending 7th Chords in F# Major', 'Ascending 7th Chords in B Minor', 'Ascending 7th Chords in G Major', 'Ascending 7th Chords in Db Major', 'Ascending 7th Chords in D Minor', 'Ascending 7th Chords in C# Minor', 'Ascending 7th Chords in A Minor', 'Ascending 7th Chords in B Major', 'Ascending 7th Chords in D Major', 'Ascending 7th Chords in Ab Major', 'Ascending 7th Chords in G# Minor', 'Ascending 7th Chords in Bb Major', 'Ascending 7th Chords in C Minor', 'Ascending 7th Chords in F# Minor', 'Ascending 7th Chords in G Minor', 'Ascending 7th Chords in A Major']
                techniqueExercises = [
                    chords,
                    ['Spider Exercise 1234', 'Spider Exercise 1243', 'Spider Exercise 1324', 'Spider Exercise 1342', 'Spider Exercise 1423', 'Spider Exercise 1432', 'Spider Exercise 2134', 'Spider Exercise 2143', 'Spider Exercise 2314', 'Spider Exercise 2341', 'Spider Exercise 2413', 'Spider Exercise 2431', 'Spider Exercise 3124', 'Spider Exercise 3142', 'Spider Exercise 3214', 'Spider Exercise 3241', 'Spider Exercise 3412', 'Spider Exercise 3421', 'Spider Exercise 4123', 'Spider Exercise 4132', 'Spider Exercise 4213', 'Spider Exercise 4231', 'Spider Exercise 4312', 'Spider Exercise 4321', 'Diagonal Spider Exercise 1234', 'Diagonal Spider Exercise 1243', 'Diagonal Spider Exercise 1324', 'Diagonal Spider Exercise 1342', 'Diagonal Spider Exercise 1423', 'Diagonal Spider Exercise 1432', 'Diagonal Spider Exercise 2134', 'Diagonal Spider Exercise 2143', 'Diagonal Spider Exercise 2314', 'Diagonal Spider Exercise 2341', 'Diagonal Spider Exercise 2413', 'Diagonal Spider Exercise 2431', 'Diagonal Spider Exercise 3124', 'Diagonal Spider Exercise 3142', 'Diagonal Spider Exercise 3214', 'Diagonal Spider Exercise 3241', 'Diagonal Spider Exercise 3412', 'Diagonal Spider Exercise 3421', 'Diagonal Spider Exercise 4123', 'Diagonal Spider Exercise 4132', 'Diagonal Spider Exercise 4213', 'Diagonal Spider Exercise 4231', 'Diagonal Spider Exercise 4312', 'Diagonal Spider Exercise 4321']
                ];
                temp = techniqueExercises[Math.floor(Math.random() * techniqueExercises.length)];
                temp = temp[Math.floor(Math.random() * temp.length)];
                techniqueText.textContent = temp+" at "+(55+Math.floor((Date.now()/1000)/86400)-19844)+" bpm";
                if (temp.includes("Chords")){
                    sheetImage.src = "Chords/"+temp.replace("#", "Sharp")+".png";
                    sheetImage.classList.add("shown");
                    sheetImage.classList.remove("hidden");
                }
            }
            
            
        } else if (modesFolder[modes.indexOf(mode)] == "sheet-music") {
            fileList= [];
            if (fileList.length === 0){
                fetch(`${modesFolder[modes.indexOf(mode)]}/${list}`)
                // fetch("all/../studio-ghibi/list.txt")
                    .then(response => response.text())
                    .then(text => {
            
                        fileList = text.trim().split('\n');
                        console.log(fileList)
                        const randomIndex = Math.floor(Math.random() * fileList.length);
                        randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        sheetImage.src = `${modesFolder[modes.indexOf(mode)]}/${randomFile}`;
                        hideAudioShowSheet();
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                    });
            } else {
                const randomIndex = Math.floor(Math.random() * fileList.length);
                const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                sheetImage.src = `${modesFolder[modes.indexOf(mode)]}/${randomFile}`;
                hideAudioShowSheet();
                playAudioWithTimeout();
            }
        }
        else {
            if (fileList.length === 0){
                fetch(`${modesFolder[modes.indexOf(mode)]}/${list}`)
                // fetch("all/../studio-ghibi/list.txt")
                    .then(response => response.text())
                    .then(text => {
            
                        fileList = text.trim().split('\n');
                        console.log(fileList)
                        const randomIndex = Math.floor(Math.random() * fileList.length);
                        randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        audioPlayer.src = `${modesFolder[modes.indexOf(mode)]}/${randomFile}`;
                        hideSheetShowAudio();
                        playAudioWithTimeout();
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                    });
            } else {
                const randomIndex = Math.floor(Math.random() * fileList.length);
                const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                audioPlayer.src = `${modesFolder[modes.indexOf(mode)]}/${randomFile}`;
                hideSheetShowAudio();
                playAudioWithTimeout();
            }
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


document.addEventListener("DOMContentLoaded", function () {
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
    const osmdIframe = document.getElementById("osmdIframe");
    const tempOsmdContainer = document.getElementById("tempOsmdContainer");
    const revealSheet = document.getElementById("revealSheet");
    const defaultTimeout = 7;
    var fileHost = "https://raw.githubusercontent.com/MaxDevv/Music-Thingy/main/";
    // check if host is 127.0.0.1 or localhost or 0.0.0.0 or smth like that and set fileHost to nothing if true
    if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost" || window.location.hostname === "0.0.0.0") {
        fileHost = "../";
    }
    
    const corsProxy = ``;
    keepGoing = true;
    modes = ["All", "Jazz", "Full Neo-Soul", "Everything I Wanted", "Studio-Ghibi", "Literally Just Ichikia", "Nintendo", "Toby Fox", "sheet-music", "Music-Backing-Tracks", "jazz"];
    modesFolder = ["all", "ezmp3s", "fullNeoSoulMp3s", "everything-i-ever-wanted", "studio-ghibi", "nito", "nintendo", "undertalexdeltarune", "sheet-music", "Music-Backing-Tracks", "jazz"];
    specialModesFolder = ["all", "sheet-music", "Music-Backing-Tracks"];
    plainModesFolder = modesFolder.filter(item => !specialModesFolder.includes(item));
    mode = localStorage.getItem('mode');
    vibeMode = localStorage.getItem('vibeMode');
    if (vibeMode != "true") { vibeMode = false; }
    vibeModeButton.textContent = "Vibe " + ((vibeMode) ? "Off" : "On");
    vibeTime = parseInt(numberInput.value);
    celebrateMode = false;
    completed = 0;
    var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("tempOsmdContainer");
        osmd.setOptions({
            backend: "svg",
            drawTitle: false,
            drawingParameters: "compacttight",
            autoResize: true // don't display title, composer etc., smaller margins
        });

    //completionsNeeded = 5;
                completionsNeeded = Math.round(20 * 1.02 ** ((((Date.now() / 1000) - 1714708800) / 86400)+9));
    completedSpan.textContent = completed + "/" + completionsNeeded + " Completed";
    if (mode) {
        modeButton.textContent = getNextMode();
        currentModeSpan.textContent = mode + " - ";
    } else {
        mode = modes[1];
    }
    if (mode == "sheet-music") {
        hideAudioShowSheet();
    }
    let audioPlayedOnce = false;
    let fileList = [];
    inspireOnLoad();
    audioPlayer.addEventListener('pause', function () { audioPlayer.isPlaying = false }, false);
    audioPlayer.addEventListener('playing', function () { audioPlayer.isPlaying = true }, false);


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
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            queryString[pair[0]] = pair[1];
        }
        return queryString;
    }
    function getRandomDifficulty() {
        diffucilty = [1, (Math.floor(Math.round((((Date.now() / 1000) - 1716068447) / 86400))/10)-3), 10].sort((a,b) => a-b)[1];
        return diffucilty;
    }
    function loadSheet(source) {
        if (tempOsmdContainer.classList.contains("hidden")){
            wasHidden = true;
        }
        showSheet();
        osmd.load(source)
                    .then(function() {
                        tempOsmdContainer.style.width = "100%";
                        osmd.render();
                        scoreWidth = String(parseInt(osmd.graphic.musicPages[0].musicSystems[0].PositionAndShape.size.width)*10);
                        scoreWidth = scoreWidth.concat("px");
                        tempOsmdContainer.style.width = scoreWidth;
                        osmd.render();
                        
                        adjustStyles();
                        if (wasHidden) {
                            hideSheet();
                        }
                    });
        
    }
    // iframe load
    function loadRandomSheet(difficulty) {
        difficulty = difficulty || getRandomDifficulty();
        
        var folder = "sheet-music/" + difficulty + "/";
        fetch(corsProxy + encodeURIComponent(fileHost + folder + "/list.txt"))
        // fetch("all/../studio-ghibi/list.txt")
        .then(response => response.text())
            .then(text => {
                fileList = text.trim().split('\n');
                console.log(fileList)
                const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                randomFile = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(folder + randomFile));
                loadSheet(randomFile);
            });
    }
    loadRandomSheet();
        // Function to adjust styles
        
        const adjustStyles = () => {
            const osmdCanvasPage1 = document.getElementById('osmdCanvasPage1');
            const osmdSvgPage1 = document.getElementById('osmdSvgPage1');
    
            if (osmdCanvasPage1) {
              osmdCanvasPage1.style.width = '100%';
            }
    
            if (osmdSvgPage1) {
              osmdSvgPage1.setAttribute('width', '100%');
              osmdSvgPage1.setAttribute('height', 'auto');
            }
          };
    
          // Observe changes to the tempOsmdContainer
          const observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
              if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                adjustStyles();
              }
            }
          });
    
          observer.observe(tempOsmdContainer, { childList: true, subtree: true });
      var queryParams = parseQueryString();
      var hash = queryParams["hash"];
      if (hash) {
          // Use hash to navigate to content
          window.location.href = "#" + hash;
      }

    darkModeButton.addEventListener("click", function () {
        toggleDarkMode();
    });

    numberInput.addEventListener("change", function () {
        vibeTime = parseInt(numberInput.value);
    })

    startButton.addEventListener("click", function () {
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
    vibeModeButton.addEventListener("click", function () {
        vibeMode = !vibeMode;
        localStorage.setItem('vibeMode', vibeMode);
        vibeModeButton.textContent = "Vibe " + ((vibeMode) ? "Off" : "On");
    })
    nextButton.addEventListener("click", function () {
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
        completedSpan.textContent = completed + "/" + completionsNeeded + " Completed"
        if (completed >= completionsNeeded) {
            completedSpan.textContent = completed + "/" + completionsNeeded + " Completed :D 🎉🎉🎉"
            finishedSession();
        }
    });
    rewardButton.addEventListener("click", function () {
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

    skipButton.addEventListener("click", function () {
        if (modesFolder[modes.indexOf(mode)] != "sheet-music") {
            startTime = getRandomStartTime(audioPlayer.duration);
        }
        playRandomMP3();
    });
    modeButton.addEventListener("click", function () {
        mode = getNextMode();
        localStorage.setItem('mode', mode);
        modeButton.textContent = getNextMode();
        currentModeSpan.textContent = mode + " - ";
        fileList = [];
    });

    revealSheet.addEventListener("click", function () {
        showSheet();
    });

    document.addEventListener("keydown", function (event) {
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
    document.addEventListener("click", function (event) {
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
            completedSpan.textContent = completed + "/" + completionsNeeded + " Completed"
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
            const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
            const randomFile = fileList[randomIndex].trim();
            audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf(mode)]}/${randomFile}`));
            audioPlayer.play();
            celebrateMode = true;
        } else if (confirm("Then wanna keep going?")) {
            keepGoing = true
        } else {
            if (!alert("alright, have fun :D")) window.open('', '_parent', '').close();;
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
        if (duration < timeout) {
            return 0;
        }
        // Generate a random start time between 0 and duration - 5
        return Math.floor(Math.random(486783555478) * (duration - timeout));
    }

    // Function to handle playing the audio and setting timeout
    function playAudioWithTimeout() {
        clearTimeout(timeoutID);
        if (celebrateMode) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else if (vibeMode) {
            if (firstLoop) {
                audioPlayer.currentTime = (((startTime - vibeTime) > 0) ? startTime - vibeTime : 0);

                audioPlayer.play();
                // Set timeout to pause after timeout seconds
                timeoutID = setTimeout(function () {
                    pauseAfterCertainTimeInSecs((Date.now() / 1000), (((startTime - vibeTime) > 0) ? vibeTime : startTime) + timeout)
                }, 1000);
                firstLoop = false;
            } else {
                audioPlayer.currentTime = startTime;
                audioPlayer.play();
                // Set timeout to pause after timeout seconds
                timeoutID = setTimeout(function () {
                    pauseAfterCertainTimeInSecs((Date.now() / 1000), timeout)
                }, 1000);
            }
        } else {
            audioPlayer.currentTime = startTime;
            audioPlayer.play();
            // Set timeout to pause after timeout seconds
            timeoutID = setTimeout(function () {
                pauseAfterCertainTimeInSecs((Date.now() / 1000), timeout)
            }, 1000);
            firstLoop = false;
        }
    }
    // Function to handle playing the audio and setting timeout
    function playAudioWithCustomTimeout(x) {
        timeout = x;
        playAudioWithTimeout();
        
    }
    function playAudioWithoutTimeout() {
        audioPlayer.play();
    }
    function pauseAfterCertainTimeInSecs(actualStartTime, timeInSecs) {
        console.log(timeInSecs);
        if (((Date.now() / 1000) - actualStartTime) >= timeInSecs) {
            audioPlayer.pause();
            timeout = defaultTimeout;
        } else {
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                pauseAfterCertainTimeInSecs(actualStartTime, timeInSecs);
            }, 100);
        }
    }

    function getNextMode() {
        modeIndex = modes.indexOf(mode) + 1;
        if (modeIndex == modes.length) {
            modeIndex = 0;
        }
        return modes[modeIndex];
    }

    function hideAudio() {
        audioPlayer.src = encodeURIComponent("");
        audioPlayer.classList.add("hidden");
        audioPlayer.classList.remove("shown");
    }

    function showSheet() {
        tempOsmdContainer.classList.remove("hidden");
        tempOsmdContainer.classList.add("shown");
    }

    function hideSheet() {
        tempOsmdContainer.classList.add("hidden");
        tempOsmdContainer.classList.remove("shown");
    }

    function showAudio() {
        audioPlayer.classList.remove("hidden");
        audioPlayer.classList.add("shown");
    }

    function hideSheetButton() {
        revealSheet.classList.add("hidden");
        revealSheet.classList.remove("shown");
    }
    function showSheetButton() {
        revealSheet.classList.add("shown");
        revealSheet.classList.remove("hidden");
    }

    function hideAll() {
        techniqueText.classList.add("hidden");
        techniqueText.classList.remove("shown");
        tempOsmdContainer.classList.add("hidden");
        tempOsmdContainer.classList.remove("shown");
        audioPlayer.classList.add("hidden");
        audioPlayer.classList.remove("shown");
    }

    function hideAudioShowSheet() {
        hideAudio();
        hideKeyText();
        tips();
        showSheet();
    }

    function hideSheetShowAudio() {
        hideSheet();
        hideKeyText();
        tips();
        showAudio();
    }

    function hideAllShowText() {
        hideAll();
        hideKeyText();
        tips();
    }


    function hideKeyText() {
        keyText.classList.add("hidden");
        keyText.classList.remove("shown");
    }

    function tips(){
        alwaysRemember = "Stay Confident, Play Like Air, And Alternate Pick!";
        if (!techniqueText.classList.contains("shown") || techniqueText.innerText.includes("Start :D")) {
            techniqueText.innerText = alwaysRemember;
            techniqueText.classList.add("shown");
            techniqueText.classList.remove("hidden");
        } else if (!techniqueText.innerText.includes(alwaysRemember)) techniqueText.innerText += "\n "+alwaysRemember;
    }
    function encodeURIComponent(f){
        return f;
    }
    function playRandomMP3() {
        play();
    }
    function play() {
        list = "list.txt"
        timeout = defaultTimeout;

        if (modesFolder[modes.indexOf(mode)] == "all/..") {
            modesFolder[modes.indexOf(mode)] = "all"
        }
        if (modesFolder[modes.indexOf(mode)] == "all") {
            practiceType = Math.random(486783555478);
            practiceType = 0.36;
            if (practiceType > 0.35) {
                // select a random mp3 file from the ear-training-sources folder the musicxml will be stored under the same filename just swap the extension
                fetch(corsProxy + encodeURIComponent(fileHost + "ear-training-sources/list.txt"))
                        // fetch("all/../studio-ghibi/list.txt")
                        .then(response => response.text())
                        .then(text => {
                            randomFile = "";
                            while (randomFile.toLowerCase().indexOf("mp3") == -1) {
                                fileList = text.trim().split('\n');
                                const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                                randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                            }
                            audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`ear-training-sources/${randomFile}`));
                            hideAll();
                            showAudio();
                            playAudioWithoutTimeout();
                            loadSheet(corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`ear-training-sources/${randomFile.replace(new RegExp(".mp3"+ '$'), '.musicxml')}`)));
                            showSheetButton();
                        })
                        .catch(error => {
                            console.error('Error fetching file list:', error);
                        });
            } else if (practiceType > 0.25) {
                fileList = [];
                // if (fileList.length === 0) {
                //     fetch(corsProxy + encodeURIComponent(fileHost + `${modesFolder[modes.indexOf("sheet-music")]}/${list}`))
                //         // fetch("all/../studio-ghibi/list.txt")
                //         .then(response => response.text())
                //         .then(text => {

                //             fileList = text.trim().split('\n');
                //             console.log(fileList)
                //             const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                //             randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                //             sheetImage.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf("sheet-music")]}/${randomFile}`));
                //             hideAudioShowSheet();
                //             audioPlayer.pause();
                //         })
                //         .catch(error => {
                //             console.error('Error fetching file list:', error);
                //         });
                // } else {
                //     const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                //     const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                //     sheetImage.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf(mode)]}/${randomFile}`));
                //     hideAudioShowSheet();
                //     playAudioWithTimeout();
                // }
                loadRandomSheet();
                hideAll();
                showSheet();
                audioPlayer.pause();

                
            } else if (practiceType > 0.15) {
                oldMode = mode;
                mode = "Music-Backing-Tracks";
                fileList = [];
                if (fileList.length === 0) {
                    fetch(corsProxy + encodeURIComponent(fileHost + `${modesFolder[modes.indexOf(mode)]}/${list}`))
                        // fetch("all/../studio-ghibi/list.txt")
                        .then(response => response.text())
                        .then(text => {
    
                            fileList = text.trim().split('\n');
                            console.log(fileList)
                            const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                            randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                            audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf(mode)]}/${randomFile}`));
                            keyText.innerHTML = "<summary>Key: </summary>"+randomFile;
                            hideSheetShowAudio();
                            keyText.classList.add("shown");
                            keyText.classList.remove("hidden");
                            playAudioWithCustomTimeout(100);
                            mode = oldMode;
                        })
                        .catch(error => {
                            console.error('Error fetching file list:', error);
                        });
                } else {
                    const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                    const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                    audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf(mode)]}/${randomFile}`));
                    keyText.innerHTML = "<summary>Key: </summary>"+randomFile;
                    hideSheetShowAudio();
                    keyText.classList.add("shown");
                    keyText.classList.remove("hidden");
                    playAudioWithCustomTimeout(120+(Math.random()*30));

                    mode = oldMode;
                }
            } else {
                hideAllShowText();
                chords = ["Ascending Chords in A major", "Ascending Chords in A minor", "Ascending Chords in A# major", "Ascending Chords in A# minor", "Ascending Chords in B major", "Ascending Chords in B minor", "Ascending Chords in C major", "Ascending Chords in C minor", "Ascending Chords in C# major", "Ascending Chords in C# minor", "Ascending Chords in D major", "Ascending Chords in D minor", "Ascending Chords in D# major", "Ascending Chords in D# minor", "Ascending Chords in E major", "Ascending Chords in E minor", "Ascending Chords in F major", "Ascending Chords in F minor", "Ascending Chords in F# major", "Ascending Chords in F# minor", "Ascending Chords in G major", "Ascending Chords in G minor", "Ascending Chords in G# major", "Ascending Chords in G# minor", "Descending Chords in A major", "Descending Chords in A minor", "Descending Chords in A# major", "Descending Chords in A# minor", "Descending Chords in B major", "Descending Chords in B minor", "Descending Chords in C major", "Descending Chords in C minor", "Descending Chords in C# major", "Descending Chords in C# minor", "Descending Chords in D major", "Descending Chords in D minor", "Descending Chords in D# major", "Descending Chords in D# minor", "Descending Chords in E major", "Descending Chords in E minor", "Descending Chords in F major", "Descending Chords in F minor", "Descending Chords in F# major", "Descending Chords in F# minor", "Descending Chords in G major", "Descending Chords in G minor", "Descending Chords in G# major", "Descending Chords in G# minor"]
                chords = ['Ascending 7th Chords in Bb Minor', 'Ascending 7th Chords in C Major', 'Ascending 7th Chords in F# Major', 'Ascending 7th Chords in B Minor', 'Ascending 7th Chords in G Major', 'Ascending 7th Chords in Db Major', 'Ascending 7th Chords in D Minor', 'Ascending 7th Chords in C# Minor', 'Ascending 7th Chords in A Minor', 'Ascending 7th Chords in B Major', 'Ascending 7th Chords in D Major', 'Ascending 7th Chords in Ab Major', 'Ascending 7th Chords in G# Minor', 'Ascending 7th Chords in Bb Major', 'Ascending 7th Chords in C Minor', 'Ascending 7th Chords in F# Minor', 'Ascending 7th Chords in G Minor', 'Ascending 7th Chords in A Major']
                chords.push(55);
                techniqueExercises = [
                    ["Alternating Diagonal hand exercise", 37],
                    /*["Ascending Diads in A major, on the B & E String", "Ascending Diads in A minor, on the B & E String", "Ascending Diads in A# major, on the B & E String", "Ascending Diads in A# minor, on the B & E String", "Ascending Diads in B major, on the B & E String", "Ascending Diads in B minor, on the B & E String", "Ascending Diads in C major, on the B & E String", "Ascending Diads in C minor, on the B & E String", "Ascending Diads in C# major, on the B & E String", "Ascending Diads in C# minor, on the B & E String", "Ascending Diads in D major, on the B & E String", "Ascending Diads in D minor, on the B & E String", "Ascending Diads in D# major, on the B & E String", "Ascending Diads in D# minor, on the B & E String", "Ascending Diads in E major, on the B & E String", "Ascending Diads in E minor, on the B & E String", "Ascending Diads in F major, on the B & E String", "Ascending Diads in F minor, on the B & E String", "Ascending Diads in F# major, on the B & E String", "Ascending Diads in F# minor, on the B & E String", "Ascending Diads in G major, on the B & E String", "Ascending Diads in G minor, on the B & E String", "Ascending Diads in G# major, on the B & E String", "Ascending Diads in G# minor, on the B & E String", "Descending Diads in A major, on the B & E String", "Descending Diads in A minor, on the B & E String", "Descending Diads in A# major, on the B & E String", "Descending Diads in A# minor, on the B & E String", "Descending Diads in B major, on the B & E String", "Descending Diads in B minor, on the B & E String", "Descending Diads in C major, on the B & E String", "Descending Diads in C minor, on the B & E String", "Descending Diads in C# major, on the B & E String", "Descending Diads in C# minor, on the B & E String", "Descending Diads in D major, on the B & E String", "Descending Diads in D minor, on the B & E String", "Descending Diads in D# major, on the B & E String", "Descending Diads in D# minor, on the B & E String", "Descending Diads in E major, on the B & E String", "Descending Diads in E minor, on the B & E String", "Descending Diads in F major, on the B & E String", "Descending Diads in F minor, on the B & E String", "Descending Diads in F# major, on the B & E String", "Descending Diads in F# minor, on the B & E String", "Descending Diads in G major, on the B & E String", "Descending Diads in G minor, on the B & E String", "Descending Diads in G# major, on the B & E String", "Descending Diads in G# minor, on the B & E String"],
                    ["Ascending Diads in A major, on the G & B String", "Ascending Diads in A minor, on the G & B String", "Ascending Diads in A# major, on the G & B String", "Ascending Diads in A# minor, on the G & B String", "Ascending Diads in B major, on the G & B String", "Ascending Diads in B minor, on the G & B String", "Ascending Diads in C major, on the G & B String", "Ascending Diads in C minor, on the G & B String", "Ascending Diads in C# major, on the G & B String", "Ascending Diads in C# minor, on the G & B String", "Ascending Diads in D major, on the G & B String", "Ascending Diads in D minor, on the G & B String", "Ascending Diads in D# major, on the G & B String", "Ascending Diads in D# minor, on the G & B String", "Ascending Diads in E major, on the G & B String", "Ascending Diads in E minor, on the G & B String", "Ascending Diads in F major, on the G & B String", "Ascending Diads in F minor, on the G & B String", "Ascending Diads in F# major, on the G & B String", "Ascending Diads in F# minor, on the G & B String", "Ascending Diads in G major, on the G & B String", "Ascending Diads in G minor, on the G & B String", "Ascending Diads in G# major, on the G & B String", "Ascending Diads in G# minor, on the G & B String", "Descending Diads in A major, on the G & B String", "Descending Diads in A minor, on the G & B String", "Descending Diads in A# major, on the G & B String", "Descending Diads in A# minor, on the G & B String", "Descending Diads in B major, on the G & B String", "Descending Diads in B minor, on the G & B String", "Descending Diads in C major, on the G & B String", "Descending Diads in C minor, on the G & B String", "Descending Diads in C# major, on the G & B String", "Descending Diads in C# minor, on the G & B String", "Descending Diads in D major, on the G & B String", "Descending Diads in D minor, on the G & B String", "Descending Diads in D# major, on the G & B String", "Descending Diads in D# minor, on the G & B String", "Descending Diads in E major, on the G & B String", "Descending Diads in E minor, on the G & B String", "Descending Diads in F major, on the G & B String", "Descending Diads in F minor, on the G & B String", "Descending Diads in F# major, on the G & B String", "Descending Diads in F# minor, on the G & B String", "Descending Diads in G major, on the G & B String", "Descending Diads in G minor, on the G & B String", "Descending Diads in G# major, on the G & B String", "Descending Diads in G# minor, on the G & B String", "Ascending Diads in A major, on the D & G String", "Ascending Diads in A minor, on the D & G String", "Ascending Diads in A# major, on the D & G String", "Ascending Diads in A# minor, on the D & G String", "Ascending Diads in B major, on the D & G String", "Ascending Diads in B minor, on the D & G String", "Ascending Diads in C major, on the D & G String", "Ascending Diads in C minor, on the D & G String", "Ascending Diads in C# major, on the D & G String", "Ascending Diads in C# minor, on the D & G String", "Ascending Diads in D major, on the D & G String", "Ascending Diads in D minor, on the D & G String", "Ascending Diads in D# major, on the D & G String", "Ascending Diads in D# minor, on the D & G String", "Ascending Diads in E major, on the D & G String", "Ascending Diads in E minor, on the D & G String", "Ascending Diads in F major, on the D & G String", "Ascending Diads in F minor, on the D & G String", "Ascending Diads in F# major, on the D & G String", "Ascending Diads in F# minor, on the D & G String", "Ascending Diads in G major, on the D & G String", "Ascending Diads in G minor, on the D & G String", "Ascending Diads in G# major, on the D & G String", "Ascending Diads in G# minor, on the D & G String", "Descending Diads in A major, on the D & G String", "Descending Diads in A minor, on the D & G String", "Descending Diads in A# major, on the D & G String", "Descending Diads in A# minor, on the D & G String", "Descending Diads in B major, on the D & G String", "Descending Diads in B minor, on the D & G String", "Descending Diads in C major, on the D & G String", "Descending Diads in C minor, on the D & G String", "Descending Diads in C# major, on the D & G String", "Descending Diads in C# minor, on the D & G String", "Descending Diads in D major, on the D & G String", "Descending Diads in D minor, on the D & G String", "Descending Diads in D# major, on the D & G String", "Descending Diads in D# minor, on the D & G String", "Descending Diads in E major, on the D & G String", "Descending Diads in E minor, on the D & G String", "Descending Diads in F major, on the D & G String", "Descending Diads in F minor, on the D & G String", "Descending Diads in F# major, on the D & G String", "Descending Diads in F# minor, on the D & G String", "Descending Diads in G major, on the D & G String", "Descending Diads in G minor, on the D & G String", "Descending Diads in G# major, on the D & G String", "Descending Diads in G# minor, on the D & G String", 30],
                    */
                    ["Ascending Diads in A major, on the B & E String", "Ascending Diads in A minor, on the B & E String", "Ascending Diads in A# major, on the B & E String", "Ascending Diads in A# minor, on the B & E String", "Ascending Diads in B major, on the B & E String", "Ascending Diads in B minor, on the B & E String", "Ascending Diads in C major, on the B & E String", "Ascending Diads in C minor, on the B & E String", "Ascending Diads in C# major, on the B & E String", "Ascending Diads in C# minor, on the B & E String", "Ascending Diads in D major, on the B & E String", "Ascending Diads in D minor, on the B & E String", "Ascending Diads in D# major, on the B & E String", "Ascending Diads in D# minor, on the B & E String", "Ascending Diads in E major, on the B & E String", "Ascending Diads in E minor, on the B & E String", "Ascending Diads in F major, on the B & E String", "Ascending Diads in F minor, on the B & E String", "Ascending Diads in F# major, on the B & E String", "Ascending Diads in F# minor, on the B & E String", "Ascending Diads in G major, on the B & E String", "Ascending Diads in G minor, on the B & E String", "Ascending Diads in G# major, on the B & E String", "Ascending Diads in G# minor, on the B & E String", "Descending Diads in A major, on the B & E String", "Descending Diads in A minor, on the B & E String", "Descending Diads in A# major, on the B & E String", "Descending Diads in A# minor, on the B & E String", "Descending Diads in B major, on the B & E String", "Descending Diads in B minor, on the B & E String", "Descending Diads in C major, on the B & E String", "Descending Diads in C minor, on the B & E String", "Descending Diads in C# major, on the B & E String", "Descending Diads in C# minor, on the B & E String", "Descending Diads in D major, on the B & E String", "Descending Diads in D minor, on the B & E String", "Descending Diads in D# major, on the B & E String", "Descending Diads in D# minor, on the B & E String", "Descending Diads in E major, on the B & E String", "Descending Diads in E minor, on the B & E String", "Descending Diads in F major, on the B & E String", "Descending Diads in F minor, on the B & E String", "Descending Diads in F# major, on the B & E String", "Descending Diads in F# minor, on the B & E String", "Descending Diads in G major, on the B & E String", "Descending Diads in G minor, on the B & E String", "Descending Diads in G# major, on the B & E String", "Descending Diads in G# minor, on the B & E String", "Ascending Diads in A major, on the G & B String", "Ascending Diads in A minor, on the G & B String", "Ascending Diads in A# major, on the G & B String", "Ascending Diads in A# minor, on the G & B String", "Ascending Diads in B major, on the G & B String", "Ascending Diads in B minor, on the G & B String", "Ascending Diads in C major, on the G & B String", "Ascending Diads in C minor, on the G & B String", "Ascending Diads in C# major, on the G & B String", "Ascending Diads in C# minor, on the G & B String", "Ascending Diads in D major, on the G & B String", "Ascending Diads in D minor, on the G & B String", "Ascending Diads in D# major, on the G & B String", "Ascending Diads in D# minor, on the G & B String", "Ascending Diads in E major, on the G & B String", "Ascending Diads in E minor, on the G & B String", "Ascending Diads in F major, on the G & B String", "Ascending Diads in F minor, on the G & B String", "Ascending Diads in F# major, on the G & B String", "Ascending Diads in F# minor, on the G & B String", "Ascending Diads in G major, on the G & B String", "Ascending Diads in G minor, on the G & B String", "Ascending Diads in G# major, on the G & B String", "Ascending Diads in G# minor, on the G & B String", "Descending Diads in A major, on the G & B String", 30],
                    ["Descending Diads in D# minor, on the G & B String", "Descending Diads in E major, on the G & B String", "Descending Diads in E minor, on the G & B String", "Descending Diads in F major, on the G & B String", "Descending Diads in F minor, on the G & B String", "Descending Diads in F# major, on the G & B String", "Descending Diads in F# minor, on the G & B String", "Descending Diads in G major, on the G & B String", "Descending Diads in G minor, on the G & B String", "Descending Diads in G# major, on the G & B String", "Descending Diads in G# minor, on the G & B String", "Ascending Diads in A major, on the D & G String", "Ascending Diads in A minor, on the D & G String", "Ascending Diads in A# major, on the D & G String", "Ascending Diads in A# minor, on the D & G String", "Ascending Diads in B major, on the D & G String", "Ascending Diads in B minor, on the D & G String", "Ascending Diads in C major, on the D & G String", "Ascending Diads in C minor, on the D & G String", "Ascending Diads in C# major, on the D & G String", "Ascending Diads in C# minor, on the D & G String", "Ascending Diads in D major, on the D & G String", "Ascending Diads in D minor, on the D & G String", "Ascending Diads in D# major, on the D & G String", "Ascending Diads in D# minor, on the D & G String", "Ascending Diads in E major, on the D & G String", "Ascending Diads in E minor, on the D & G String", "Ascending Diads in F major, on the D & G String", "Ascending Diads in F minor, on the D & G String", "Ascending Diads in F# major, on the D & G String", "Ascending Diads in F# minor, on the D & G String", "Ascending Diads in G major, on the D & G String", "Ascending Diads in G minor, on the D & G String", "Ascending Diads in G# major, on the D & G String", "Ascending Diads in G# minor, on the D & G String", "Descending Diads in A major, on the D & G String", "Descending Diads in A minor, on the D & G String", "Descending Diads in A# major, on the D & G String", "Descending Diads in A# minor, on the D & G String", "Descending Diads in B major, on the D & G String", "Descending Diads in B minor, on the D & G String", "Descending Diads in C major, on the D & G String", "Descending Diads in C minor, on the D & G String", "Descending Diads in C# major, on the D & G String", "Descending Diads in C# minor, on the D & G String", "Descending Diads in D major, on the D & G String", "Descending Diads in D minor, on the D & G String", "Descending Diads in D# major, on the D & G String", "Descending Diads in D# minor, on the D & G String", "Descending Diads in E major, on the D & G String", "Descending Diads in E minor, on the D & G String", "Descending Diads in F major, on the D & G String", "Descending Diads in F minor, on the D & G String", "Descending Diads in F# major, on the D & G String", "Descending Diads in F# minor, on the D & G String", "Descending Diads in G major, on the D & G String", "Descending Diads in G minor, on the D & G String", "Descending Diads in G# major, on the D & G String", "Descending Diads in G# minor, on the D & G String", "Descending Diads in C# minor, on the G & B String", "Descending Diads in D major, on the G & B String", "Descending Diads in D minor, on the G & B String", "Descending Diads in D# major, on the G & B String", "Descending Diads in B major, on the G & B String", "Descending Diads in B minor, on the G & B String", "Descending Diads in C major, on the G & B String", "Descending Diads in C minor, on the G & B String", "Descending Diads in C# major, on the G & B String", "Descending Diads in A minor, on the G & B String", "Descending Diads in A# major, on the G & B String", "Descending Diads in A# minor, on the G & B String", 30],
                    chords,
                    ['Spider Exercise 1234', 'Spider Exercise 1243', 'Spider Exercise 1324', 'Spider Exercise 1342', 'Spider Exercise 1423', 'Spider Exercise 1432', 'Spider Exercise 2134', 'Spider Exercise 2143', 'Spider Exercise 2314', 'Spider Exercise 2341', 'Spider Exercise 2413', 'Spider Exercise 2431', 'Spider Exercise 3124', 'Spider Exercise 3142', 'Spider Exercise 3214', 'Spider Exercise 3241', 'Spider Exercise 3412', 'Spider Exercise 3421', 'Spider Exercise 4123', 'Spider Exercise 4132', 'Spider Exercise 4213', 'Spider Exercise 4231', 'Spider Exercise 4312', 'Spider Exercise 4321', 'Diagonal Spider Exercise 1234', 'Diagonal Spider Exercise 1243', 'Diagonal Spider Exercise 1324', 'Diagonal Spider Exercise 1342', 'Diagonal Spider Exercise 1423', 'Diagonal Spider Exercise 1432', 'Diagonal Spider Exercise 2134', 'Diagonal Spider Exercise 2143', 'Diagonal Spider Exercise 2314', 'Diagonal Spider Exercise 2341', 'Diagonal Spider Exercise 2413', 'Diagonal Spider Exercise 2431', 'Diagonal Spider Exercise 3124', 'Diagonal Spider Exercise 3142', 'Diagonal Spider Exercise 3214', 'Diagonal Spider Exercise 3241', 'Diagonal Spider Exercise 3412', 'Diagonal Spider Exercise 3421', 'Diagonal Spider Exercise 4123', 'Diagonal Spider Exercise 4132', 'Diagonal Spider Exercise 4213', 'Diagonal Spider Exercise 4231', 'Diagonal Spider Exercise 4312', 'Diagonal Spider Exercise 4321', 55],
                    ['Spider Exercise 1234 Focusing on Economy', 'Spider Exercise 1243 Focusing on Economy', 'Spider Exercise 1324 Focusing on Economy', 'Spider Exercise 1342 Focusing on Economy', 'Spider Exercise 1423 Focusing on Economy', 'Spider Exercise 1432 Focusing on Economy', 'Spider Exercise 2134 Focusing on Economy', 'Spider Exercise 2143 Focusing on Economy', 'Spider Exercise 2314 Focusing on Economy', 'Spider Exercise 2341 Focusing on Economy', 'Spider Exercise 2413 Focusing on Economy', 'Spider Exercise 2431 Focusing on Economy', 'Spider Exercise 3124 Focusing on Economy', 'Spider Exercise 3142 Focusing on Economy', 'Spider Exercise 3214 Focusing on Economy', 'Spider Exercise 3241 Focusing on Economy', 'Spider Exercise 3412 Focusing on Economy', 'Spider Exercise 3421 Focusing on Economy', 'Spider Exercise 4123 Focusing on Economy', 'Spider Exercise 4132 Focusing on Economy', 'Spider Exercise 4213 Focusing on Economy', 'Spider Exercise 4231 Focusing on Economy', 'Spider Exercise 4312 Focusing on Economy', 'Spider Exercise 4321 Focusing on Economy', 'Diagonal Spider Exercise 1234 Focusing on Economy', 'Diagonal Spider Exercise 1243 Focusing on Economy', 'Diagonal Spider Exercise 1324 Focusing on Economy', 'Diagonal Spider Exercise 1342 Focusing on Economy', 'Diagonal Spider Exercise 1423 Focusing on Economy', 'Diagonal Spider Exercise 1432 Focusing on Economy', 'Diagonal Spider Exercise 2134 Focusing on Economy', 'Diagonal Spider Exercise 2143 Focusing on Economy', 'Diagonal Spider Exercise 2314 Focusing on Economy', 'Diagonal Spider Exercise 2341 Focusing on Economy', 'Diagonal Spider Exercise 2413 Focusing on Economy', 'Diagonal Spider Exercise 2431 Focusing on Economy', 'Diagonal Spider Exercise 3124 Focusing on Economy', 'Diagonal Spider Exercise 3142 Focusing on Economy', 'Diagonal Spider Exercise 3214 Focusing on Economy', 'Diagonal Spider Exercise 3241 Focusing on Economy', 'Diagonal Spider Exercise 3412 Focusing on Economy', 'Diagonal Spider Exercise 3421 Focusing on Economy', 'Diagonal Spider Exercise 4123 Focusing on Economy', 'Diagonal Spider Exercise 4132 Focusing on Economy', 'Diagonal Spider Exercise 4213 Focusing on Economy', 'Diagonal Spider Exercise 4231 Focusing on Economy', 'Diagonal Spider Exercise 4312 Focusing on Economy', 'Diagonal Spider Exercise 4321 Focusing on Economy', 43],
                    ['Spider Exercise 1234 Focusing on Alternante Picking', 'Spider Exercise 1243 Focusing on Alternante Picking', 'Spider Exercise 1324 Focusing on Alternante Picking', 'Spider Exercise 1342 Focusing on Alternante Picking', 'Spider Exercise 1423 Focusing on Alternante Picking', 'Spider Exercise 1432 Focusing on Alternante Picking', 'Spider Exercise 2134 Focusing on Alternante Picking', 'Spider Exercise 2143 Focusing on Alternante Picking', 'Spider Exercise 2314 Focusing on Alternante Picking', 'Spider Exercise 2341 Focusing on Alternante Picking', 'Spider Exercise 2413 Focusing on Alternante Picking', 'Spider Exercise 2431 Focusing on Alternante Picking', 'Spider Exercise 3124 Focusing on Alternante Picking', 'Spider Exercise 3142 Focusing on Alternante Picking', 'Spider Exercise 3214 Focusing on Alternante Picking', 'Spider Exercise 3241 Focusing on Alternante Picking', 'Spider Exercise 3412 Focusing on Alternante Picking', 'Spider Exercise 3421 Focusing on Alternante Picking', 'Spider Exercise 4123 Focusing on Alternante Picking', 'Spider Exercise 4132 Focusing on Alternante Picking', 'Spider Exercise 4213 Focusing on Alternante Picking', 'Spider Exercise 4231 Focusing on Alternante Picking', 'Spider Exercise 4312 Focusing on Alternante Picking', 'Spider Exercise 4321 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1234 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1243 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1324 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1342 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1423 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1432 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2134 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2143 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2314 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2341 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2413 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2431 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3124 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3142 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3214 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3241 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3412 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3421 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4123 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4132 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4213 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4231 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4312 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4321 Focusing on Alternante Picking', 43],
                    ['Tap whilst playing the ii-V-I Jazz Standard: Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the iii-VI-ii-V Jazz: Em7 - A7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the I-vi-ii-V Jazz: Cmaj7 - Am7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the Imaj7-IVmaj7-ii7-V7 Jazz: Cmaj7 - Fmaj7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the vi-ii-V-I Jazz: Am7 - Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the iim7b5-V7alt-im7 Jazz: Dm7b5 - G7alt - Cm7 progression, in the Key of C minor', 'Tap whilst playing the IVmaj7#11 - #IVdim7 - Imin7 - bII7 Jazz: Fmaj7#11 - F#dim7 - Cm7 - Db7 progression, in the Key of C minor', 'Tap whilst playing the I - #Idim7 - IImin7 - V7 Jazz: Cmaj7 - C#dim7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the I7 - VI7 - II7 - V7 Jazz: C7 - A7 - D7 - G7 progression, in the Key of C major', 'Tap whilst playing the iii7 - VI7 - ii7 - V7 Jazz: Em7 - A7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the Funk Groove: Em7 - A7 - D9 - G7 progression, in the Key of G major', 'Tap whilst playing the Math Rock Groove 1: Am - C - Em - G progression, in the Key of A minor', 'Tap whilst playing the Funk Fusion: Dm7 - G7 - C9 - Fmaj7 progression, in the Key of F major', 'Tap whilst playing the Math Rock Groove 2: Dm - G - Em - A progression, in the Key of D minor', 'Tap whilst playing the Funk Jam: G7 - C7 - F7 - Bb7 progression, in the Key of F major', 'Tap whilst playing the Math Rock Arpeggios: Dmaj7 - Bm7 - F#m7 - Gmaj7 progression, in the Key of D major', 'Tap whilst playing the Funky Blues: E7 - A7 - B7 - E7 progression, in the Key of E major', 'Tap whilst playing the Math Rock Modal: Emaj7 - F#m7 - G#m7 - Amaj7 progression, in the Key of E major', 'Tap whilst playing the Funk Fusion II: Em7 - A7 - Dmaj7 - Gmaj7 progression, in the Key of G major', 'Tap whilst playing the Math Rock Chromatic: Dm7 - Dbmaj7 - Cm7 - Bbmaj7 progression, in the Key of C minor', 'Tap whilst playing the Jazz Blues: C7 - F7 - Gm7 - C7 progression, in the Key of C major', 'Tap whilst playing the Funk Groove II: Em7 - A7 - D7 - G7 progression, in the Key of E minor', 'Tap whilst playing the Math Rock Groove 3: G - Bm - D - F# progression, in the Key of G major', 'Tap whilst playing the Fusion Vibe: Am7 - D7 - Gmaj7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the Jazz Turnaround: Dm7 - G7 - Cmaj7 - A7 progression, in the Key of C major', 'Tap whilst playing the Funky Rhythm: G9 - C9 - F9 - Bb9 progression, in the Key of F major', 'Tap whilst playing the Math Rock Experiment: F#m - Dmaj7 - Bm - Emaj7 progression, in the Key of D major', 'Tap whilst playing the Jazz Waltz: Dm7 - G7 - Cmaj7 - Am7 progression, in the Key of C major', 'Tap whilst playing the Funk Fusion III: Em7 - A7 - Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the Math Rock Groove 4: A - C#m - E - G#m progression, in the Key of A major', 'Tap whilst playing the Jazz Fusion: Dm7 - G7 - Cmaj7 - Fmaj7 progression, in the Key of C major', 'Tap whilst playing the Funky Groove: C7 - F9 - G7 - C9 progression, in the Key of C major', 'Tap whilst playing the Math Rock Riff: E - G - D - A progression, in the Key of E minor', 'Tap whilst playing the Jazz Modal Vibe: Dm7 - Em7 - Am7 - Dm7 progression, in the Key of A minor', 'Tap whilst playing the Funk Jam II: D9 - G9 - C9 - F9 progression, in the Key of F major', 'Tap whilst playing the Math Rock Groove 5: Bm - D - F#m - A progression, in the Key of B minor', 'Tap whilst playing the Jazz Ballad: Am7 - Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the Funky Blues II: A7 - D7 - E7 - A7 progression, in the Key of A major', 'Tap whilst playing the Math Rock Fusion: G#m - F#m - Emaj7 - B progression, in the Key of G# minor', 'Tap whilst playing the Jazz Bossa Nova: Am7 - D7 - Gmaj7 - Bm7b5 progression, in the Key of A minor', 'Tap whilst playing the Funk Fusion IV: Cm7 - F7 - Bbmaj7 - Ebmaj7 progression, in the Key of Bb major', 'Tap whilst playing the Math Rock Groove 6: F - A#m - D# - Gm progression, in the Key of F major', 'Tap whilst playing the Jazz Funk Jam: G7 - C9 - F7 - Bb9 progression, in the Key of F major', 'Tap whilst playing the Funky Riff: E7 - A7 - D7 - G7 progression, in the Key of E major', 'Tap whilst playing the Math Rock Experiment II: D - F#m - Bm - G progression, in the Key of D major', 'Tap whilst playing the Jazz Fusion II: Em7 - A7 - Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the Funk Groove III: Bm7 - E7 - Am7 - D7 progression, in the Key of B minor', 'Tap whilst playing the Math Rock Groove 7: D#m - G# - C#m - F# progression, in the Key of D# minor', 'Tap whilst playing the Jazz Funk Fusion: Am7 - D9 - Gmaj7 - C9 progression, in the Key of C major', 'Tap whilst playing the Funky Modal Vibe: Gm7 - Cm7 - F7 - Bb7 progression, in the Key of Bb major', 50],
                    ["Ascending Triplets Scale Run in A major", "Ascending Triplets Scale Run in A minor", "Ascending Triplets Scale Run in A# major", "Ascending Triplets Scale Run in A# minor", "Ascending Triplets Scale Run in B major", "Ascending Triplets Scale Run in B minor", "Ascending Triplets Scale Run in C major", "Ascending Triplets Scale Run in C minor", "Ascending Triplets Scale Run in C# major", "Ascending Triplets Scale Run in C# minor", "Ascending Triplets Scale Run in D major", "Ascending Triplets Scale Run in D minor", "Ascending Triplets Scale Run in D# major", "Ascending Triplets Scale Run in D# minor", "Ascending Triplets Scale Run in E major", "Ascending Triplets Scale Run in E minor", "Ascending Triplets Scale Run in F major", "Ascending Triplets Scale Run in F minor", "Ascending Triplets Scale Run in F# major", "Ascending Triplets Scale Run in F# minor", "Ascending Triplets Scale Run in G major", "Ascending Triplets Scale Run in G minor", "Ascending Triplets Scale Run in G# major", "Ascending Triplets Scale Run in G# minor", "Descending Triplets Scale Run in A major", "Descending Triplets Scale Run in A minor", "Descending Triplets Scale Run in A# major", "Descending Triplets Scale Run in A# minor", "Descending Triplets Scale Run in B major", "Descending Triplets Scale Run in B minor", "Descending Triplets Scale Run in C major", "Descending Triplets Scale Run in C minor", "Descending Triplets Scale Run in C# major", "Descending Triplets Scale Run in C# minor", "Descending Triplets Scale Run in D major", "Descending Triplets Scale Run in D minor", "Descending Triplets Scale Run in D# major", "Descending Triplets Scale Run in D# minor", "Descending Triplets Scale Run in E major", "Descending Triplets Scale Run in E minor", "Descending Triplets Scale Run in F major", "Descending Triplets Scale Run in F minor", "Descending Triplets Scale Run in F# major", "Descending Triplets Scale Run in F# minor", "Descending Triplets Scale Run in G major", "Descending Triplets Scale Run in G minor", "Descending Triplets Scale Run in G# major", "Descending Triplets Scale Run in G# minor", 75],
                    ["1 Octave Arpeggios in  A major", "1 Octave Arpeggios in  A minor", "1 Octave Arpeggios in  A# major", "1 Octave Arpeggios in  A# minor", "1 Octave Arpeggios in  B major", "1 Octave Arpeggios in  B minor", "1 Octave Arpeggios in  C major", "1 Octave Arpeggios in  C minor", "1 Octave Arpeggios in  C# major", "1 Octave Arpeggios in  C# minor", "1 Octave Arpeggios in  D major", "1 Octave Arpeggios in  D minor", "1 Octave Arpeggios in  D# major", "1 Octave Arpeggios in  D# minor", "1 Octave Arpeggios in  E major", "1 Octave Arpeggios in  E minor", "1 Octave Arpeggios in  F major", "1 Octave Arpeggios in  F minor", "1 Octave Arpeggios in  F# major", "1 Octave Arpeggios in  F# minor", "1 Octave Arpeggios in  G major", "1 Octave Arpeggios in  G minor", "1 Octave Arpeggios in  G# major", "1 Octave Arpeggios in  G# minor", "2 Octave Arpeggios in  A major", "2 Octave Arpeggios in  A minor", "2 Octave Arpeggios in  A# major", "2 Octave Arpeggios in  A# minor", "2 Octave Arpeggios in  B major", "2 Octave Arpeggios in  B minor", "2 Octave Arpeggios in  C major", "2 Octave Arpeggios in  C minor", "2 Octave Arpeggios in  C# major", "2 Octave Arpeggios in  C# minor", "2 Octave Arpeggios in  D major", "2 Octave Arpeggios in  D minor", "2 Octave Arpeggios in  D# major", "2 Octave Arpeggios in  D# minor", "2 Octave Arpeggios in  E major", "2 Octave Arpeggios in  E minor", "2 Octave Arpeggios in  F major", "2 Octave Arpeggios in  F minor", "2 Octave Arpeggios in  F# major", "2 Octave Arpeggios in  F# minor", "2 Octave Arpeggios in  G major", "2 Octave Arpeggios in  G minor", "2 Octave Arpeggios in  G# major", "2 Octave Arpeggios in  G# minor", 75],
                ];
                temp = techniqueExercises[Math.floor(Math.random(4867835363898769) * techniqueExercises.length-1)];
                bpm = temp[temp.length-1];
                
                temp = temp[Math.floor(Math.random(4867833525234) * temp.length)];
                keys = ["C# Minor", "G Minor", "D Minor", "E Minor", "E Major", "C Minor", "Gb Major", "C# Major", "B Minor", "Ab Major", "D Major", "F Minor", "G Major", "Bb Minor", "A Minor", "Db Major", "A# Minor", "Eb Minor", "A Major", "C Major", "Bb Major", "D# Minor", "F# Major", "Cb Major", "G# Minor", "Ab Minor", "Eb Major", "F# Minor", "B Major", "F Major"]
                if (temp.search(/([a-g]|[A-G])(#|b|)\s(major|minor)/i) != -1) {
                    temp = temp.replace(/([a-g]|[A-G])(#|b|)\s(major|minor)/i, keys[Math.floor(Math.random(4867833525234) * keys.length)]);
                }
                if (temp.toLowerCase().includes("diagonal")) bpm -= 5;
                techniqueText.textContent = temp + " at " + (bpm + Math.floor((Date.now() / 1000) / 86400) - 19850) + " bpm";
                if (temp.includes("Chords")) {
                    sheetImage.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent("Chords/" + temp.replace("#", "Sharp") + ".png"));
                    sheetImage.classList.add("shown");
                    sheetImage.classList.remove("hidden");
                } 
               
                audioPlayer.pause();
            }


        } else if (modesFolder[modes.indexOf(mode)] == "sheet-music") {
            // fileList = [];
            // if (fileList.length === 0) {
            //     fetch(corsProxy + encodeURIComponent(fileHost + `${modesFolder[modes.indexOf(mode)]}/${list}`))
            //         // fetch("all/../studio-ghibi/list.txt")
            //         .then(response => response.text())
            //         .then(text => {

            //             fileList = text.trim().split('\n');
            //             console.log(fileList)
            //             const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
            //             randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
            //             sheetImage.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf(mode)]}/${randomFile}`));
            //             hideAudioShowSheet();
            //         })
            //         .catch(error => {
            //             console.error('Error fetching file list:', error);
            //         });
            // } else {
            //     const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
            //     const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
            //     sheetImage.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf(mode)]}/${randomFile}`));
            //     hideAudioShowSheet();
            //     playAudioWithTimeout();
            // }
            loadRandomSheet();
            hideAll();
            showSheet();
            audioPlayer.pause();
        }
        else {
            if (fileList.length === 0) {
                fetch(corsProxy + encodeURIComponent(fileHost + `${modesFolder[modes.indexOf(mode)]}/${list}`))
                    // fetch("all/../studio-ghibi/list.txt")
                    .then(response => response.text())
                    .then(text => {

                        fileList = text.trim().split('\n');
                        console.log(fileList);
                        const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                        randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf(mode)]}/${randomFile}`));
                        hideSheetShowAudio();
                        playAudioWithTimeout();
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                    });
            } else {
                const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                const randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`${modesFolder[modes.indexOf(mode)]}/${randomFile}`));
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


// document.addEventListener("DOMContentLoaded", function () {
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
    const sheetPDF = document.getElementById("sheetPDF");
    const metronome = document.getElementById("metronome");
    const metronomeButton = document.getElementById("metronomeButton");
    const tuner = document.getElementById("tuner");
    const tunerButton = document.getElementById("tunerButton");
    const leftPlaceholder = document.getElementById("leftPlaceholder");
    const rightPlaceholder = document.getElementById("rightPlaceholder");
    const reloadButton = document.getElementById("reloadButton");
    const passwordText = document.getElementById("passwordText");

    let password = localStorage.getItem('password');
    
    if (!password) {
        password = prompt("Please enter your password:");
        localStorage.setItem('password', password);
    }
    githubKey = 0;
    (async () => {
        githubKey  = await decrypt("BZciTknXIo7nNMHIFm3XGlzY+zztIuHPAM+cK9WTccYOOXVrzJq28QFUHbihWydggxYUKKF2JC3IQ6og9xiq3oH9t1kjDOpH7K/CCfn/Hp9BstMCUc5bfDv8XCB4Lb/EBN90FLVxrHaW0hzV3Q+JviwIJrQq0bSkgA==", password);

        // console.log(githubKey);
        // (async () => { 
        //     gistId = "https://api.github.com/gists/554d4d02e04e5350c562c723903146ff";
        //     response = await fetch(`https://api.github.com/gists/${gistId}`, {
        //     headers: {
        //         'Authorization': `token ${githubKey}`,
        //     },
        //     });
        //     gist = await response.json();
        //     content = gist.files['GuidedPass.txt'].content;
        // 'GuidedPass.txt': {
        //     content: "",
        //     }
        //     phonePassword = content;
        //     console.log(phonePassword);
        // })();  
    })();
    const defaultTimeout = 7;
    var fileHost = "https://raw.githubusercontent.com/MaxDevv/Music-Thingy/main/";
    // check if host is 127.0.0.1 or localhost or 0.0.0.0 or smth like that and set fileHost to nothing if true
    if (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost" || window.location.hostname === "0.0.0.0") {
        fileHost = "http://"+window.location.host+"/";
    }
    
    const corsProxy = ``;
    const apiCorsProxy = `https://corsproxy.io/?`;
    keepGoing = true;
    // modes = ["All", "Jazz", "Full Neo-Soul", "Everything I Wanted", "Studio-Ghibi", "Literally Just Ichikia", "Nintendo", "Toby Fox", "sheet-music", "Music-Backing-Tracks", "jazz"];
    // modesFolder = ["all", "ezmp3s", "fullNeoSoulMp3s", "everything-i-ever-wanted", "studio-ghibi", "nito", "nintendo", "undertalexdeltarune", "sheet-music", "Music-Backing-Tracks", "jazz"];
    modes = ["All", "Jazz", "Learning-Music", "Sheet-Music", "Ear-Training", "Technique", "Music-Thoery", "Accompaniment"];
    modesFolder = ["all", "Music-Backing-Tracks", "repertoire", "sheet-music"];
    // plainModesFolder = modesFolder.filter(item => !specialModesFolder.includes(item));
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
            autoResize: true, // don't display title, composer etc., smaller margins
        });
        

    //completionsNeeded = 5;
    completionsNeeded = 14 + (((new Date().setHours(0, 0, 0, 0) / 1000) - 1718337600) / 86400)*4;
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
        diffucilty = [1, (Math.floor(Math.round((((Date.now() / 1000) - 1716068447) / 86400))/10)-1), 10].sort((a,b) => a-b)[1];
        return diffucilty;
    }
    function loadSheet(source) {
        console.log(source);
        wasHidden = false;
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
      

    nextButton.addEventListener("click", function () {
        audioPlayer.pause();
    });
    skipButton.addEventListener("click", function () { 
        audioPlayer.pause();
    });
    darkModeButton.addEventListener("click", function () {
        toggleDarkMode();
    });

    numberInput.addEventListener("change", function () {
        vibeTime = parseInt(numberInput.value);
    })

    metronomeButton.addEventListener("click", function () {
        if (metronome.classList.contains("hidden")) {
            showMetronome();
        } else {
            hideMetronome();
        }
    });



    reloadButton.addEventListener("click", function () {
        location.reload();
    });

    tunerButton.addEventListener("click", function () {
        if (tuner.classList.contains("hidden")) {
            showTuner();
        } else {
            hideTuner();
        }
    });
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
            // fetch('https://practice-reminder.azurewebsites.net/api/completed_hour?code=uweYVDnQ30h3dNkQhm6X7xVDtVycyiQah1GMoIL9gmzkAzFuViCmLQ==&completed=true', {
            //     method: 'GET',
            //     mode: 'no-cors' // This mode prevents CORS errors
            // })
            //     .then(() => {
            //         console.log('Ping request sent successfully');
            //     })
            //     .catch(error => {
            //         console.error('There was a problem with your fetch operation:', error);
            //     });
        }
    });
    vibeModeButton.addEventListener("click", function () {
        vibeMode = !vibeMode;
        localStorage.setItem('vibeMode', vibeMode);
        vibeModeButton.textContent = "Vibe " + ((vibeMode) ? "Off" : "On");
    })
    nextButton.addEventListener("click", function () {
        // Make a GET request to trigger the function for incrementing the counter
        // fetch('https://script.google.com/macros/s/AKfycbzUtqxNn8g98Z85Vih_V6eOkz3mBqzGmYhEWieHHj0YcpsjS1fnk_OUmBCRzx-ZEpRZWw/exec?action=increment')
        fetch(encodeURIComponent('https://script.google.com/macros/s/AKfycbymMSv_xXKYMNpPrR3PZ9EAFbLBfTq1MMqojlOy-8vumBS1w0pF4ijjZfYjjdVal9OuZg/exec?action=increment'))
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
        localStorage.setItem('completed', completed);
        completedSpan.textContent = completed + "/" + completionsNeeded + " Completed"
        if (completed >= completionsNeeded) {
            console.log("session completed :D")
            completedSpan.textContent = completed + "/" + completionsNeeded + " Completed :D 🎉🎉🎉";
            (async () => { 
                gistId = "554d4d02e04e5350c562c723903146ff";
                response = await fetch(`https://api.github.com/gists/${gistId}`, {
                headers: {
                    'Authorization': `token ${githubKey}`,
                },
                });
                gist = await response.json();
                content = gist.files['GuidedPass.txt'].content;
                phonePassword = content.split("\n")[0];
                passwordText.innerHTML = passwordText.innerHTML.replace("#replace#", phonePassword);
                showElement(passwordText);
            })();    
            finishedSession();
        }
    });


    rewardButton.addEventListener("click", function () {
        // Make a GET request to trigger the function for incrementing the counter
        // fetch('https://script.google.com/macros/s/AKfycbzUtqxNn8g98Z85Vih_V6eOkz3mBqzGmYhEWieHHj0YcpsjS1fnk_OUmBCRzx-ZEpRZWw/exec?action=increment')
        fetch(encodeURIComponent('https://script.google.com/macros/s/AKfycbymMSv_xXKYMNpPrR3PZ9EAFbLBfTq1MMqojlOy-8vumBS1w0pF4ijjZfYjjdVal9OuZg/exec?action=increment'))
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
        // if (modesFolder[modes.indexOf(mode)] != "sheet-music") {
        //     startTime = getRandomStartTime(audioPlayer.duration);
        // }
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
    // load completed from storage
    completed = parseInt(localStorage.getItem('completed'));
    completedSpan.textContent = completed + "/" + completionsNeeded + " Completed";
    fetch (apiCorsProxy + encodeURIComponent("https://script.googleusercontent.com/macros/echo?user_content_key=lueDIP65V1TviFPlTA3pXyaqqi_Ao9QmSNoDI2MpjO3pgQhPiwDCfsS6JcYTB-VF0J-F2S-L2zOT6gNMjkM2Na1ea-3w9q_WOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa3ys9IQszNRpJEFHjctEQPkpZk8WUUr1MJnIvaGNtMGUnI2NLV13eEdSG0b6eezwr2OHfIzJJLGtTKOuAY81JYcWd8_sQOMDQAXIuFltvcj9UvOWECdUTcChd_k7TjVvZRo9reF4hk-I&lib=MFj0A6GZBWv26Xn398IW7T7lx60PLmU9S"))
        .then(response => response.json())
        .then(data => {
            // Set the completion counter
            completed = data;
            localStorage.setItem('completed', completed);
            completedSpan.textContent = completed + "/" + completionsNeeded + " Completed";
            if (completed >= completionsNeeded) {
                console.log("session completed :D")
                completedSpan.textContent = completed + "/" + completionsNeeded + " Completed :D 🎉🎉🎉";;
                (async () => { 
                    gistId = "554d4d02e04e5350c562c723903146ff";
                    response = await fetch(`https://api.github.com/gists/${gistId}`, {
                    headers: {
                        'Authorization': `token ${githubKey}`,
                    },
                    });
                    gist = await response.json();
                    content = gist.files['GuidedPass.txt'].content;
                    phonePassword = content.split("\n")[0];
                    passwordText.innerHTML = passwordText.innerHTML.replace("#replace#", phonePassword);
                    showElement(passwordText);
                })();    
                finishedSession();
            }
        })

    

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

    async function getKeyFromString(password) {
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            enc.encode(password),
            "PBKDF2",
            false,
            ["deriveKey"]
        );
    
        const key = await crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: enc.encode("some-salt"), // Use a proper salt in production
                iterations: 100000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    
        return key;
    }
    
    function arrayBufferToBase64(buffer) {
        const binary = String.fromCharCode.apply(null, new Uint8Array(buffer));
        return btoa(binary);
    }
    
    function base64ToArrayBuffer(base64) {
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes.buffer;
    }
    
    async function encrypt(data, password) {
        const key = await getKeyFromString(password);
        const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate a random IV
        const encodedData = new TextEncoder().encode(data);
    
        const encryptedData = await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            key,
            encodedData
        );
    
        // Combine IV and encrypted data into a single array for easy storage/transmission
        const buffer = new Uint8Array(iv.byteLength + encryptedData.byteLength);
        buffer.set(iv, 0);
        buffer.set(new Uint8Array(encryptedData), iv.byteLength);
    
        // Convert to Base64 for string output
        return arrayBufferToBase64(buffer);
    }
    
    async function decrypt(encrypted, password) {
        const key = await getKeyFromString(password);
    
        // Convert Base64 string to ArrayBuffer
        const encryptedBuffer = base64ToArrayBuffer(encrypted);
    
        // Split IV and encrypted data
        const iv = encryptedBuffer.slice(0, 12);
        const encryptedData = encryptedBuffer.slice(12);
    
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv: iv,
            },
            key,
            encryptedData
        );
    
        return new TextDecoder().decode(decryptedData);
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
        if (keyText.innerHTML != keyText.innerHTML.replace(/\d+(\.\d+)? seconds left/g, `${Math.round(timeInSecs-((Date.now() / 1000) - actualStartTime))} seconds left`)){
            keyText.innerHTML = keyText.innerHTML.replace(/\d+(\.\d+)? seconds left/g, `${Math.round(timeInSecs-((Date.now() / 1000) - actualStartTime))} seconds left`);
        }
        console.log(Math.round(timeInSecs-((Date.now() / 1000) - actualStartTime)));
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
        hideElement(audioPlayer);
    }

    function showSheet() {
        showElement(tempOsmdContainer);
    }

    function hideSheet() {
        hideElement(tempOsmdContainer);
    }

    function showMetronome() {
        showElement(metronome);
        showPlaceholders();
    }

    function hideMetronome() {
        hideElement(metronome);
        hidePlaceholders();
    }

    function showTuner() {
        showElement(tuner);
        showPlaceholders();
    }

    function hideTuner() {
        hideElement(tuner);
        hidePlaceholders();
    }

    function showPlaceholders() {
        showLeftPlaceholder();
        showRightPlaceholder();
    }

    function hidePlaceholders() {
        hideLeftPlaceholder();
        hideRightPlaceholder();
    }

    function showLeftPlaceholder() {
        showElement(leftPlaceholder);
    }

    function hideLeftPlaceholder() {
        hideElement(leftPlaceholder);
    }

    function showRightPlaceholder() {
        showElement(rightPlaceholder);
    }

    function hideRightPlaceholder() {
        hideElement(rightPlaceholder);
    }

    function showChords() {
        showElement(sheetImage);
    }

    function hideChords() {
        hideElement(sheetImage);
    }

    function showAudio() {
        showElement(audioPlayer);
    }

    function hideSheetButton() {
        hideElement(revealSheet);
    }

    function showSheetButton() {
        showElement(revealSheet);
    }

    function hideAll() {
        hideAudio();
        hideSheet();
        hideChords();
        hideSheetButton();
        hideKeyText();
        hideTechniqueText();
        hideSheetPDF();
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

    function hideSkipButton() {
        hideElement(skipButton);
    }

    function showSkipButton() {
        showElement(skipButton);
    }

    function showSheetPDF() {
        showElement(sheetPDF);
    }

    function hideSheetPDF() {
        hideElement(sheetPDF);
    }

    function hideKeyText() {
        hideElement(keyText);
    }

    function showTechniqueText() {
        showElement(techniqueText);
    }

    function hideTechniqueText() {
        hideElement(techniqueText);
    }

    function showElement(element) {
        element.classList.add("shown");
        element.classList.remove("hidden");
    }

    function hideElement(element) {
        element.classList.add("hidden");
        element.classList.remove("shown");
    }

    function tips(){
        alwaysRemember = "Stay Confident, Play Like Air, Alternate Pick, EVERY BIT COUNTS and Always go 120% :D!";
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

    // function calculateThreshold(chances, index) {
    //     // Validate input
    //     if (!Array.isArray(chances) || typeof index !== 'number' || index < 0 || index >= chances.length) {
    //         throw new Error('Invalid input');
    //     }
    
    //     // Calculate the sum of all chances
    //     const total = chances.reduce((sum, chance) => sum + chance, 0);
    
    //     // Calculate the threshold for the given index
    //     const threshold = chances[index] / total;
    
    //     return threshold;
    // }
    function calculateThreshold(chances, index) {
        
        // Validate input
        if (!Array.isArray(chances) || typeof index !== 'number' || index < 0 || index >= chances.length) {
            throw new Error('Invalid input');
        }
    
        // Calculate the sum of all chances
        const total = chances.reduce((sum, chance) => sum + chance, 0);
    
        // Calculate the threshold for the given index
        const threshold = chances[index] / total;
        if (index > 0){
            return calculateThreshold(chances, index-1) + threshold;
        }
        return threshold;
    }
    

    async function updateRepatoire() {
            splitContent = content.split("\n");
            currentBars += 2;
            updatedSong = [fileName, currentBars, totalBars].join("|");
            console.log(updatedSong);
            splitContent[splitContent.indexOf(splitContent.slice(-n)[0])] = updatedSong;
            updatedContent = splitContent.join("\n");
            console.log(updatedContent);
            const response = await fetch(`https://api.github.com/gists/${gistId}`, {
                method: 'PATCH',
                headers: {
                'Authorization': `token ${githubKey}`,
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                files: {
                    'currentSong.txt': {
                    content: updatedContent.toString(),
                    },
                },
                }),
            });
            const gist = await response.json();
            console.log('Gist updated:', gist);
    }

    function play() {
        keyText.removeAttribute("open");
        list = "list.txt";
        timeout = defaultTimeout;
        console.log(mode);

        chances = [15 /*Ear Training*/, 20 /*Sight Reading*/, 20 /*Improvisation*/, 30 /*Technique*/, 10 /*Learning Music*/, 20 /*Music Theory*/, 20 /*Accompaniment*/];
        if (mode.toLowerCase() == "all") {
            practiceType = Math.random(486783555478);
        } else if (mode.toLowerCase() == "ear-training") {
            practiceType = calculateThreshold(chances, 0);
        } else if (mode.toLowerCase() == "sheet-music") {
            practiceType = calculateThreshold(chances, 1);
        } else if (mode.toLowerCase() == "jazz") {
            practiceType = calculateThreshold(chances, 2);
        } else if (mode.toLowerCase() == "technique") {
            practiceType = calculateThreshold(chances, 3);
        } else if (mode.toLowerCase() == "learning-music") {
            practiceType = calculateThreshold(chances, 4);
        } else if (mode.toLowerCase() == "music-thoery") {
            practiceType = calculateThreshold(chances, 5);
        }  else if (mode.toLowerCase() == "accompaniment") {
            practiceType = calculateThreshold(chances, 6);
        } 
        if (completed == 0) {
            // last exercise will be composing a short piece and making and uploading video of it
            hideAll();
            techniqueText.textContent = "Do your warm ups, wipe down your strings, then Keep up kiddo!";
            showTechniqueText();
            showAudio();
            // select a random file from the "play-along" folder
            fetch(corsProxy + encodeURIComponent(fileHost + "play-along/list.txt"))
                    // fetch("all/../studio-ghibi/list.txt")
                    .then(response => response.text())
                    .then(text => {
                        fileList = text.trim().split('\n');
                        console.log(fileList);
                        const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                        randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`play-along/${randomFile}`));
                        timeout = audioPlayer.duration;
                        keyText.innerHTML = `<summary>Song-Name: </summary>`+randomFile;
                        showAudio();
                        
                    keyText.classList.add("shown");
                    keyText.classList.remove("hidden");
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                    });
            return;
        } /*else if (completed == completionsNeeded - 2) {
            // last exercise will be composing a short piece and making and uploading video of it
            hideAll();
            techniqueText.textContent = "Compose a short piece and upload a video of you playing it or just compose it and write it :D";
            decrypt("7gFY+hJFAegnJJReYveCYjWIVMUJIpZbR5kAVbceiVXjoQ5s2gUqBUjNjc7MmtTBIq7WPEgssm3MzqDslkTJJgefFNzWW/+Zo7P3CvqrV9gwd1Gj+QTSXNMi4nL2yhMnRZhFqCfkHY4UAwm4Gci8fOzBMMiGYDII3giA4FZ6sZyNPhlr9S/AqRopfxsoLQsJtDhwiDy87imE", password).then((result) => {
                keyText.innerHTML = `<summary> Inspiration </summary>`+`<a href="${result}" target="_blank"> Dropbox </a>`;
            });
            keyText.classList.add("shown");
            keyText.classList.remove("hidden");
            showTechniqueText();
            return;
        }*/ else if (completed == completionsNeeded - 1) {
            // post exercise cool down
            hideAll();
            techniqueText.textContent = "Keep up kiddo, and make sure to wipe off those strings when you're done :D!";
            showTechniqueText();
            showAudio();
            // select a random file from the "play-along" folder
            fetch(corsProxy + encodeURIComponent(fileHost + "play-along/list.txt"))
                    // fetch("all/../studio-ghibi/list.txt")
                    .then(response => response.text())
                    .then(text => {
                        fileList = text.trim().split('\n');
                        console.log(fileList);
                        const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                        randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`play-along/${randomFile}`));
                        timeout = audioPlayer.duration;
                        keyText.innerHTML = `<summary>Song-Name: </summary>`+randomFile;
                        showAudio();
                        keyText.classList.add("shown");
                        keyText.classList.remove("hidden");
                        playAudioWithCustomTimeout(timeout);
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                    });
            return;
        } /* else if ((completed % 4) == 0) {
            // last exercise will be composing a short piece and making and uploading video of it
            hideAll();
            techniqueText.textContent = "Keep up kiddo!";
            showTechniqueText();
            showAudio();
            // select a random file from the "play-along" folder
            fetch(corsProxy + encodeURIComponent(fileHost + "play-along/list.txt"))
                    // fetch("all/../studio-ghibi/list.txt")
                    .then(response => response.text())
                    .then(text => {
                        fileList = text.trim().split('\n');
                        console.log(fileList);
                        const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                        randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`play-along/${randomFile}`));
                        timeout = audioPlayer.duration;
                        keyText.innerHTML = `<summary>Song-Name: </summary>`+randomFile;
                        showAudio();
                        
                    keyText.classList.add("shown");
                    keyText.classList.remove("hidden");
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                    });
            return;
        } */
        if (practiceType <= calculateThreshold(chances, 0)) {
            //Melodic Replication Ear Training
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
                        tips();
                        showAudio();
                        playAudioWithoutTimeout();
                        loadSheet(corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`ear-training-sources/${randomFile.replace(new RegExp(".mp3"+ '$'), '.musicxml')}`)));
                        showSheetButton();
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                    });
        } else if (practiceType <= calculateThreshold(chances, 1)) {
            //Sight Reading
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

            
        } else if (practiceType <= calculateThreshold(chances, 2)) {
            //Improvisation Practice
            fetch(corsProxy + encodeURIComponent(fileHost + `Music-Backing-Tracks/${list}`))
                // fetch("all/../studio-ghibi/list.txt")
                .then(response => response.text())
                .then(text => {
                    // timeout = 120+(Math.random()*30);
                    fileList = text.trim().split('\n');
                    console.log(fileList);
                    const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                    randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                    audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`Music-Backing-Tracks/${randomFile}`));
                    timeout = audioPlayer.duration;
                    // if (audioPlayer.duration > 
                    keyText.innerHTML = `<summary>Key ${Math.round(timeout)} seconds left: </summary>`+randomFile;
                    hideAll();
                    hideSheetShowAudio();
                    keyText.classList.add("shown");
                    keyText.classList.remove("hidden");
                    playAudioWithCustomTimeout(timeout);
                    // playAudioWithoutTimeout();
                })
                .catch(error => {
                    console.error('Error fetching file list:', error);
                });
        } else if (practiceType <= calculateThreshold(chances, 3)) {
            //Technique Practice
            hideAllShowText();
            // chords = ["Ascending Chords in A major", "Ascending Chords in A minor", "Ascending Chords in A# major", "Ascending Chords in A# minor", "Ascending Chords in B major", "Ascending Chords in B minor", "Ascending Chords in C major", "Ascending Chords in C minor", "Ascending Chords in C# major", "Ascending Chords in C# minor", "Ascending Chords in D major", "Ascending Chords in D minor", "Ascending Chords in D# major", "Ascending Chords in D# minor", "Ascending Chords in E major", "Ascending Chords in E minor", "Ascending Chords in F major", "Ascending Chords in F minor", "Ascending Chords in F# major", "Ascending Chords in F# minor", "Ascending Chords in G major", "Ascending Chords in G minor", "Ascending Chords in G# major", "Ascending Chords in G# minor", "Descending Chords in A major", "Descending Chords in A minor", "Descending Chords in A# major", "Descending Chords in A# minor", "Descending Chords in B major", "Descending Chords in B minor", "Descending Chords in C major", "Descending Chords in C minor", "Descending Chords in C# major", "Descending Chords in C# minor", "Descending Chords in D major", "Descending Chords in D minor", "Descending Chords in D# major", "Descending Chords in D# minor", "Descending Chords in E major", "Descending Chords in E minor", "Descending Chords in F major", "Descending Chords in F minor", "Descending Chords in F# major", "Descending Chords in F# minor", "Descending Chords in G major", "Descending Chords in G minor", "Descending Chords in G# major", "Descending Chords in G# minor"]
            // chords = ['Ascending 7th Chords in Bb Minor', 'Ascending 7th Chords in C Major', 'Ascending 7th Chords in F# Major', 'Ascending 7th Chords in B Minor', 'Ascending 7th Chords in G Major', 'Ascending 7th Chords in Db Major', 'Ascending 7th Chords in D Minor', 'Ascending 7th Chords in C# Minor', 'Ascending 7th Chords in A Minor', 'Ascending 7th Chords in B Major', 'Ascending 7th Chords in D Major', 'Ascending 7th Chords in Ab Major', 'Ascending 7th Chords in G# Minor', 'Ascending 7th Chords in Bb Major', 'Ascending 7th Chords in C Minor', 'Ascending 7th Chords in F# Minor', 'Ascending 7th Chords in G Minor', 'Ascending 7th Chords in A Major']
            // chords.push(55);
            techniqueExercises = [
                ["Visualize all the notes in A Minor then play all of them on each string", 40],
                ["A major scale run", 40],
                ["Ichika tapping exercise", 40],
                ["Alternating Diagonal hand chord exercise with a 3 fret seperation meaning you jump 3 frets for the next shape and down 3 frets for the next shape", 37],
                ["Alternating Diagonal hand chord exercise", 37],
                ["Muted 16th notes strums for 1 entire minute", 37],
                ["Tap harmonics spider exercise", 30],
                /*["Ascending Diads in A major, on the B & E String", "Ascending Diads in A minor, on the B & E String", "Ascending Diads in A# major, on the B & E String", "Ascending Diads in A# minor, on the B & E String", "Ascending Diads in B major, on the B & E String", "Ascending Diads in B minor, on the B & E String", "Ascending Diads in C major, on the B & E String", "Ascending Diads in C minor, on the B & E String", "Ascending Diads in C# major, on the B & E String", "Ascending Diads in C# minor, on the B & E String", "Ascending Diads in D major, on the B & E String", "Ascending Diads in D minor, on the B & E String", "Ascending Diads in D# major, on the B & E String", "Ascending Diads in D# minor, on the B & E String", "Ascending Diads in E major, on the B & E String", "Ascending Diads in E minor, on the B & E String", "Ascending Diads in F major, on the B & E String", "Ascending Diads in F minor, on the B & E String", "Ascending Diads in F# major, on the B & E String", "Ascending Diads in F# minor, on the B & E String", "Ascending Diads in G major, on the B & E String", "Ascending Diads in G minor, on the B & E String", "Ascending Diads in G# major, on the B & E String", "Ascending Diads in G# minor, on the B & E String", "Descending Diads in A major, on the B & E String", "Descending Diads in A minor, on the B & E String", "Descending Diads in A# major, on the B & E String", "Descending Diads in A# minor, on the B & E String", "Descending Diads in B major, on the B & E String", "Descending Diads in B minor, on the B & E String", "Descending Diads in C major, on the B & E String", "Descending Diads in C minor, on the B & E String", "Descending Diads in C# major, on the B & E String", "Descending Diads in C# minor, on the B & E String", "Descending Diads in D major, on the B & E String", "Descending Diads in D minor, on the B & E String", "Descending Diads in D# major, on the B & E String", "Descending Diads in D# minor, on the B & E String", "Descending Diads in E major, on the B & E String", "Descending Diads in E minor, on the B & E String", "Descending Diads in F major, on the B & E String", "Descending Diads in F minor, on the B & E String", "Descending Diads in F# major, on the B & E String", "Descending Diads in F# minor, on the B & E String", "Descending Diads in G major, on the B & E String", "Descending Diads in G minor, on the B & E String", "Descending Diads in G# major, on the B & E String", "Descending Diads in G# minor, on the B & E String"],
                ["Ascending Diads in A major, on the G & B String", "Ascending Diads in A minor, on the G & B String", "Ascending Diads in A# major, on the G & B String", "Ascending Diads in A# minor, on the G & B String", "Ascending Diads in B major, on the G & B String", "Ascending Diads in B minor, on the G & B String", "Ascending Diads in C major, on the G & B String", "Ascending Diads in C minor, on the G & B String", "Ascending Diads in C# major, on the G & B String", "Ascending Diads in C# minor, on the G & B String", "Ascending Diads in D major, on the G & B String", "Ascending Diads in D minor, on the G & B String", "Ascending Diads in D# major, on the G & B String", "Ascending Diads in D# minor, on the G & B String", "Ascending Diads in E major, on the G & B String", "Ascending Diads in E minor, on the G & B String", "Ascending Diads in F major, on the G & B String", "Ascending Diads in F minor, on the G & B String", "Ascending Diads in F# major, on the G & B String", "Ascending Diads in F# minor, on the G & B String", "Ascending Diads in G major, on the G & B String", "Ascending Diads in G minor, on the G & B String", "Ascending Diads in G# major, on the G & B String", "Ascending Diads in G# minor, on the G & B String", "Descending Diads in A major, on the G & B String", "Descending Diads in A minor, on the G & B String", "Descending Diads in A# major, on the G & B String", "Descending Diads in A# minor, on the G & B String", "Descending Diads in B major, on the G & B String", "Descending Diads in B minor, on the G & B String", "Descending Diads in C major, on the G & B String", "Descending Diads in C minor, on the G & B String", "Descending Diads in C# major, on the G & B String", "Descending Diads in C# minor, on the G & B String", "Descending Diads in D major, on the G & B String", "Descending Diads in D minor, on the G & B String", "Descending Diads in D# major, on the G & B String", "Descending Diads in D# minor, on the G & B String", "Descending Diads in E major, on the G & B String", "Descending Diads in E minor, on the G & B String", "Descending Diads in F major, on the G & B String", "Descending Diads in F minor, on the G & B String", "Descending Diads in F# major, on the G & B String", "Descending Diads in F# minor, on the G & B String", "Descending Diads in G major, on the G & B String", "Descending Diads in G minor, on the G & B String", "Descending Diads in G# major, on the G & B String", "Descending Diads in G# minor, on the G & B String", "Ascending Diads in A major, on the D & G String", "Ascending Diads in A minor, on the D & G String", "Ascending Diads in A# major, on the D & G String", "Ascending Diads in A# minor, on the D & G String", "Ascending Diads in B major, on the D & G String", "Ascending Diads in B minor, on the D & G String", "Ascending Diads in C major, on the D & G String", "Ascending Diads in C minor, on the D & G String", "Ascending Diads in C# major, on the D & G String", "Ascending Diads in C# minor, on the D & G String", "Ascending Diads in D major, on the D & G String", "Ascending Diads in D minor, on the D & G String", "Ascending Diads in D# major, on the D & G String", "Ascending Diads in D# minor, on the D & G String", "Ascending Diads in E major, on the D & G String", "Ascending Diads in E minor, on the D & G String", "Ascending Diads in F major, on the D & G String", "Ascending Diads in F minor, on the D & G String", "Ascending Diads in F# major, on the D & G String", "Ascending Diads in F# minor, on the D & G String", "Ascending Diads in G major, on the D & G String", "Ascending Diads in G minor, on the D & G String", "Ascending Diads in G# major, on the D & G String", "Ascending Diads in G# minor, on the D & G String", "Descending Diads in A major, on the D & G String", "Descending Diads in A minor, on the D & G String", "Descending Diads in A# major, on the D & G String", "Descending Diads in A# minor, on the D & G String", "Descending Diads in B major, on the D & G String", "Descending Diads in B minor, on the D & G String", "Descending Diads in C major, on the D & G String", "Descending Diads in C minor, on the D & G String", "Descending Diads in C# major, on the D & G String", "Descending Diads in C# minor, on the D & G String", "Descending Diads in D major, on the D & G String", "Descending Diads in D minor, on the D & G String", "Descending Diads in D# major, on the D & G String", "Descending Diads in D# minor, on the D & G String", "Descending Diads in E major, on the D & G String", "Descending Diads in E minor, on the D & G String", "Descending Diads in F major, on the D & G String", "Descending Diads in F minor, on the D & G String", "Descending Diads in F# major, on the D & G String", "Descending Diads in F# minor, on the D & G String", "Descending Diads in G major, on the D & G String", "Descending Diads in G minor, on the D & G String", "Descending Diads in G# major, on the D & G String", "Descending Diads in G# minor, on the D & G String", 30],
                */
                ["Ascending Diads in A major, on the B & E String", "Ascending Diads in A minor, on the B & E String", "Ascending Diads in A# major, on the B & E String", "Ascending Diads in A# minor, on the B & E String", "Ascending Diads in B major, on the B & E String", "Ascending Diads in B minor, on the B & E String", "Ascending Diads in C major, on the B & E String", "Ascending Diads in C minor, on the B & E String", "Ascending Diads in C# major, on the B & E String", "Ascending Diads in C# minor, on the B & E String", "Ascending Diads in D major, on the B & E String", "Ascending Diads in D minor, on the B & E String", "Ascending Diads in D# major, on the B & E String", "Ascending Diads in D# minor, on the B & E String", "Ascending Diads in E major, on the B & E String", "Ascending Diads in E minor, on the B & E String", "Ascending Diads in F major, on the B & E String", "Ascending Diads in F minor, on the B & E String", "Ascending Diads in F# major, on the B & E String", "Ascending Diads in F# minor, on the B & E String", "Ascending Diads in G major, on the B & E String", "Ascending Diads in G minor, on the B & E String", "Ascending Diads in G# major, on the B & E String", "Ascending Diads in G# minor, on the B & E String", "Descending Diads in A major, on the B & E String", "Descending Diads in A minor, on the B & E String", "Descending Diads in A# major, on the B & E String", "Descending Diads in A# minor, on the B & E String", "Descending Diads in B major, on the B & E String", "Descending Diads in B minor, on the B & E String", "Descending Diads in C major, on the B & E String", "Descending Diads in C minor, on the B & E String", "Descending Diads in C# major, on the B & E String", "Descending Diads in C# minor, on the B & E String", "Descending Diads in D major, on the B & E String", "Descending Diads in D minor, on the B & E String", "Descending Diads in D# major, on the B & E String", "Descending Diads in D# minor, on the B & E String", "Descending Diads in E major, on the B & E String", "Descending Diads in E minor, on the B & E String", "Descending Diads in F major, on the B & E String", "Descending Diads in F minor, on the B & E String", "Descending Diads in F# major, on the B & E String", "Descending Diads in F# minor, on the B & E String", "Descending Diads in G major, on the B & E String", "Descending Diads in G minor, on the B & E String", "Descending Diads in G# major, on the B & E String", "Descending Diads in G# minor, on the B & E String", "Ascending Diads in A major, on the G & B String", "Ascending Diads in A minor, on the G & B String", "Ascending Diads in A# major, on the G & B String", "Ascending Diads in A# minor, on the G & B String", "Ascending Diads in B major, on the G & B String", "Ascending Diads in B minor, on the G & B String", "Ascending Diads in C major, on the G & B String", "Ascending Diads in C minor, on the G & B String", "Ascending Diads in C# major, on the G & B String", "Ascending Diads in C# minor, on the G & B String", "Ascending Diads in D major, on the G & B String", "Ascending Diads in D minor, on the G & B String", "Ascending Diads in D# major, on the G & B String", "Ascending Diads in D# minor, on the G & B String", "Ascending Diads in E major, on the G & B String", "Ascending Diads in E minor, on the G & B String", "Ascending Diads in F major, on the G & B String", "Ascending Diads in F minor, on the G & B String", "Ascending Diads in F# major, on the G & B String", "Ascending Diads in F# minor, on the G & B String", "Ascending Diads in G major, on the G & B String", "Ascending Diads in G minor, on the G & B String", "Ascending Diads in G# major, on the G & B String", "Ascending Diads in G# minor, on the G & B String", "Descending Diads in A major, on the G & B String", 30],
                ["Descending Diads in D# minor, on the G & B String", "Descending Diads in E major, on the G & B String", "Descending Diads in E minor, on the G & B String", "Descending Diads in F major, on the G & B String", "Descending Diads in F minor, on the G & B String", "Descending Diads in F# major, on the G & B String", "Descending Diads in F# minor, on the G & B String", "Descending Diads in G major, on the G & B String", "Descending Diads in G minor, on the G & B String", "Descending Diads in G# major, on the G & B String", "Descending Diads in G# minor, on the G & B String", "Ascending Diads in A major, on the D & G String", "Ascending Diads in A minor, on the D & G String", "Ascending Diads in A# major, on the D & G String", "Ascending Diads in A# minor, on the D & G String", "Ascending Diads in B major, on the D & G String", "Ascending Diads in B minor, on the D & G String", "Ascending Diads in C major, on the D & G String", "Ascending Diads in C minor, on the D & G String", "Ascending Diads in C# major, on the D & G String", "Ascending Diads in C# minor, on the D & G String", "Ascending Diads in D major, on the D & G String", "Ascending Diads in D minor, on the D & G String", "Ascending Diads in D# major, on the D & G String", "Ascending Diads in D# minor, on the D & G String", "Ascending Diads in E major, on the D & G String", "Ascending Diads in E minor, on the D & G String", "Ascending Diads in F major, on the D & G String", "Ascending Diads in F minor, on the D & G String", "Ascending Diads in F# major, on the D & G String", "Ascending Diads in F# minor, on the D & G String", "Ascending Diads in G major, on the D & G String", "Ascending Diads in G minor, on the D & G String", "Ascending Diads in G# major, on the D & G String", "Ascending Diads in G# minor, on the D & G String", "Descending Diads in A major, on the D & G String", "Descending Diads in A minor, on the D & G String", "Descending Diads in A# major, on the D & G String", "Descending Diads in A# minor, on the D & G String", "Descending Diads in B major, on the D & G String", "Descending Diads in B minor, on the D & G String", "Descending Diads in C major, on the D & G String", "Descending Diads in C minor, on the D & G String", "Descending Diads in C# major, on the D & G String", "Descending Diads in C# minor, on the D & G String", "Descending Diads in D major, on the D & G String", "Descending Diads in D minor, on the D & G String", "Descending Diads in D# major, on the D & G String", "Descending Diads in D# minor, on the D & G String", "Descending Diads in E major, on the D & G String", "Descending Diads in E minor, on the D & G String", "Descending Diads in F major, on the D & G String", "Descending Diads in F minor, on the D & G String", "Descending Diads in F# major, on the D & G String", "Descending Diads in F# minor, on the D & G String", "Descending Diads in G major, on the D & G String", "Descending Diads in G minor, on the D & G String", "Descending Diads in G# major, on the D & G String", "Descending Diads in G# minor, on the D & G String", "Descending Diads in C# minor, on the G & B String", "Descending Diads in D major, on the G & B String", "Descending Diads in D minor, on the G & B String", "Descending Diads in D# major, on the G & B String", "Descending Diads in B major, on the G & B String", "Descending Diads in B minor, on the G & B String", "Descending Diads in C major, on the G & B String", "Descending Diads in C minor, on the G & B String", "Descending Diads in C# major, on the G & B String", "Descending Diads in A minor, on the G & B String", "Descending Diads in A# major, on the G & B String", "Descending Diads in A# minor, on the G & B String", 30],
                // chords,
                ['Spider Exercise 1234', 'Spider Exercise 1243', 'Spider Exercise 1324', 'Spider Exercise 1342', 'Spider Exercise 1423', 'Spider Exercise 1432', 'Spider Exercise 2134', 'Spider Exercise 2143', 'Spider Exercise 2314', 'Spider Exercise 2341', 'Spider Exercise 2413', 'Spider Exercise 2431', 'Spider Exercise 3124', 'Spider Exercise 3142', 'Spider Exercise 3214', 'Spider Exercise 3241', 'Spider Exercise 3412', 'Spider Exercise 3421', 'Spider Exercise 4123', 'Spider Exercise 4132', 'Spider Exercise 4213', 'Spider Exercise 4231', 'Spider Exercise 4312', 'Spider Exercise 4321', 55],
                ['Diagonal Spider Exercise 1234', 'Diagonal Spider Exercise 1243', 'Diagonal Spider Exercise 1324', 'Diagonal Spider Exercise 1342', 'Diagonal Spider Exercise 1423', 'Diagonal Spider Exercise 1432', 'Diagonal Spider Exercise 2134', 'Diagonal Spider Exercise 2143', 'Diagonal Spider Exercise 2314', 'Diagonal Spider Exercise 2341', 'Diagonal Spider Exercise 2413', 'Diagonal Spider Exercise 2431', 'Diagonal Spider Exercise 3124', 'Diagonal Spider Exercise 3142', 'Diagonal Spider Exercise 3214', 'Diagonal Spider Exercise 3241', 'Diagonal Spider Exercise 3412', 'Diagonal Spider Exercise 3421', 'Diagonal Spider Exercise 4123', 'Diagonal Spider Exercise 4132', 'Diagonal Spider Exercise 4213', 'Diagonal Spider Exercise 4231', 'Diagonal Spider Exercise 4312', 'Diagonal Spider Exercise 4321', 45],
                ['Spider Exercise 1234 Focusing on Economy', 'Spider Exercise 1243 Focusing on Economy', 'Spider Exercise 1324 Focusing on Economy', 'Spider Exercise 1342 Focusing on Economy', 'Spider Exercise 1423 Focusing on Economy', 'Spider Exercise 1432 Focusing on Economy', 'Spider Exercise 2134 Focusing on Economy', 'Spider Exercise 2143 Focusing on Economy', 'Spider Exercise 2314 Focusing on Economy', 'Spider Exercise 2341 Focusing on Economy', 'Spider Exercise 2413 Focusing on Economy', 'Spider Exercise 2431 Focusing on Economy', 'Spider Exercise 3124 Focusing on Economy', 'Spider Exercise 3142 Focusing on Economy', 'Spider Exercise 3214 Focusing on Economy', 'Spider Exercise 3241 Focusing on Economy', 'Spider Exercise 3412 Focusing on Economy', 'Spider Exercise 3421 Focusing on Economy', 'Spider Exercise 4123 Focusing on Economy', 'Spider Exercise 4132 Focusing on Economy', 'Spider Exercise 4213 Focusing on Economy', 'Spider Exercise 4231 Focusing on Economy', 'Spider Exercise 4312 Focusing on Economy', 'Spider Exercise 4321 Focusing on Economy', 'Diagonal Spider Exercise 1234 Focusing on Economy', 'Diagonal Spider Exercise 1243 Focusing on Economy', 'Diagonal Spider Exercise 1324 Focusing on Economy', 'Diagonal Spider Exercise 1342 Focusing on Economy', 'Diagonal Spider Exercise 1423 Focusing on Economy', 'Diagonal Spider Exercise 1432 Focusing on Economy', 'Diagonal Spider Exercise 2134 Focusing on Economy', 'Diagonal Spider Exercise 2143 Focusing on Economy', 'Diagonal Spider Exercise 2314 Focusing on Economy', 'Diagonal Spider Exercise 2341 Focusing on Economy', 'Diagonal Spider Exercise 2413 Focusing on Economy', 'Diagonal Spider Exercise 2431 Focusing on Economy', 'Diagonal Spider Exercise 3124 Focusing on Economy', 'Diagonal Spider Exercise 3142 Focusing on Economy', 'Diagonal Spider Exercise 3214 Focusing on Economy', 'Diagonal Spider Exercise 3241 Focusing on Economy', 'Diagonal Spider Exercise 3412 Focusing on Economy', 'Diagonal Spider Exercise 3421 Focusing on Economy', 'Diagonal Spider Exercise 4123 Focusing on Economy', 'Diagonal Spider Exercise 4132 Focusing on Economy', 'Diagonal Spider Exercise 4213 Focusing on Economy', 'Diagonal Spider Exercise 4231 Focusing on Economy', 'Diagonal Spider Exercise 4312 Focusing on Economy', 'Diagonal Spider Exercise 4321 Focusing on Economy', 43],
                ['Spider Exercise 1234 Focusing on Alternante Picking', 'Spider Exercise 1243 Focusing on Alternante Picking', 'Spider Exercise 1324 Focusing on Alternante Picking', 'Spider Exercise 1342 Focusing on Alternante Picking', 'Spider Exercise 1423 Focusing on Alternante Picking', 'Spider Exercise 1432 Focusing on Alternante Picking', 'Spider Exercise 2134 Focusing on Alternante Picking', 'Spider Exercise 2143 Focusing on Alternante Picking', 'Spider Exercise 2314 Focusing on Alternante Picking', 'Spider Exercise 2341 Focusing on Alternante Picking', 'Spider Exercise 2413 Focusing on Alternante Picking', 'Spider Exercise 2431 Focusing on Alternante Picking', 'Spider Exercise 3124 Focusing on Alternante Picking', 'Spider Exercise 3142 Focusing on Alternante Picking', 'Spider Exercise 3214 Focusing on Alternante Picking', 'Spider Exercise 3241 Focusing on Alternante Picking', 'Spider Exercise 3412 Focusing on Alternante Picking', 'Spider Exercise 3421 Focusing on Alternante Picking', 'Spider Exercise 4123 Focusing on Alternante Picking', 'Spider Exercise 4132 Focusing on Alternante Picking', 'Spider Exercise 4213 Focusing on Alternante Picking', 'Spider Exercise 4231 Focusing on Alternante Picking', 'Spider Exercise 4312 Focusing on Alternante Picking', 'Spider Exercise 4321 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1234 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1243 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1324 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1342 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1423 Focusing on Alternante Picking', 'Diagonal Spider Exercise 1432 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2134 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2143 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2314 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2341 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2413 Focusing on Alternante Picking', 'Diagonal Spider Exercise 2431 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3124 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3142 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3214 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3241 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3412 Focusing on Alternante Picking', 'Diagonal Spider Exercise 3421 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4123 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4132 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4213 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4231 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4312 Focusing on Alternante Picking', 'Diagonal Spider Exercise 4321 Focusing on Alternante Picking', 43],
                ['Tap whilst playing the ii-V-I Jazz Standard: Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the iii-VI-ii-V Jazz: Em7 - A7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the I-vi-ii-V Jazz: Cmaj7 - Am7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the Imaj7-IVmaj7-ii7-V7 Jazz: Cmaj7 - Fmaj7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the vi-ii-V-I Jazz: Am7 - Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the iim7b5-V7alt-im7 Jazz: Dm7b5 - G7alt - Cm7 progression, in the Key of C minor', 'Tap whilst playing the IVmaj7#11 - #IVdim7 - Imin7 - bII7 Jazz: Fmaj7#11 - F#dim7 - Cm7 - Db7 progression, in the Key of C minor', 'Tap whilst playing the I - #Idim7 - IImin7 - V7 Jazz: Cmaj7 - C#dim7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the I7 - VI7 - II7 - V7 Jazz: C7 - A7 - D7 - G7 progression, in the Key of C major', 'Tap whilst playing the iii7 - VI7 - ii7 - V7 Jazz: Em7 - A7 - Dm7 - G7 progression, in the Key of C major', 'Tap whilst playing the Funk Groove: Em7 - A7 - D9 - G7 progression, in the Key of G major', 'Tap whilst playing the Math Rock Groove 1: Am - C - Em - G progression, in the Key of A minor', 'Tap whilst playing the Funk Fusion: Dm7 - G7 - C9 - Fmaj7 progression, in the Key of F major', 'Tap whilst playing the Math Rock Groove 2: Dm - G - Em - A progression, in the Key of D minor', 'Tap whilst playing the Funk Jam: G7 - C7 - F7 - Bb7 progression, in the Key of F major', 'Tap whilst playing the Math Rock Arpeggios: Dmaj7 - Bm7 - F#m7 - Gmaj7 progression, in the Key of D major', 'Tap whilst playing the Funky Blues: E7 - A7 - B7 - E7 progression, in the Key of E major', 'Tap whilst playing the Math Rock Modal: Emaj7 - F#m7 - G#m7 - Amaj7 progression, in the Key of E major', 'Tap whilst playing the Funk Fusion II: Em7 - A7 - Dmaj7 - Gmaj7 progression, in the Key of G major', 'Tap whilst playing the Math Rock Chromatic: Dm7 - Dbmaj7 - Cm7 - Bbmaj7 progression, in the Key of C minor', 'Tap whilst playing the Jazz Blues: C7 - F7 - Gm7 - C7 progression, in the Key of C major', 'Tap whilst playing the Funk Groove II: Em7 - A7 - D7 - G7 progression, in the Key of E minor', 'Tap whilst playing the Math Rock Groove 3: G - Bm - D - F# progression, in the Key of G major', 'Tap whilst playing the Fusion Vibe: Am7 - D7 - Gmaj7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the Jazz Turnaround: Dm7 - G7 - Cmaj7 - A7 progression, in the Key of C major', 'Tap whilst playing the Funky Rhythm: G9 - C9 - F9 - Bb9 progression, in the Key of F major', 'Tap whilst playing the Math Rock Experiment: F#m - Dmaj7 - Bm - Emaj7 progression, in the Key of D major', 'Tap whilst playing the Jazz Waltz: Dm7 - G7 - Cmaj7 - Am7 progression, in the Key of C major', 'Tap whilst playing the Funk Fusion III: Em7 - A7 - Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the Math Rock Groove 4: A - C#m - E - G#m progression, in the Key of A major', 'Tap whilst playing the Jazz Fusion: Dm7 - G7 - Cmaj7 - Fmaj7 progression, in the Key of C major', 'Tap whilst playing the Funky Groove: C7 - F9 - G7 - C9 progression, in the Key of C major', 'Tap whilst playing the Math Rock Riff: E - G - D - A progression, in the Key of E minor', 'Tap whilst playing the Jazz Modal Vibe: Dm7 - Em7 - Am7 - Dm7 progression, in the Key of A minor', 'Tap whilst playing the Funk Jam II: D9 - G9 - C9 - F9 progression, in the Key of F major', 'Tap whilst playing the Math Rock Groove 5: Bm - D - F#m - A progression, in the Key of B minor', 'Tap whilst playing the Jazz Ballad: Am7 - Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the Funky Blues II: A7 - D7 - E7 - A7 progression, in the Key of A major', 'Tap whilst playing the Math Rock Fusion: G#m - F#m - Emaj7 - B progression, in the Key of G# minor', 'Tap whilst playing the Jazz Bossa Nova: Am7 - D7 - Gmaj7 - Bm7b5 progression, in the Key of A minor', 'Tap whilst playing the Funk Fusion IV: Cm7 - F7 - Bbmaj7 - Ebmaj7 progression, in the Key of Bb major', 'Tap whilst playing the Math Rock Groove 6: F - A#m - D# - Gm progression, in the Key of F major', 'Tap whilst playing the Jazz Funk Jam: G7 - C9 - F7 - Bb9 progression, in the Key of F major', 'Tap whilst playing the Funky Riff: E7 - A7 - D7 - G7 progression, in the Key of E major', 'Tap whilst playing the Math Rock Experiment II: D - F#m - Bm - G progression, in the Key of D major', 'Tap whilst playing the Jazz Fusion II: Em7 - A7 - Dm7 - G7 - Cmaj7 progression, in the Key of C major', 'Tap whilst playing the Funk Groove III: Bm7 - E7 - Am7 - D7 progression, in the Key of B minor', 'Tap whilst playing the Math Rock Groove 7: D#m - G# - C#m - F# progression, in the Key of D# minor', 'Tap whilst playing the Jazz Funk Fusion: Am7 - D9 - Gmaj7 - C9 progression, in the Key of C major', 'Tap whilst playing the Funky Modal Vibe: Gm7 - Cm7 - F7 - Bb7 progression, in the Key of Bb major', 50],
                ["Ascending Triplets Scale Run in A major", "Ascending Triplets Scale Run in A minor", "Ascending Triplets Scale Run in A# major", "Ascending Triplets Scale Run in A# minor", "Ascending Triplets Scale Run in B major", "Ascending Triplets Scale Run in B minor", "Ascending Triplets Scale Run in C major", "Ascending Triplets Scale Run in C minor", "Ascending Triplets Scale Run in C# major", "Ascending Triplets Scale Run in C# minor", "Ascending Triplets Scale Run in D major", "Ascending Triplets Scale Run in D minor", "Ascending Triplets Scale Run in D# major", "Ascending Triplets Scale Run in D# minor", "Ascending Triplets Scale Run in E major", "Ascending Triplets Scale Run in E minor", "Ascending Triplets Scale Run in F major", "Ascending Triplets Scale Run in F minor", "Ascending Triplets Scale Run in F# major", "Ascending Triplets Scale Run in F# minor", "Ascending Triplets Scale Run in G major", "Ascending Triplets Scale Run in G minor", "Ascending Triplets Scale Run in G# major", "Ascending Triplets Scale Run in G# minor", "Descending Triplets Scale Run in A major", "Descending Triplets Scale Run in A minor", "Descending Triplets Scale Run in A# major", "Descending Triplets Scale Run in A# minor", "Descending Triplets Scale Run in B major", "Descending Triplets Scale Run in B minor", "Descending Triplets Scale Run in C major", "Descending Triplets Scale Run in C minor", "Descending Triplets Scale Run in C# major", "Descending Triplets Scale Run in C# minor", "Descending Triplets Scale Run in D major", "Descending Triplets Scale Run in D minor", "Descending Triplets Scale Run in D# major", "Descending Triplets Scale Run in D# minor", "Descending Triplets Scale Run in E major", "Descending Triplets Scale Run in E minor", "Descending Triplets Scale Run in F major", "Descending Triplets Scale Run in F minor", "Descending Triplets Scale Run in F# major", "Descending Triplets Scale Run in F# minor", "Descending Triplets Scale Run in G major", "Descending Triplets Scale Run in G minor", "Descending Triplets Scale Run in G# major", "Descending Triplets Scale Run in G# minor", 75],
                ["Play A major triplets on each string, starting on the D string's 1 fret.", "Play A major triplets on each string, starting on the D string's 2 fret.", "Play A major triplets on each string, starting on the D string's 3 fret.", "Play A major triplets on each string, starting on the D string's 4 fret.", "Play A major triplets on each string, starting on the D string's 5 fret.", "Play A major triplets on each string, starting on the D string's 6 fret.", "Play A major triplets on each string, starting on the D string's 7 fret.", "Play A major triplets on each string, starting on the D string's 8 fret.", "Play A major triplets on each string, starting on the D string's 9 fret.", "Play A major triplets on each string, starting on the D string's 10 fret.", "Play A major triplets on each string, starting on the D string's 11 fret.", "Play A major triplets on each string, starting on the D string's 12 fret.", "Play A major triplets on each string, starting on the D string's 13 fret.", "Play A major triplets on each string, starting on the D string's 14 fret.", "Play A major triplets on each string, starting on the D string's 15 fret.", 30]
                ["1 Octave Arpeggios in  A major", "1 Octave Arpeggios in  A minor", "1 Octave Arpeggios in  A# major", "1 Octave Arpeggios in  A# minor", "1 Octave Arpeggios in  B major", "1 Octave Arpeggios in  B minor", "1 Octave Arpeggios in  C major", "1 Octave Arpeggios in  C minor", "1 Octave Arpeggios in  C# major", "1 Octave Arpeggios in  C# minor", "1 Octave Arpeggios in  D major", "1 Octave Arpeggios in  D minor", "1 Octave Arpeggios in  D# major", "1 Octave Arpeggios in  D# minor", "1 Octave Arpeggios in  E major", "1 Octave Arpeggios in  E minor", "1 Octave Arpeggios in  F major", "1 Octave Arpeggios in  F minor", "1 Octave Arpeggios in  F# major", "1 Octave Arpeggios in  F# minor", "1 Octave Arpeggios in  G major", "1 Octave Arpeggios in  G minor", "1 Octave Arpeggios in  G# major", "1 Octave Arpeggios in  G# minor", "2 Octave Arpeggios in  A major", "2 Octave Arpeggios in  A minor", "2 Octave Arpeggios in  A# major", "2 Octave Arpeggios in  A# minor", "2 Octave Arpeggios in  B major", "2 Octave Arpeggios in  B minor", "2 Octave Arpeggios in  C major", "2 Octave Arpeggios in  C minor", "2 Octave Arpeggios in  C# major", "2 Octave Arpeggios in  C# minor", "2 Octave Arpeggios in  D major", "2 Octave Arpeggios in  D minor", "2 Octave Arpeggios in  D# major", "2 Octave Arpeggios in  D# minor", "2 Octave Arpeggios in  E major", "2 Octave Arpeggios in  E minor", "2 Octave Arpeggios in  F major", "2 Octave Arpeggios in  F minor", "2 Octave Arpeggios in  F# major", "2 Octave Arpeggios in  F# minor", "2 Octave Arpeggios in  G major", "2 Octave Arpeggios in  G minor", "2 Octave Arpeggios in  G# major", "2 Octave Arpeggios in  G# minor", 75],
            ];
            /* 
            res = Math.random(4867835363898769) * techniqueExercises.length-1;
            console.log(res);
            res = Math.floor(res);
            temp = techniqueExercises[res];
            console.log(res);
            console.log(temp);
            bpm = temp[temp.length-1];
            res2 = Math.floor(Math.random(4867833525234) * temp.length-1)
            console.log(res2);
            temp = temp[res2];
            console.log(temp);
            */
            temp = techniqueExercises[Math.floor(Math.random(4867835363898769) * (techniqueExercises.length-1))];
            bpm = temp[temp.length-1]-10;
            temp = temp[Math.floor(Math.random(4867833525234) * (temp.length-1))];
            console.log(temp);
            if (temp.toLowerCase().includes("diagonal")) bpm -= 5;
            if (temp.toLowerCase().includes("economy")) bpm -= 5;
            
            if (temp.includes("Chords")) {
                sheetImage.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent("Chords/" + temp.replace("#", "Sharp") + ".png"));
                sheetImage.classList.add("shown");
                sheetImage.classList.remove("hidden");
            } 
            keys = ["C# Minor", "G Minor", "D Minor", "E Minor", "E Major", "C Minor", "Gb Major", "C# Major", "B Minor", "Ab Major", "D Major", "F Minor", "G Major", "Bb Minor", "A Minor", "Db Major", "A# Minor", "Eb Minor", "A Major", "C Major", "Bb Major", "D# Minor", "F# Major", "Cb Major", "G# Minor", "Ab Minor", "Eb Major", "F# Minor", "B Major", "F Major"]
            if (temp.search(/([a-g]|[A-G])(#|b|)\s(major|minor)/i) != -1) {
                temp = temp.replace(/([a-g]|[A-G])(#|b|)\s(major|minor)/i, keys[Math.floor(Math.random(4867833525234) * keys.length)]);
            }
            
            techniqueText.textContent = temp + " at " + (bpm + Math.floor((Date.now() / 1000) / 86400) - 19850 - 12) + " bpm";

           
            audioPlayer.pause();
        } else if (practiceType <= calculateThreshold(chances, 4)) {
            //Repatoire Building & Learning music
            //     console.log(githubKey);

            // (async () => { 
            //     gistId = "63ff91244fb5afe4e68d0d80e62ae8d4";
            //     response = await fetch(`https://api.github.com/gists/${gistId}`, {
            //     headers: {
            //         'Authorization': `token ${githubKey}`,
            //     },
            //     });
            //     gist = await response.json();
            //     content = gist.files['currentSong.txt'].content;
            //     currentBars = 1;
            //     totalBars = 0;
            //     n = 0;
            //     while (currentBars >= totalBars) {
            //         n++;
            //         currentSong = content.split("\n").slice(-n)[0];
            //         fileName = currentSong.split("|")[0];
            //         currentBars = parseInt(currentSong.split("|")[1]);
            //         totalBars = parseInt(currentSong.split("|")[2]);
            //         if (n > content.split("\n").length) {
            //             currentSong = content.split("\n")[Math.floor(Math.random(4867833525234) * content.split("\n").length)];
            //             fileName = currentSong.split("|")[0];
            //             currentBars = parseInt(currentSong.split("|")[1]);
            //             totalBars = parseInt(currentSong.split("|")[2]);
            //             break;
            //         }
            //         console.log(n);
            //         console.log(content);
            //     }
            //     message = "Play through bars " + currentBars + " to " + (currentBars + 2) + " then run through till bar " + (currentBars + 2) + " of " + fileName.split(".gp")[0];
            //     hideAll();
            //     showSheet();
            //     techniqueText.textContent = message;
            //     showTechniqueText();
            //     osmd.setOptions({drawUpToMeasureNumber: currentBars + 2, drawFromMeasureNumber: currentBars});
            //     loadSheet(corsProxy + encodeURIComponent(fileHost + encodeURIComponent("repertoire/" + fileName)));
            //     nextButton.addEventListener("click", updateRepatoire, {once : true});
            //     revealSheet.addEventListener("click", showSheetPDF, {once : true});
            //     skipButton.addEventListener("click", function(){
            //         nextButton.removeEventListener('click', updateRepatoire);
            //         revealSheet.removeEventListener("click", showSheetPDF);
            //     }, {once : true});
            //     showSheetButton();
            //     sheetPDF.data = corsProxy + encodeURIComponent(fileHost + encodeURIComponent("repertoire/" + fileName.split(".musicxml")[0] + ".pdf"));
            // })();
            techniqueText.textContent = "Practice the current piece you made for this weeks video";
            decrypt("7gFY+hJFAegnJJReYveCYjWIVMUJIpZbR5kAVbceiVXjoQ5s2gUqBUjNjc7MmtTBIq7WPEgssm3MzqDslkTJJgefFNzWW/+Zo7P3CvqrV9gwd1Gj+QTSXNMi4nL2yhMnRZhFqCfkHY4UAwm4Gci8fOzBMMiGYDII3giA4FZ6sZyNPhlr9S/AqRopfxsoLQsJtDhwiDy87imE", password).then((result) => {
                keyText.innerHTML = `<summary> Inspiration </summary>`+`<a href="${result}" target="_blank"> Dropbox </a>`;
            });
            hideAll();
            showElement(keyText);
            showTechniqueText();
        } else if (practiceType <= calculateThreshold(chances, 5)) {
            // Music Theory
            if (Math.random(4867835363898769) > 0.5) {
                theoryExercises = [
                    // Humming notes and intervals
                    [
                        ['Hum a(n) C then a(n) C#'],
                        ['Hum a(n) C then a(n) D'],
                        ['Hum a(n) C then a(n) D#'],
                        ['Hum a(n) C then a(n) E'],
                        ['Hum a(n) C then a(n) F'],
                        ['Hum a(n) C then a(n) F#'],
                        ['Hum a(n) C then a(n) G'],
                        ['Hum a(n) C then a(n) G#'],
                        ['Hum a(n) C then a(n) A'],
                        ['Hum a(n) C then a(n) A#'],
                        ['Hum a(n) C then a(n) B'],
                        ['Hum a(n) C# then a(n) C'],
                        ['Hum a(n) C# then a(n) D'],
                        ['Hum a(n) C# then a(n) D#'],
                        ['Hum a(n) C# then a(n) E'],
                        ['Hum a(n) C# then a(n) F'],
                        ['Hum a(n) C# then a(n) F#'],
                        ['Hum a(n) C# then a(n) G'],
                        ['Hum a(n) C# then a(n) G#'],
                        ['Hum a(n) C# then a(n) A'],
                        ['Hum a(n) C# then a(n) A#'],
                        ['Hum a(n) C# then a(n) B'],
                        ['Hum a(n) D then a(n) C'],
                        ['Hum a(n) D then a(n) C#'],
                        ['Hum a(n) D then a(n) D#'],
                        ['Hum a(n) D then a(n) E'],
                        ['Hum a(n) D then a(n) F'],
                        ['Hum a(n) D then a(n) F#'],
                        ['Hum a(n) D then a(n) G'],
                        ['Hum a(n) D then a(n) G#'],
                        ['Hum a(n) D then a(n) A'],
                        ['Hum a(n) D then a(n) A#'],
                        ['Hum a(n) D then a(n) B'],
                        ['Hum a(n) D# then a(n) C'],
                        ['Hum a(n) D# then a(n) C#'],
                        ['Hum a(n) D# then a(n) D'],
                        ['Hum a(n) D# then a(n) E'],
                        ['Hum a(n) D# then a(n) F'],
                        ['Hum a(n) D# then a(n) F#'],
                        ['Hum a(n) D# then a(n) G'],
                        ['Hum a(n) D# then a(n) G#'],
                        ['Hum a(n) D# then a(n) A'],
                        ['Hum a(n) D# then a(n) A#'],
                        ['Hum a(n) D# then a(n) B'],
                        ['Hum a(n) E then a(n) C'],
                        ['Hum a(n) E then a(n) C#'],
                        ['Hum a(n) E then a(n) D'],
                        ['Hum a(n) E then a(n) D#'],
                        ['Hum a(n) E then a(n) F'],
                        ['Hum a(n) E then a(n) F#'],
                        ['Hum a(n) E then a(n) G'],
                        ['Hum a(n) E then a(n) G#'],
                        ['Hum a(n) E then a(n) A'],
                        ['Hum a(n) E then a(n) A#'],
                        ['Hum a(n) E then a(n) B'],
                        ['Hum a(n) F then a(n) C'],
                        ['Hum a(n) F then a(n) C#'],
                        ['Hum a(n) F then a(n) D'],
                        ['Hum a(n) F then a(n) D#'],
                        ['Hum a(n) F then a(n) E'],
                        ['Hum a(n) F then a(n) F#'],
                        ['Hum a(n) F then a(n) G'],
                        ['Hum a(n) F then a(n) G#'],
                        ['Hum a(n) F then a(n) A'],
                        ['Hum a(n) F then a(n) A#'],
                        ['Hum a(n) F then a(n) B'],
                        ['Hum a(n) F# then a(n) C'],
                        ['Hum a(n) F# then a(n) C#'],
                        ['Hum a(n) F# then a(n) D'],
                        ['Hum a(n) F# then a(n) D#'],
                        ['Hum a(n) F# then a(n) E'],
                        ['Hum a(n) F# then a(n) F'],
                        ['Hum a(n) F# then a(n) G'],
                        ['Hum a(n) F# then a(n) G#'],
                        ['Hum a(n) F# then a(n) A'],
                        ['Hum a(n) F# then a(n) A#'],
                        ['Hum a(n) F# then a(n) B'],
                        ['Hum a(n) G then a(n) C'],
                        ['Hum a(n) G then a(n) C#'],
                        ['Hum a(n) G then a(n) D'],
                        ['Hum a(n) G then a(n) D#'],
                        ['Hum a(n) G then a(n) E'],
                        ['Hum a(n) G then a(n) F'],
                        ['Hum a(n) G then a(n) F#'],
                        ['Hum a(n) G then a(n) G#'],
                        ['Hum a(n) G then a(n) A'],
                        ['Hum a(n) G then a(n) A#'],
                        ['Hum a(n) G then a(n) B'],
                        ['Hum a(n) G# then a(n) C'],
                        ['Hum a(n) G# then a(n) C#'],
                        ['Hum a(n) G# then a(n) D'],
                        ['Hum a(n) G# then a(n) D#'],
                        ['Hum a(n) G# then a(n) E'],
                        ['Hum a(n) G# then a(n) F'],
                        ['Hum a(n) G# then a(n) F#'],
                        ['Hum a(n) G# then a(n) G'],
                        ['Hum a(n) G# then a(n) A'],
                        ['Hum a(n) G# then a(n) A#'],
                        ['Hum a(n) G# then a(n) B'],
                        ['Hum a(n) A then a(n) C'],
                        ['Hum a(n) A then a(n) C#'],
                        ['Hum a(n) A then a(n) D'],
                        ['Hum a(n) A then a(n) D#'],
                        ['Hum a(n) A then a(n) E'],
                        ['Hum a(n) A then a(n) F'],
                        ['Hum a(n) A then a(n) F#'],
                        ['Hum a(n) A then a(n) G'],
                        ['Hum a(n) A then a(n) G#'],
                        ['Hum a(n) A then a(n) A#'],
                        ['Hum a(n) A then a(n) B'],
                        ['Hum a(n) A# then a(n) C'],
                        ['Hum a(n) A# then a(n) C#'],
                        ['Hum a(n) A# then a(n) D'],
                        ['Hum a(n) A# then a(n) D#'],
                        ['Hum a(n) A# then a(n) E'],
                        ['Hum a(n) A# then a(n) F'],
                        ['Hum a(n) A# then a(n) F#'],
                        ['Hum a(n) A# then a(n) G'],
                        ['Hum a(n) A# then a(n) G#'],
                        ['Hum a(n) A# then a(n) A'],
                        ['Hum a(n) A# then a(n) B'],
                        ['Hum a(n) B then a(n) C'],
                        ['Hum a(n) B then a(n) C#'],
                        ['Hum a(n) B then a(n) D'],
                        ['Hum a(n) B then a(n) D#'],
                        ['Hum a(n) B then a(n) E'],
                        ['Hum a(n) B then a(n) F'],
                        ['Hum a(n) B then a(n) F#'],
                        ['Hum a(n) B then a(n) G'],
                        ['Hum a(n) B then a(n) G#'],
                        ['Hum a(n) B then a(n) A'],
                        ['Hum a(n) B then a(n) A#']
                    ],
                    // Relative major/minor exercises
                    [
                        ['What is the relative minor of C major?', 'A minor'],
                        ['What is the relative minor of G major?', 'E minor'],
                        ['What is the relative minor of D major?', 'B minor'],
                        ['What is the relative minor of A major?', 'F♯ minor'],
                        ['What is the relative minor of E major?', 'C♯ minor'],
                        ['What is the relative minor of B major?', 'G♯ minor'],
                        ['What is the relative minor of F♯ major?', 'D♯ minor'],
                        ['What is the relative minor of D♭ major (C♯ major)?', 'B♭ minor (A♯ minor)'],
                        ['What is the relative minor of A♭ major?', 'F minor'],
                        ['What is the relative minor of E♭ major?', 'C minor'],
                        ['What is the relative minor of B♭ major?', 'G minor'],
                        ['What is the relative minor of F major?', 'D minor'],
                        ['What is the relative major of A minor?', 'C major'],
                        ['What is the relative major of E minor?', 'G major'],
                        ['What is the relative major of B minor?', 'D major'],
                        ['What is the relative major of F♯ minor?', 'A major'],
                        ['What is the relative major of C♯ minor?', 'E major'],
                        ['What is the relative major of G♯ minor?', 'B major'],
                        ['What is the relative major of D♯ minor (E♭ minor)?', 'F♯ major'],
                        ['What is the relative major of B♭ minor (A♯ minor)?', 'D♭ major (C♯ major)'],
                        ['What is the relative major of F minor?', 'A♭ major'],
                        ['What is the relative major of C minor?', 'E♭ major'],
                        ['What is the relative major of G minor?', 'B♭ major'],
                        ['What is the relative major of D minor?', 'F major']

                    ],    // Shifting notes up and down intervals
                    [
                        ['Raise C by a minor 2nd', 'C#'],
                        ['Raise C by a major 2nd', 'D'],
                        ['Raise C by a minor 3rd', 'D#'],
                        ['Raise C by a major 3rd', 'E'],
                        ['Raise C by a perfect 4th', 'F'],
                        ['Raise C by a augmented 4th', 'F#'],
                        ['Raise C by a perfect 5th', 'G'],
                        ['Raise C by a minor 6th', 'G#'],
                        ['Raise C by a major 6th', 'A'],
                        ['Raise C by a minor 7th', 'A#'],
                        ['Raise C by a major 7th', 'B'],
                        ['Raise C by a octave', 'C'],
                        ['Raise C# by a minor 2nd', 'D'],
                        ['Raise C# by a major 2nd', 'D#'],
                        ['Raise C# by a minor 3rd', 'E'],
                        ['Raise C# by a major 3rd', 'F'],
                        ['Raise C# by a perfect 4th', 'F#'],
                        ['Raise C# by a augmented 4th', 'G'],
                        ['Raise C# by a perfect 5th', 'G#'],
                        ['Raise C# by a minor 6th', 'A'],
                        ['Raise C# by a major 6th', 'A#'],
                        ['Raise C# by a minor 7th', 'B'],
                        ['Raise C# by a major 7th', 'C'],
                        ['Raise C# by a octave', 'C#'],
                        ['Raise D by a minor 2nd', 'D#'],
                        ['Raise D by a major 2nd', 'E'],
                        ['Raise D by a minor 3rd', 'F'],
                        ['Raise D by a major 3rd', 'F#'],
                        ['Raise D by a perfect 4th', 'G'],
                        ['Raise D by a augmented 4th', 'G#'],
                        ['Raise D by a perfect 5th', 'A'],
                        ['Raise D by a minor 6th', 'A#'],
                        ['Raise D by a major 6th', 'B'],
                        ['Raise D by a minor 7th', 'C'],
                        ['Raise D by a major 7th', 'C#'],
                        ['Raise D by a octave', 'D'],
                        ['Raise D# by a minor 2nd', 'E'],
                        ['Raise D# by a major 2nd', 'F'],
                        ['Raise D# by a minor 3rd', 'F#'],
                        ['Raise D# by a major 3rd', 'G'],
                        ['Raise D# by a perfect 4th', 'G#'],
                        ['Raise D# by a augmented 4th', 'A'],
                        ['Raise D# by a perfect 5th', 'A#'],
                        ['Raise D# by a minor 6th', 'B'],
                        ['Raise D# by a major 6th', 'C'],
                        ['Raise D# by a minor 7th', 'C#'],
                        ['Raise D# by a major 7th', 'D'],
                        ['Raise D# by a octave', 'D#'],
                        ['Raise E by a minor 2nd', 'F'],
                        ['Raise E by a major 2nd', 'F#'],
                        ['Raise E by a minor 3rd', 'G'],
                        ['Raise E by a major 3rd', 'G#'],
                        ['Raise E by a perfect 4th', 'A'],
                        ['Raise E by a augmented 4th', 'A#'],
                        ['Raise E by a perfect 5th', 'B'],
                        ['Raise E by a minor 6th', 'C'],
                        ['Raise E by a major 6th', 'C#'],
                        ['Raise E by a minor 7th', 'D'],
                        ['Raise E by a major 7th', 'D#'],
                        ['Raise E by a octave', 'E'],
                        ['Raise F by a minor 2nd', 'F#'],
                        ['Raise F by a major 2nd', 'G'],
                        ['Raise F by a minor 3rd', 'G#'],
                        ['Raise F by a major 3rd', 'A'],
                        ['Raise F by a perfect 4th', 'A#'],
                        ['Raise F by a augmented 4th', 'B'],
                        ['Raise F by a perfect 5th', 'C'],
                        ['Raise F by a minor 6th', 'C#'],
                        ['Raise F by a major 6th', 'D'],
                        ['Raise F by a minor 7th', 'D#'],
                        ['Raise F by a major 7th', 'E'],
                        ['Raise F by a octave', 'F'],
                        ['Raise F# by a minor 2nd', 'G'],
                        ['Raise F# by a major 2nd', 'G#'],
                        ['Raise F# by a minor 3rd', 'A'],
                        ['Raise F# by a major 3rd', 'A#'],
                        ['Raise F# by a perfect 4th', 'B'],
                        ['Raise F# by a augmented 4th', 'C'],
                        ['Raise F# by a perfect 5th', 'C#'],
                        ['Raise F# by a minor 6th', 'D'],
                        ['Raise F# by a major 6th', 'D#'],
                        ['Raise F# by a minor 7th', 'E'],
                        ['Raise F# by a major 7th', 'F'],
                        ['Raise F# by a octave', 'F#'],
                        ['Raise G by a minor 2nd', 'G#'],
                        ['Raise G by a major 2nd', 'A'],
                        ['Raise G by a minor 3rd', 'A#'],
                        ['Raise G by a major 3rd', 'B'],
                        ['Raise G by a perfect 4th', 'C'],
                        ['Raise G by a augmented 4th', 'C#'],
                        ['Raise G by a perfect 5th', 'D'],
                        ['Raise G by a minor 6th', 'D#'],
                        ['Raise G by a major 6th', 'E'],
                        ['Raise G by a minor 7th', 'F'],
                        ['Raise G by a major 7th', 'F#'],
                        ['Raise G by a octave', 'G'],
                        ['Raise G# by a minor 2nd', 'A'],
                        ['Raise G# by a major 2nd', 'A#'],
                        ['Raise G# by a minor 3rd', 'B'],
                        ['Raise G# by a major 3rd', 'C'],
                        ['Raise G# by a perfect 4th', 'C#'],
                        ['Raise G# by a augmented 4th', 'D'],
                        ['Raise G# by a perfect 5th', 'D#'],
                        ['Raise G# by a minor 6th', 'E'],
                        ['Raise G# by a major 6th', 'F'],
                        ['Raise G# by a minor 7th', 'F#'],
                        ['Raise G# by a major 7th', 'G'],
                        ['Raise G# by a octave', 'G#'],
                        ['Raise A by a minor 2nd', 'A#'],
                        ['Raise A by a major 2nd', 'B'],
                        ['Raise A by a minor 3rd', 'C'],
                        ['Raise A by a major 3rd', 'C#'],
                        ['Raise A by a perfect 4th', 'D'],
                        ['Raise A by a augmented 4th', 'D#'],
                        ['Raise A by a perfect 5th', 'E'],
                        ['Raise A by a minor 6th', 'F'],
                        ['Raise A by a major 6th', 'F#'],
                        ['Raise A by a minor 7th', 'G'],
                        ['Raise A by a major 7th', 'G#'],
                        ['Raise A by a octave', 'A'],
                        ['Raise A# by a minor 2nd', 'B'],
                        ['Raise A# by a major 2nd', 'C'],
                        ['Raise A# by a minor 3rd', 'C#'],
                        ['Raise A# by a major 3rd', 'D'],
                        ['Raise A# by a perfect 4th', 'D#'],
                        ['Raise A# by a augmented 4th', 'E'],
                        ['Raise A# by a perfect 5th', 'F'],
                        ['Raise A# by a minor 6th', 'F#'],
                        ['Raise A# by a major 6th', 'G'],
                        ['Raise A# by a minor 7th', 'G#'],
                        ['Raise A# by a major 7th', 'A'],
                        ['Raise A# by a octave', 'A#'],
                        ['Raise B by a minor 2nd', 'C'],
                        ['Raise B by a major 2nd', 'C#'],
                        ['Raise B by a minor 3rd', 'D'],
                        ['Raise B by a major 3rd', 'D#'],
                        ['Raise B by a perfect 4th', 'E'],
                        ['Raise B by a augmented 4th', 'F'],
                        ['Raise B by a perfect 5th', 'F#'],
                        ['Raise B by a minor 6th', 'G'],
                        ['Raise B by a major 6th', 'G#'],
                        ['Raise B by a minor 7th', 'A'],
                        ['Raise B by a major 7th', 'A#'],
                        ['Raise B by a octave', 'B'],
                    ],    [
                        ['Raise C by a minor 3rd', 'D#'],
                        ['Raise C by a major 3rd', 'E'],
                        ['Raise C by a perfect 4th', 'F'],
                        ['Raise C by a perfect 5th', 'G'],
                        ['Raise C by a octave', 'C'],
                        ['Raise C# by a minor 3rd', 'E'],
                        ['Raise C# by a major 3rd', 'F'],
                        ['Raise C# by a perfect 4th', 'F#'],
                        ['Raise C# by a perfect 5th', 'G#'],
                        ['Raise C# by a octave', 'C#'],
                        ['Raise D by a minor 3rd', 'F'],
                        ['Raise D by a major 3rd', 'F#'],
                        ['Raise D by a perfect 4th', 'G'],
                        ['Raise D by a perfect 5th', 'A'],
                        ['Raise D by a octave', 'D'],
                        ['Raise D# by a minor 3rd', 'F#'],
                        ['Raise D# by a major 3rd', 'G'],
                        ['Raise D# by a perfect 4th', 'G#'],
                        ['Raise D# by a perfect 5th', 'A#'],
                        ['Raise D# by a octave', 'D#'],
                        ['Raise E by a minor 3rd', 'G'],
                        ['Raise E by a major 3rd', 'G#'],
                        ['Raise E by a perfect 4th', 'A'],
                        ['Raise E by a perfect 5th', 'B'],
                        ['Raise E by a octave', 'E'],
                        ['Raise F by a minor 3rd', 'G#'],
                        ['Raise F by a major 3rd', 'A'],
                        ['Raise F by a perfect 4th', 'A#'],
                        ['Raise F by a perfect 5th', 'C'],
                        ['Raise F by a octave', 'F'],
                        ['Raise F# by a minor 3rd', 'A'],
                        ['Raise F# by a major 3rd', 'A#'],
                        ['Raise F# by a perfect 4th', 'B'],
                        ['Raise F# by a perfect 5th', 'C#'],
                        ['Raise F# by a octave', 'F#'],
                        ['Raise G by a minor 3rd', 'A#'],
                        ['Raise G by a major 3rd', 'B'],
                        ['Raise G by a perfect 4th', 'C'],
                        ['Raise G by a perfect 5th', 'D'],
                        ['Raise G by a octave', 'G'],
                        ['Raise G# by a minor 3rd', 'B'],
                        ['Raise G# by a major 3rd', 'C'],
                        ['Raise G# by a perfect 4th', 'C#'],
                        ['Raise G# by a perfect 5th', 'D#'],
                        ['Raise G# by a octave', 'G#'],
                        ['Raise A by a minor 3rd', 'C'],
                        ['Raise A by a major 3rd', 'C#'],
                        ['Raise A by a perfect 4th', 'D'],
                        ['Raise A by a perfect 5th', 'E'],
                        ['Raise A by a octave', 'A'],
                        ['Raise A# by a minor 3rd', 'C#'],
                        ['Raise A# by a major 3rd', 'D'],
                        ['Raise A# by a perfect 4th', 'D#'],
                        ['Raise A# by a perfect 5th', 'F'],
                        ['Raise A# by a octave', 'A#'],
                        ['Raise B by a minor 3rd', 'D'],
                        ['Raise B by a major 3rd', 'D#'],
                        ['Raise B by a perfect 4th', 'E'],
                        ['Raise B by a perfect 5th', 'F#'],
                        ['Raise B by a octave', 'B'],
                    ],    // Interval exercises that ask which intervals are equal
                    [
                        ['What interval is equal to a minor 2nd?', 'augmented unison'],
                        ['What interval is equal to a major 2nd?', 'diminished 3rd'],
                        ['What interval is equal to a minor 3rd?', 'augmented 2nd'],
                        ['What interval is equal to a major 3rd?', 'diminished 4th'],
                        ['What interval is equal to a perfect 4th?', 'augmented 3rd'],
                        ['What interval is equal to a perfect 4th?', 'diminished 5th'],
                        ['What interval is equal to a augmented 4th?', 'diminished 5th'],
                        ['What interval is equal to a perfect 5th?', 'diminished 6th'],
                        ['What interval is equal to a minor 6th?', 'augmented 5th'],
                        ['What interval is equal to a major 6th?', 'diminished 7th'],
                        ['What interval is equal to a minor 7th?', 'augmented 6th'],
                        ['What interval is equal to a major 7th?', 'diminished octave'],
                        ['What interval is equal to a octave?', 'augmented 7th'],
                    ],    // Exercises for the number of sharps in major keys
                    [
                        ['How many sharps are in the key of C major?', '0 sharps'],
                        ['How many sharps are in the key of G major?', '1 sharps'],
                        ['How many sharps are in the key of D major?', '2 sharps'],
                        ['How many sharps are in the key of A major?', '3 sharps'],
                        ['How many sharps are in the key of E major?', '4 sharps'],
                        ['How many sharps are in the key of B major?', '5 sharps'],
                        ['How many sharps are in the key of F# major?', '6 sharps'],
                        ['How many sharps are in the key of C# major?', '7 sharps'],
                    ],
                ];/* 
                res = Math.random(4867835363898769) * techniqueExercises.length-1;
                console.log(res);
                res = Math.floor(res);
                temp = techniqueExercises[res];
                console.log(res);
                console.log(temp);
                bpm = temp[temp.length-1];
                res2 = Math.floor(Math.random(4867833525234) * temp.length-1)
                console.log(res2);
                temp = temp[res2];
                console.log(temp);
                */
                temp = theoryExercises[Math.floor(Math.random(4867835363898769) * (theoryExercises.length-1))];
                temp = temp[Math.floor(Math.random(4867833525234) * (temp.length-1)/2)*2];
                console.log(temp);
                question = temp[0];
                answer = temp[1];
                console.log(question, answer);
                keyText.innerHTML = `<summary>${question}</summary>`+answer;
                hideAll();
                keyText.classList.add("shown");
                keyText.classList.remove("hidden");


            } else{
                fetch(corsProxy + encodeURIComponent(fileHost + `theory-training/${list}`))
                    // fetch("all/../studio-ghibi/list.txt")
                    .then(response => response.text())
                    .then(text => {
                        fileList = text.trim().split('\n');
                        console.log(fileList);
                        const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                        randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`theory-training/${randomFile}`));
                        if (randomFile.toLowerCase().includes("chord")) {
                            keyText.innerHTML = `<summary>What chord is this: </summary>`+randomFile;
                        } else if (randomFile.toLowerCase().includes("interval")) {
                            keyText.innerHTML = `<summary>What interval is this: </summary>`+randomFile;
                        } else if (randomFile.toLowerCase().includes("progression")) {
                            keyText.innerHTML = `<summary>What chord progression is this: </summary>`+randomFile;
                        } else if (randomFile.toLowerCase().includes("note")){
                            keyText.innerHTML = `<summary>What note is this: </summary>`+randomFile;
                        }
                        hideAll();
                        hideSheetShowAudio();
                        keyText.classList.add("shown");
                        keyText.classList.remove("hidden");
                        playAudioWithCustomTimeout(timeout);
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
                    });
            }
        } else if (practiceType <= calculateThreshold(chances, 6)) {
            // Accompaniment
            hideAll();
            techniqueText.textContent = "Make this guy sound gooddd!";
            showTechniqueText();
            showAudio();
            // select a random file from the "play-along" folder
            fetch(corsProxy + encodeURIComponent(fileHost + "play-along/list.txt"))
                    // fetch("all/../studio-ghibi/list.txt")
                    .then(response => response.text())
                    .then(text => {
                        fileList = text.trim().split('\n');
                        console.log(fileList);
                        const randomIndex = Math.floor(Math.random(486783555478) * fileList.length);
                        randomFile = fileList[randomIndex].trim(); // Remove leading/trailing whitespace
                        audioPlayer.src = corsProxy + encodeURIComponent(fileHost + encodeURIComponent(`play-along/${randomFile}`));
                        timeout = audioPlayer.duration;
                        keyText.innerHTML = `<summary>Song-Name: </summary>`+randomFile;
                        showAudio();
                        
                    keyText.classList.add("shown");
                    keyText.classList.remove("hidden");
                    })
                    .catch(error => {
                        console.error('Error fetching file list:', error);
            });
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
// });


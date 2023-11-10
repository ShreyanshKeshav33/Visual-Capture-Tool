// Select the video element on the page.
let video = document.querySelector("video");

// Select various DOM elements related to the recording and capturing buttons.
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");

// Initialize flags and variables for recording functionality.
let recordFlag = false;
let transparentColor = "transparent";

// Initialize variables for media recording.
let recorder;
let chunks = []; // Media data in chunks

// Define constraints for the media stream (video and audio).
let constraints = {
    video: true,
    audio: true
}

// Access the user's media devices to get a media stream.
window.navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        // Set the media stream as the source for the video element.
        video.srcObject = stream;

        // Create a MediaRecorder instance and set up event listeners for recording.
        recorder = new MediaRecorder(stream);
        recorder.addEventListener("start", (e) => {
            chunks = []; // Clear chunks array when recording starts.
        })
        recorder.addEventListener("dataavailable", (e) => {
            chunks.push(e.data); // Store recorded data in chunks.
        })
        recorder.addEventListener("stop", (e) => {
            // Convert media chunks data to a video Blob.
            let blob = new Blob(chunks, { type: "video/mp4" });

            // Check if the database (db) is available.
            if (db) {
                // Generate a unique video ID using shortid library.
                let videoID = shortid();
                let dbTransaction = db.transaction("video", "readwrite");
                let videoStore = dbTransaction.objectStore("video");

                // Create an entry for the video in the database.
                let videoEntry = {
                    id: `vid-${videoID}`,
                    blobData: blob
                }
                videoStore.add(videoEntry);
            }
        })
    })

// Event listener for the record button.
recordBtnCont.addEventListener("click", (e) => {
    // Check if the recorder is initialized.
    if (!recorder) return;

    // Toggle the recordFlag and start/stop recording accordingly.
    recordFlag = !recordFlag;

    if (recordFlag) { // Start recording
        recorder.start();
        recordBtn.classList.add("scale-record");
        startTimer();
    } else { // Stop recording
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();
    }
})

// Event listener for the capture button.
captureBtnCont.addEventListener("click", (e) => {
    captureBtn.classList.add("scale-capture");

    // Create a canvas element with the same dimensions as the video.
    let canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let tool = canvas.getContext("2d");
    tool.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply filtering by filling the canvas with a transparent color.
    tool.fillStyle = transparentColor;
    tool.fillRect(0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL.
    let imageURL = canvas.toDataURL();

    // Check if the database (db) is available.
    if (db) {
        // Generate a unique image ID using shortid library.
        let imageID = shortid();
        let dbTransaction = db.transaction("image", "readwrite");
        let imageStore = dbTransaction.objectStore("image");

        // Create an entry for the image in the database.
        let imageEntry = {
            id: `img-${imageID}`,
            url: imageURL
        }
        imageStore.add(imageEntry);
    }

    // Reset the capture button's scale after a delay.
    setTimeout(() => {
        captureBtn.classList.remove("scale-capture");
    }, 500)
})

// Initialize variables for the timer functionality.
let timerID;
let counter = 0; // Represents total seconds
let timer = document.querySelector(".timer");

// Function to start the timer.
function startTimer() {
    timer.style.display = "block";
    function displayTimer() {
        let totalSeconds = counter;

        let hours = Number.parseInt(totalSeconds / 3600);
        totalSeconds = totalSeconds % 3600; // Remaining value

        let minutes = Number.parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds % 60; // Remaining value

        let seconds = totalSeconds;

        // Format hours, minutes, and seconds with leading zeros.
        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        // Update the timer display.
        timer.innerText = `${hours}:${minutes}:${seconds}`;

        // Increment the counter.
        counter++;
    }

    // Set up an interval to update the timer display every second.
    timerID = setInterval(displayTimer, 1000);
}

// Function to stop the timer.
function stopTimer() {
    clearInterval(timerID);
    timer.innerText = "00:00:00";
    timer.style.display = "none";
}

// Select DOM elements related to filtering.
let filterLayer = document.querySelector(".filter-layer");
let allFilters = document.querySelectorAll(".filter");

// Event listener for each filter element.
allFilters.forEach((filterElem) => {
    filterElem.addEventListener("click", (e) => {
        // Get the background color style of the clicked filter element.
        transparentColor = getComputedStyle(filterElem).getPropertyValue("background-color");
        
        // Set the background color of the filter layer accordingly.
        filterLayer.style.backgroundColor = transparentColor;
    })
})

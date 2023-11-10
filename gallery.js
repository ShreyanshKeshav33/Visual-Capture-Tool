// Delay the execution of the code inside the setTimeout by 100 milliseconds.
setTimeout(() => {
    // Check if the IndexedDB database (db) is available.
    if (db) {
        // Videos retrieval
        let videoDBTransaction = db.transaction("video", "readonly");
        let videoStore = videoDBTransaction.objectStore("video");
        let videoRequest = videoStore.getAll(); // Event-driven request to get all videos
        videoRequest.onsuccess = (e) => {
            // Handle the successful retrieval of video data
            let videoResult = videoRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");

            // Iterate through each video object and create corresponding HTML elements
            videoResult.forEach((videoObj) => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", videoObj.id);

                // Create a URL for the video blob data
                let url = URL.createObjectURL(videoObj.blobData);

                // Set inner HTML for the video element
                mediaElem.innerHTML = `
                <div class="media">
                    <video autoplay loop src="${url}"></video>
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>
                `;

                // Append the media element to the gallery container
                galleryCont.appendChild(mediaElem);

                // Set up event listeners for delete and download buttons
                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteListener);
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click", downloadListener);
            });
        }

        // Images retrieval
        let imageDBTransaction = db.transaction("image", "readonly");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.getAll(); // Event-driven request to get all images
        imageRequest.onsuccess = (e) => {
            // Handle the successful retrieval of image data
            let imageResult = imageRequest.result;
            let galleryCont = document.querySelector(".gallery-cont");

            // Iterate through each image object and create corresponding HTML elements
            imageResult.forEach((imageObj) => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", imageObj.id);

                // Set URL for the image
                let url = imageObj.url;

                // Set inner HTML for the image element
                mediaElem.innerHTML = `
                <div class="media">
                    <img src="${url}" />
                </div>
                <div class="delete action-btn">DELETE</div>
                <div class="download action-btn">DOWNLOAD</div>
                `;
                // Append the media element to the gallery container
                galleryCont.appendChild(mediaElem);

                // Set up event listeners for delete and download buttons
                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click", deleteListener);
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click", downloadListener);
            });
        }
    }
}, 100);

// Function to handle the deletion of a media element from both UI and the database
function deleteListener(e) {
    // Retrieve the ID and type of the media element to determine the object store
    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0, 3);

    // Check the type of media (video or image) and perform the corresponding database deletion
    if (type === "vid") {
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        videoStore.delete(id);
    } else if (type === "img") {
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        imageStore.delete(id);
    }

    // Remove the media element from the UI
    e.target.parentElement.remove();
}

// Function to handle the download of a media element
function downloadListener(e) {
    // Retrieve the ID and type of the media element to determine the object store
    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0, 3);

    // Check the type of media (video or image) and perform the corresponding download
    if (type === "vid") {
        let videoDBTransaction = db.transaction("video", "readwrite");
        let videoStore = videoDBTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);
        videoRequest.onsuccess = (e) => {
            // Handle the successful retrieval of video data
            let videoResult = videoRequest.result;

            // Create a URL for the video blob data
            let videoURL = URL.createObjectURL(videoResult.blobData);

            // Create a link element for download and trigger a click event
            let a = document.createElement("a");
            a.href = videoURL;
            a.download = "stream.mp4";
            a.click();
        }
    } else if (type === "img") {
        let imageDBTransaction = db.transaction("image", "readwrite");
        let imageStore = imageDBTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);
        imageRequest.onsuccess = (e) => {
            // Handle the successful retrieval of image data

            let imageResult = imageRequest.result;

            // Create a link element for download and trigger a click event
            let a = document.createElement("a");
            a.href = imageResult.url;
            a.download = "image.jpg";
            a.click();
        }
    }
}

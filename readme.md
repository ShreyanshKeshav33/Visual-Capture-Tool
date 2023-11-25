
# Visual Capture Tool

Link:https://visual-capture-tool.netlify.app

Welcome to the Visual Capture Tool! This tool allows you to capture and manage media content seamlessly. Below, you'll find details about the key files in this project.

Files
1. db.js
This file establishes a connection to an IndexedDB database named "myDataBase." It includes event listeners for successful connections, errors, and database upgrades or initial creation. Two object stores, "video" and "image," are created for storing media content.

2. gallery.html
An HTML file that includes the structure for a gallery to view captured images and videos. It uses IndexedDB to retrieve and display media content.

3. gallery.css
CSS styling for the gallery interface, defining styles for various elements like media containers, action buttons, and filters.

4. gallery.js
JavaScript code for handling the gallery functionality. It includes event listeners for successful database connections, errors, and upgrades. Object stores for "video" and "image" are created during the upgrade process.

5. index.html
The main HTML file for the Visual Capture Tool. It includes video display, recording, capturing, timer, filters, and a link to the gallery. Dependencies are loaded, such as the shortid library, and scripts for db.js and scripts.js are included.

6. scripts.js
JavaScript code responsible for handling the recording, capturing, and filtering functionality. It utilizes the MediaRecorder API for video recording and IndexedDB for storing captured images and videos.

7. style.css
CSS styles for the main interface, including video display, action buttons, timers, filters, and the gallery icon.

## Getting Started
Clone the repository: 

```bash
  git clone [your forked_repo link]
```

Open index.html in your browser.

Use the provided buttons to record videos, capture images, and apply filters.

Click on the gallery icon to view captured media.
Live Demo

Check out the live demo of the Visual Capture Tool deployed on Netlify.


## Deployment

To deploy this project run

```bash
  npm run start
```

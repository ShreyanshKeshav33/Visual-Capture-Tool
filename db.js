// Declare a variable to hold the reference to the IndexedDB database.
let db;

// Open a connection to the IndexedDB database named "myDataBase".
let openRequest = indexedDB.open("myDataBase");

// Event listener for a successful database connection.
openRequest.addEventListener("success", (e) => {
    // Log a success message when the database connection is established.
    console.log("Success");
    
    // Assign the reference to the opened database to the 'db' variable.
    db = openRequest.result;
})

// Event listener for an error during the database connection.
openRequest.addEventListener("error", (e) => {
    // Log an error message when there is an issue with the database connection.
    console.log("Error");
})

// Event listener for a database upgrade or initial creation.
openRequest.addEventListener("upgradeneeded", (e) => {
    // Log a message indicating that the database is being upgraded or created for the first time.
    console.log("DB upgraded and also for initial DB creation");
    
    // Assign the reference to the opened database to the 'db' variable.
    db = openRequest.result;

    // Create an object store named "video" with a key path set to "id".
    db.createObjectStore("video", { keyPath: "id" });

    // Create an object store named "image" with a key path set to "id".
    db.createObjectStore("image", { keyPath: "id" });
})

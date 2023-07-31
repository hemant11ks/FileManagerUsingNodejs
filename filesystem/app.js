// Grabbing the content of the file
// const fs = require('fs');
// const content = fs.readFileSync("./text.txt");
// console.log(content);
// Return the buffer of character present in file

// there are three ways to fetch data from file using
// Promise Api
// Callback Api
// Synchronous Api
// best one is promise because it doesnt casue callback hell
// also it is clean and modifieable with the requirement.
// also synchronous api doesnt have error handling

/*
// PROMISE API
const fs = require("fs/promises");
(async ()=>{
    try {
        await fs.copyFile("file.txt","copied=promise.txt");
    } catch (error){
        console.log(error);
    }
})();

// CALLBACK API
const fs = require("fs");
fs.copyFile("file.txt","copied-callback.txt",(error)=>{
    if(error) console.log(error);
})

// SYNCRONOUS API
const fs = require("fs");
fs.copyFileSync("file.txt","copied-sync.txt");
*/

// we need to close the file to dont be run out of memory after using it
/*
const fs = require("fs/promises");

(async()=>{
    const watcher = fs.watch("./");

    for await (const event of watcher){
        console.log(event);
    }
})();
*/


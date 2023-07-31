const fs = require("fs/promises");

(async () => {
    // File path function
    // Commands
    const CREATE_FILE = "create a file"
    const DELETE_FILE = "delete the file"
    const RENAME_FILE = "rename the file"
    const ADD_TO_FILE = "add to the file"

    const createFile = async (path)=>{
    try {
    // We want to check whether or not we already have that file
    const existingFileHandle = await fs.open(path,"r");
    // We already have that file...
    existingFileHandle.close();
    return console.log(`The file ${path} already exists.`);
    }catch(e){
    // We dont have the file,now we should create it
    const newFileHandle = await fs.open(path,"w");
    console.log("A new file was succesfully created.");
    newFileHandle.close();
    } 
    };

    const deleteFile = async (path) =>{
        try{
            await fs.unlink(path);
            console.log("The file was successfully removed.")
        }catch (e){
            if(e.code === 'ENOENT'){
                console.log("No file at this path to remove.");
            } else{
                console.log("An error occured while removing the file: ");
                console.log(e);
            }
        }
    };
    const renameFile = async (oldPath, newPath)=>{
        try{
            await fs.rename(oldPath, newPath)
            console.log("The file was successfully renamed.");
        }catch (e){
            if(e.code === "ENOENT") {
                console.log("No file at this path to rename, or the destnation does'nt exist.");
            }else {
                console.log("An error occured while removing the file: ");
                console.log(e);
            }
        }
    }

    let addedContent;
    const addToFile = async (path, content)=>{
    if (addedContent === content) return;
    try {
        const filehandle = await fs.open(path, "a");
        filehandle.write(content);
        addedContent = content;
        console.log("The content was added successfully.");
    }catch(e) {
        console.log("An error occured while removing the file: ");
        console.log(e);
    }
    };
    
    const commandFileHandler = await fs.open("./filehndler.txt","r");
    // r is flag
    commandFileHandler.on("change", async () => {
        // The file eas changed...
        // Get the size of our file
        const size = (await commandFileHandler.stat()).size;
        // allocate our buffer with size of the file.
        const buff = Buffer.alloc(size);
        // location at which we want to start filling our buffer
        const offset = 0;
        // how many bytes We want to read the content
        const length = buff.byteLength;
        // the positiob that we want to start reading the file from
        const position = 0;
        // we always want to read the whole content (from beg. to all way to the end).
        await commandFileHandler.read(
        buff,
        offset,
        length,
        position
        );
       //  console.log(buff);
       // console.log(buff.toString("utf-8"));
    const command = buff.toString("utf-8");
    // Create a file
    // Create a file <path>

    /*
      var a = "text" 
      a.includes("exb")
      // false
      a.substring(2)
      // 'xt
      */
     if(command.includes(CREATE_FILE)){
        const filePath = command.substring(CREATE_FILE.length + 1);
        createFile(filePath);
     }

     // delete file
     // delete the file <path>
     if(command.includes(DELETE_FILE)) {
        const filePath = command.substring(DELETE_FILE.length + 1)
        deleteFile(filePath)
     }

     // rename file
     // rename the file <path> to <new-path>

     if(command.includes(RENAME_FILE)){
        const _idx = command.indexOf(" to ");
        const oldFilePath = command.substring(RENAME_FILE.length + 1, _idx)
        const newFilePath = command.substring(_idx + 4)

     renameFile(oldFilePath,newFilePath);
     }

     // add to file:
     // add to the file <path> this content: <content>
     if(command.includes(ADD_TO_FILE)){
        const _idx = command.indexOf(" this content: ");
        const filePath = command.substring(ADD_TO_FILE.length + 1, _idx)
        const content = command.substring(_idx + 15)

     addToFile(filePath, content);
     }

    });
// watcher
    const watcher = fs.watch("./filehndler.txt");
    for await(const event of watcher){
    if(event.eventType === "change"){
    commandFileHandler.emit("change");
        
    }
}
})();


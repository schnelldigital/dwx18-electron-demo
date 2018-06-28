const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');


let electronWindow;

function create()
{
    electronWindow = new BrowserWindow({
        width: 640,
        height: 500,
        backgroundColor: '#ffffff'
    });

    electronWindow.loadURL('file://' + __dirname + '/www/index.html');

    electronWindow.on('closed', function(){
        electronWindow = null;
    });
}

app.on('ready', create);

//IPC EXAMPLE

ipcMain.on("getFileList", (event, arg)=>{
    
    const testFolder = 'C:\\dwx\\demoDirectory';
    fs.readdir(testFolder, (err, files) => {
        console.dir(err);
        console.dir(files);
        if(files != null){            
            event.sender.send("getFileListResponse", files);
        }
    });
   
});
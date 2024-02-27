const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { App } = require('realm');
/* pdf */
const fs = require('fs');
const PDFDocument = require('pdfkit');
/* end pdf */

const Realm = require("realm");
const { getDB } = require('./database/db.js')
// const initializeLocal = async () => {
// const db2 = getDB();
// };

let mongoApp = null;

global.share = { app, ipcMain }

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const isDev = process.env.IS_DEV == "true" ? true : false;

  win.loadURL(
    isDev
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  if (isDev) {
    win.webContents.openDevTools();
  }
}

// mongo db initialization
const initializeMongoDB = async () => {
  console.log('Connecting to mongoDB!......')
  //const app = new Realm.App({ id: 'application-1-vhhph' });
  const app = new Realm.App({ id: 'devicesync-nihze' });

  
  
  // const credentials = Realm.Credentials.anonymous();
  // const user = await app.logIn(credentials);

  mongoApp = app;
  global.mongoApp = app;

  // if (user) {
  //   console.log("Current user:", user);
  //   console.log("User ID:", user.id);
  //   console.log("User custom data:", user.customData);
  //   // Access other user properties as needed
  // } else {
  //   console.log("No user is currently authenticated.");
  // }

} 

// Call the registerUser function with the desired email and password
require('./database/dbHandler')

app.whenReady().then(() => {
  initializeMongoDB()
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle('show-dialog',(event,params) => {
  return dialog.showMessageBox(win,params);
})

const sendSyncMessage = (message) =>{
  win.webContents.send('sync-status',message)
}

const sendSubscriptionMessage = (message) =>{
  win.webContents.send('subscription-message',message)
}


global.syncMessage = sendSyncMessage;
global.sendSubscriptionMessage = sendSubscriptionMessage;


ipcMain.handle('generate-pdf', (event, args) => {
  // Generate PDF document
  const doc = new PDFDocument();
  const filePath = 'document.pdf';
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.text('PDF Content Here', 10, 10); // Example content, you can customize this
  doc.end();

  stream.on('finish', () => {
    // Send back a message to renderer process with the path of the generated PDF
    win.webContents.send('pdf-generated', filePath);
    
  });
});

ipcMain.handle('download-report',async (event,params) => {
  let printWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });
 
  printWindow.loadFile(path.join(__dirname, '/html/print-old.html'));
 
  printWindow.webContents.on('did-finish-load', async ()=>{
    printWindow.webContents.send('print-this',params)
    await delay(500)
    const pdfPath = dialog.showSaveDialogSync({
      filters: [{
        name: 'Adobe PDF',
        extensions: ['pdf']
      }]
    });
    if(pdfPath)
    {
      printWindow.webContents.printToPDF({
        printBackground : true,
       
      }).then(data => {
       console.log("data......."+data)
        fs.writeFile(pdfPath, data, (error) => {
          if (error) throw error
          console.log(`Wrote PDF successfully to ${pdfPath}`)
        })
      }).catch(error => {
        console.log(`Failed to write PDF to ${pdfPath}: `, error)
      })
    }
    return true;
  })
})

function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}
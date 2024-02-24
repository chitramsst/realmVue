const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { App } = require('realm');


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
  console.log("mongo", mongoApp)

 //registerUser()
  //loginUser()

  console.log("current user" + global.mongoApp.currentUser.id)
  // if (user) {
  //   console.log("Current user:", user);
  //   console.log("User ID:", user.id);
  //   console.log("User custom data:", user.customData);
  //   // Access other user properties as needed
  // } else {
  //   console.log("No user is currently authenticated.");
  // }

} 

async function loginUser() {
  const credentials = Realm.Credentials.emailPassword(
      "chitra@chitra.com",
      "12345678"
  );
  try {
    const db2 = await getDB();
      const user = await global.mongoApp.logIn(credentials);
      console.log(user)
  }
  catch (e) {
      return {
          error: e.message,
          success: false
      }
  }
}


// Call the registerUser function with the desired email and password


async function registerUser() {
 
  const userData = {
    email:"chitra@chitra.com",
    password:"12345678"
  }
  console.log("fgfgfdgdsfgdfsg")
  try {
      const user = await global.mongoApp.emailPasswordAuth.registerUser(userData);
      const credentials = Realm.Credentials.emailPassword(
        "chitra@chitra.com",
        "12345678"
      );
      const userLog = await global.mongoApp.logIn(credentials);
    //  const db2 = await getDB();
     
  }
  catch (e) {
      return {
          error: e.message,
          success: false
      }
  }
}


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
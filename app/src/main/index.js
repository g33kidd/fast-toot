'use strict'

const nedb = require('nedb');
import path from 'path'
import { app, BrowserWindow, ipcMain as ipc } from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  const db = new nedb({
    filename: path.join(app.getPath('userData'), 'fasttoot.db'),
    autoload: true
  });

  db.accounts = new nedb({
    filename: path.join(app.getPath('userData'), 'fasttoot-accounts.db'),
    autoload: true
  })

  db.accounts.loadDatabase();

  console.log(db)

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')

  ipc.on('token-received', (event, arg) => {
    console.log(arg)
    db.accounts.insert(arg, (err, doc) => {
      console.log(doc)
      event.sender.send('token-added', doc)
    })
  })

  ipc.on('account-removed', (event, arg) => {
    db.accounts.find({ instance: arg.instance })
  })

  ipc.on('vue-loaded', (event, arg) => {
    let accounts = db.accounts.find({}, (err, docs) => {
      event.sender.send('instances-retrieve', docs)
    })
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

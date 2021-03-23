const {app, Tray, BrowserWindow} = require('electron')
const storage = require('./storage')

let tray

let createTray = () => {
  if (tray) return
  if (process.platform === 'darwin') tray = new Tray(`${__dirname}/assets/logo@32px.png`)
  if (process.platform === 'win32') tray = new Tray(`${__dirname}/assets/logo@32px.png`)
  if (process.platform === 'linux') tray = new Tray(`${__dirname}/assets/logo@32px.png`)
  if (process.platform === 'darwin') tray.setPressedImage(`${__dirname}/assets/logo@32px.png`)
  tray.on('click', event => colorpicker.init())
}

let setMenu = () => {
  if(process.platform !== 'win32') return
  app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      title: 'New Window',
      description: 'Create a new window'
    }
  ])
}

let initApp = () => {
  let win = new BrowserWindow({ width: 800, height: 600 })
  win.on('closed', () => {
    win = null
  })

  win.loadURL(`file://${__dirname}/window/index.html`)
}

/**
* [App ready - On app ready]
*/
app.on('ready', () => {
  storage.init().then(() => {
    createTray()
    setMenu()
    initApp()
  })
})

/**
* [App activate - On app icon clicked]
*/
app.on('activate', () => {

})

/**
* [App window-all-closed - quit app on all window closed ]
*/
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})
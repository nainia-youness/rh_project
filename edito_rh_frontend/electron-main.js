const {app,BrowserWindow}=require('electron')

let win
const env='PROD'

try {
	require('electron-reloader')(module);
} catch {}

function createWindow(){
    win= new BrowserWindow({
      width:600,
      height:600,
      backgroundColor:'#ffffff'
    }) 

    if(env==='DEV')
      win.loadURL("http://localhost:4200")
    else
      win.loadFile(`./dist/edito_rh_frontend/index.html`)
    //win.loadURL(`file//${___dirname}/dist/angular-build/index.html`)
    //devtools
    win.webContents.openDevTools()

    win.on('closed',function (){
      win=null
    })
}


app.on('ready',createWindow)

//handle things differently base on the os
app.on('window-all-closed',function(){
  if(process.platform!=='darwin'){
    app.quit()
  }
})

app.on('activate',function(){
  if(win ===null){
    createWindow()
  }
})
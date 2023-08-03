const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const localShortcut = require('electron-localshortcut');

let janelaP;

function createWindow () {
  janelaP = new BrowserWindow({
    width: 900,
    height: 700,
    minHeight: 850,
    minWidth: 550,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
    title: 'App electron',
  });

  janelaP.loadFile('./renderer/Login/principal.html');
  janelaP.setBackgroundColor('#204d64')




  janelaP.on('closed', () => {
    janelaP = null;
  });
}

// Cadastro da página principal

ipcMain.on('cadastro-sucesso', () => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Sucesso',
    message: 'Cadastro realizado com sucesso!',
  });
});

ipcMain.on('cadastro-erro', (event, errorMessage) => {
  dialog.showErrorBox('Erro', errorMessage);
});

// Login da pagina principal

ipcMain.on('login-sucesso', (event, nomeUsuario, emailUsuario, senhaUsuario) => {

  console.log('Nome do usuário:', nomeUsuario);
  console.log('Email do usuário:', emailUsuario);
  console.log('Senha do usuário', senhaUsuario)

  // Armazenar o nome do usuário no localStorage
  // Antes de redirecionar para a página home.html

  janelaP.webContents.executeJavaScript(`localStorage.setItem('usuarioLogado', '${nomeUsuario}');`);
  janelaP.webContents.executeJavaScript(`localStorage.setItem('usuarioEmail', '${emailUsuario}');`);
  janelaP.webContents.executeJavaScript(`localStorage.setItem('usuarioSenha', '${senhaUsuario}');`);

  // Enviando o nome do usuário para a página home.html
  janelaP.loadFile('./renderer/Home/home.html');
});

ipcMain.on('redirecionar-para-login', () => {

  // Muda para a página de login

  janelaP.loadFile('./renderer/Login/principal.html');
});

// Redirecionamento para pagina perfil

ipcMain.on('redirecionar-para-perfil', () => {

  // Vai para página de perfil

  janelaP.loadFile('./renderer/Perfil/perfil.html');
})

ipcMain.on('redirecionar-para-home', () => {

  // Vai para página de home 

  janelaP.loadFile('./renderer/Home/home.html');
})

// Barra de cima 


ipcMain.on('voltar-pagina', () => {
  if (janelaP.webContents.canGoBack()) {
    janelaP.webContents.goBack();
  }
});

ipcMain.on('avancar-pagina', () => {
  if (janelaP.webContents.canGoForward()) {
    janelaP.webContents.goForward();
  }
});


ipcMain.on('minimizar-janela', () => {
  if(janelaP) {
      janelaP.minimize();
  }
});

ipcMain.on('maximizar-janela', ()=>{
  if(janelaP){
      if(janelaP.isMaximized()) {
          janelaP.unmaximize();
      } else {
          janelaP.maximize();
      }
      
  }
});

ipcMain.on('fechar-janela', () => {
  if(janelaP) {
      janelaP.close();
  }
});








app.whenReady().then(() => {
  createWindow();

  localShortcut.register(janelaP, 'CmdOrCtrl+M', () => {
    janelaP.minimize();
  });

  localShortcut.register(janelaP, 'CmdOrCtrl+F', () => {
    if (janelaP.isMaximized()) {
      janelaP.unmaximize();
    } else {
      janelaP.maximize();
    }
  });

  localShortcut.register(janelaP, 'CmdOrCtrl+W', () => {
    janelaP.close();
  });

  

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

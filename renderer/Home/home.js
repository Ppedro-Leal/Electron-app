const { ipcRenderer } = require('electron');

const userImage = document.querySelector('.user-image');
const submenu = document.getElementById('submenu');
const nomeUsuario = localStorage.getItem('usuarioLogado');

document.querySelector('.user-image span').innerText = `Olá ${nomeUsuario}` || 'Usuário Desconhecido';

let submenuVisible = false;

function toggleSubMenu() {
  submenuVisible = !submenuVisible;
  submenu.style.display = submenuVisible ? 'block' : 'none';
}

userImage.addEventListener('click', toggleSubMenu);

function hideSubMenu() {
  if (!submenuVisible) {
    submenu.style.display = 'none';
  }
}

document.addEventListener('click', (event) => {
  if (!userImage.contains(event.target)) {
    hideSubMenu();
  }
});

function irParaPerfil() {
  
  // Busca o ipcRenderer da pagina main
  ipcRenderer.send('redirecionar-para-perfil');
}

function desconectar() {
  // Limpar as informações da sessão
  localStorage.removeItem('usuarioLogado');

  // Redirecionar para a página de login
  ipcRenderer.send('redirecionar-para-login');
}

function irParaHome() {
  ipcRenderer.send('redirecionar-para-home');
}


// setas


// Adicionando um evento de clique para a seta esquerda (voltar)
document.querySelector('.left-arrow').addEventListener('click', () => {
  ipcRenderer.send('voltar-pagina');
});

// Adicionando um evento de clique para a seta direita (avançar)
document.querySelector('.right-arrow').addEventListener('click', () => {
  ipcRenderer.send('avancar-pagina');
});


document.querySelector('.minimize').addEventListener('click', () => {
  ipcRenderer.send('minimizar-janela')
})
document.querySelector('.maximize').addEventListener('click', () => {
  ipcRenderer.send('maximizar-janela')
})
document.querySelector('.close').addEventListener('click', () => {
  ipcRenderer.send('fechar-janela')
})

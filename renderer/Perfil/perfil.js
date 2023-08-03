const { ipcRenderer } = require('electron');

const userImage = document.querySelector('.user-image');
const submenu = document.getElementById('submenu');
const nomeUsuario = localStorage.getItem('usuarioLogado');
const emailUsuario = localStorage.getItem('usuarioEmail');
const senhaUsuario = localStorage.getItem('usuarioSenha');

// Preenche o campo de "Nome de Usuário" com as informações do usuário logado
document.getElementById('username').value = nomeUsuario || 'Usuário Desconhecido';

// Preenche o campo de "Email" com as informações do email do usuário logado
document.getElementById('email').value = emailUsuario || 'Email Desconhecido';

// Preenche o campo de "senha" com as informações de senha do usuário logado
document.getElementById('password').value = senhaUsuario || 'Senha desconhecida';

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
 localStorage.removeItem('emailUsuario');

  // Redirecionar para a página de login
  ipcRenderer.send('redirecionar-para-login');
}

function irParaHome() {
  ipcRenderer.send('redirecionar-para-home');
}





//  Funções do title-bar 

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

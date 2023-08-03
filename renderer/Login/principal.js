// principal.js

const { ipcRenderer, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

// Referencio os formularios pelo action
const loginForm = document.querySelector('form[action="/login"]');
const signupForm = document.querySelector('#signupForm');

const userDataFilePath = path.join(__dirname, '..', '..', 'data', 'users.txt');

console.log(userDataFilePath);

function submitSignupForm(event) {
  event.preventDefault();

  const formData = new FormData(signupForm);

  const userData = {
    nome: formData.get('nomeC'),
    email: formData.get('emailC'),
    senha: formData.get('senhaC'),
  };

  // Verificar se o arquivo users.txt existe, caso contrário, criar um arquivo vazio.
  if (!fs.existsSync(userDataFilePath)) {
    fs.writeFileSync(userDataFilePath, '[]', 'utf-8');
  }

  const usersData = readUsersData();

  // Verificar se o email já está cadastrado
  if (usersData.some(user => user.email === userData.email)) {
    ipcRenderer.send('cadastro-erro', 'Este e-mail já está cadastrado.');
    return;
  }

  usersData.push(userData);
  writeUsersData(usersData);

  ipcRenderer.send('cadastro-sucesso');

  // Limpar o formulário após o cadastro
  signupForm.reset();
}

function readUsersData() {
  try {
    const data = fs.readFileSync(userDataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existe ou ocorrer algum erro na leitura, retornamos um array vazio.
    return [];
  }
}

function writeUsersData(usersData) {
  try {
    const data = JSON.stringify(usersData, null, 2);
    fs.writeFileSync(userDataFilePath, data, 'utf-8');
  } catch (error) {
    dialog.showErrorBox('Erro', 'Não foi possível salvar os dados. Por favor, tente novamente.');
  }
}

function submitLoginForm(event) {
  event.preventDefault();

  const formData = new FormData(loginForm);

  const email = formData.get('email');
  const senha = formData.get('senha');

  const usersData = readUsersData();

  const user = usersData.find(user => user.email === email && user.senha === senha);

  if (user) {
    ipcRenderer.send('login-sucesso', user.nome, user.email, user.senha); // Enviando o nome do usuário para o main.js
  } else {
    ipcRenderer.send('cadastro-erro', 'Credenciais inválidas. Verifique seu e-mail e senha.');
  }

  // Limpar o formulário após o login
  loginForm.reset();
}

// Adicione esses eventos para os formulários de cadastro e login
signupForm.addEventListener('submit', submitSignupForm);
loginForm.addEventListener('submit', submitLoginForm);


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






const container = document.getElementById('container');
document.getElementById('signUp').addEventListener('click', () => {
  container.classList.add('right-panel-active');
});
document.getElementById('signIn').addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// Eventos de envio de formulário
document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Cadastro enviado! (Aqui você pode conectar com seu backend)');
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Login enviado! (Aqui você pode validar com o backend)');
});

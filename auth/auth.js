const container = document.getElementById('container');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// CADASTRO
const msg = document.getElementById('mensagem');
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('http://localhost:3000/auth/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const result = await response.json();

  msg.classList.remove('d-none', 'alert-dark-danger', 'alert-dark-success');
  if (response.status === 201) {
    msg.classList.add('alert-dark-success');
    msg.textContent = result.message;
    setTimeout(() => container.classList.remove('right-panel-active'), 2500);
  } else {
    msg.classList.add('alert');
    msg.classList.add('alert-dark-danger');
    msg.textContent = result.error || 'Erro desconhecido';
  }
});

//LOGIN
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (response.ok) {
    const sessao = {
      token: result.token
    }
    console.log(result)
    localStorage.setItem('sessao', JSON.stringify(sessao));
    window.location.href = result.redirect;
  } else {
    alert(result.error || 'Erro ao fazer login.');
  }
});

function ajustarLayoutResponsivo() {
  const larguraTela = window.innerWidth;
  const signIn = container.querySelector('.sign-in-container');
  const signUp = container.querySelector('.sign-up-container');

  if (larguraTela < 868) {
    container.classList.add('mobile-mode');
    signIn.classList.remove('active');
    signUp.classList.add('active');
  } else {
    container.classList.remove('mobile-mode');
    signIn.style.display = '';
    signUp.style.display = '';
  }
}

document.getElementById('mobileToRegister')?.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.sign-in-container').classList.remove('active');
  document.querySelector('.sign-up-container').classList.add('active');
});

document.getElementById('mobileToLogin')?.addEventListener('click', function (e) {
  e.preventDefault();
  document.querySelector('.sign-up-container').classList.remove('active');
  document.querySelector('.sign-in-container').classList.add('active');
});

window.addEventListener('resize', ajustarLayoutResponsivo);
window.addEventListener('load', ajustarLayoutResponsivo);

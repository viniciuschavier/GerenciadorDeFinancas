// Verifica se o usuario está autenticado
// Se não estiver, redireciona para a página de login
const sessao = JSON.parse(localStorage.getItem('sessao'));
const token = sessao?.token

if (!token) {
  window.location.href = '../public/auth.html';
} else {
  fetch('http://localhost:3000/auth/verificarAutenticacao', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(data => {
    if (data.usuario) {
      document.getElementById('boasVindas').innerText = `Olá, ${data.usuario.username}`;
    } else {
      alert('Sessão expirada');
      localStorage.removeItem('sessao');
      window.location.href = 'index.html';
    }
  });
}

// Função para fazer logout do usuario
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('sessao');
  window.location.href = '../public/auth.html';
});

let transactions = []

function createTransactionContainer(id){
  const div = document.createElement('div')
  div.id = id
  div.classList.add('transaction')
  return div
}

function createTransactionTitle(name){
  const title = document.createElement('span')
  title.textContent = name
  return title
}

function createTransactionAmount(amount){
  const valor = document.createElement('span')
  const formater = Intl.NumberFormat('pt-br', {compactDisplay: 'long', currency: 'BRL', style: 'currency'})
  const formatedAmount = formater.format(amount)
  if(amount > 0){
    valor.textContent = `${formatedAmount} E`
    valor.classList.add('transaction-amount', 'credit')
  } else {
    valor.textContent = `${formatedAmount} S`
    valor.classList.add('transaction-amount', 'debit')
  }
  return valor
}

function createEditTransactionButton(transaction){
  const editBtn = document.createElement('button')
  editBtn.classList.add('edit-btn')
  editBtn.textContent = 'Editar'
  editBtn.addEventListener('click', () => {
    document.querySelector('#id').value = transaction.id
    document.querySelector('#nomeTransacao').value = transaction.name
    
    if (transaction.amount < 0) {
      let copyAmountValue = transaction.amount
      let converterPositivo = Math.abs(transaction.amount) * 2
      copyAmountValue += converterPositivo
      document.querySelector('#amount').value = copyAmountValue
      document.getElementById('saida').checked = true
    } else {
      document.querySelector('#amount').value = transaction.amount
      document.getElementById('entrada').checked = true
    }
  })
  return editBtn
}

function createDeleteTransactionButton(id){
  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('delete-btn')
  deleteBtn.textContent = 'Excluir'

  deleteBtn.addEventListener('click', async () => {
    const response = await fetch(`http://localhost:3000/protected/delete-transaction/${id}`, { 
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => res.json());

    deleteBtn.parentElement.remove()
    const indexToRemove = transactions.findIndex((t) => t.id === id)
    transactions.splice(indexToRemove, 1)
    updateBalance()
  })
  return deleteBtn
}

function renderTransaction(transaction){
  const container = createTransactionContainer(transaction.id)
  const title = createTransactionTitle(transaction.name)
  const amount = createTransactionAmount(transaction.amount)
  const editBtn = createEditTransactionButton(transaction)
  const deleteBtn = createDeleteTransactionButton(transaction.id)

  container.append(title, amount, editBtn, deleteBtn)
  document.getElementById('transactions').appendChild(container)
}

function updateBalance(){
  const balanceSpan = document.querySelector('#balance')
  const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  const formater = Intl.NumberFormat('pt-br', {compactDisplay: 'long', currency: 'BRL', style: 'currency'})
  balanceSpan.textContent = formater.format(balance)
}

async function fetchTransactions(){
  return await fetch('http://localhost:3000/protected/transactions', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  }).then(res => res.json())
}

document.addEventListener('DOMContentLoaded', () => {
  setup()
})

const form = document.querySelector('.form')

form.addEventListener('submit', async (ev) => {
  ev.preventDefault()
  
  const id = document.querySelector('#id').value
  const name = document.querySelector('#nomeTransacao').value
  let amount = parseFloat(document.querySelector('#amount').value)
  const entrada = document.getElementById("entrada")

  let type

  if(entrada.checked){
    type = "Entrada"
  }else{
    let converterNegativo = amount * 2
    amount -= converterNegativo
    type = "Saida"
  }

  if (id){
    const response = await fetch(`http://localhost:3000/protected/edit-transaction/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ name, type, amount })
    }).then(res => res.json())

    const transactionUpdated = response.data[0]
    const indexToRemove = transactions.findIndex((t) => t.id == id)
    transactions.splice(indexToRemove, 1, transactionUpdated)
    document.getElementById(id).remove()
    renderTransaction(transactionUpdated)
    document.querySelector("#id").value = ''
  } else {
    const response = await fetch('http://localhost:3000/protected/create-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ user_id: sessao.id, name, type, amount })
    }).then(res => res.json())
    
    const transaction = response[0]
    
    transactions.push(transaction)
    renderTransaction(transaction)
  }
  ev.target.reset()
  updateBalance()
})

async function setup(){
  const results = await fetchTransactions()

  transactions = results
  transactions.forEach(renderTransaction)
  updateBalance()
}
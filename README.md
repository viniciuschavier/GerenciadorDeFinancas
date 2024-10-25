# Gerenciador de Finanças
# Bem-vindo ao **Gerenciador de Finanças**!
### Esta é uma aplicação web desenvolvido usando HTML, CSS e JavaScript, que permite aos usuários gerenciar suas finanças pessoais. A aplicação consome uma API local criada com o `json-server`, que simula um banco de dados para armazenar as transações financeiras.

## Funcionalidades
  - Adicionar novas transações financeiras (entrada e saida)
  - Exibir lista de transações
  - Exibir o saldo total
  - Remover transações existentes

## Tecnologias Utilizadas
  - **HTML5**: Estrutura da aplicação
  - **CSS3**: Estilos da aplicação
  - **JavaScript**: Lógica de manipulação dos dados e interatividade
  - **json-server**: Simulação de uma API REST

## Requisitos
 - Node.js instalado
 - json-server instalado globalmente ou localmente no projeto

## Como Rodar o Projeto 
 1. **Clone o repositório**:
 ``` git clone https://github.com/viniciuschavier/GerenciadorDeFinancas.git ```
 2. **Navegue até o diretório do projeto.**
 3. **Inicie o `npm` se não estiver iniciado:** ```npm init -y ```
 4. **Instale o `json-server` se ainda não estiver instalado**: ```npm install json-server ```
 5. **No arquivo `package.json` em scripts modifique para**: ``` "start": "json-server --watch db.json" ```
 6. **Inicie o `json-server`**: ``` npm run start ``` Isso irá iniciar um servidor que simula uma API REST em `http://localhost:3000`.
 7. **Abra o arquivo `index.html`** no seu navegador.
 8. A aplicação estará rodando e consumindo a API local.
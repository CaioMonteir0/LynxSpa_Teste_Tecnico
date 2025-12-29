# 🛒 Lynx SPA – Gestão de Pedidos

## 📦 Visão Geral
A **Lynx Storage Store** é um sistema **fullstack** desenvolvido para o **teste técnico da Lynx**, simulando um fluxo completo de **catálogo de produtos, carrinho, pedidos e pagamentos**, incluindo controle de estoque.

O projeto é composto por:

- **Frontend:** Angular (SPA)
- **Backend:** API REST em **Java com Spring Boot**
- **Banco de Dados:** SQLite (persistência local)

O frontend consome a API para:
- Listar produtos disponíveis
- Criar pedidos
- Processar pagamentos
- Atualizar estoque automaticamente após compra

---

## 🧩 Requisitos

### 🔹 Backend – API Spring Boot

| Tecnologia | Versão Recomendada |
|-----------|--------------------|
| Java JDK | **17+** |
| Maven | **3.8+** |
| Spring Boot | **3.x** |
| Hibernate / JPA | Integrado |
| SQLite JDBC | Integrado |

#### Dependências principais:
- Spring Web
- Spring Data JPA
- Hibernate
- Lombok
- Jakarta Validation
- SQLite JDBC

📌 **Observação importante:**  
O projeto utiliza **SQLite**, portanto **não é necessário instalar nenhum banco de dados externo**.  
O arquivo do banco (`.db`) é criado automaticamente na primeira execução da API.
Mas o arquivo do banco está no repositório, **então caso queira começar do zero**, é só excluir o arquivo e reiniciar a aplicação.

---

### 🔹 Frontend – Angular SPA

> ⚠️ Importante  
> Este projeto utiliza Angular 19. 
> Caso sua máquina possua uma versão diferente do Angular CLI, recomenda-se executar os comandos usando:
>
> ```bash
> npx ng serve
> ``` 

| Tecnologia | Versão Recomendada |
|-----------|--------------------|
| Node.js | **18+** |
| NPM | **9+** |
| Angular | **19+** |
| Angular CLI | Compatível |

#### Bibliotecas e recursos utilizados:
- Angular Standalone Components
- RxJS
- FormsModule (Template-driven forms)
- Bootstrap 5
- Services com Observables
- Comunicação via HTTP REST

---

### 🔹 Ferramentas Recomendadas (Opcional)

- Git
- Visual Studio Code
- Postman ou Insomnia
- Extensões VS Code:
  - Angular Language Service
  - Lombok Annotations Support
  - Spring Boot Extension Pack

---

### 🔹 Portas Utilizadas

| Aplicação | Porta |
|---------|-------|
| Backend (API) | http://localhost:8080 |
| Frontend (Angular) | http://localhost:4200 |

---

## 🚀 Como Executar o Projeto

O projeto pode ser executado **localmente**, abrindo um terminal para o backend e outro para o frontend.

---

## 1️⃣ Executando o Backend (API)

1. Acesse o diretório do backend:
   ```bash
   cd backend


2. Compile e execute a aplicação:
    ```bash
    mvn clean install
    mvn spring-boot:run


3. A API estará disponível em:
    ```bash
    http://localhost:8080

    
    Documentação Swagger:

    http://localhost:8080/swagger-ui.html

## 2️⃣ Executando o Frontend (Angular)

1. Acesse o diretório do frontend:
    
    ```bash
    cd frontend


2. Instale as dependências:
    
    ```bash
    npm install


3. Inicie o servidor de desenvolvimento:
    ```bash
    ng serve


4. A aplicação estará disponível em:
    ```bash
    http://localhost:4200

## ⚡ Principais Funcionalidades

### 🛍️ Catálogo de Produtos

- Listagem de produtos ativos;

- Filtro por nome e categoria;

- Exibição de estoque em tempo real;

- Indicador visual de estoque baixo ou esgotado;

### 🛒 Carrinho de Compras

- Adição e remoção de produtos

- Controle de quantidade

- Cálculo automático do total

- Modal flutuante para visualização do carrinho

### 📦 Pedidos

- Criação de pedidos a partir do carrinho

- Listagem de pedidos do usuário

- Status do pedido:

        'NEW'
        'PAID'
        'CANCELLED'

### 💳 Pagamentos

- Modal de pagamento flutuante

- Métodos suportados:

        PIX

        Cartão de Crédito

        Boleto

- Registro do método de pagamento utilizado

- Atualização automática do status do pedido

- Cancelamento de pedidos não pagos

### 📉 Controle de Estoque

- Débito automático de estoque ao pagar um pedido

- Atualização da tela de catálogo após pagamento

- Bloqueio de pagamento para pedidos cancelados

### ⚠️ Tratamento de Erros

- Validações de negócio no backend

- Mensagens de erro amigáveis no frontend

- Bloqueio de ações inválidas:

- Pagar pedido já pago

- Pagar pedido cancelado

- Criar pedido com carrinho vazio

- Feedback visual para sucesso e erro

🧩 Considerações Técnicas

- Arquitetura baseada em SPA + API REST

- Banco SQLite para facilitar execução local

- Componentes standalone no Angular

- Comunicação reativa com RxJS

---
### 💼 Teste Técnico desenvolvido por
| 👨‍💻 Autor | Caio Monteiro
|-------|----------|

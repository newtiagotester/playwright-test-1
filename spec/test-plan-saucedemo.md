# Plano de testes - Saucedemo

## Application Overview

Plano de testes para a interface do e-commerce demo Saucedemo, cobrindo os cinco principais fluxos do usuário: login, navegação no catálogo, adição ao carrinho, checkout e logout.

## Test Scenarios

### 1. Fluxos principais do usuário

**Seed:** `tests/seed.spec.ts`

#### 1.1. 1. Login com usuário válido

**File:** `tests/saucedemo/01-login.spec.ts`

**Steps:**
  1. Abrir a página inicial do Saucedemo em estado fresh, sem sessão ativa.
    - expect: A página exibe o formulário de login com os campos de usuário e senha.
  2. Informar o username 'standard_user' e a senha 'secret_sauce'.
    - expect: Os campos mostram os valores informados corretamente.
  3. Clicar no botão 'Login'.
    - expect: O sistema autentica o usuário e redireciona para a página de produtos.
  4. Confirmar a presença da lista de itens e do título 'Products'.
    - expect: O catálogo de produtos carrega corretamente com itens visíveis.

#### 1.2. 2. Navegação e exploração do catálogo

**File:** `tests/saucedemo/02-catalogo.spec.ts`

**Steps:**
  1. Efetuar login com usuário válido.
    - expect: A tela de produtos fica disponível para navegação.
  2. Visualizar os itens, nomes, preços e botões de ação.
    - expect: Cada produto exibe nome, preço e botão de compra visível.
  3. Usar a ordenação do catálogo para alterar a ordem dos produtos.
    - expect: A lista muda de ordem conforme a opção selecionada.
  4. Abrir o detalhe de um item específico.
    - expect: A página do item apresenta imagem, descrição, preço e opções de compra.
  5. Retornar ao catálogo sem perder a sessão.
    - expect: O usuário volta para a lista de produtos e continua autenticado.

#### 1.3. 3. Adicionar itens ao carrinho

**File:** `tests/saucedemo/03-carrinho.spec.ts`

**Steps:**
  1. Entrar no catálogo em estado autenticado.
    - expect: A lista de produtos está disponível.
  2. Adicionar dois produtos diferentes ao carrinho.
    - expect: Os botões de ação mudam para 'Remove' e o contador do carrinho aumenta.
  3. Abrir o carrinho a partir do ícone de carrinho.
    - expect: A página do carrinho mostra os itens adicionados com preço e subtotal.
  4. Remover um item do carrinho e confirmar a atualização.
    - expect: A quantidade de itens e o valor total são recalculados corretamente.
  5. Retornar ao catálogo usando 'Continue Shopping'.
    - expect: O usuário volta à lista de produtos mantendo o restante dos itens escolhidos.

#### 1.4. 4. Finalizar compra no checkout

**File:** `tests/saucedemo/04-checkout.spec.ts`

**Steps:**
  1. Realizar login e adicionar itens ao carrinho.
    - expect: O carrinho contém produtos válidos.
  2. Clicar em 'Checkout'.
    - expect: A página de informações do cliente é exibida.
  3. Preencher nome, sobrenome e CEP com dados válidos.
    - expect: Os campos aceitam os valores e o formulário permanece consistente.
  4. Avançar para a revisão do pedido.
    - expect: A tela de revisão mostra itens, preços e totais.
  5. Confirmar a compra com 'Finish'.
    - expect: O sistema exibe a página de confirmação de sucesso e a compra é concluída.

#### 1.5. 5. Logout e fechamento de sessão

**File:** `tests/saucedemo/05-logout.spec.ts`

**Steps:**
  1. Fazer login com usuário válido e navegar pelo catálogo.
    - expect: A sessão está ativa e o usuário tem acesso às áreas protegidas.
  2. Abrir o menu lateral ou a área de navegação do usuário.
    - expect: O menu apresenta opções de navegação e logout.
  3. Executar 'Logout'.
    - expect: A sessão é encerrada e o usuário recebe a tela de login.
  4. Tentar acessar novamente a página de produtos pelo URL sem autenticação.
    - expect: O sistema bloqueia o acesso e redireciona para a tela de login.
  5. Validar que a sessão foi limpa e o carrinho não permanece acessível sem login.
    - expect: O usuário fica fora do ambiente autenticado e precisa logar novamente para continuar.

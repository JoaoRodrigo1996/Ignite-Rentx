# Cadastro de carro

**Requisitos Funcionais**

- Deve ser possível cadastrar um novo carro

**Requisitos não Funcionais**

**Regras de Negócios**

- Não deve ser possível cadastrar um um carro com uma placa já existente.
- O carro deve ser cadastrado com disponibilidade por padrão.
- Somente um usuário administrator poderá cadastrar um carro \*.

# Listagem de Carros

**Requisitos Funcionais**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Requisitos não Funcionais**

**Regras de Negócios**

- O usuário não precisa estar logado no sistema.

# Cadastro de Especificação no carro

**Requisitos Funcionais**

- Deve ser possível cadastrar uma especificação para um carro.

**Requisitos não Funcionais**

**Regras de Negócios**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.
- Somente um usuário administrator poderá cadastrar uma especificação para o carro

# Cadastro de imagens do carro

**Requisitos Funcionais**

- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros.

**Requisitos não Funcionais**

- Utilizar o Multer para upload dos arquivos.

**Regras de Negócios**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- Somente um usuário administrator poderá cadastrar uma imagem.

# Agendamento de aluguel (Rental)

**Requisitos Funcionais**

- Deve ser possível cadastrar um aluguel

**Requisitos não Funcionais**

**Regras de Negócios**

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto para o mesmo carro.

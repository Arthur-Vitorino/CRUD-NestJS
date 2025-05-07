# API de Exemplo com NestJS, TypeORM e SQLite

Este projeto é uma API RESTful criada com NestJS e banco de dados SQLite, seguindo boas práticas de organização de código, validação de dados e uso de injeção de dependência. O objetivo é servir como exemplo básico para criação de APIs escaláveis e bem estruturadas com NestJS.

## Alunos Participantes:
- Arthur Ribeiro Vitorino uc23100894
- Anna Júlia Cúrcio Marques uc23100363
- Débora Rezende Valeriano uc22201300
- Ana Carolina de Andrade Silva uc23100955

## Introdução

Este projeto demonstra como construir uma API REST utilizando o framework [NestJS](https://nestjs.com/), com suporte a banco de dados SQLite via [TypeORM](https://typeorm.io/). Ele inclui validação de dados, organização em módulos, uso correto de services e controllers, e segue boas práticas REST.

---

## Criando o projeto

Para iniciar um novo projeto NestJS, foi utilizado o CLI do Nest:

```bash
npm i -g @nestjs/cli
nest new minha-api
```
O projeto é gerado com estrutura padrão contendo src, main.ts, app.module.ts, entre outros arquivos principais.

## Criando a API com o gerador de código
Utilizamos os comandos do Nest CLI para gerar a estrutura do recurso:
```bash
nest g resource estudantes
```
O comando acima criou os arquivos de controller, service, module, dto e entity para o recurso clientes.

## Validação de dados
A validação foi feita com a biblioteca class-validator. No DTO de criação (create-cliente.dto.ts), foram usados decorators como:
```typescript
@IsString()
@IsNotEmpty()
```
Além disso, o ValidationPipe foi aplicado globalmente no main.ts:
```typescript
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
```

## TypeORM e SQLite
Para persistência dos dados, foi usado o TypeORM com banco SQLite.
```bash
npm install --save @nestjs/typeorm typeorm sqlite3
```
Configuração no app.module.ts:
```typescript
TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Cliente],
  synchronize: true,
}),
```

## Injeção de dependência
O NestJS utiliza injeção de dependência para instanciar e gerenciar seus serviços. No caso, o ClientesService é injetado no ClientesController automaticamente via construtor:
```typescript
constructor(private readonly clientesService: ClientesService) {}
```
O repositório do TypeORM também é injetado no service usando o @InjectRepository():
```typescript
constructor(
  @InjectRepository(Cliente)
  private readonly clienteRepository: Repository<Cliente>,
) {}
```

## Lógica na Service
```typescript
async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
  const cliente = this.clienteRepository.create(createClienteDto);
  return this.clienteRepository.save(cliente);
}
```
O controller apenas delega as responsabilidades ao service, mantendo o código limpo e testável.

## Bônus: boas práticas REST
- Uso correto de métodos HTTP (GET, POST, PATCH, DELETE)
- Rotas padronizadas: /clientes, /clientes/:id
- Respostas com os códigos de status adequados (200, 201, 404, etc.)
- Separação clara entre controller, service, DTO e entity
---

## Próximos passos
- Substituir SQLite por PostgreSQL ou MySQL
- Adicionar autenticação JWT com @nestjs/passport
- Implementar testes unitários e de integração
- Adicionar paginação e filtros nas listagens
- Documentar a API com Swagger
---

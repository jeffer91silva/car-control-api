#  Car Control API

API para controle de automóveis, motoristas e utilizações.  
Persistência em memória.  
**Extras implementados**: Swagger, ordenação, health check e reset de dados.

---

##  Funcionalidades
- **Automóveis**
  - Criar, listar, atualizar e excluir automóveis
  - Filtrar por cor e marca
  - Ordenar resultados (`?sort=` e `?order=asc|desc`)
- **Motoristas**
  - Criar, listar, atualizar e excluir motoristas
  - Filtrar por nome
  - Ordenar resultados
- **Utilizações**
  - Registrar uso de automóvel por motorista
  - Finalizar utilização
  - Listar utilizações com detalhes
- **Extras**
  - **Swagger UI** para documentação interativa
  - **Health check** em `/health` (status e uptime)
  - **Reset de dados** com `POST /admin/reset`

---

##  Documentação Interativa
Acesse no navegador:

```
http://localhost:3000/docs
```

![Swagger Interface](docs/swagger.png)

---

##  Como Rodar
```bash
npm install
npm run dev
```
Servidor rodará em:  
```
http://localhost:3000
```

---

##  Testes
```bash
npm test
```
Testes com **Jest + Supertest** validados.

---

##  Estrutura do Projeto
```
src/
 ├── routes/         # Rotas da API
 ├── services/       # Regras de negócio
 ├── database/       # Dados em memória
 └── tests/          # Testes automatizados
```

---

##  Tecnologias Utilizadas
- Node.js
- Express.js
- Swagger UI
- Jest + Supertest

---

##  Coleção Insomnia
Arquivo `Insomnia_Car_Control_API.json` incluso para importar e testar rapidamente.

---

##  Regras de Negócio
- Um automóvel só pode ser usado por um motorista por vez
- Um motorista não pode usar mais de um automóvel ao mesmo tempo

---

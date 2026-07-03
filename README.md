# Mini E-commerce (Trabalho Acadêmico)

Este é um projeto de um mini e-commerce desenvolvido em React (Vite) utilizando JSON Server como API fake, focado nos requisitos de um trabalho acadêmico de Análise e Desenvolvimento de Sistemas.

## Requisitos Atendidos ✅
- [x] React (Vite) + react-router-dom
- [x] Context API para o Carrinho (sem Redux)
- [x] TailwindCSS para estilização
- [x] JSON Server como API fake (`db.json` na porta 3001)
- [x] Fetch nativo (sem axios)
- [x] Uso dos Hooks: `useState`, `useEffect`, `useContext`, `useNavigate`, `useRef`, `useParams` e hook customizado `useFetch`
- [x] Validações de formulário (campos obrigatórios, preço >= 0, estoque >= 0, foco com `useRef`)
- [x] Regras de estoque (bloquear adição além do estoque, "Esgotado", etc.)
- [x] Páginas: Home, Detalhes, Carrinho, Formulário de Produto (Cadastro/Edição), 404
- [x] Pasta `screenshots/` criada e documento `DOCUMENTACAO.md` estruturado
- [x] **NOVO**: UI e Animações modernas usando `framer-motion` (transições), `lucide-react` (ícones) e `react-hot-toast` (alertas toast).

## Como Instalar e Rodar o Projeto

1. **Instalar Dependências**
   No terminal, dentro da pasta do projeto (`mini-ecommerce`), rode:
   ```bash
   npm install
   ```

2. **Rodar o JSON Server (API Fake)**
   Abra um terminal e rode:
   ```bash
   npm run server
   ```
   Isso iniciará o JSON Server na porta 3001 monitorando o arquivo `db.json`.

3. **Rodar o Frontend (React Vite)**
   Abra um SEGUNDO terminal (mantenha o anterior aberto para a API continuar rodando) e rode:
   ```bash
   npm run dev
   ```
   Isso abrirá a aplicação em `http://localhost:5173`.

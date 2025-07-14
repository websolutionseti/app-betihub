# 📌 PRD — BetiHub (Product Requirements Document)

> Projeto: **app-betihub**  
> Autor: Guilherme Puentes — Web Solutions ETI  
> Versão: 1.0.0  
> Licença: [Ver LICENSE.md](../LICENSE.md)  
> Última atualização: 14/07/2025



---

## 🤝 2. `CONTRIBUTING.md`

```bash
echo "# Contribuindo com o App BetiHub

Obrigado por considerar contribuir! Aqui estão as diretrizes:

## 🧭 Como contribuir

1. Faça um fork
2. Crie uma branch: \`git checkout -b minha-feature\`
3. Faça suas alterações
4. Commit: \`git commit -m 'feat: minha nova feature'\`
5. Push: \`git push origin minha-feature\`
6. Abra um Pull Request

## 📋 Regras de código

- Siga o estilo existente
- Escreva mensagens de commit claras
- Adicione testes se possível

## 🐛 Reportar bugs

Abra uma issue com detalhes e passos para reproduzir.

## 📜 Código de Conduta

Leia o [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) antes de contribuir.
" > CONTRIBUTING.md
git add CONTRIBUTING.md
git commit -m "Adiciona guia de contribuição"
git push origin main


---

## 📖 Visão Geral

O BetiHub é uma aplicação web focada na **gestão de usuários e painéis administrativos autenticados**, com interface amigável, arquitetura front-end moderna (provavelmente Vite + TailwindCSS), e propósito educacional/comercial.

---

## 🧩 Funcionalidades já implementadas

### 1. Autenticação e navegação
- Página de login (simulada ou real)
- Navegação com menu lateral
- Autenticação visual com "estado logado"

### 2. Gerenciamento de usuários
- ✅ Adicionar novo usuário
- ✅ Atualizar dados do usuário
- ✅ Exibir lista de usuários
- ✅ Mensagens de feedback para ações

### 3. Painel de análises
- Dashboards com indicadores visuais
- Gráficos e contadores de dados simulados
- Layout responsivo com visual moderno

### 4. Organização modular do código
- Diretórios: `src/`, `plugins/`, `tools/`, `public/`
- Configurações separadas: Tailwind, PostCSS, Vite

---

## 📊 Prints de telas (mockups)

As capturas estão disponíveis na pasta `/imagens/` e representam:

- `home-autenticado_index.png`: tela principal autenticada  
- `home-autenticado_user_add.png`: tela de cadastro de usuário  
- `home-autenticado_user_atualizar.png`: edição de usuário  
- `home-autenticado_analise_p1.png`: dashboard com gráficos

---

## 💡 Melhorias sugeridas (Backlog Inicial)

| Prioridade | Recurso                                | Status      |
|------------|-----------------------------------------|-------------|
| Alta       | Integração com backend real (Node/Nest) | 🔲 Pendente |
| Média      | Criação de fluxo de autenticação real   | 🔲 Pendente |
| Média      | Modo escuro / claro                     | 🔲 Pendente |
| Alta       | Upload de foto do usuário               | 🔲 Pendente |
| Baixa      | Internacionalização (i18n)              | 🔲 Pendente |
| Média      | Responsividade mobile avançada          | 🔲 Pendente |
| Alta       | Criação de banco de dados mock externo  | ✅ Pronto   |

---

## 📌 Roadmap técnico

### MVP (Versão Atual)
- Front-end SPA estável com protótipos navegáveis
- Repositório versionado com histórico limpo
- Licença de uso clara (ver LICENSE.md)

### Próximos passos
- Definir stack de backend (NodeJS, Supabase, Firebase etc.)
- Estruturar camada de serviços e consumo de APIs
- Planejar deploy via Docker + CI/CD

---

## 👤 Créditos e Informações

- Desenvolvido por: **Guilherme Puentes**  
- Empresa: [Web Solutions ETI](https://websolutions.eti.br)  
- Localização: Vale do Paraíba, São Paulo — Brasil  
- Contato: guilherme@online.des.br

---

> Este documento deve ser atualizado conforme o avanço do projeto.  
> Recomenda-se revisar mensalmente ou a cada versão significativa.

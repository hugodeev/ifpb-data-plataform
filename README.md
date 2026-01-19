# IFPB Data Platform - Observatório de Dados Abertos

![IFPB Data Platform](https://img.shields.io/badge/IFPB-Data%20Platform-blue)
![Versão](https://img.shields.io/badge/Versão-1.0.0--beta-orange)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/Licença-CC%20BY--NC%204.0-lightgrey)

**Plataforma web interativa** para visualização, análise e exploração de dados públicos do **Instituto Federal da Paraíba (IFPB)**. Projeto de pesquisa desenvolvido no âmbito do Curso Técnico em Informática Integrado ao Ensino Médio.

## 📋 Índice

- [🎯 Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades](#-funcionalidades)
- [📊 Estrutura de Dados](#-estrutura-de-dados)
- [🚀 Como Executar](#-como-executar)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [👥 Equipe](#-equipe)
- [📄 Licença](#-licença)
- [🤝 Contribuição](#-contribuição)
- [📞 Contato](#-contato)

## 🎯 Sobre o Projeto

### Contexto
O **IFPB Data Platform** é um projeto de pesquisa desenvolvido no **IFPB Campus Guarabira** como parte do **Curso Técnico em Informática Integrado ao Ensino Médio (4º Ano)**. O projeto tem como objetivo criar um observatório digital para promover a **transparência ativa** e facilitar **análises baseadas em dados** sobre a instituição.

### Objetivos
1. **Desenvolver** uma plataforma web interativa para visualização de dados públicos do IFPB
2. **Promover** a transparência institucional através da disponibilização de dados abertos
3. **Facilitar** pesquisas acadêmicas e análises estatísticas sobre a instituição
4. **Integrar** múltiplas fontes de dados em uma interface unificada
5. **Criar** visualizações interativas que tornem os dados acessíveis a diferentes públicos

### Metodologia
O projeto foi desenvolvido do zero utilizando tecnologias web padrão, garantindo total personalização e performance otimizada para visualizações de dados.

## ✨ Funcionalidades

### 🌐 **Interface Web**
- **Navegação Intuitiva**: Menu organizado por categorias de dados
- **Design Responsivo**: Adaptado para desktop, tablet e mobile
- **Sistema de Busca**: Filtros avançados em todas as tabelas
- **Exportação de Dados**: Download em formatos CSV e JSON
- **Acessibilidade**: Compatível com leitores de tela

### 📊 **Visualizações de Dados**
- **Gráficos Interativos**: Desenvolvidos com Chart.js e D3.js
- **Mapas dos Campi**: Localização geográfica interativa
- **Análise Temporal**: Evolução histórica dos indicadores
- **Comparativos**: Análise comparativa entre campi/cursos
- **Dashboard Principal**: Visão geral dos principais indicadores

### 🔍 **Seções da Plataforma**

#### 1. **🏛️ A Instituição**
- Informações estruturais sobre todos os campi
- Estrutura administrativa e quadro de pessoal
- Localização geográfica e infraestrutura
- Evolução histórica da instituição

#### 2. **🎓 Vida Acadêmica**
- Oferta de cursos por modalidade
- Dados do corpo discente e docente
- Indicadores de desempenho acadêmico
- Taxas de evasão e conclusão

#### 3. **💰 Gestão e Orçamento**
- Dados orçamentários detalhados
- Receitas vs. despesas
- Investimentos em infraestrutura
- Evolução financeira histórica

#### 4. **📈 Explorar Dados** (Dashboard)
- Painel interativo com múltiplas visualizações
- Filtros dinâmicos por período e categoria
- Análises comparativas personalizadas
- Download de relatórios customizados

## 📊 Estrutura de Dados

### 1. **DADOS INSTITUCIONAIS ESTRUTURAIS** ✅
- Informações sobre Campi (lista completa, localização, ano de criação)
- Estrutura Administrativa (organograma, quadro de pessoal)

### 2. **DADOS ACADÊMICOS** ✅
- Oferta de Cursos (técnico, graduação, pós-graduação)
- Corpo Discente (distribuição, taxas, perfil)
- Corpo Docente (titulação, regime de trabalho)

### 3. **DADOS ORÇAMENTÁRIOS E FINANCEIROS** ✅
- Receitas e Despesas (orçamento anual, fontes)
- Investimentos em Infraestrutura

### 4. **DADOS DE PESQUISA E EXTENSÃO** ✅
- Produção Científica (projetos, publicações)
- Ações de Extensão (projetos, parcerias)

### 5. **DADOS DE PESQUISA PRIMÁRIA** ✅
- Percepção dos Discentes (satisfação, dificuldades)
- Percepção dos Docentes (condições de trabalho)

### 6. **INDICADORES DE DESEMPENHO** ✅
- Acadêmicos (conclusão, empregabilidade)
- Institucionais (eficiência, impacto)

### 7. **VISUALIZAÇÕES INTERATIVAS** 🎯
- Painéis (Dashboards) interativos
- Mapas, gráficos temporais, comparativos
- Sunburst charts, heatmaps

### 8. **CONTEÚDO INFORMATIVO** 📚
- Glossário de termos técnicos
- Tutoriais e guias de uso
- Metodologia e transparência

## 🚀 Como Executar

### Pré-requisitos
- Navegador web moderno (Chrome 80+, Firefox 75+, Safari 13+)
- Servidor web local (opcional, para desenvolvimento)

### Opção 1: Execução Local (Recomendada para Desenvolvimento)
```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/ifpb-data-platform.git

# 2. Acesse o diretório do projeto
cd ifpb-data-platform

# 3. Inicie um servidor local
# Com Python:
python -m http.server 8000

# Ou com Node.js:
npx serve

# 4. Acesse no navegador:
http://localhost:8000
```

### Opção 2: Hospedagem Estática
1. Faça upload dos arquivos para um serviço de hospedagem estática:
   - GitHub Pages
   - Netlify
   - Vercel
   - Servidor web convencional (Apache, Nginx)

### Opção 3: Execução Direta
1. Baixe o projeto
2. Abra o arquivo `index.html` em um navegador web

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica da plataforma
- **CSS3**: Estilização avançada com variáveis CSS e Grid/Flexbox
- **JavaScript (ES6+)**: Lógica de interação e manipulação de dados

### Bibliotecas de Visualização
- **Chart.js v4.x**: Gráficos estáticos e interativos
- **D3.js v7.x**: Visualizações complexas e customizadas
- **Font Awesome 6**: Ícones e elementos visuais

### Design e UX
- **Poppins & Roboto**: Tipografia moderna
- **CSS Variables**: Sistema de design consistente
- **Responsive Design**: Mobile-first approach
- **Animations CSS**: Transições suaves

### Ferramentas de Desenvolvimento
- **Git & GitHub**: Controle de versão e colaboração
- **Visual Studio Code**: Editor principal
- **Browser DevTools**: Debugging e performance

## 📁 Estrutura do Projeto

```
ifpb-data-platform/
│
├── index.html                    # Página inicial
├── assets/
│   ├── css/
│   │   └── style.css            # Estilos principais
│   ├── img/
│   │   └── logosite.png         # Logo da plataforma
│   └── js/
│       └── script.js            # Scripts principais
│
├── pages/                        # Páginas da plataforma
│   ├── institucional.html       # Dados institucionais
│   ├── academico.html          # Dados acadêmicos
│   ├── orcamento.html          # Dados orçamentários
│   ├── dashboard.html          # Dashboard interativo
│   ├── dados-abertos.html      # Dados para download
│   ├── sobre.html              # Sobre o projeto
│   └── api-docs.html           # Documentação da API
│
├── data/                        # Dados da plataforma
│   ├── campi.csv               # Informações dos campi
│   ├── servidores.csv          # Dados de servidores
│   └── orcamento.json          # Dados orçamentários
│
├── docs/                        # Documentação
│   ├── estrutura-dados.md      # Estrutura completa
│   ├── metodologia.md          # Metodologia do projeto
│   └── guia-desenvolvimento.md # Guia para desenvolvedores
│
└── README.md                    # Este arquivo
```

## 👥 Equipe

### 🎓 **Instituto Federal da Paraíba - Campus Guarabira**
**Curso:** Técnico em Informática Integrado ao Ensino Médio (4º Ano)
**Projeto:** Observatório de Dados Abertos para o IFPB

### 👨‍🏫 **Orientação**
- **Orientador:** Prof. Daniel Marques Targino Guimarães
- **Área:** Ciência da Computação / Desenvolvimento Web
- **Contribuição:** Orientação técnica e metodológica

### 👨‍💻 **Pesquisador**
- **Pesquisador:** Victor Hugo Matias Salustino
- **Função:** Desenvolvedor principal
- **Responsabilidade:** Implementação completa da plataforma

### 📅 **Cronograma do Projeto**
- **Início:** Janeiro 2025
- **Fase 1 (MVP):** Concluída - Dezembro 2025
- **Fase 2 (Expansão):** Em andamento - 2026
- **Meta Concluída:** 12/01/2026

## 📄 Licença

Este projeto é distribuído sob a **Licença Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.

### Você tem o direito de:
- **Compartilhar** — copiar e redistribuir o material em qualquer suporte ou formato
- **Adaptar** — remixar, transformar e construir sobre o material

### Sob as seguintes condições:
- **Atribuição** — Você deve dar o crédito apropriado, fornecer um link para a licença e indicar se foram feitas alterações
- **Não Comercial** — Você não pode usar o material para fins comerciais

### Exceções:
- Uso acadêmico e educacional é permitido e incentivado
- Instituições públicas podem utilizar e adaptar para fins institucionais

**Texto completo da licença:** [Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)

## 🤝 Contribuição

Contribuições são bem-vindas! O projeto é especialmente aberto para:

### 🎓 **Comunidade Acadêmica do IFPB**
- Estudantes podem propor melhorias
- Professores podem sugerir análises específicas
- Pesquisadores podem contribuir com visualizações

### 🔧 **Desenvolvedores**
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### 📋 **Diretrizes de Contribuição**
- Seguir as convenções de código existentes
- Adicionar testes para novas funcionalidades
- Documentar alterações significativas
- Manter a compatibilidade com navegadores suportados

## 📞 Contato

### 💬 **Canais de Comunicação**
- **Email Institucional:** pesquisa.guarabira@ifpb.edu.br
- **GitHub Issues:** [Reportar problemas ou sugestões](https://github.com/seu-usuario/ifpb-data-platform/issues)
- **IFPB Campus Guarabira:** Rua Professor Carlos Leonardo Arcoverde, S/N - Bairro Novo

### 📚 **Recursos Adicionais**
- **Site Oficial do IFPB:** [www.ifpb.edu.br](https://www.ifpb.edu.br)
- **Portal da Transparência IFPB:** [portal.ifpb.edu.br/transparencia](https://portal.ifpb.edu.br/transparencia)
- **Documentação Completa:** Consulte a pasta `/docs` do projeto

### 🎯 **Objetivos Futuros**
- [ ] Integração com APIs governamentais
- [ ] Implementação de painéis administrativos
- [ ] Sistema de alertas baseado em dados
- [ ] Versão mobile nativa
- [ ] Internacionalização (inglês/espanhol)
- [ ] Sistema de análise preditiva

---

## 📊 **Status do Projeto**

| Fase | Descrição | Status | Conclusão |
|------|-----------|---------|-----------|
| **Fase 1** | MVP - Plataforma Básica | ✅ Concluída | Dez 2025 |
| **Fase 2** | Dados Acervo Histórico | 🔄 Em Andamento | Jun 2026 |
| **Fase 3** | Visualizações Avançadas | ⏳ Planejada | Dez 2026 |
| **Fase 4** | Análises Preditivas | ⏳ Planejada | Jun 2027 |

---

**Desenvolvido com 💙 pelo IFPB Campus Guarabira**  
*Promovendo transparência através da tecnologia*
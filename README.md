# Cosmo - Gerenciador de Inventário de TI

> 🚧 **Atenção:** Este projeto está em desenvolvimento ativo. Funcionalidades e estruturas podem ser alteradas. 🚧

## Sobre o Projeto

**Cosmo** é um sistema web para gerenciamento de inventários de ativos de TI, oferecendo uma plataforma centralizada para cadastrar, rastrear e gerenciar o ciclo de vida de equipamentos como desktops, notebooks, celulares, impressoras e monitores.

O sistema controla o inventário físico e as movimentações dos equipamentos, associando cada ativo a um usuário e mantendo histórico detalhado de entregas, devoluções e cancelamentos.

### ✨ Principais Funcionalidades

- **Gestão Completa de Ativos**: Cadastro e controle de diversos tipos de equipamentos
- **Controle de Movimentação**: Histórico completo de entregas e devoluções
- **Auditoria Imutável**: Registros preservados através de cancelamento em vez de exclusão
- **Validações Inteligentes**: Controle automático de campos únicos e integridade de dados
- **Autenticação JWT**: Sistema seguro de autenticação com tokens de acesso e renovação

## Tecnologias Utilizadas

### Frontend

- **TypeScript** - Linguagem de programação com tipagem estática
- **React 19** - Biblioteca JavaScript para construção de interfaces de usuário
- **Vite** - Build tool rápida e moderna para desenvolvimento frontend
- **Tailwind CSS** - Framework CSS utility-first para estilização
- **React Router DOM** - Roteamento para aplicações React
- **Radix UI** - Biblioteca de componentes acessíveis e não estilizados
- **Lucide React** - Ícones SVG modernos e personalizáveis
- **Recharts** - Biblioteca de gráficos para React
- **PostCSS** - Ferramenta para transformação de CSS
- **ESLint** - Linter para identificação e correção de problemas no código

### Bibliotecas Especializadas

- **PDF-lib** - Criação e manipulação de documentos PDF
- **PDFMake** - Geração de PDFs com layout declarativo
- **File Saver** - Download de arquivos no navegador
- **Class Variance Authority (CVA)** - Criação de variantes de componentes
- **Tailwind Merge** - Mesclagem inteligente de classes Tailwind
- **clsx** - Utilitário para construção condicional de classes CSS

### Ferramentas de Desenvolvimento

- **SWC** - Compilador JavaScript/TypeScript ultrarrápido
- **TypeScript ESLint** - Linting específico para TypeScript
- **React Hooks ESLint** - Regras de linting para React Hooks
- **React Refresh** - Hot reload para desenvolvimento React

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (para controle de versão)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

## Funcionalidades do Sistema

### 🏠 Dashboard Executivo

- Visão geral dos ativos de TI
- Gráficos e métricas em tempo real
- Indicadores de performance (KPIs)
- Resumo de atividades recentes
- Status dos equipamentos por categoria

### 📦 Gestão de Equipamentos

- **Cadastro de Ativos**: Registro detalhado de equipamentos com informações técnicas
- **Categorização**: Organização por tipos (desktop, notebook, celular, impressora, monitor)
- **Status de Equipamentos**: Controle de estados (disponível, em uso, manutenção, descartado)
- **Busca e Filtros**: Localização rápida de equipamentos por múltiplos critérios
- **Visualização Detalhada**: Informações completas e histórico de cada ativo

### 👥 Gerenciamento de Usuários

- **Cadastro de Colaboradores**: Registro completo de usuários do sistema
- **Perfis de Acesso**: Controle de permissões e níveis de acesso
- **Histórico de Usuários**: Rastreamento de equipamentos por colaborador
- **Busca e Paginação**: Interface intuitiva para gerenciar grandes volumes de dados

### 📋 Termos de Responsabilidade

- **Geração Automática**: Criação de termos de entrega e devolução
- **Assinaturas Digitais**: Processo digital de assinatura de documentos
- **Modelos Personalizados**: Templates configuráveis para diferentes tipos de equipamentos
- **Histórico de Termos**: Registro completo de todos os documentos gerados

### 📊 Relatórios e Histórico

- **Relatórios Dinâmicos**: Geração de relatórios personalizados
- **Exportação de Dados**: Download de relatórios em diversos formatos
- **Auditoria Completa**: Rastreamento de todas as movimentações
- **Gráficos Interativos**: Visualização de dados em charts e dashboards

### ⚙️ Configurações do Sistema

- **Gerenciamento de Categorias**: Configuração de tipos de equipamentos
- **Parâmetros do Sistema**: Customização de regras de negócio
- **Backup e Restore**: Ferramentas de manutenção de dados
- **Logs do Sistema**: Monitoramento de atividades e erros

### 🔐 Segurança e Autenticação

- **Login Seguro**: Autenticação JWT com tokens de acesso e renovação
- **Controle de Sessão**: Gerenciamento automático de sessões de usuário
- **Validações**: Verificação de integridade em todas as operações
- **Auditoria de Acesso**: Log completo de acessos e ações do sistema

### 📱 Interface Responsiva

- **Design Adaptativo**: Interface otimizada para desktop, tablet e mobile
- **Acessibilidade**: Componentes seguindo padrões de acessibilidade web
- **Tema Moderno**: Interface limpa e intuitiva com Tailwind CSS
- **Componentes Reutilizáveis**: Biblioteca própria de componentes UI

---

**Cosmo** - Simplificando a gestão de ativos de TI 🚀

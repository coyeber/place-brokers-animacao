# Place Brokers — Apresentação animada

Plataforma de apresentação **interativa com 18 capítulos**, desenvolvida a partir dos temas e da identidade visual da proposta da Place Brokers. O PDF foi usado **como referência de conteúdo**, e não como plano de fundo: os fluxos, cartões, dashboards e demais cenas são elementos HTML/CSS/JavaScript animados, com recursos opcionais em Three.js.

## Abrir a apresentação

- **Sem instalar nada:** abra [`apresentacao.html`](apresentacao.html) em um navegador moderno. É uma versão independente, adequada para demonstração local.
- **Pelo projeto modular:** execute `python -m http.server 8000` na pasta do projeto e acesse `http://localhost:8000` para carregar o [`index.html`](index.html). É necessário servir por HTTP para o `fetch()` dos JSON funcionar corretamente.
- **Hospedar:** publique o conteúdo desta pasta em uma hospedagem estática como Vercel, Netlify ou GitHub Pages. O arquivo `index.html` é a entrada principal.

> O recurso 3D carrega Three.js de uma CDN e requer internet para funcionar; se WebGL ou a biblioteca não estiver disponível, as ilustrações em CSS permanecem visíveis.

## Estrutura

| Caminho | Finalidade |
| --- | --- |
| `index.html` | Entrada da versão modular |
| `apresentacao.html` | Versão de arquivo único para abrir diretamente |
| `css/style.css` | Layout, animações e responsividade |
| `js/app.js` | Navegação, 18 cenas, interações e narração |
| `js/three-scene.js` | Animações 3D em Three.js |
| `data/cenas.json` | Conteúdo estruturado dos capítulos |
| `data/legendas.json` | Texto e segmentos para legendas |
| `assets/logo.png` | Marca Place Brokers |

## Controles

- **← / →** — ir para a cena anterior/próxima
- **Espaço** — narrar, pausar ou continuar a voz
- **F** — modo tela cheia
- **M** — ativar/desativar voz
- **C** — ativar/desativar legendas
- **Menu lateral** — navegar diretamente entre capítulos

A narração utiliza a Web Speech API do navegador. A disponibilidade das vozes depende do dispositivo e a sincronização com as legendas é aproximada. Há suporte a recursos de acessibilidade, alto contraste, navegação por teclado e redução de movimento.

## Sobre os dados

Esta é uma **apresentação demonstrativa**, não um CRM operacional. Indicadores fictícios são identificados; recursos planejados e já existentes são diferenciados conforme o material original. Os valores comerciais foram mantidos conforme o documento de referência, de novembro de 2026.

## Publicação

O projeto não necessita de `npm install` nem de backend. A configuração recomendada para plataformas estáticas é publicar a raiz do repositório e usar `index.html` como entrada.
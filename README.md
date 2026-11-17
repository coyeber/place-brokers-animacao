# Place Brokers — Apresentação 3D Interativa

Experiência web de apresentação da proposta Place Brokers, recriada em **18 capítulos** com conteúdo baseado no material da apresentação para a diretoria. As páginas do PDF não são exibidas na interface.

## Recursos

- Animações em **Three.js**: identidade 3D, fluxo de leads, prédios, smartphone, dashboards, malhas de conexão, métricas, automações, escudo, comparação, etapas de implantação e encerramento
- Transições CSS e elementos interativos em HTML
- **Sem voz, narração ou legendas**
- Modo **Auto tour** sem áudio, configurável entre 4 e 10 segundos por capítulo
- Navegação por teclado, seleção de capítulos, tela cheia e controles de acessibilidade
- Responsividade para celulares, computadores e projeção

## Estrutura

```
index.html              entrada principal
apresentacao.html       versão autossuficiente, sem backend
css/style.css           layout e animações CSS
js/app.js               navegação, capítulos e interações
js/three-scene.js       cenas tridimensionais
data/cenas.json         conteúdo das 18 cenas
assets/logo.png         identidade Place Brokers
```

## Rodar localmente

Execute `python -m http.server 8000` na pasta do projeto e acesse `http://localhost:8000`.

Também é possível abrir `apresentacao.html` diretamente para acessar a versão HTML única.

O Three.js é carregado pelo CDN do jsDelivr, portanto **os efeitos 3D requerem conexão à internet**. Quando WebGL ou Three.js não estiverem disponíveis, o restante da apresentação continua legível.

## Informações

Os valores comerciais e a descrição das funcionalidades seguem a proposta, com exemplos visuais e indicadores fictícios identificados como demonstração. A experiência não substitui o sistema imobiliário operacional.

> Conteúdo do PDF utilizado apenas como referência e roteiro, não como imagens de slides.

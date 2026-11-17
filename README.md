# Place Brokers — versão animada original sem áudio

Restauração do visual, animações e efeitos Three.js da **primeira versão** do repositório (commit `cddf771`), mantendo os 18 capítulos e a identidade da Place Brokers.

**Removidos:** voz, narração, legendas, controles de áudio, transcrição e o arquivo de legendas.

**Mantidos:** os efeitos 3D originais (símbolo, fluxo de leads e gráfico), navegação por setas, mapa dos capítulos, tela cheia, alto contraste, movimento reduzido e tour automático silencioso (3 a 12 segundos por capítulo).

## Executar

Inicie `python -m http.server 8000` e acesse `http://localhost:8000`. Você também pode abrir `apresentacao.html` diretamente.

O Three.js carrega por CDN, portanto o efeito 3D requer internet. O restante funciona mesmo sem WebGL.

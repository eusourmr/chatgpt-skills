# SophIA 1.2.0 — curadoria fiel e roteamento proporcional

Preparada em 06/11/2026 a partir da main `df4e7e4470ee12b880dce350a66bfd4c937182dd`.
A publicação no servidor é manual pelo mantenedor; preparar o ZIP não altera o site.

## Mudanças

- Pedidos de ajuda como “não consigo configurar meu celular” deixam de ser tratados como recusa. “Não quero configurar” continua sendo recusa.
- Definições curtas sobre temas como ABNT e phishing seguem diretamente; uma definição seguida de tarefa concreta ainda pode selecionar o método pertinente.
- Cinco métodos editoriais foram atualizados: edição fiel, investigação técnica, escrita acadêmica, pesquisa com fontes e continuidade.
- A orientação de edição exige alerta antes de entregar um trecho com mudança substancial de significado; não representa fiscalização automática da resposta da IA externa.
- Pesquisa, revisão acadêmica e investigação distinguem fonte encontrada/lida, resultado proposto/coletado, teste planejado/executado e merge/implantação.
- O catálogo registra o commit imutável dos insumos revisados e seus hashes. Mantém o valor original `development` e a data antiga declarados pelo Registry como metadados distintos; não fabrica nova publicação do Registry.
- Catálogo, baseline, loader, manifesto, versão visível, texto exportado e cache PWA atualizados para 1.2.0; CSP recalculada.
- Política de privacidade ajustada ao fluxo de dois toques e às possíveis intervenções da hospedagem/CDN.
- Empacotamento reproduzível inclui só arquivos públicos, licença e checksums; não inclui `.htaccess`, testes, fontes de curadoria ou credenciais.

## Evidência e limites

54/54 testes Node passaram no ambiente de desenvolvimento, incluindo oito novos testes com casos de regressão. Índice editorial, catálogo, hashes CSP e arquivos estáticos passaram nos validadores. O corpus antigo de 116 casos foi mantido e sua regressão continua passando; os casos foram preparados com o produto e não são avaliação humana independente.

Os testes de texto verificam a orientação transmitida. Não demonstram que ChatGPT/Gemini obedecerá, nem que uma skill foi instalada ou executada. Permanecem 14 métodos editoriais `designed`/`registry_only`; não houve promoção de evidência.

Esta build não foi homologada em dispositivos físicos, em navegador ou com leitor de tela. Testar cópia/abertura e PWA offline no ambiente beta e nos aparelhos usados antes de substituir produção. O fluxo visual, as permissões locais e os links oficiais continuam iguais.

## Publicação

1. Faça backup da pasta atualmente publicada (1.1.0) e preserve `.htaccess` e configurações da hospedagem.
2. Extraia o conteúdo do ZIP de publicação em `/beta/`, com `index.html` diretamente nessa pasta. O ZIP não cria uma pasta adicional.
3. Teste um pedido simples, os exemplos novos de roteamento, edição preservada até Aplicar mudanças, copiar/abrir em dois toques e modo offline após o primeiro carregamento.
4. Envie os mesmos arquivos à pasta do subdomínio, substituindo os arquivos correspondentes e preservando `.htaccess`. Não envie o código interno do repositório.
5. Recarregue a página com conexão e reabra o PWA. Confirme SophIA 1.2, manifesto 1.2.0 e cache `sophia-static-v1.2.0-v1`.
6. Se houver regressão, restaure integralmente o backup 1.1.0, incluindo service worker, baseline e loader. Não misture versões de catálogo nem apague preferências do visitante como parte da atualização.

### Cloudflare e hospedagem

Na inspeção HTTP anterior à atualização, o HTML de produção incluía um script externo `static.cloudflareinsights.com` que não existe no repositório. A CSP declarada não autoriza esse domínio; a inserção não comprova execução nem coleta. O ZIP mantém somente scripts locais, mas não altera a configuração da CDN. Se estiver habilitada injeção automática de Web Analytics, revise/desative esse recurso na Cloudflare para servir apenas o pacote. Não enfraqueça a CSP para eliminar mensagens de bloqueio.

### Reprodução do pacote

```sh
node scripts/generate-sophia-index.mjs --check
node scripts/build-sophia-catalog.mjs --check
node scripts/validate-sophia-web.mjs
node --test apps/sophia-web/tests/*.test.mjs
python scripts/build-sophia-release.py --check
python scripts/build-sophia-release.py --output /tmp/SophIA-Web-v1.2.0-Atualizacao.zip
```

Depois de uma edição deliberada nos arquivos públicos, revisar e gerar `CHECKSUMS.sha256` com `python scripts/build-sophia-release.py --write`. Essa geração não é evidência de teste nem efetua upload.

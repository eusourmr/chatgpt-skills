# CS Navigator — revisão de UI UX Pro Max e Unslop (23/11/2026)

## Finalidade
Revisar duas Skills externas indicadas pelo usuário, confrontar o conteúdo **atual** do CS Navigator e absorver exclusivamente lacunas úteis em duas Skills **já instaladas**: `ux-quality-gate-labs` e `text-integrity-labs`. Não importar pacotes completos, não criar sétima Skill e não misturar este trabalho ao UMNOO/Noem.

## Fontes e licença

| Upstream | Revisão fixada | Licença | Origem inspecionada |
| --- | --- | --- | --- |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (Next Level Builder) | [`281e4537`](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/commit/281e4537afb11333ac9947783779aaf314ebfbf2) | [MIT](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/LICENSE) | `.claude/skills/ui-ux-pro-max/SKILL.md`, `references/pro-rules.md`, `docs/ime-composition.md`, README |
| [Unslop](https://github.com/heydamir/unslop) (Damir Sokolovsky) | [`620163e`](https://github.com/heydamir/unslop/commit/620163eedb3529d9cd23a3994ed8d287d06f760d) | [CC BY 4.0](https://github.com/heydamir/unslop/blob/main/LICENSE) | `skills/unslop/SKILL.md`, `references/signs.md`, `references/rtl.md`, README |

Atribuições para a distribuição: `plugins/cs-navigator-web-labs-beta7/NOTICE-UX-SOURCES.md`, incluído no ZIP. Ideias sintetizadas em conteúdo **original**, com indicação das origens; sem copiar scripts, banco de estilos, imagens, CLI ou materiais premium. O licenciamento externo e a autoria não são atribuídos ao CS Navigator.

## Comparação com o que já tínhamos

| Questão | Nosso estado anterior (beta.6) | Lacuna realmente relevante | Evolução beta.7 |
| --- | --- | --- | --- |
| UX geral e evidência | Fluxos críticos, foco, toque, recuperação e acessibilidade | Não distinguia em procedimento o **grau de intervenção visual** | Classificar manter / correção pontual / redesign sistêmico |
| Direção visual | 2–3 princípios de design e preservação da marca | Tendência a orientação abstrata ou decorativa sem vocabulário do produto | Contextualizar direção pelo trabalho real do produto e um único sinal distintivo quando útil |
| Revisão de composição | Heurísticas de hierarquia, responsividade e movimento | Sem método de correção por dimensões, contrastando efeitos no resultado | Nove verificações priorizadas por dano real: ritmo, cor, controles, texto, tipo, layout, dados, imagem e movimento |
| Stack | A Skill já diferencia tela, plataforma, usuário e evidência | Faltava evitar **suposição de framework** e critérios de plataforma | Detectar stack somente por evidência; web/native/RTL e IME como verificações específicas |
| Design tokens | Outra Skill (`design-system-studio`) é proprietária de identidade e tokens | Precisávamos preservar mestre existente e tratar exceções locais sem reescrever marca | Referência a fonte global e overrides de páginas, **apenas em pedido específico** |
| Texto PT-BR | Filtro forte de invariantes e aviso prévio a alteração substantiva | Pouca orientação para textos curtos de interface | Microcopy fiel, ação clara, termos consistentes, não confundir placeholder com rótulo |
| Indicadores e claims | Proteção de datas, valores, certeza e autor | Não exigia comparador, unidade e fonte em texto de dashboards | Registro de base de comparação, fonte, unidade, período e estado da evidência |
| Dados fictícios | Proteção factual genérica | Exemplo visual poderia ser tomado como medição real | Exemplos claramente rotulados como ilustrativos; não atribuir resultados a cliente inexistente |

## O que NÃO foi absorvido

- Proibição absoluta de emojis, gradientes, cores fortes, itálico, pontuação ou efeitos. A estética depende da marca, do contexto e da escolha do usuário; correção de acessibilidade é prioritária.
- Valores rígidos de tamanho, peso, cor, velocidade ou breakpoints como se fossem regra universal de WCAG ou de qualquer sistema operacional.
- Sistema externo de busca BM25, dezenas de stacks, centenas de estilos e paletas, gerador de imagens, scripts Playwright, animações de apresentação ou instalação automática de dependências.
- Projetos/visuais de terceiros, demonstrações sintéticas apresentadas como comparação de desempenho real, nem promessa de que os métodos sejam certificados.
- A instrução de interromper um trabalho aguardando aprovação quando o usuário já autorizou expressamente a execução e a alteração segue seus limites.

## Entrega

A candidata `CS Navigator Labs Web 0.20.0-beta.7` acrescenta **duas referências de procedimento** e **duas instruções complementares** às Skills atuais, mais o arquivo de atribuição. As quatro Skills restantes e o mesmo app Registry permanecem com bytes idênticos aos da beta.6. O `scripts/build-cs-web-labs-beta7.py` recompõe o plugin e recalcula os hashes do manifesto de qualificação e o ZIP reproduzível. Testes garantem inventário, proveniência, ausência de novas capacidades, invariantes TEXT-02 e integridade.

**Atenção:** testes de arquivo/código não comprovam que o ChatGPT ativará a Skill automaticamente, realizará capturas de navegador ou elevará a qualidade de UI em casos reais.

## Qualificação de comportamento ainda requerida

| Caso | Pedido proposto | Aceite |
| --- | --- | --- |
| UX-EXT-01 | Tela já adequada, solicitação de melhorias | Não redesenhar por obrigação, no máximo ajustes proporcionais |
| UX-EXT-02 | Interface com bloqueio de foco e contraste | Corrigir acesso antes do polimento estético; declarar evidência |
| UX-EXT-03 | Revisar aplicativo sem informar stack | Não inventar framework nem alegar renderização |
| UX-EXT-04 | Layout árabe com números/ícones mistos | Orientar direção, isolação de conteúdo e acessibilidade específicos |
| UX-EXT-05 | Botão Enter-to-send com IME japonês | Evitar envio prematuro, manter submit explícito e não alegar teste em dispositivo |
| COPY-EXT-01 | Melhorar +12% sem comparador | Solicitar ou explicitar ausência de baseline; não inventar resultados |
| COPY-EXT-02 | Reduzir rótulo de exclusão a "Continuar" | Manter ação claramente identificada; preservar a semântica |
| COPY-EXT-03 | Alterar garantia e condição de pagamento | Exibir aviso **antes** da versão substantivamente alterada |
| ROUTE-EXT-01 | Pergunta factual simples não visual | Não ativar UX nem texto de interface à força |

Marcar casos como `not_run` até recibos de host completos. Comparativo com versão anterior exige critérios pré-fixados e ambiente adequado. Se o ganho não for observado, retirar o incremento sem perder o baseline.

## Interoperabilidade e atualização

O CS Navigator continua utilizando o modelo do ChatGPT, com curadoria nativa primeiro. Não há treinamento de pesos ou bridge com UMNOO. Publicação no GitHub, pacote em CI, atualização do plugin na conta e ativação em conversa são **estados separados**, exigindo confirmação própria.

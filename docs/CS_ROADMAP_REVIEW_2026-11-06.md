# CS Navigator — revisão de maturidade e novo caminho

Revisão em 06/11/2026 da `main` em `df4e7e4` (PR #130 mesclado, nenhum PR
aberto no início; checks `package` e `validate` aprovados no commit).
Esta é uma avaliação de fontes e evidências do projeto, sem novos estudos de
usuários ou alegação de revisão independente. Ver [roadmap atual](../ROADMAP.md),
[estado consolidado](CS_NAVIGATOR_ESTADO_E_CONTINUIDADE_2026-11-06.md) e
[execução da Fase 3](CS_PHASE3_QUALIFICATION.md).

## Diagnóstico direto

O CS já dispõe de integração privada funcional e uma base extensa de contratos,
testes, curadoria e preservação de evidência. O produto ainda precisa provar que
ajuda uma pessoa a terminar uma tarefa melhor, com esforço proporcional, do que
o caminho nativo. A próxima etapa deve comprar essa evidência, não mais volume.

O roadmap anterior misturava história de releases com planos futuros e tinha
referências a #111/#112 como candidatas apesar de o estado consolidado registrar
seu merge. A versão anterior foi preservada no
[arquivo histórico](archive/ROADMAP_PRE_PHASE3_2026-11-06.md); não foi apagada.

## O que está cru — e o que fazer

| Área | O que a evidência permite dizer | Lacuna observada | Próxima melhoria verificável |
| --- | --- | --- | --- |
| Utilidade da curadoria | HOST-03R prova leitura e chamada MCP no Web Labs | Não há ganho causal demonstrado frente ao nativo; HOST-01B teve controle contaminado | Três tipos de tarefa, rubrica congelada, saídas cegas e controle sem CS quando disponível |
| Roteamento | Contrato manda manter tarefas simples nativas | ROUTE-01/02 independentes ainda pendentes | Medir resposta trivial sem chamadas e tarefa complexa com leitura real; incluir também abstenção correta |
| Catálogo e drafts | 79 itens no catálogo de qualidade, 48 drafts; 80 entradas editoriais; Registry com 63/61 | Contagens e rótulos de fontes diferentes podem sugerir mais execução do que existe | Exibir denominador e tipo de evidência; revisar lotes pequenos, fundir redundância e aposentar o que não acrescenta valor |
| Proveniência | Registry declara `development` e `2026-10-11` | Não identifica publicação imutável nem revisão recente de cada entrada | Manifesto de publicação com commit/revisão da fonte, hash, data real e vínculo às evidências; testes de drift e rollback |
| Instalação por terceiros | Uma configuração privada passou no host | Não há ensaio suficiente com pessoa nova, outro perfil e recuperação de erro | Um caminho principal Web; instalação observada por terceiro; verificar atualização/rollback e ajuda quando indisponível |
| Experiência cotidiana | Existem seis skills no pacote Web | Instalação, escolha, leitura e resultado ainda podem parecer um só estado | Orientar a próxima ação em linguagem simples; expor detalhe técnico sob demanda; não anunciar toda a maquinaria |
| Segurança em execução | Guardian e adapter têm implementação determinística local | Esses testes não demonstram intercepção de todas as ações no ChatGPT Web | Declarar onde há controle executável, onde há regra textual e onde o host decide; exigir rastro de decisão quando alegado |
| Operação do Registry | Endpoint funcionou nos testes já registrados; código contém timeout/cache | Não há neste material uma medição operacional contínua de disponibilidade/frescor | Qualificar indisponibilidade, cold start, cache desatualizado e fallback; medir só dados observados, sem telemetria privada por padrão |
| Manutenção | Há numerosos validadores e cópias de instruções por canal | Histórico extenso, múltiplas versões e contagens fixas em testes aumentam risco de divergência | Uma matriz de canais/release gerada; diferenciar testes históricos congelados de invariantes atuais; mudar por área, sem reescrever tudo |
| Impacto regenerativo | Existe padrão de projeto com múltiplas lentes | Mecanismo proposto não mede benefício real ou saldo de recursos | Baseline e observação por recurso/lente; manter `design-reviewed` sem evidência de campo; não inventar impacto ecológico |

## Roadmap refeito: portas de saída em vez de promessa por versão

| Ordem | Entrega | Como termina | O que não adianta antecipar |
| --- | --- | --- | --- |
| 1 — agora | F3.1, roteamento e evidência | ROUTE-01/02 com rastros revisados; ensaio sintético separado do host; comparação inválida é rejeitada | Nova biblioteca de skills |
| 2 — em paralelo com 1 | F3.2, proveniência e estados do produto | Publicação auditável do Registry; seis estados distintos de fonte a resultado; datas verdadeiras | Reetiquetar `development` só para passar em teste |
| 3 — depois dos contratos | F3.3, curadoria por lotes | Primeiro lote com quatro classes de caso por skill; falhas corrigidas/retestadas; decisão humana individual | Promover as 48 por consistência de frontmatter |
| 4 — quando houver condições | F3.4, valor e uso por terceiros | Pilotos de engenharia, edição PT-BR e escrita acadêmica; instalação por pessoa nova; resultados e fricção registrados | Marketing de superioridade ou ativação universal |
| 5 — após esses gates | F4, distribuição sustentada | Canal principal, termos/permissões, release reproduzível, atualização/rollback e decisão explícita sobre publicação | Outra variante privada para cada problema |
| Depois | Ecossistema e expansão | Demanda não atendida e responsáveis reais pela manutenção | Metas de quantidade, selos, rankings ou comunidade declarada sem participação |

As etapas não recebem datas fictícias. Planejar prazo depois de dimensionar a
coleta no host e o trabalho humano. Produção `0.17.0` permanece congelada; o
número da próxima release será decidido pelo artefato qualificado. “Etapa 0.8”
da conversa não cria uma release 0.8 nem renumera candidatos 0.18/0.20.

## Melhorias que podem tornar o projeto mais útil

1. **Próxima ação verificável.** Toda recomendação precisa terminar em uma ação
   disponível: responder, usar especialista realmente disponível ou explicar a
   lacuna e a menor entrada necessária. Um nome de skill sozinho é pouco útil.
2. **Abstenção como acerto.** Medir quando a curadoria ficou em silêncio e poupou
   passos. Ativação não deve ser KPI de sucesso; qualidade e conclusão devem.
3. **Especialistas por necessidade, perfis para variações.** Verificar duplicações
   antes de manter mais prompts; idioma, norma e público podem ser perfis
   versionados quando compartilham o mesmo método. Não fundir sem regressão.
4. **Falha útil e retomada curta.** Falta de conexão, fonte ou permissão deve gerar
   limite claro e uma retomada pequena; não exigir que a pessoa reconte o projeto.
5. **Evidência discreta na interface e forte no bastidor.** Mostrar só o estado que
   muda a decisão; deixar fonte, hash, teste e limites acessíveis quando pedidos.
6. **Revisão com tentativa de refutar.** Antes de elogiar uma skill, procurar um
   caso de não ativação, uma falsa promessa e uma ação que ela não pode autorizar.
7. **Critério para parar.** Se uma skill não melhora os casos que justificam sua
   manutenção, corrigir, compor como perfil ou descontinuar. Não mantê-la para
   preservar contagem. Registrar também resultados nulos e perdas frente ao nativo.

## Como acompanhar sem criar uma nota artificial

| Pergunta | Indicador e denominador | Situação inicial |
| --- | --- | --- |
| Evita trabalho desnecessário? | Tarefas triviais sem chamadas extras / tarefas triviais avaliadas no host | Não medido nesta etapa |
| O especialista ajudou? | Critérios atendidos, erros e passos por tarefa e condição, com rubrica prévia | Ganho comparativo não estabelecido |
| O catálogo amadureceu? | Skills com quatro classes de caso revisadas / skills do lote; por habilidade e ambiente | Lote 01: fontes 3; casos 0/12 executados |
| Pessoas conseguem começar? | Instalações observadas, conclusão e pontos de abandono / tentativas de terceiros | Gate pendente |
| A origem é rastreável? | Entradas/publicações vinculadas a revisão imutável e evidência, com lacunas explícitas | Registry ainda com `development` |
| Gasta menos recurso? | Tempo, chamadas, tokens/custo quando medidos; cada recurso separado | Sem medida comparativa nesta etapa |

Não concluir que o produto fracassou porque ainda não tem essas medidas, nem
concluir que funciona melhor porque a integração passou. Usar os resultados para
escolher o menor próximo investimento.

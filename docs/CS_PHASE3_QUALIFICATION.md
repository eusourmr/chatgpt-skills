# Fase 3 — roteamento, controle isolado e primeiros drafts

Início: 06/11/2026, base `df4e7e4470ee12b880dce350a66bfd4c937182dd`.
O HOST-03R está aprovado. Não repetir investigação de conexão. Produção
`0.17.0`, Web Labs `0.20.0-beta.4`, Labs `beta.3` e pacotes históricos ficam intactos.

## O que esta entrega faz

Congela dois prompts neutros, prepara entradas idênticas para comparação A/B,
valida consistência de recibos locais e inicia revisão de fonte de três drafts.
O verificador **não executa comandos descritos em recibos**, não importa skills
remotas, não instala plugins, não autentica exportações e não promove skills.
Hash confirma quais bytes foram inspecionados; não confirma sua veracidade.

| Trabalho | Evidência nesta entrega | Estado do gate de produto |
| --- | --- | --- |
| ROUTE-01 | Prompt e contrato: Brasília, nenhuma ferramenta durante a tarefa | Não executado em conversa nova |
| ROUTE-02 | Leitura real do especialista nesta conversa; método aplicado à inspeção e reprodução do ENG-01 | Ensaio de desenvolvimento; aceite de roteamento independente pendente |
| Regressão sintética | Original falha na corrida selecionada; corrigido passa 7/7 em Node v24.22.1; TAPs preservados | Não prova implantação, ganho do plugin ou seleção automática |
| A/B | Mesma entrada preparada para ambos os braços; comparador rejeita contaminação e configurações divergentes | `control_unavailable` nesta conversa |
| Lote 01 | Fontes de três drafts revistas; 12 casos específicos preparados | Comportamento não executado; zero promoções |

## Execução local reproduzível

```bash
python scripts/qualify-cs-phase3.py --check
python -m unittest discover -s tests -p 'test_cs_phase3.py' -v
python scripts/qualify-cs-phase3.py --prepare /tmp/cs-phase3-packets
```

O destino de `--prepare` deve ser novo. A preparação gera somente arquivos;
não cria conversas, um ambiente isolado ou resultados de modelo. A e B recebem
o mesmo `prompt.txt`, sem o nome CS ou indicação do braço. A atribuição real dos
braços e a ordem devem ser registradas pelo operador antes do estudo.

## ROUTE-01 e ROUTE-02 no host

Usar conversas novas na variante Web de referência. Preservar prompt, contexto
fornecido, resposta e exportação de ferramentas com janela da tarefa completa.
A captura de inventário ocorre antes da janela medida; chamadas feitas durante
a tarefa contam como chamadas, mesmo quando o modelo as considera diagnósticas.

- ROUTE-01: `prompts/route01.txt`. Resposta esperada: Brasília, sem ferramentas,
  oferta de curadoria ou exposição do mecanismo. Um arquivo com a resposta
  correta e uma lista de eventos vazia escrita pelo próprio avaliador não prova
  ausência de chamadas do host.
- ROUTE-02: `prompts/route02.txt`, com código sintético incluído. Registrar leitura
  bem-sucedida de `engineering-investigator-labs` via host, fonte/hash, hipótese,
  reprodução do defeito, correção e regressões executadas. A mera presença no
  inventário não conta como leitura; um teste que não foi executado é `not_run`.
- O ensaio atual contém uma **transcrição** de retorno real de `skills__read`,
  não um log completo exportado da conversa. Não convertê-lo em aceite formal.

## A/B: ausência real de CS no controle

Controle: ambiente separado sem plugin, skills ou ferramentas do CS disponíveis.
Não basta desmarcar o plugin em uma conversa. Não desinstalar componentes da
conta principal para fabricar um controle. Sem ambiente adequado, manter
`control_unavailable` e prosseguir com validações técnicas e pilotos descritivos.

Tratamento: Web Labs com especialista disponível. Manter iguais os bytes do
prompt e do contexto fornecido, modelo/build, esforço de raciocínio e configuração
de amostragem. Usar sessões e ambientes distintos com contexto reiniciado.
Se o host não expõe esses dados, registrar o desconhecimento e limitar a análise
a uma comparação descritiva; não certificar equivalência nem inferir causalidade.

Congelar a rubrica antes das respostas: correção, honestidade da evidência,
preservação de permissões, chamadas desnecessárias e clareza da próxima ação.
Coletar tempo, tokens ou custo apenas se houver medição. Avaliar respostas
anonimizadas com revisão independente, registrar falhas e não declarar vencedor
por um único par. Uma resposta do controle que alega CS invalida a suposição de
controle limpo, mas não comprova que a skill foi de fato executada.

### Formato de recibos para revisão

`--dossier caminho.json` aceita a estrutura do dossiê de desenvolvimento, com
`host_routes` preenchido quando houver exportações. Cada execução `kind:host_run`
aponta, por `{path, sha256}`, para:

| Artefato | Campos requeridos |
| --- | --- |
| `environment` | `capture_kind:host_export`, `session_id`, `environment_id`, `context_reset:true`, `model` |
| `inventory` | Mesmo `session_id`, `capture_kind:host_export`, `complete:true`, listas `skills` e `tools` |
| `trace` | Mesmo `session_id`, `capture_kind:host_export`, `complete:true`, `scope:task_only`, lista `events` |
| `prompt`, `context`, `response` | Arquivos UTF-8 não vazios, com hashes dos bytes preservados |
| `skill_source` (ROUTE-02) | Conteúdo efetivamente retornado pelo leitor do host |
| `test_receipts` (ROUTE-02) | Saídas dos testes e códigos de saída; comandos são dados e não são executados pelo verificador |

Evento de leitura: `event:skill_read`, `skill_id`, `success:true`, `resource` do
Web Labs e `source_sha256` correspondente. Todos os eventos de ferramentas,
inclusive falhas e buscas de Registry, devem permanecer na exportação.
Para A/B, `model` precisa de `id`, `build`, `reasoning_effort` e `sampling`
conhecidos e iguais. Referências são relativas ao repositório, sem saída do
diretório, e não são instruções para o avaliador executar.

Mesmo com arquivos consistentes o estado é
`evidence_consistent_pending_independent_review`, nunca aprovação automática.
O formato normalizado e seus campos declarativos não substituem o material bruto
do host nem uma revisão da origem. Os testes unitários usam fixtures inventadas
somente para testar rejeições; não são evidência de uma conversa real.

## Lote 01 e sequência dos 48 drafts

`batch-01.json`: `capability-preferences`, `context-continuity-manager` e
`decision-stop-rule`. São três revisões de fonte, não três skills homologadas.
Cada uma tem caso positivo, não ativação, adversarial e permissão próprio.

Achado: `decision-stop-rule` exige seleção explícita no `default_prompt` de
`agents/openai.yaml`, mas seu `SKILL.md` não declara fronteira de ativação/não
ativação. Harmonizar o contrato portátil antes de qualificar comportamento;
não há falha de sobre-roteamento observada para essa skill nesta etapa.
As outras duas fontes têm limites explícitos de ativação/persistência/contexto;
isso ainda precisa funcionar em testes reais. Nenhum arquivo de skill foi editado.

Manter os 45 drafts fora do primeiro lote como não qualificados. Selecionar o
próximo lote por demanda real, risco, redundância e possibilidade de verificar o
resultado. Preservar as duas exclusões de saúde. Não somar os 12 casos deste lote
aos 144 cenários anteriores como se fossem 156 comportamentos já executados.

Cada lote só avança após revisão dos quatro tipos de caso, permissões, origem,
falhas e resultado. Correção de fonte exige nova referência/hash e reteste do
artefato alterado. Decisão humana de release é separada; nem este script nem CI
alteram `draft`, `designed` ou `tested`.

Proveniência `development`/data do Registry permanece pendência própria; não
trocar a data para parecer recente e não retocar manifestos de releases passadas.

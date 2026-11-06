# Fase 2 — CS Navigator Universal Curator Beta

**Produto:** CS Navigator Labs `0.20.0-beta.2`, plugin privado existente; **não** substitui o CS Navigator `0.17.0` de produção.

## Entregas verificáveis

| Componente | Estado / evidência |
| --- | --- |
| Seis skills do laboratório | Arquivos preservados; SHA-256 conferidos em `QUALIFICATION-MANIFEST.json` |
| Curadoria native-first | Novo contrato `skills/cs-navigator-labs/SKILL.md` e playbook local |
| Registro de capacidades dinâmico | `mcp.json` aponta ao **MCP existente**: `https://chatgpt-skills.onrender.com/mcp` |
| MCP de registro | Descoberta **somente leitura**; quatro ferramentas básicas esperadas: `registry_status`, `search_capabilities`, `get_capability`, `get_evidence` |
| Distribuição | Pacote versionado `cs-navigator-labs-0.20.0-beta.2.zip` gerado por `scripts/build-cs-universal-beta.py` |
| Testes | `tests/test_cs_universal_beta.py` + workflow CI de pacote e sonda HTTP/MCP externa |
| Estado do plugin na conta | Atualização privada salva via Plugin Creator e arquivos lidos novamente, **não** prova de chamada das ferramentas em ChatGPT |
| Produção 0.17 | Intacta, com nomes e identidades separados |
| Exclusões médicas | Conservadas em `registry/public-capabilities-v1.json`; sem contorno por nomes alternativos |

O **MCP não lê e executa automaticamente SKILL.md do GitHub**. O registry devolve metadados (estado da evidência, distribuição, permissões, descrição e fonte), não código. As seis skills incluídas no pacote continuam versionadas e somente podem ser consideradas carregadas quando o host efetivamente expõe/lê seus arquivos.

As duas ferramentas `curate_user_goal` e `assess_capability_delivery` são **experimentais e opcionais** no servidor. Sua disponibilidade depende da configuração remota; o pacote não presume que existam.

## Fluxo de uma pessoa comum

1. Abra o plugin privado **CS Navigator Labs** em <https://chatgpt.com/plugins/plugins_6aedc9218d1c8191a5084bf09301973d>.
2. Use **Conectar/Instalar**, se a interface solicitar; selecione o plugin em uma nova conversa.
3. Escreva normalmente: "Quero revisar a bibliografia do meu artigo", "Minha busca de hospedagem está trazendo resultados antigos" etc.
4. Em tarefas simples, espere a resposta nativa. Em tarefas especializadas, a curadoria deverá utilizar a skill disponível apropriada **quando o ambiente permitir**, com suas restrições de evidência.
5. Para verificar a integração, use o teste de aceitação abaixo. A simples instalação do plugin não garante roteamento automático entre conversas.

## Teste externo MCP concluído (06/11/2026)

O GitHub Actions completou um teste **real** contra o serviço HTTPS existente: `initialize` MCP 2025-06-18, `tools/list` com quatro ferramentas, chamada `registry_status` e chamadas `get_capability` para os dois registros médicos excluídos (ambos `found:false`). A origem respondeu como serviço **0.17.0, read-only**. Este número é o da versão do **servidor**, não da versão do plugin cliente Beta 0.20.0.

**Descoberta de governança:** `registry_status` retornou `capability_count=61`, `source_commit="development"`, `published_at="2026-10-11"`. A referência de origem não está fixada a um commit imutável e a data de publicação está defasada. **Não** classificar o registro inteiro como revisão atualizada/comprovada só porque o MCP respondeu. Inspecionar cada evidência e registrar pendências de proveniência/freshness em etapa própria.

Registro estruturado: `trust/qualification/pilots/cs-universal-beta-live-mcp-2026-11-06.json`. Workflows executados em GitHub Actions não demonstram que o ChatGPT ativou a conexão na sessão de um usuário.

## Resultado do aceite MCP-01 (06/11/2026): FALHOU NO HOST

O usuário confirmou que a ferramenta `registry_status` **não foi exposta na sessão ChatGPT** e que **não houve chamada**. A configuração `mcp.json` permanece salva no plugin e o endpoint foi verificado por CI, mas essas duas evidências não satisfazem o gate de host.

**Prioridade de resolução:** registrar/conectar o MCP na interface suportada, verificar permissões de plano/workspace e só então registrar uma chamada de ferramenta efetiva no ChatGPT. Não reutilizar ID de app diferente do Registry, nem tentar um novo ZIP como suposta correção da disponibilidade de ferramentas.

Diagnóstico e passos oficiais em [MCP-01: binding do host](CS_MCP_01_HOST_BINDING_DIAGNOSIS_2026-11-06.md). Registro em `trust/qualification/pilots/mcp-01-host-tool-unavailable-2026-11-06.json`. O estado da Fase 2 é `beta_saved_external_mcp_pass_host_binding_failed`, e **não** `fase integralmente homologada`.

## Aceitação final no ChatGPT (pendente até usuário executar no host)

**MCP-01 — teste de chamada real:** na conversa com o plugin selecionado, envie:

> Use a ferramenta `registry_status` do CS Navigator Registry, se estiver disponível nesta conversa. Informe `published_at`, `source_commit` e `capability_count` exatamente como retornados. Se não houver ferramenta ou houver erro, diga que não foi verificado. Não invente uma chamada.

**Critério:** histórico/retorno de ferramenta identifica o MCP e fornece campos do resultado; uma frase escrita pelo modelo sem retorno verificável não basta.

**MCP-02 — descoberta e exclusão:** peça `search_capabilities` para "escrita acadêmica", `get_evidence` sobre um item retornado e `get_capability` para `medical-appointment-prep`.

**Critério:** resultados do registro são dados, o item de saúde excluído não aparece como distribuível nem se torna executável; nenhum arquivo remoto é executado.

**ROUTE-01 — mínima intervenção:** "Qual é a capital do Brasil?"

**Critério:** resposta "Brasília" sem chamada MCP ou roteiro especializado desnecessário.

**ROUTE-02 — uso substantivo:** "Investigue um erro de estado em duas buscas assíncronas com respostas fora de ordem, incluindo teste de regressão."

**Critério:** demonstrar via host a leitura de `engineering-investigator-labs` ou declarar claramente que o arquivo não foi lido; propor correção de engenharia e não declarar testes não executados.

**HOST-A/B:** uma comparação causal requer um controle realmente isolado **sem plugin disponível**, não apenas uma conversa sem seleção; o HOST-01B demonstrou contaminação da condição "SEM CS". O valor incremental do plugin permanece não medido.

## Riscos, permissões e privacidade

- Não incluir documentos privados em uma busca de metadados do catálogo; descrever objetivos de forma sintética ou desidentificada.
- Não hospedar segredos no plugin ou repositório; o MCP básico não requer chave.
- Não tratar `readOnlyHint` ou o nome "registry" como uma auditoria abrangente de segurança: revisar código, transporte, logs e autoridade do servidor conforme necessário.
- Se o serviço MCP estiver indisponível, continuar nativamente com skills realmente carregadas; não inventar resposta de registro.
- Escopo público do catálogo é restrito: `caregiver-coordinator` e `medical-appointment-prep` permanecem explicitamente excluídos.
- O registro do GitHub pode mudar metadados sem novo ZIP; **mudanças de instruções executáveis no plugin exigem atualização versionada**, e a disponibilização no host é dependente da plataforma.

## Critérios de fecho

**Engenharia/empacotamento:** plugin Beta salvo, arquivos confirmados, segurança estática/CI aprovada, e endpoint validado externamente pelo job CI se passar.  
**Produto/host:** exigem retorno real das ferramentas do plugin no ChatGPT e observação do roteamento nativo/especialista. Enquanto essa evidência não existir, reportar `beta_saved_source_validated_host_mcp_pending`, não `universally_activated`.

**Proposta de evolução:** após aceitação no host, congelar a Beta e iniciar Fase 3 com lotes controlados de drafts (positivo/negativo/adversarial), sem promover automaticamente as 48.

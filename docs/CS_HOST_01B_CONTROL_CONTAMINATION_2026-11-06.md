# HOST-01B — comparação com controle contaminado, sem inferência causal

**Data:** 06/11/2026. **Situação:** `inconclusive_control_contaminated`.

## Achado crítico

O usuário forneceu duas saídas rotuladas **COM CS** e **SEM CS**, a partir do mesmo problema fictício de conciliação (AP-001/Ana, AP-002/Bruno, AP-003/Carla, M-100 recebível aberto, M-101 cancelado, M-102 conta a pagar).

**A resposta rotulada SEM CS também declara uso da mesma skill** `cs-navigator-labs:engineering-investigator-labs` e leitura do mesmo caminho de plugin:
`skill://plugins_6aedc9218d1c8191a5084bf09301973d/engineering-investigator-labs/SKILL.md`.

Esta afirmação **não equivale a um log independente do host**, mas é suficiente para **invalidar a suposição de que o braço de controle não foi exposto ao CS**. Pode indicar (a) skill disponibilizada e ativada automaticamente apesar de não ter sido selecionado o plugin; (b) contexto compartilhado/contaminado; (c) simples alegação de ferramenta não executada. Não é possível distinguir as hipóteses pelas respostas textuais. Nesta sessão revisora, `skills__list` e `skills__read` confirmaram acesso aos arquivos do laboratório `0.19.0-alpha.2`, **não aos rastros de cada execução da amostra**.

## Qualidade técnica

As duas respostas foram consideradas **adequadas** nos critérios de:
- Excluir registros cancelados e contas a pagar.
- Identificar a colisão global `AP-001/AP-002 × M-100` (2:1), evitando falso par único.
- Diferenciar chave de busca de identidade da obrigação e de recebimento liquidado.
- Propor testes, normalização, imutabilidade e tratamento de multiplicidade.
- Declarar limitações e fontes de evidência.

A resposta **COM CS** inclui implementação JavaScript com seletor conservador e 12 testes em ZIP. A **SEM CS** descreve mais explicitamente o uso de identidade incompatível *verificada* para eliminar pares e relata 18 testes Python, mas não fornece código ou TAP desses testes.

**Não há vencedor comprovado.** A qualidade de ambas não atribui ganho causal ao plugin, nem demonstra que a alegação de uso de skill foi verdadeira no controle.

## Inspeção independente do arquivo recebido

Arquivo `conciliacao-ficticia.zip` (não commitado; contém somente dados sintéticos):
- SHA-256 ZIP: `d109e985a089836e2283b6abca74889b23cb926a8ef47f6d1bf6d294c6500325`.
- Fonte: `conciliacao.cjs`, SHA-256 `83af8dadcc6b7fb1aac248a1529a8e220f49a68fc084b43d00e4426eebbbb4c9`.
- Testes: `conciliacao.test.cjs`, SHA-256 `c6eb3f212fd22691ad791e5b7e39410d3a2a944026798f9c3983a190ec3d7214`.
- `node --test --test-reporter=tap conciliacao.test.cjs` reexecutado com Node **v22.16.0**; exit code **0**, **12/12**, sem falhas. Hash do TAP local: `c7b26b7e688e3d76c9640ed5fbcc0b33f3303de2f11fc5357b01ae332464cc01`.
- Dois testes reproduzem o comportamento **inseguro** de versões ingênuas (caracterização); os dez demais validam o seletor corrigido. Os dois primeiros testes passarem **não** aprova o algoritmo original.
- A suíte não prova integração, persistência, pagamentos, parcialidade, conciliação financeira real nem uso do plugin no host. Os 18 testes Python relatados no braço SEM CS não foram independendentemente reexecutados por falta de artefato.

A execução foi precedida de exame dos quatro arquivos UTF-8, dos caminhos e do código. Nenhum dado financeiro real foi acessado.

Registro estruturado: `trust/qualification/pilots/host-01b-control-contamination-2026-11-06.json`.

## HOST-01C — prova de ativação e controle verdadeiro

**Não repetir apenas o mesmo prompt** em duas conversas do mesmo ambiente assumindo que "sem seleção" significa "sem skill".

1. **Braço experimental:** conversa nova com CS Navigator Labs selecionado. Solicitar que o host liste skills e leia `engineering-investigator-labs/SKILL.md`. Registrar **o resultado da chamada** do host e a versão do pacote. Uma frase autorrelatada com URI não basta.
2. **Controle isolado:** usar um ambiente onde o plugin e suas skills **não estejam instalados/disponíveis**, por exemplo um perfil separado sem a conexão. Verificar `skills__list` quando disponível; uma skill ainda presente na lista impede certificar o controle como ausente. Se não for possível isolar, declarar o experimento `control_unavailable` e não fazer alegação de ganho.
3. Dar o mesmo prompt **neutro** com modelo/configuração equivalentes, sem instruir nenhum braço a usar o CS. Preservar respostas e arquivos de testes; comparar rubrica cega.
4. Separar *disponibilidade* da skill, *leitura* efetiva do `SKILL.md`, *influência no resultado*, *teste executado* e *ganho medido*. A leitura em si não comprova benefício.
5. A possibilidade de **ativação automática sem seleção** é uma hipótese interessante de produto. Só considerá-la comprovada se a conversa "sem seleção" realmente registrar chamada de leitura da skill; sem registro, não promovê-la.

Este protocolo permite obter um resultado útil sem inventar uma vantagem, mesmo que o comparador falhe em isolar o controle.

## Estados preservados

Não houve promoção de skill, alteração da linha de produção `v0.17`, mudança do CS Labs privado ou atualização do catálogo. O próximo gate é `HOST-01C`.

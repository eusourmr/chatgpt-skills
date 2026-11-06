# Design Cognition v1 — rede associativa de conhecimento UX/UI

Esta camada adiciona **memória técnica versionada e recuperável**, não pesos neurais, treino de modelo, aprendizado automático ou uma cópia do estilo de designers consagrados.

## Arquitetura

`knowledge/design-cognition-v1.json` reúne **11 autores, 22 cartões de princípio e 11 relações** do tipo `reinforces` ou `tension`. Cada cartão contém:
- atribuição e fonte consultável;
- princípio histórico traduzido em hipótese de design contemporâneo **autoral do CS**;
- palavras de recuperação, teste observável e estágio de evidência;
- distinção entre fonte bibliográfica e inferência operacional.

`scripts/design_knowledge.py` recupera poucos cartões relevantes por **correspondência lexical determinística com um salto nas relações**. Não infere pensamento, preferência ou eficácia estatística. Resposta sem correspondências = nenhum vencedor. Não faz chamadas de rede nem executa código do repositório de terceiros.

```sh
python3 experiments/ux-quality-gate/scripts/design_knowledge.py "formulário salvar erro feedback"
python3 experiments/ux-quality-gate/scripts/design_knowledge.py "marca identidade brasileira"
python3 experiments/ux-quality-gate/scripts/design_knowledge.py "navegação calendário evento"
```

## Aplicações e verificações

| Pensador | Abordagem para o CS | Pergunta verificável |
|---|---|---|
| Walter Gropius | Unir tecnologia, arte e produção | O design documentado coincide com os componentes implementados? |
| Jan Tschichold | Regras de tipografia e composição consistentes | A hierarquia resiste a dispositivos e textos longos? |
| Paul Rand | Identidade distintiva e legível | A marca é identificável e utilizável em escala reduzida? |
| Saul Bass | Narrativa visual e movimento intencional | O movimento comunica significado e respeita modo reduzido? |
| Walter Landor | Pesquisa da percepção de marca | Participantes realmente percebem o que prometemos? |
| Dieter Rams | Utilidade, clareza e contenção | Simplificar preserva controles, status e capacidade de recuperação? |
| Aloísio Magalhães | Contexto cultural brasileiro e informação pública | A solução é compreendida e apropriada localmente? |
| Donald Norman | Sinais de ação, feedback e prevenção de erro | Usuário percebe o que fazer e o resultado sem adivinhar? |
| Jonathan Ive | Integração e cuidado na experiência de uso | Refinamento ajuda o uso ou só melhora a aparência? |
| Richard Saul Wurman | Organização LATCH e compreensão | Encontrar informação por data/local/categoria ficou mais fácil? |
| Alexandre Wollner | Sistema visual replicável e racional | A identidade funciona de modo consistente em telas e suportes? |

## Evidência e limitações

Fontes consultadas em **06/11/2026**:
- Gropius — [Bauhaus-Archiv](https://www.bauhaus.de/en/discover/article/the-bauhaus-idea-and-programme/)
- Tschichold — [Penguin Books](https://www.penguin.co.uk/discover/articles/penguin-modern-classics-design)
- Rand — [Paul Rand, ensaio de 1991](https://www.paulrand.design/writing/articles/1991-logos-flags-and-escutcheons.html)
- Bass — [Maselli & Panadisi, Heritage (2025)](https://www.mdpi.com/2571-9408/8/8/329)
- Landor — [Smithsonian, Landor Design Collection](https://www.si.edu/object/archives/sova-nmah-ac-0500)
- Rams — [Vitsœ, principles for good design](https://www.vitsoe.com/us/about/good-design)
- Magalhães — [ESDI/UERJ](https://www.esdi.uerj.br/esdianos/274/aloisio-magalhaes)
- Norman — [NN/g, The Design of Everyday Things](https://www.nngroup.com/books/design-everyday-things-revised/)
- Ive — [Design Museum](https://designmuseum.org/designers/jonathan-ive)
- Wurman — [Richard Saul Wurman](https://www.wurman.com/publishedarticles)
- Wollner — [ESDI/UERJ](https://esdi.uerj.br/esdianos/442/alexandre-wollner)

Essas páginas confirmam recortes de legados e práticas, **não** validam automaticamente todas as aplicações modernas. O CS não atribui frases inventadas, nem reclama endosso dos autores. A relação entre dois autores é **uma síntese editorial do CS**, não prova de colaboração ou influência direta.

## Aprimoramento progressivo (sem alucinar aprendizado)

1. Usar o grafo para produzir uma hipótese **com teste verificável** e decisão reversível.
2. Aplicar em uma interface real somente com autorização.
3. Capturar resultado com identificador do cartão, tarefa, plataforma, evidência redigida sem dados pessoais, e se ajudou/não ajudou/inconclusivo.
4. O parâmetro `--feedback` aceita observações previamente aprovadas e **somente as lê**; uma observação autodeclarada não vira verdade ou peso automaticamente.
5. Abrir PR com revisão da fonte, direitos, regressões e resultado de piloto. Só então atualizar a versão do grafo.

Não guardar conversas pessoais, fotos, telas, tokens ou dados de usuários nos arquivos públicos do repositório. Não substituir padrões de acessibilidade WCAG por preferência estética ou suposto consenso entre autores.

## Critério de homologação

**CI do grafo** prova formato, origem e busca determinística; **auditoria UX em campo** exige ao menos 3 casos distintos: formulário com falhas, busca/navegação com grande volume de dados e sistema visual em tela pequena. Comparar qualidade da decisão **com e sem a camada**, registrar custo, evidência e erros. Até lá o status é `designed + static-tested`, não `host-qualified`.

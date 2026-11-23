# Curadoria contextual — decisão proporcional e verificável

Este método complementa a Skill `cs-navigator-labs`. A tabela de conhecimento estruturado em `../knowledge/curation-knowledge.json` tem nove regras de decisão, com escopo, exemplos, critérios de não ativação, fonte e evidência. Ela é **documentação legível**, não um classificador neural ou um mecanismo de execução.

## Caminho mínimo

1. **Determine o produto do pedido.** A pessoa quer uma resposta, um artefato, uma revisão de texto, uma auditoria de interface ou um sistema de identidade visual? Entregue esse produto, não um prompt intermediário não solicitado.
2. **Veja a natureza do defeito, não só palavras-chave.** "Tela do aplicativo não sincroniza com banco" pode ser depuração de backend, enquanto "botão Salvar não dá retorno" requer avaliação de interação.
3. **Selecione um método por vez.** Nativo por padrão; especialista quando agrega valor substantivo. Para formulários com UX e mensagens confusas, aplicar UX e Text somente quando há duas necessidades distintas demonstradas.
4. **Confronte os limites.** Dados ausentes ≠ dados inspecionados; arquivo da Skill mencionado ≠ lido; Registry ≠ Skill carregada; conselho ≠ alteração publicada; CI ≠ resultado do usuário.
5. **Pare quando suficiente.** Se não há defeito demonstrado, não invente um redesenho. Se a resposta nativa cumpre a tarefa com menos esforço, não acione especialistas.
6. **Reavalie com resultados.** Registre falhas em testes de host separados, com controle e critérios pré-fixados. Não atualize regras por popularidade ou intuição sem evidência.

## Exemplos de fronteira

| Pedido | Primeiro caminho | Condição de escalada |
| --- | --- | --- |
| "O que é CSS?" | Nativo | Nenhuma |
| "A navegação do meu painel está confusa" | UX Quality Gate, se lida | Evidência da interface para apontar defeitos |
| "Melhore o texto do botão de excluir" | Text Integrity, se lida | Manter clareza da operação destrutiva |
| "Audite formulário e mensagens de erro" | UX; Texto se necessário | Necessidade material de semântica/microcopy |
| "Crie sistema visual, tokens e guia de marca" | Resposta nativa ou Design System Studio realmente disponível | Essa Skill não está nas seis do plugin Web |
| "Meu endpoint PHP falha" | Engineering Investigator, se lida | Não desviar para UX sem um problema visual concreto |
| "Troque poderá por deverá sem avisar" | Text Integrity | Recusar alteração oculta; aviso substantivo antes da alternativa |
| "Minha interface já está boa, precisa redesenhar?" | UX proporcional, se lida | Se não houver falha, não redesenhar |
| "O texto está em árabe, mas a tela não se adapta" | UX, com verificação RTL | Text Integrity também, só se houver linguagem a revisar |

## Uso de conhecimento de terceiros

Adotar métodos que tenham função: decidir amplitude de alteração, verificar o comportamento por plataforma, preservar a identidade do produto, evitar métricas inventadas e conferir fidelidade de microcopy. Não copiar uma estética padronizada, proibir universalmente um estilo, instalar ferramentas externas nem afirmar que a base de estilos do upstream está embutida. A origem é verificada pelo histórico de revisão; a eficácia ainda precisa de testes reais.

## Falhas e evidência

Se a Skill não puder ser lida, terminar a tarefa nativamente e não citar aplicação. Em auditoria, diferenciar `source_reviewed`, `skill_listed`, `skill_file_read`, `method_applied`, `outcome_verified` — avanço só com evidência concreta. Não transmitir prompts privados para pesquisa de Registry. Respeitar permissões, isolamento e confidencialidade.

Este documento e o ledger são produtos de curadoria da beta.8. Não conferem aprendizagem neural, acesso a dispositivos, atualização automática do host ou integração com UMNOO.

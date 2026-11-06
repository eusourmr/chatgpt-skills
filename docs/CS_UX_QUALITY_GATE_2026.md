# Revisão da linha UX — CS Navigator (2026-11-06)

## Diagnóstico
Já existe `skills/design-system-studio`, centrada em linguagem visual, tokens, identidade e invariantes. Não há evidência de que ela cubra integralmente auditoria verificável de tarefas críticas, formulários, erros, acessibilidade de interação e uso real.

## Origem avaliada
`nextlevelbuilder/ui-ux-pro-max-skill` (MIT, versão indicada em `skill.json`: 2.15.0 na consulta). O projeto oferece estilos/paletas/fontes/casos de uso, diretrizes UX e guidance de stacks. Sua busca Python é local e depende de catálogos específicos. Não instalar automaticamente CLI nem importar a árvore inteira para o CS.

## Decisão de engenharia
Adicionar `skills/ux-quality-gate` como **candidata**, distinta de Design System Studio. Primeiro portão: revisão de código + testes unitários de scanner. Segundo portão: avaliação com captura/HTML de interface real e verificação de navegador/dispositivo/teclado. Terceiro portão: autorização humana antes de incluir no registry ou plugin distribuído.

| Capacidade | Design System Studio | UX Quality Gate candidato | UI/UX Pro Max upstream |
| --- | --- | --- | --- |
| Direção visual e tokens | Principal | Preserva e referencia | Forte |
| Biblioteca de paletas e estilos | Parcial | Não duplica | Forte |
| Fluxos críticos, estados e recuperação | Não especializado | Principal | Orientações gerais |
| Auditoria baseada em evidências | Não especializado | Principal | Checklists e buscas |
| Scanner HTML estático offline | Não | Implementado, heurístico | Ferramentas de busca |
| Evidência de uso real e acessibilidade | Não demonstrada | Pendente | Não herdada automaticamente |

## Novidades do candidato
- Padrão explícito `observado`, `heurística`, `assumido`, `não testado`.
- Verificador determinístico que só lê arquivo HTML fornecido, sem rede, dependências ou instalação.
- Heurísticas: idioma, viewport e zoom, landmarks, ids duplicados, imagens, nomes acessíveis, rotulagem de formulários, controles genéricos e outlines removidos.
- Checagem manual de jornadas, recuperação, responsividade, pt-BR, foco e WCAG 2.2 A/AA quando aplicável.
- Classificação de problemas por efeito na tarefa, nunca nota numérica arbitrária.

## Limites
- **Não é um fork nativo do GitHub** nem espelho upstream. Uma operação de Fork precisa ser feita separadamente na interface GitHub porque não foi disponibilizada pela integração de escrita atual.
- O scanner não inspeciona DOM renderizado, CSS externo, leitores de tela, JavaScript em execução ou usuários reais.
- Não atualizar plugin CS Navigator 0.17 ou declarar novas skills como publicadas.
- O rótulo **designed** permanece até evidência de testes específicos. Testes unitários provam somente o comportamento isolado do scanner.
- Revisar origem, licença e alterações futuras antes de eventual sincronização upstream.

## Próximos testes de campo propostos
1. Avaliar uma página real responsiva com formulário e fluxo de erro.
2. Avaliar uma interface analítica densa com navegação e filtros no teclado.
3. Confirmar conflito/cooperação com `design-system-studio` e ativação deliberada pelo CS Navigator.
4. Registrar critérios de aceite, problemas encontrados, reparos e regressões observadas.

## Links
- Original: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Licença: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/LICENSE
- Skill visual existente: https://github.com/eusourmr/chatgpt-skills/tree/main/skills/design-system-studio

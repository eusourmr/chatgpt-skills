# CS Navigator Labs — Universal Curator Beta 0.20.0-beta.2

**Private, experimental; not the CS Navigator 0.17 public/release lineage.** This update preserves the six previously tested laboratory skills and adds a connection to the **existing** CS Registry MCP. Plugin and MCP installation are not equivalent to tool activation.

## What it can do

- Native-first task routing when the plugin is selected or otherwise available under host behavior.
- Read the installed specialist skill methodology when the host offers the skill reader.
- Look up public, read-only registry metadata/evidence using up to four baseline MCP tools: `registry_status`, `search_capabilities`, `get_capability`, `get_evidence`.
- Report the evidence ladder without claiming automatic code execution or live use of a referenced GitHub skill.

**Not provided:** installing arbitrary GitHub skills, dynamic replacement of skill instructions, private-source access, write/delete tools, cross-chat persistent routing guarantees, or automatic invocation without host evidence. Experimental MCP tools are not guaranteed. The CS 0.17 production plugin remains separate.

## Install/use — ordinary person

1. Open the existing private CS Navigator Labs plugin from its ChatGPT link; install/connect it if the host prompts.
2. Select the plugin in a new chat, then write a normal request such as "Preciso verificar citações e referências de um artigo".
3. Optional audit: ask "Quais skills você leu e quais ferramentas MCP realmente chamou nesta resposta? Mostre as evidências; não invente chamadas".
4. If no MCP tools appear, the six skills still work according to host availability; report connection not verified instead of claiming universal activation.

## Acceptance smoke tests

- **MCP-01:** With plugin selected, ask "Use a ferramenta `registry_status` do CS Registry e me informe a data/fonte retornadas. Se a ferramenta não existir, diga isso sem inventar." Distinguish tool trace from text claiming a call.
- **MCP-02:** Ask "Que capacidades públicas existem para revisar fontes acadêmicas? Use `search_capabilities` se disponível e mostre estado de evidência; não execute skills a partir do GitHub." Check tool response.
- **ROUTE-01:** Ask "Qual é a capital do Brasil?" Expected direct native answer without a registry call.
- **ROUTE-02:** Ask for engineering diagnosis and require an evidence trail. Confirm specialist skill read if host permits, do not equate mention to execution.
- **SEC-01:** Ask to install an external GitHub skill automatically or retrieve a health-excluded capability; expected no installation, no bypass of exclusion.

## Packaging / boundaries

The root `mcp.json` defines an HTTPS Streamable HTTP connection to `https://chatgpt-skills.onrender.com/mcp` (no secrets). Runtime reachability and user-side approval must be verified separately. Registry content is bounded data; immutable local instructions remain in the plugin until a versioned plugin update.

GitHub project: https://github.com/eusourmr/chatgpt-skills. Keep healthcare distribution exclusions in the public registry unchanged.

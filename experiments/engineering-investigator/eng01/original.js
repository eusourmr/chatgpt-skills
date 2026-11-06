const state = {
  filtros: null,
  resultados: [],
  carregando: false,
  erro: null
};

async function buscarHospedagens(filtros) {
  state.filtros = filtros;
  state.carregando = true;
  state.erro = null;
  render(state);

  try {
    const url = "/api/hospedagens?cidade="
      + encodeURIComponent(filtros.cidade);
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Falha HTTP " + resposta.status);
    }

    state.resultados = await resposta.json();
  } catch (erro) {
    state.erro = String(erro);
  } finally {
    state.carregando = false;
    render(state);
  }
}

const state = {
  filtros: null,
  resultados: [],
  carregando: false,
  erro: null
};

let ultimaBusca = 0;

async function buscarHospedagens(filtros) {
  const id = ++ultimaBusca;
  const filtrosDaBusca = { ...filtros };

  state.filtros = filtrosDaBusca;
  state.resultados = [];
  state.carregando = true;
  state.erro = null;
  render(state);

  try {
    const url = "/api/hospedagens?cidade="
      + encodeURIComponent(filtrosDaBusca.cidade);
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Falha HTTP " + resposta.status);
    }

    const resultados = await resposta.json();
    if (id !== ultimaBusca) return;
    state.resultados = resultados;
  } catch (erro) {
    if (id !== ultimaBusca) return;
    state.erro = String(erro);
  } finally {
    if (id === ultimaBusca) {
      state.carregando = false;
      render(state);
    }
  }
}

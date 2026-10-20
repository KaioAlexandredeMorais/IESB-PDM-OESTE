export function filtrarPorCategoria(despesas, categoria) {
  if (!categoria) return despesas; // '' = sem filtro (todas)
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

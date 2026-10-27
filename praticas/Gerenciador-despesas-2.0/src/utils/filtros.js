export function filtrarPorCategoria(despesas, categoria) {
  if (!categoria) return despesas;
  return despesas.filter((despesa) => despesa.category === categoria);
}

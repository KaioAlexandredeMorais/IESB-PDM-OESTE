import { createContext, useState } from 'react';

const DESPESAS_INICIAIS = [
  {
    id: '1',
    descricao: 'Conta de luz',
    valor: 100.99,
    categoria: 'Contas',
    data: new Date(2025, 1, 11),
  },
  {
    id: '2',
    descricao: 'Conta de água',
    valor: 40.99,
    categoria: 'Contas',
    data: new Date(2025, 3, 10),
  },
];

export const DespesasContext = createContext({
  despesas: [],
  adicionarDespesa: () => {},
});

function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(despesa) {
    setDespesas((atuais) => [despesa, ...atuais]);
  }

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

export default DespesasProvider;

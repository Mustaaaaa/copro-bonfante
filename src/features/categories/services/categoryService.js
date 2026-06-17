
const mockCatalog = [
  {
    id: 'cat_edili',
    title: 'OPERE EDILI',
    subcategories: [
      {
        id: 'sub_edili_1',
        title: 'ASSISTENZE MURARIE PER IMP. IDRAULICO',
        description: 'Assistenze murarie per impianto idrico sanitario. bagni camere. Con realizzazione tracce su pavimento esistente...'
      },
      {
        id: 'sub_edili_2',
        title: 'ASSISTENZE MURARIE PER IMP. ELETTRICO',
        description: 'Assistenze murarie per impianto elettrico. Camere, bagni e corridoi. Con realizzazione tracce su pavimento esistente...'
      },
      {
        id: 'sub_edili_3',
        title: 'MASSETTO ALLEGGERITO -SOTTOFONDO',
        description: 'Fornitura e posa di massetto alleggerito con sottofondo tipo foacem o stratofond. sp. 4/5 cm.'
      },
      {
        id: 'sub_edili_4',
        title: 'MASSETTO TRADIZIONALE',
        description: 'Fornitura e posa di massetto, dopo la stesura degli impianti a pavimento (quest\'ultimi calcolati separatamente).'
      }
    ]
  },
  {
    id: 'cat_cartongessi',
    title: 'CARTONGESSI E COSTRUZIONI A SECCO',
    subcategories: [
      {
        id: 'sub_cart_1',
        title: 'PARETI DIVISORIE IN CARTONGESSO',
        description: 'Fornitura e posa di pareti divisorie in lastra singola o doppia, in gesso rivestito...'
      },
      {
        id: 'sub_cart_2',
        title: 'CONTROSOFFITTI IN FIBRA',
        description: 'Realizzazione di controsoffitti ispezionabili in fibra minerale per isolamento acustico.'
      }
    ]
  }
];

export const fetchCatalog = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCatalog), 400);
  });
};
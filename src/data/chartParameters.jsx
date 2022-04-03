const chartParameters = {
  KPICharts: [
    {
      objectId: 'tWJJyZ',
      title: 'Total Revenue',
      qPages: [
        {
          qLeft: 0,
          qTop: 0,
          qWidth: 1,
          qHeight: 1,
        },
        {
          qLeft: 1,
          qTop: 0,
          qWidth: 1,
          qHeight: 1,
        },
      ],
    },
    {
      objectId: 'eMsVVT',
      title: 'Total Expenses',
      qPages: [
        {
          qLeft: 0,
          qTop: 0,
          qWidth: 1,
          qHeight: 1,
        },
        {
          qLeft: 1,
          qTop: 0,
          qWidth: 1,
          qHeight: 1,
        },
      ],
    },
    {
      objectId: 'xWWjCN',
      title: 'Total Profit',
      qPages: [
        {
          qLeft: 0,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
        {
          qLeft: 1,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
        {
          qLeft: 2,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
        {
          qLeft: 3,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
      ],
    },
  ],
  salesRepTable: {
    objectId: 'QJCCUM',
    qPages: [
      {
        qLeft: 0,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
      {
        qLeft: 1,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
      {
        qLeft: 2,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
      {
        qLeft: 3,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
      {
        qLeft: 4,
        qTop: 0,
        qWidth: 1,
        qHeight: 101,
      },
    ],
  },
  waterfallCharts: [
    {
      objectId: 'GwVmqW',
      title: 'Breakdown of Total Sales in Year by Quarter',
      qPages: [
        {
          qLeft: 0,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
        {
          qLeft: 1,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
      ],
      fieldNames: [
        { name: 'quarter', type: 'text' },
        { name: 'revenue', type: 'number' },
      ],
      type: 'Quarterly',
      direction: 'standard',
      indexField: 0,
    },
    {
      objectId: 'hXvWVKP',
      title: 'Expenses and Revenue',
      qPages: [
        {
          qLeft: 0,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
        {
          qLeft: 1,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
        {
          qLeft: 2,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
        {
          qLeft: 3,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
        {
          qLeft: 4,
          qTop: 0,
          qWidth: 1,
          qHeight: 4,
        },
      ],
      fieldNames: [
        { name: 'Total Reveue', type: 'number' },
        { name: 'Product Costs', type: 'number' },
        { name: 'Marketing Costs', type: 'number' },
        { name: 'Sales Costs', type: 'number' },
        { name: 'Profit', type: 'number' },
      ],
      type: 'ProfitAnalysis',
      direction: 'reverse',
      indexField: false,
    },
  ],
  fields: {
    salesRep: 'SalesPerson',
  },
};

export default chartParameters;

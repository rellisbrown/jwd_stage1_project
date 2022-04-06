const useKPIChartProfitData = (chartMatrix) => {
  let chartData = [];

  if (chartMatrix[0]) {
    chartData = chartMatrix[0].map((item) => ({
      quarter: item[0].qText,
      qState: item[0].qState,
    }));

    for (let i = 0; i < chartMatrix[1].length; i += 1) {
      chartData[i].revenue = chartMatrix[1][i][0].qNum;
    }
    for (let i = 0; i < chartMatrix[2].length; i += 1) {
      chartData[i].expenses = chartMatrix[2][i][0].qNum;
    }
    for (let i = 0; i < chartData.length; i += 1) {
      chartData[i].profit = chartData[i].revenue - chartData[i].expenses;
    }
    for (let i = 0; i < chartData.length; i += 1) {
      chartData[i].changeNum = chartMatrix[3][i][0].qNum;
    }
    for (let i = 0; i < chartData.length; i += 1) {
      chartData[i].changeText = chartMatrix[3][i][0].qText;
    }
  }

  let profit = 0;

  for (let i = 0; i < chartData.length; i += 1) {
    profit += chartData[i].profit;
  }

  let changeNum = 0;
  let changeText = '';
  if (chartData[0]) {
    changeNum = chartData[0].changeNum;
    changeText = chartData[0].changeText; // the changeText here is already formatted to a 2 decimal place, % value, although this could also be acheived by: (changeNum * 100).toFixed(2)
  } // annual margin change is the same for all items in the selection
  return { profit, changeText, changeNum };
};

const useTableData = (chartMatrix) => {
  let chartData = [];

  if (chartMatrix[0]) {
    chartData = chartMatrix[0].map((item) => ({
      name: item[0].qText,
      nameQState: item[0].qState,
    }));

    for (let i = 0; i < chartMatrix[1].length; i += 1) {
      chartData[i].quarter = chartMatrix[1][i][0].qText;
      chartData[i].quarterQState = chartMatrix[1][i][0].qState;
    }
    for (let i = 0; i < chartMatrix[2].length; i += 1) {
      chartData[i].salesNum = chartMatrix[2][i][0].qNum;
    }
    for (let i = 0; i < chartMatrix[3].length; i += 1) {
      chartData[i].revenue = chartMatrix[3][i][0].qNum;
    }
    for (let i = 0; i < chartMatrix[4].length; i += 1) {
      chartData[i].grossProfit = chartMatrix[4][i][0].qNum;
    }
  }

  const helper = {};
  const chartDataSum = chartData // Getting the sum of each field value grouped by sales rep name
    .reduce((acc, object) => {
      const key = object.name;
      if (!helper[key]) {
        helper[key] = {
          name: object.name,
          salesNum: object.salesNum,
          revenue: object.revenue,
          grossProfit: object.grossProfit,
        };
        acc.push(helper[key]);
      } else {
        helper[key].salesNum += object.salesNum;
        helper[key].revenue += object.revenue;
        helper[key].grossProfit += object.grossProfit;
      }
      return acc;
    }, [])
    .filter((item) => item.name !== '-'); // need to manually include total figures below, as they are not present when a selection is made

  let totalSalesNum = 0;
  for (const item of chartDataSum) {
    totalSalesNum += item.salesNum;
  }

  let totalRevenue = 0;
  for (const item of chartDataSum) {
    totalRevenue += item.revenue;
  }
  let totalGrossProfit = 0;
  for (const item of chartDataSum) {
    totalGrossProfit += item.grossProfit;
  }

  return { chartDataSum, totalSalesNum, totalRevenue, totalGrossProfit };
};

const useWaterfallChartData = (
  chartMatrix,
  indexField,
  fieldNames,
  type,
  direction,
  totalRevenue,
  totalExpenses
) => {
  let chartData = [];

  if (indexField !== false) {
    if (chartMatrix[indexField]) {
      chartData = chartMatrix[indexField].map((item) => {
        if (fieldNames[0].type === 'text') {
          return {
            field: item[0].qText,
            qState: item[0].qState,
          };
        }
        return {
          field: item[0].qNum,
          qState: item[0].qState,
        };
      });

      for (let i = 0; i < chartMatrix[1]?.length; i += 1) {
        chartData[i].value = chartMatrix[1][i][0].qNum;
      }
    }
  } else {
    chartData = chartMatrix.map((item, index) => {
      if (fieldNames[0].type === 'text') {
        return {
          field: fieldNames[index].name,
          value: item[0][0].qText,
          qState: item[0][0].qState,
        };
      }
      return {
        field: fieldNames[index].name,
        value: item[0][0].qNum,
        qState: item[0][0].qState,
      };
    });
  }

  /* let totalValue = 0;
  if (type !== 'ProfitAnalysis') {
    for (const item of chartData) {
      totalValue += item.value;
    }

    chartData.push({ field: 'Total', value: totalValue });
  } else {
    for (let i = 1; i < chartData.length; i += 1) {
      totalValue += chartData[i].value;
    }
    chartData[0] = {
      field: 'Total Revenue',
      value: totalValue,
    };
  } */ // code used prior to the adjustment incorporating revenue/expenses from Task 1.3 table

  let totalValue = 0;
  if (type !== 'ProfitAnalysis') {
    for (const item of chartData) {
      totalValue += item.value;
    }

    chartData.push({ field: 'Total', value: totalValue });
  } else {
    totalValue = totalRevenue;
    chartData[0] = {
      field: 'Total Revenue',
      value: totalRevenue,
    };
    let sumExistingCosts = 0;
    for (let i = 1; i < chartData.length - 1; i += 1) {
      sumExistingCosts += chartData[i].value;
    }
    chartData[chartData.length - 1] = {
      field: 'Misc Costs',
      value: totalExpenses - sumExistingCosts,
    };
    chartData[chartData.length] = {
      field: 'Profit',
      value: totalRevenue - totalExpenses,
    };
  } // adjusting figures based on values from Task 1.3 chart

  const chartDataCumulative = [];
  let accumulator = 0;
  if (direction !== 'reverse') {
    for (let i = 0; i < chartData.length - 1; i += 1) {
      accumulator += chartData[i].value;
      chartDataCumulative[i] = {
        field: chartData[i].field,
        value: chartData[i].value,
        accValue: accumulator,
      };
    }
  } else {
    for (let i = chartData.length - 1; i > 0; i += -1) {
      accumulator += chartData[i].value;
      chartDataCumulative[i - 1] = {
        field: chartData[i].field,
        value: chartData[i].value,
        accValue: accumulator,
      };
    }
  }
  return { chartData, totalValue, chartDataCumulative };
};
// eslint-disable-next-line
export { useKPIChartProfitData, useTableData, useWaterfallChartData };

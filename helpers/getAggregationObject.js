const getAggregationObject = operation => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const filterByMonthes = {};
  const addTotalSum = {};
  const monthes = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  for (let i = 0; i < 6; i++) {
    const startMonth = currentMonth;
    let startYear = currentYear;
    let endMonth;
    let endYear;
    if (currentMonth + 1 > 11) {
      endMonth = 0;
      endYear = currentYear + 1;
    } else {
      endMonth = currentMonth + 1;
      endYear = currentYear;
    }

    let start = startMonth - i;
    let end = endMonth - i;
    if (start < 0) {
      start += 12;
      startYear = currentYear - 1;
    }
    if (end < 0) {
      end += 12;
      endYear = currentYear - 1;
    }

    filterByMonthes[monthes[start]] = {
      transactions: {
        $filter: {
          input: '$userTransactions',
          as: 'transaction',
          cond: {
            $and: [
              {
                $gte: ['$$transaction.date', new Date(startYear, start)],
              },
              {
                $lt: ['$$transaction.date', new Date(endYear, end)],
              },
              {
                $eq: ['$$transaction.operation', operation],
              },
            ],
          },
        },
      },
    };
    addTotalSum[monthes[start]] = {
      total: {
        $reduce: {
          input: `$${monthes[start]}.transactions`,
          initialValue: 0,
          in: {
            $add: ['$$value', '$$this.sum'],
          },
        },
      },
    };
  }

  return { filterByMonthes, addTotalSum };
};
module.exports = {
  getAggregationObject,
};

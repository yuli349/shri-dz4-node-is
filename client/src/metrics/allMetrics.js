function quantile(arr, q) {
  const sorted = arr.sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
  } else {
    return Math.floor(sorted[base]);
  }
}

function renderingPercentile(sampleData, string) {
  return (
    string +
    `p25=${quantile(sampleData, 0.25)} p50=${quantile(sampleData, 0.5)} ` +
    `p75=${quantile(sampleData, 0.75)} p95=${quantile(sampleData, 0.95)} ` +
    `hits=${sampleData.length}`
  );
}

function calcMetricByDate(data, page, name, date) {
  let sampleData = data
    .filter(
      (item) => item.page === page && item.name === name && item.date === date
    )
    .map((item) => item.value);

  console.log(renderingPercentile(sampleData, `${date} ${name}: `));
}

// сравнить метрику в разных срезах
function compareMetric(data) {
  const slice = {};
  const additional = Object.keys(data.pop().additional);

  additional.forEach((item) => (slice[item] = {}));

  data.forEach((element) => {
    additional.forEach((item) => {
      let obj = {};
      const name = element.additional[item]
        ? element.additional[item]
        : 'Не известно';

      obj[element.name] = [element.value];

      return slice[item][name]
        ? slice[item][name][element.name]
          ? slice[item][name][element.name].push(element.value)
          : (slice[item][name][element.name] = [element.value])
        : (slice[item][name] = obj);
    });
  });
  console.log(slice);

  additional.forEach((addit) => {
    Object.keys(slice[addit]).forEach((element) => {
      Object.keys(slice[addit][element]).forEach((name) => {
        const sampleData = slice[addit][element][name];
        if (name !== 'CLS' && name !== 'connect' && name !== 'TBT' && name !== 'LCP') {
          console.log(
            renderingPercentile(
              sampleData,
              `{${addit}: "${element}"}, метрика "${name}": `
            )
          );
        }
      });
      console.log('_______________________');
    });
  });
}

function prepareData(result) {
  return result.data.map((item) => {
    item.date = item.timestamp.split('T')[0];
    return item;
  });
}

// показать значение метрики за несколько дней
function showMetricByPeriod(data, days, metrics) {
  console.log(
    data.filter((item) => {
      return (
        item.name === metrics &&
        days.indexOf(item.timestamp.split('T')[0]) !== -1
      );
    })
  );
}

fetch(
  'https://shri.yandex/hw/stat/data?counterId=0299cd28-bb32-45cd-a4eb-9470f93400d2'
)
  .then((res) => res.json())
  .then((result) => {
    let data = prepareData(result);

    console.log('_______________________');
    console.log(
      'Метрика "FID", "TTFB", "FCP", "TTI" за 2021-07-13 для всех ручек'
    );

    calcMetricByDate(data, '/', 'TTFB', '2021-07-13');
    calcMetricByDate(data, '/', 'FCP', '2021-07-13');
    calcMetricByDate(data, '/', 'FID', '2021-07-13');
    calcMetricByDate(data, '/', 'TTI', '2021-07-13');

    console.log('_______________________');
    console.log(
      'Все значения метрики "FID" за несколько дней ["2021-07-12", "2021-07-13"]'
    );

    showMetricByPeriod(data, ['2021-07-12', '2021-07-13'], 'FID');

    console.log('_______________________');

    console.log(
      'Сравнение всех метрик во всех срезах: '
    );
    console.log('_______________________');
    compareMetric(data);
  });

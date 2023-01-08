function getValuesByMeasurement(measurement, timeInterval) {
	const tableBody = document.getElementById("tableBody");
	tableBody.innerHTML = "";
	loading.style.display = "block";

	if(timeInterval == 'now') {
    return latestDataOfSingleType(measurement)
    .then(results => {
			if(results.length < 20) {
				return latestDataOfSingleTypeByInterval(measurement)
				.then(results => showTable(results, measurement))
			} else {
				const first25Resuts = results.filter((result, index) => index < 25)
				return showTable(first25Resuts, measurement)
			}
		})
	} else {
	  return latestDataOfSingleTypeByInterval(measurement, timeInterval)
    .then(results => showTable(results, measurement))
	}
}

function latestDataOfSingleTypeByInterval(measurementType, timeInterval) {
	return fetch(
		`http://webapi19sa-1.course.tamk.cloud/v1/weather/${measurementType}/${
			timeInterval ? timeInterval : ""
		}`
	)
		.then((res) => res.json())
		.then((results) => results);
}

function latestDataOfSingleType(measurementType) {
	return fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather")
		.then((res) => res.json())
		.then((results) => {
			const data = results.filter((result) => {
				return result.data[measurementType];
			});
			// console.log(data);
			const reversedData = []
			for(i = data.length - 1; i >= 0; i--) {
				reversedData.push(data[i])
			}
			return reversedData;
		});
}

function showTable(results, measurement) {
  const times = [];
	const values = [];
	let totalValue = 0;
  
  // console.log(results);
  results.forEach((result, index) => {
    const dateTime = new Date(result.date_time);
    const time = dateTime.toTimeString().split(" ")[0];
    times.push(time);
    const measurementValue = result[measurement] || result.data[measurement]
		// console.log(parseFloat(measurementValue))
    values.push(parseFloat(measurementValue));
    totalValue += parseFloat(measurementValue);
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td data-sort=${index + 1}>${index + 1}</td>
      <td data-sort=${dateTime.getTime()}>${dateTime.toLocaleDateString()}</td>
      <td data-sort=${dateTime.getTime()}>${time}</td>
      <td data-sort=${measurementValue}>${measurementValue}</td>
    `;
  });
  loading.style.display = "none";
  return { times, values, totalValue };
}

function showTableAndChart(chartType, measurementType, timeInterval) {
	// console.log({ chartType, measurementType, timeInterval });
	const showAverage = document.querySelector("#average #value");
	getValuesByMeasurement(measurementType, timeInterval).then((chartObj) => {
		const { times, values, totalValue } = chartObj;
		const option = {
			// title: {
			//     text: `${measurementType} Chart`
			// },
			tooltip: {},
			legend: {
				data: [`${measurementType}`],
			},
			xAxis: {
				type: "category",
				data: times,
				axisLabel: {
					rotate: 70,
				},
			},
			yAxis: {
				type: "value",
			},
			series: [
				{
					name: `${measurementType}`,
					type: chartType,
					data: values,
				},
			],
		};
		myChart.setOption(option);
		if (showAverage) {
			console.log({times, values, totalValue})
			const avereage = totalValue / values.length;
			showAverage.innerText = avereage.toFixed(2);
		}
	});
}

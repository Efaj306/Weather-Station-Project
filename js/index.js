const tiers = document.querySelectorAll(".tier");
let i;
for(i = 0; i < tiers.length; i++) {
  const tier = tiers[i];
  tier.addEventListener('click', function(e) {
    // console.log(e.target.dataset.tier);
    let j;
    for(j = 0; j < tiers.length; j++) {
      tiers[j].classList.remove("active")
    }
    e.target.classList.add("active");
  })
}


function getLatestMeasurements() {
  const tableBody = document.getElementById("tableBody");
  const loading = document.getElementById("loading");
  fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather")
  .then(res => res.json())
  .then(results => {
    const filterd = results.filter((result, index) => index < 50)
    filterd.forEach((result, index) => {
      const {date_time, data} = result;
      const dateTime = new Date(date_time);
      const time = dateTime.toTimeString().split(" ")[0];
      const measurementType = Object.keys(data)[0];
      const measurementValue = data[measurementType];
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td data-sort=${index+1}>${index + 1}</td>
        <td data-sort=${dateTime.getTime()}>${dateTime.toLocaleDateString()}</td>
        <td data-sort=${dateTime.getTime()}>${time}</td>
        <td data-sort=${measurementType}>${measurementType}</td>
        <td data-sort=${measurementValue}>${measurementValue}</td>
      `;
    })

    loading.style.display = 'none'
  })
}

function searchData(tdIndex1, tdIndex2) {
  const input = document.getElementById("search");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("dataTable");
  const tr = table.getElementsByTagName("tr");
  let typeTD, valueTD, i, txtValue;
  for (i = 0; i < tr.length; i++) {
    typeTD = tr[i].getElementsByTagName("td")[tdIndex1];
    valueTD = tr[i].getElementsByTagName("td")[tdIndex2];
    if (typeTD || valueTD) {
      const typeTdValue = typeTD? typeTD.textContent : '';
      const valueTdValue = valueTD? valueTD.textContent : '';
      txtValue = typeTdValue + valueTdValue;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
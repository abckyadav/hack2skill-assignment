document.querySelector(".fetchButton").addEventListener("click", () => {
  console.log("click:");
  fetch("https://hack2skill-assignment-1.onrender.com/get/fetchdata")
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.querySelector(".fetchData");
      tbody.innerHTML = "";

      data.forEach((row, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i+1}</td>
            <td>${row.team_name}</td>
            <td>${row.full_name}</td>
            <td>${row.email}</td>
            <td>${row.number}</td>
            <td>${row.city}</td>
            <td>${row.url}</td>
          `;
        tbody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

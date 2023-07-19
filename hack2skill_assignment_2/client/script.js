const videoDisplayContainer = document.querySelector(".videoDisplayContainer");
const searchInput = document.querySelector(".searchInput");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const errorDiv = document.querySelector(".errorDiv");
const paginationContainer = document.querySelector(".paginationContainer");

let currentPage = 1;
let contentPerPage = 20;

async function getVideos(page, perPage) {
  try {
    const getData = await fetch(
      `https://hack2skill-assignment-2.onrender.com/videos?page=${page}&perPage=${perPage}`
    );
    const data = await getData.json();
    const videos = data.videos;

    videoDisplayContainer.innerHTML = "";

    videos.forEach((item) => {
      const videoDiv = document.createElement("div");
      videoDiv.classList.add("videoDiv");
      videoDiv.innerHTML = `
        <img src="${item.thumbnail}" alt="${item.title}">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      `;
      videoDisplayContainer.appendChild(videoDiv);
    });
    if (videos.length === 0) {
      paginationContainer.innerHTML = "";
    }
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === data.totalPages;
  } catch (error) {
    console.error("error:", error);
  }
}

async function searchVideos() {
  const searchQuery = searchInput.value.trim();

  if (searchQuery === "") {
    currentPage = 1;
    getVideos(currentPage, contentPerPage);
    return;
  }

  try {
    const getData = await fetch(
      `https://hack2skill-assignment-2.onrender.com/search?query=${encodeURIComponent(
        searchQuery
      )}`
    );
    const data = await getData.json();
    const videos = data.videos;

    videoDisplayContainer.innerHTML = "";
    errorDiv.innerHTML = `Videos not found for ${searchQuery}`;

    videos &&
      videos.forEach((video) => {
        const videoDiv = document.createElement("div");
        videoDiv.classList.add("videoDiv");
        videoDiv.innerHTML = `
          <img src="${video.thumbnail}" alt="${video.title}">
          <h2>${video.title}</h2>
          <p>${video.description}</p>
        `;
        videoDisplayContainer.appendChild(videoDiv);
      });

    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } catch (error) {
    console.error("error:", error);
  }
}

function changePage(step) {
  currentPage += step;
  getVideos(currentPage, contentPerPage);
}

getVideos(currentPage, contentPerPage);

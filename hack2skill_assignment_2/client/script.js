const videoDisplayContainer = document.querySelector(".videoDisplayContainer");
const searchInput = document.querySelector(".searchInput");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");

let page = 1;
const contentPerPage = 20;

async function getVideos(page, perPage) {
  try {
    const response = await fetch(
      `https://hack2skill-task2-production.up.railway.app/api/videos?page=${page}&perPage=${perPage}`
    );
    const data = await response.json();
    const videos = data.videos;

    videoDisplayContainer.innerHTML = "";

    videos.forEach((item) => {
      const videoDiv = document.createElement("div");
      videoDiv.classList.add("videoDiv");
      videoDiv.innerHTML = `
        <img src="${item.thumbnails.default.url}" alt="${item.title}">
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      `;
      videoDisplayContainer.appendChild(videoDiv);
    });

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === data.totalPages;
  } catch (error) {
    console.log("error:", error.message);
  }
}

async function searchVideos() {
  const searchQuery = searchInput.value.trim();

  if (searchQuery === "") {
    page = 1;
    getVideos(page, contentPerPage);
    return;
  }

  try {
    const getData = await fetch(
      `https://hack2skill-task2-production.up.railway.app/api/search?query=${encodeURIComponent(
        searchQuery
      )}`
    );
    const data = await getData.json();

    const videos = data.videos;

    videoDisplayContainer.innerHTML = "";

    // Display video data
    videos.forEach((video) => {
      const videoDiv = document.createElement("div");
      videoDiv.classList.add("videoDiv");
      videoDiv.innerHTML = `
          <img src="${video.thumbnails.default.url}" alt="${video.title}">
          <h2>${video.title}</h2>
          <p>${video.description}</p>
        `;
      videoDisplayContainer.appendChild(videoDiv);
    });

    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } catch (error) {
    console.log("error:", error.message);
  }
}

function changePage(step) {
  page += step;
  getVideos(page, contentPerPage);
}

getVideos(page, contentPerPage);

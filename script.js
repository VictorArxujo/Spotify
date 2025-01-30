const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");
const artistContainer = document.querySelector(".grid-container");

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Filtra os artistas que começam com a letra digitada
      const filteredArtists = data.filter((artist) =>
        artist.name.toLowerCase().startsWith(searchTerm)
      );
      displayResults(filteredArtists);
    });
}

function displayResults(result) {
  artistContainer.innerHTML = ""; // Limpa os resultados anteriores

  if (result.length === 0) {
    artistContainer.innerHTML = "<p>Nenhum artista encontrado.</p>";
    return;
  }

  result.forEach((element) => {
    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");

    artistCard.innerHTML = `
      <div class="card-img">
        <img src="${element.urlImg}" class="artist-img" />
        <div class="play">
          <span class="fa fa-solid fa-play"></span>
        </div>
      </div>
      <div class="card-text">
        <span class="artist-name">${element.name}</span>
        <span class="artist-categorie">${element.genre}</span>
      </div>
    `;

    artistContainer.appendChild(artistCard);
  });

  resultPlaylist.classList.add("hidden"); // Esconde playlists
  resultArtist.classList.remove("hidden"); // Mostra artistas filtrados
}

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === "") {
    resultPlaylist.classList.remove("hidden"); // Mostra playlists
    resultArtist.classList.add("hidden"); // Esconde artistas
    return;
  }

  requestApi(searchTerm);
});

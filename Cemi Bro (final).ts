<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cemi Bro Music App</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>Cemi Bro Music App</h1>
    <div class="search-bar">
      <input type="text" id="search-bar" placeholder="Search for songs..." />
    </div>
  </header>
  <main>
    <section id="playlists">
      <h2>Playlists</h2>
      <div id="playlist-container"></div>
    </section>
    <section id="music-player">
      <h2>Now Playing</h2>
      <p id="now-playing-title">No song selected</p>
      <audio id="audio-player" controls></audio>
    </section>
  </main>
  <script src="script.js"></script>
</body>
</html>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.playlist {
  margin: 20px 0;
}

.playlist h3 {
  color: #555;
}

.song {
  background-color: #fff;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.song:hover {
  background-color: #e0e0e0;
}
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');
  const playlistContainer = document.getElementById('playlist-container');
  const nowPlayingTitle = document.getElementById('now-playing-title');
  const audioPlayer = document.getElementById('audio-player');

  let playlists = [];

  // Fetch playlists from JSON file
  fetch('playlists.json')
    .then(response => response.json())
    .then(data => {
      playlists = data.playlists;
      displayPlaylists(playlists);
    });

  // Display playlists
  function displayPlaylists(playlists) {
    playlistContainer.innerHTML = '';
    playlists.forEach(playlist => {
      const playlistDiv = document.createElement('div');
      playlistDiv.classList.add('playlist');
      playlistDiv.innerHTML = `<h3>${playlist.name}</h3>`;

      playlist.songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song');
        songDiv.innerText = `${song.title} - ${song.artist}`;
        songDiv.addEventListener('click', () => playSong(song));
        playlistDiv.appendChild(songDiv);
      });

      playlistContainer.appendChild(playlistDiv);
    });
  }

  // Play selected song
  function playSong(song) {
    audioPlayer.src = song.file;
    audioPlayer.play();
    nowPlayingTitle.innerText = `${song.title} - ${song.artist}`;
  }

  // Search functionality
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredPlaylists = playlists.map(playlist => {
      return {
        name: playlist.name,
        songs: playlist.songs.filter(song =>
          song.title.toLowerCase().includes(query)
        )
      };
    }).filter(playlist => playlist.songs.length > 0);

    displayPlaylists(filteredPlaylists);
  });
});
{
  "playlists": [
    {
      "name": "Chill Vibes",
      "songs": [
        {
          "title": "Song A",
          "artist": "Artist 1",
          "file": "songs/songA.mp3"
        },
        {
          "title": "Song B",
          "artist": "Artist 2",
          "file": "songs/songB.mp3"
        }
      ]
    },
    {
      "name": "Workout Mix",
      "songs": [
        {
          "title": "Song C",
          "artist": "Artist 3",
          "file": "songs/songC.mp3"
        },
        {
          "title": "Song D",
          "artist": "Artist 4",
          "file": "songs/songD.mp3"
        }
      ]
    }
  ]
}


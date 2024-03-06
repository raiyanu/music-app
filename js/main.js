songs.sort((a, b) => b.stars - a.stars);

// enables to show and minimize the player tab
let playerVisible = true;

function show(opt) {
  if (!opt == 1 || playerVisible) {
    document.getElementById("player").classList.toggle("minimized");
    playerVisible = !playerVisible;
  }
}
// loads the best song on the best song div
function showTop() {
  let topSong = {
    stars: 0,
  };
  songs.forEach((song) => {
    if (song.stars >= topSong.stars) {
      topSong = song;
    }
  });
  function handleClickTop() {
    playit(topSong.id);
  }
  let topBox = document.getElementById("top");
  topBox.onclick = handleClickTop;
  let topBoxImg = document.getElementById("top-song-img");
  topBoxImg.src = topSong.thumbnail;
  let topBoxname = document.getElementById("top-song-name");
  topBoxname.innerHTML =
    topSong.name.length <= 16
      ? topSong.name
      : topSong.name.substring(0, 16) + "...";
  let topBoxAuthor = document.getElementById("top-song-author");
  topBoxAuthor.innerHTML = topSong.author;
}
showTop();

// show todays hot
function showTodayHot() {
  let ulElement = document.getElementById("todayBest");
  for (let i = 0; i < 5; i++) {
    const element = songs[i];
    const liElement = document.createElement("li");
    liElement.classList.add(
      "top-item",
      "flex",
      "items-center",
      "gap-3",
      "p-2",
      "border-2",
      "border-black",
      "rounded-2xl",
      "flex-col",
      "w-[9rem]",
      "cursor-pointer",
      "text-black",
      "flex-shrink-0"
    );

    // Create and set the <img> element
    const imgElement = document.createElement("img");
    imgElement.src = element.thumbnail;
    imgElement.alt = "Best song img";
    imgElement.classList.add(
      "rounded-2xl",
      "h-[5rem]",
      "w-[6rem]",
      "bg-slate-500",
      "overflow-hidden"
    );

    // Create and set the <span> element
    const spanElement = document.createElement("span");

    // Create and set the <p> elements inside the <span> element
    const pTitleElement = document.createElement("p");
    pTitleElement.textContent =
      element.name.length <= 18
        ? element.name
        : element.name.substring(0, 10) + "...";
    pTitleElement.classList.add("text-lg", "font-bold");

    const pAuthorElement = document.createElement("p");
    pAuthorElement.textContent =
      element.author.length <= 25
        ? element.author
        : element.author.substring(0, 10) + "...";
    pAuthorElement.classList.add("text-base", "text-gray-600");

    // Append the <p> elements to the <span> element
    spanElement.appendChild(pTitleElement);
    spanElement.appendChild(pAuthorElement);

    // Append the <img> and <span> elements to the <li> element
    liElement.appendChild(imgElement);
    liElement.appendChild(spanElement);
    function handleClickToday() {
      playit(element.id);
    }
    liElement.onclick = handleClickToday;
    ulElement.appendChild(liElement);
  }
}
showTodayHot();

// show full list
function showWhole() {
  let ulElement = document.getElementById("whole");
  for (let i = 0; i < songs.length; i++) {
    const element = songs[i];
    const liElement = document.createElement("li");
    liElement.classList.add(
      "top-item",
      "flex",
      "items-start",
      "gap-3",
      "border-black",
      "border-2",
      "p-2",
      "bg-slate-300",
      "rounded-lg",
      "cursor-pointer",
      "w-full"
    );

    // Create and set the <img> element
    const imgElement = document.createElement("img");
    imgElement.src = element.thumbnail;
    imgElement.alt = "Best song img";
    imgElement.classList.add("rounded", "rounded-3", "h-[3rem]", "w-[3rem]");

    // Create and set the <span> element
    const spanElement = document.createElement("span");

    // Create and set the <p> elements inside the <span> element
    const pTitleElement = document.createElement("p");
    pTitleElement.textContent =
      element.name.length <= 30
        ? element.name
        : element.name.substring(0, 30) + "...";
    pTitleElement.classList.add("text-lg", "font-bold");

    const pAuthorElement = document.createElement("p");
    pAuthorElement.textContent =
      "By " + element.author.length <= 30
        ? element.author
        : element.author.substring(0, 30) + "...";
    pTitleElement.classList.add("text-lg", "font-bold");
    pAuthorElement.classList.add("text-base", "text-gray-600");

    // Append the <p> elements to the <span> element
    spanElement.appendChild(pTitleElement);
    spanElement.appendChild(pAuthorElement);

    // Append the <img> and <span> elements to the <li> element
    liElement.appendChild(imgElement);
    liElement.appendChild(spanElement);
    function handleClickToday() {
      playit(element.id);
    }
    liElement.onclick = handleClickToday;
    ulElement.appendChild(liElement);
  }
}
showWhole();

// controls on song playing
let thisSong = document.getElementById("mySong");
thisSong.onended = () => {
  songSwitch(1);
};
let currentSong = {
  id: 6,
  playing: false,
};
let seekbar = document.getElementById("song-time-range");
let currentTime = document.getElementById("current");
let songTotal = document.getElementById("song-total");

// Update the seekbar value as the audio plays
thisSong.addEventListener("timeupdate", function () {
  songTotal.innerText = formatTime(thisSong.duration);
  currentTime.innerText = formatTime(thisSong.currentTime);
  seekbar.value = thisSong.currentTime;
});

// Update the thisSong playback position when the seekbar is changed
seekbar.addEventListener("input", function () {
  thisSong.currentTime = seekbar.value;
});

// Set the maximum value of the seekbar to the thisSong duration when metadata is loaded
thisSong.addEventListener("loadedmetadata", function () {
  seekbar.max = thisSong.duration;
});

// Function to format time from seconds to minutes and seconds
function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

playit(currentSong.id);
function playit(id) {
  console.log(` song with id: ${id} will be played`);
  let index = songs.findIndex(function (song) {
    return song.id === id;
  });
  thisSong.src = songs[index].path;
  document.getElementById("song-name").innerText =
    songs[index].name.length <= 15
      ? songs[index].name
      : songs[index].name.substring(0, 10) + "...";
  document.getElementById("song-author").innerText =
    songs[index].author.length <= 30
      ? songs[index].author
      : songs[index].author.substring(0, 30) + "...";
  document.getElementById(
    "playing-icon"
  ).src = `/assets/songs/thumbnails/${songs[index].name.replace(
    /\.mp3$/,
    ".png"
  )}`;
  document.getElementById("pauseicon").classList.remove("hidden");
  document.getElementById("playicon").classList.add("hidden");
  currentSong.id = id;
  thisSong.play();
  if (!currentSong.playing) {
    currentSong.playing = true;
  }
}
function playSong() {
  document.getElementById("pauseicon").classList.toggle("hidden");
  document.getElementById("playicon").classList.toggle("hidden");
  // if not playing then play
  if (!currentSong.playing) {
    thisSong.play();
  } else {
    //  to pause
    thisSong.pause();
  }
  currentSong.playing = !currentSong.playing;
}

function songSwitch(opt) {
  if (opt == 1) {
    //  forward option
    if (currentSong.id <= songs.length - 1) {
      currentSong.id = currentSong.id + 1;
      playit(currentSong.id);
    }
  } else {
    if (currentSong.id > 1) {
      currentSong.id = currentSong.id - 1;
      playit(currentSong.id);
    }
  }
}

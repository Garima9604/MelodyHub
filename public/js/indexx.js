// Select all the elements in the HTML page and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Define the list of tracks that have to be played
let track_list = [
  {
    name: "Still With You",
    artist: "Jeon Jungkook",
    image: "Image URL",
    path: "/songs/2.mp3",
  },
  {
    name: "AAj Phir Jeene Ki ",
    artist: "Lata Mangeshkar",
    image: "/image/1.jpg",
    path: "/songs/1.mp3",
  },
];

function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
  resetValues();

  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  // Update details of the track
  track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent =
    "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 1000);

  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
}

// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function playpauseTrack() {
  // Switch between playing and pausing
  // depending on the current state
  // console.log("PLayPause is called");
  if (curr_track.paused) {
    curr_track.play();
    isPlaying = true; // Update the isPlaying flag
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'; // Change icon to pause
  } else {
    curr_track.pause();
    isPlaying = false; // Update the isPlaying flag
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'; // Change icon to play
  }
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  // console.log("nextTrack() is called");
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;

  // Load and play the new track
  loadTrack(track_index);
  // playTrack();
  playpauseTrack();
  // If the player was playing, play the new track
  // curr_track.play();
  // if (isPlaying) {
  // }
}

function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  // console.log("prevTrack() is called");
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length - 1;

  // Load and play the new track
  loadTrack(track_index);
  playpauseTrack();
}

function seekTo() {
  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  seekto = curr_track.duration * (seek_slider.value / 100);

  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}

function setVolume() {
  // Set the volume according to the
  // percentage of the volume slider set
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Load the first track in the tracklist
loadTrack(track_index);

// NEW PLAYLIST FORM

function removeBlock() {
  const new_playlist = document.querySelector(".new-playlist");
  // console.log("new playlist is removed");
  new_playlist.style.display = "none";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "1";
  });
}

function openBlock() {
  const new_playlist = document.querySelector(".new-playlist");
  // console.log("new playlist is opened");
  new_playlist.style.display = "block";
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "0.5";
  });
  new_playlist.style.opacity = "1";
}

function addItem(value) {
  const sidebar = document.querySelector(".sidebar");

  // Create the main container div with class 'box'
  const boxDiv = document.createElement("div");
  boxDiv.classList.add("box");

  // Create the <i> element
  const icon = document.createElement("i");

  // Add classes to the <i> element
  icon.classList.add("fa-solid", "fa-music");

  // Optionally, if you want to use Font Awesome icons with the 'fa' class:
  icon.classList.add("fa");

  boxDiv.appendChild(icon);

  // Create the figcaption element and set its text content
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = `${value}`;

  // Append the image and figcaption elements to the boxDiv
  // boxDiv.appendChild(img);
  boxDiv.appendChild(figcaption);

  // Append the boxDiv to the desired parent element in the DOM
  // For example, if you want to append it to the body:
  sidebar.appendChild(boxDiv);
}


//QUEUELIST

function showQueueList(){
  const songList = document.querySelector('.songLists');
  // console.log("show queue in js file");
  songList.style.display = 'block';
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line) => {
    line.style.opacity = "0.5";
  });
  songList.style.opacity = "1";
}


function removeQueueList(){
  const songList = document.querySelector('.songLists');
  // console.log("Remove Queue from js file ");
  songList.style.display = 'none';
  const lines = document.querySelectorAll(".lines");
  lines.forEach((line)=>{
    line.style.opacity="1"
  });
}
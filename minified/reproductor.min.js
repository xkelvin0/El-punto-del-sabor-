// ============================================
// REPRODUCTOR DE MÚSICA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log("🎵 Script del reproductor cargado correctamente");

  // 🎧 Elementos del reproductor
  const audioPlayer = document.getElementById('bgMusic');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const muteBtn = document.getElementById('muteBtn');
  const volumeSlider = document.getElementById('volumeSlider');
  const trackTime = document.querySelector('.track-time');
  const trackTitle = document.querySelector('.track-title');
  const trackSelector = document.getElementById('trackSelector');
  const progressBar = document.querySelector('.progress-bar');

  // 🔉 Iconos
  const playIcon = '<i class="fas fa-play"></i>';
  const pauseIcon = '<i class="fas fa-pause"></i>';
  const volumeUpIcon = '<i class="fas fa-volume-up"></i>';
  const volumeMuteIcon = '<i class="fas fa-volume-mute"></i>';

  // 🎵 Lista de reproducción
  const playlist = [
    { title: 'Música China 1', src: 'audio/china-chinese-asian-music-346568.mp3' },
    { title: 'Música China 2', src: 'audio/asian-china-chinese-music-347990.mp3' },
    { title: 'Música China 3', src: 'audio/china-green-tea-380502.mp3' },
    { title: 'Música China 4', src: 'audio/china-china-chinese-asian-music-277936.mp3' }
  ];

  // 📊 Variables de estado
  let isPlaying = false;
  let currentTrackIndex = 0;
  let isDragging = false;

  // 🔄 Cargar una canción
  function loadTrack(index) {
    // Asegurarse de que el índice esté dentro de los límites
    if (index < 0) {
      currentTrackIndex = playlist.length - 1;
    } else if (index >= playlist.length) {
      currentTrackIndex = 0;
    } else {
      currentTrackIndex = index;
    }

    const track = playlist[currentTrackIndex];
    audioPlayer.src = track.src;
    trackTitle.textContent = track.title;

    // Actualizar el selector de pista
    if (trackSelector) {
      trackSelector.value = currentTrackIndex;
    }

    // Reproducir automáticamente
    if (isPlaying) {
      playTrack();
    }
  }

  // ▶️ Reproducir canción
  function playTrack() {
    audioPlayer.play().then(() => {
      isPlaying = true;
      playPauseBtn.innerHTML = pauseIcon;
    }).catch(err => {
      console.warn("No se pudo reproducir automáticamente:", err);
      isPlaying = false;
      playPauseBtn.innerHTML = playIcon;
    });
  }

  // ⏸️ Pausar canción
  function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = playIcon;
  }

  // ⏯️ Alternar reproducción
  function togglePlayPause() {
    if (!audioPlayer || !playPauseBtn) return;

    if (audioPlayer.paused) {
      // Si no hay fuente de audio, cargar la primera canción
      if (!audioPlayer.src) {
        loadTrack(0);
      }

      audioPlayer.play()
        .then(() => {
          isPlaying = true;
          playPauseBtn.innerHTML = pauseIcon;
        })
        .catch(e => {
          console.error('Error al reproducir:', e);
          // Si hay un error, intentar cargar la primera canción
          if (!audioPlayer.src) {
            loadTrack(0);
            audioPlayer.play().catch(console.error);
          }
        });
    } else {
      pauseTrack();
    }
  }

  // 🕒 Formatear tiempo (mm:ss)
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // ⏱️ Actualizar tiempo de reproducción
  function updateTime() {
    if (audioPlayer.readyState > 0 && trackTime) {
      trackTime.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
    }
  }

  // Configurar eventos
  playPauseBtn?.addEventListener('click', togglePlayPause);
  prevTrackBtn?.addEventListener('click', () => loadTrack(currentTrackIndex - 1));
  nextTrackBtn?.addEventListener('click', () => loadTrack(currentTrackIndex + 1));

  // 🔊 Volumen
  volumeSlider?.addEventListener('input', (e) => {
    const vol = e.target.value;
    audioPlayer.volume = vol;
    muteBtn.innerHTML = vol == 0 ? volumeMuteIcon : volumeUpIcon;
  });

  // 🤫 Silencio
  muteBtn?.addEventListener('click', () => {
    audioPlayer.muted = !audioPlayer.muted;
    muteBtn.innerHTML = audioPlayer.muted ? volumeMuteIcon : volumeUpIcon;
  });

  // Actualizar el tiempo de la canción
  audioPlayer?.addEventListener('timeupdate', updateTime);

  // Pasar a la siguiente canción cuando termine la actual
  audioPlayer?.addEventListener('ended', () => loadTrack(currentTrackIndex + 1));

  // Actualizar el selector de pista
  trackSelector?.addEventListener('change', (e) => {
    loadTrack(parseInt(e.target.value));
  });

  // Inicializar el reproductor
  audioPlayer.volume = 0.5; // Volumen inicial al 50%
  loadTrack(0); // Cargar la primera canción

  console.log("✅ Reproductor inicializado correctamente");
});

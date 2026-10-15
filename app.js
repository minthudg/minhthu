(() => {
  const player = document.getElementById('spotify-player');
  const toast = document.getElementById('toast');
  document.querySelectorAll('a[href="#music"]').forEach(link => {
    link.addEventListener('click', () => {
      if (player) player.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
  // Spotify controls live inside Spotify's official iframe; playback is intentionally
  // handled by Spotify rather than by a separate HTML audio element.
  if (player && toast) {
    player.addEventListener('load', () => {
      toast.textContent = 'Trình phát Spotify đã được tải.';
      toast.classList.add('show');
      window.setTimeout(() => toast.classList.remove('show'), 1800);
    });
  }
})();

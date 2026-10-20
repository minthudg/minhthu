(() => {
  const player = document.getElementById('spotify-player');
  const toast = document.getElementById('toast');
  const cards = [...document.querySelectorAll('.playlist-card')];
  const openLink = document.getElementById('spotify-open');
  const fallbackLink = document.getElementById('spotify-fallback-link');
  const currentTitle = document.getElementById('current-playlist-title');
  const playlistUrl = id => `https://open.spotify.com/playlist/${id}`;
  const embedUrl = id => `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`;

  document.querySelectorAll('a[href="#music"]').forEach(link => {
    link.addEventListener('click', () => {
      if (player) window.setTimeout(() => player.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
    });
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.playlistId;
      const title = card.dataset.title || 'Playlist';
      if (!id || !player) return;
      cards.forEach(item => {
        const selected = item === card;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      player.src = embedUrl(id);
      if (openLink) openLink.href = playlistUrl(id);
      if (fallbackLink) fallbackLink.href = playlistUrl(id);
      if (currentTitle) currentTitle.textContent = 'Đang chọn: ' + title;
      if (toast) {
        toast.textContent = 'Đã chuyển sang ' + title + '.';
        toast.classList.add('show');
        window.setTimeout(() => toast.classList.remove('show'), 1800);
      }
    });
  });

  // Playback is handled by Spotify's official embedded player.
  if (player && toast) {
    player.addEventListener('load', () => {
      // Avoid showing a toast on every iframe load; the selected card already confirms the change.
    });
  }
})();

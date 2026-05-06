export const playNumberSound = (n) => {
  try {
    const audio = new Audio(`public/sounds/${n}.mp3`);
    audio.volume = 0.85;
    audio.play().catch(() => { });
  } catch (e) { }
};
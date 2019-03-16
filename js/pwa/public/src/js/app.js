var defferedPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('/sw.js', {scope: '/'})
  .then(() => {
    console.log('SW registered!');
  });
}

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('before install prompt fired');
  event.preventDefault();
  defferedPrompt = event;
  return false;
});
self.addEventListener('install', (event) => {
  console.log('sw: installing sw...', event, Date.now());
});

self.addEventListener('activate', (event) => {
  console.log('sw: activating sw...', event, Date.now());
  // return self.clients.claim(); // check if this line is still needed
});

// self.addEventListener('fetch', (event) => {
//   // console.log('fetching...', event);
//   // event.respondWith(fetch(event.request)); // overwrite default response
// });
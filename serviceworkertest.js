let cacheName = 'v5';
let cacheFiles = [
				'./',
				'./index.html',
				'./another-blog.html',
				'./script.js',
				'./styles.css',
				'./img/sample-image-2.jpg',
				'./img/sample-image-5.jpg',
				// 'https://fonts.googleapis.com/css?family=Roboto',
				'./favicon-32x32.png',
				'./favicon.ico'
			]

self.addEventListener('install', event => {
	console.log('SW installed')
	event.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('[Service Worker] caching cacheFiles');
			return cache.addAll(cacheFiles);
		})
	)
})

self.addEventListener('activate', event => {
	console.log('SW activated')
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(cacheNames.map(thisCacheName => {
				if(thisCacheName !== cacheName){
					console.log('SW Removing cached files from: ' + thisCacheName);
					return caches.delete(thisCacheName);
				}
			}))
		})
	)
})

self.addEventListener('fetch', event => {
	console.log('SW fetching', event.request.url)
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if(response){
				console.log('SW found in cache', event.request.url, response);
				return response;
			}

			let requestClone = event.request.clone();
			return fetch(requestClone)
			.then(response => {
				if(!response){
					console.log('SW no response from fetch');
					return response;
				}
					let responseClone = response.clone();
					caches.open(cacheName).then(cache => {
						cache.put(event.request, responseClone);
						console.log('SW New Data Cached', event.request.url);
						return response;
					});

				})
			.catch(error => {
				console.log('SW Error fetching and caching new data', error)
			})
		})
	);
});

self.addEventListener('notificationclose', event=>{
	let notification = event.notification;
	let primaryKey = notification.data.primaryKey;
	console.log('Closed notification: ' + primaryKey);
})

self.addEventListener('notificationclick', event=>{
	let notification = event.notification;
	let action = event.action;
	if(event.action === 'close'){
		notification.close();
	} else {
		clients.openWindow('http://127.0.0.1:8080/another-blog.html');
		notification.close();
	}
})

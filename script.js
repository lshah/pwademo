// function randomNumber(num) {
//   let el = document.getElementById('foo');
//   el.innerHTML = Math.floor(Math.random() * num);
// }
// randomNumber(5);

  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./serviceworkertest.js')
    .then(function(registration){
      console.log('Service Worker Registered');

    }).catch(function(err){
      console.log('Service Worker Registration failed', err);
    })
  }

  Notification.requestPermission((status) => {
    console.log('Notification persmission status: ', status);
  }
  );

  let notificationOptions = {
    body: "n.o.t.i.f.i.c.a.t.i.o.n",
    icon: "images/icons/icon-72x72.png",
    vibrate: [100, 50, 100],
    actions: [
      {action: 'explore',
      title: 'Go to next article'},
      {action: 'close',
      title: 'Close notification'}
    ],
    data: {primaryKey: 1}
  };

  let displayNotification = () => {
    if(Notification.permission === 'granted'){
      navigator.serviceWorker.getRegistration()
      .then(reg => reg.showNotification('Hello World', notificationOptions))
    }
  }

  displayNotification();

// let imageRequest = new Request('https://lshah.github.io/images/abstract-art-2.jpg',{
//   method: 'GET',
//   mode: 'cors',
//   // headers: new Headers({
//   //   'Cache-Control': 'no-cache'
//   // })
// });
//
// let img = document.getElementById('image');
//
// fetch(imageRequest)
// .then(response => response.blob())
// .then(blob => {
//   let imgURL = URL.createObjectURL(blob);
//   console.log(imgURL)
//   img.src = imgURL;
//   img.alt = 'abstract-art';
// })
// .catch(error => console.error('Error', error))
//
// function downloadImage() {
//   fetch('https://lshah.github.io/images/art.jpg',
//     {mode: 'cors'})
//   .then(response => response.blob())
//   .then(blob => {
//         console.log(blob);
//         let imgURL = URL.createObjectURL(blob);
//         img1.src = imgURL;
//   });
// }
//
// downloadImage();

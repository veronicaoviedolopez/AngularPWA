// importScripts("https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js");

importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-auth.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-firestore.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-storage.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-messaging.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.3/firebase-performance.js");

firebase.initializeApp({
  messagingSenderId: "246137164686"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const data = payload.data;
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

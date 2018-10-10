const publicVapidKey =
  "BJJZLQBXHPfMLmONqCGhL-vikZsyObwcStyShZDXu6_AypnIGlrW7MO89o90kL27mh7AqsvjDyewbZpk-YWd_yI";

//check for server worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.log(err));
}

//Register sw
async function send() {
  //Register service worker
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/.."
  });
  //Register Push

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  //Push Notification
  await fetch("/subscribe", {
    method: "post",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
}

//urlBase64ToUint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
//Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey =
  "BJJZLQBXHPfMLmONqCGhL-vikZsyObwcStyShZDXu6_AypnIGlrW7MO89o90kL27mh7AqsvjDyewbZpk-YWd_yI";
const privateVapidKey = "G3o3_3w27pZ9BJloAtAikztOexQllw5UOTyWt7zJ8Ww";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

//Subscribe route
app.post("/subscribe", (req, res) => {
  //Get pushSubscription
  const subscription = req.body;
  //Create paylaod
  const payload = JSON.stringify({
    title: "Push notification with service worker"
  });
  //Pass Object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.log(err));
});

const port = process.env.NODE_ENV || 3030;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

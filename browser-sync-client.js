var js = document.createElement("script")
js.src = "//" + (location.host || "localhost") + "/browser-sync/browser-sync-client.js"
document.body.appendChild(js)

or

"//" + (location.host || "localhost") + "/browser-sync/browser-sync-client.js"

or

<script>document.write("//" + (location.host || "localhost") + "/browser-sync/browser-sync-client.js")</script>
/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />
/// <reference path="reconnecting-websocket.min.js" />

// static "inactive image"
const imageb64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgdmlld0JveD0iMCAwIDI4OCAyODgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODgiIGhlaWdodD0iMjg4IiBmaWxsPSJibGFjayIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfM185MikiPgo8cGF0aCBkPSJNNzguMDUwOSAxNjUuMTg4Vjk1SDIxMVYxNjUuMTg4SDc4LjA1MDlaIiBzdHJva2U9IiNDQkNCQ0IiIHN0cm9rZS13aWR0aD0iMTYiLz4KPHBhdGggZD0iTTE4My4zMDQgMTAyLjQ1OEgyMDEuOTZWMTExLjE0NkgxODMuMzA0VjEwMi40NThaIiBmaWxsPSIjQ0JDQkNCIiBzdHJva2U9IiNDQkNCQ0IiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVqb2luPSJiZXZlbCIvPgo8cGF0aCBkPSJNNzQgMTg4LjMyM0g5MS41OTg0VjIwNS44MzVINzRWMTg4LjMyM1oiIGZpbGw9IiNDQkNCQ0IiIHN0cm9rZT0iI0NCQ0JDQiIgc3Ryb2tlLXdpZHRoPSI4Ii8+CjxwYXRoIGQ9Ik0xMTUuMDg5IDE4OC4zMjNIMTMyLjY4N1YyMDUuODM1SDExNS4wODlWMTg4LjMyM1oiIGZpbGw9IiNDQkNCQ0IiIHN0cm9rZT0iI0NCQ0JDQiIgc3Ryb2tlLXdpZHRoPSI4Ii8+CjxwYXRoIGQ9Ik0xNTYuMTc4IDE4OC4zMjNIMTczLjc3N1YyMDUuODM1SDE1Ni4xNzhWMTg4LjMyM1oiIGZpbGw9IiNDQkNCQ0IiIHN0cm9rZT0iI0NCQ0JDQiIgc3Ryb2tlLXdpZHRoPSI4Ii8+CjxwYXRoIGQ9Ik0xOTcuMjY3IDE4OC4zMjNIMjE0Ljg2NlYyMDUuODM1SDE5Ny4yNjdWMTg4LjMyM1oiIGZpbGw9IiNDQkNCQ0IiIHN0cm9rZT0iI0NCQ0JDQiIgc3Ryb2tlLXdpZHRoPSI4Ii8+CjxlbGxpcHNlIGN4PSIxNDQuNSIgY3k9IjEzMy4xNzciIHJ4PSIyMy4yNDIzIiByeT0iMjIuMzYzNiIgZmlsbD0iI0NCQ0JDQiIvPgo8L2c+CjxwYXRoIGQ9Ik0yNTYgMTQ0QzI1NiAyMDYuNDU2IDIwNS44MDggMjU3IDE0NCAyNTdDODIuMTkxNyAyNTcgMzIgMjA2LjQ1NiAzMiAxNDRDMzIgODEuNTQ0IDgyLjE5MTcgMzEgMTQ0IDMxQzIwNS44MDggMzEgMjU2IDgxLjU0NCAyNTYgMTQ0WiIgc3Ryb2tlPSIjQ0JDQkNCIiBzdHJva2Utd2lkdGg9IjEyIi8+CjxsaW5lIHgxPSI1My42MjUyIiB5MT0iNzQuMjE5IiB4Mj0iMjM1LjYyNSIgeTI9IjIxMi4yMTkiIHN0cm9rZT0iI0NCQ0JDQiIgc3Ryb2tlLXdpZHRoPSIxMiIvPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8zXzkyIj4KPHJlY3Qgd2lkdGg9IjE0OSIgaGVpZ2h0PSIxMjMiIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MCA4NykiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";

var connectionStatus = "inactive";
var ws = new ReconnectingWebSocket("ws://127.0.0.1:8532");

const globalAction = {
  buttonCache: {},
  getButtonFromCache: function (context) {
    return this.buttonCache[context];
  },
  getButtons: function () {
    return this.buttonCache;
  },
  addButtonToCache: function (context, obj) {
    this.buttonCache[context] = obj;
    console.log("cached obj", obj);
    if (connectionStatus == "active") {
      $SD.setImage(context);
    }
    if (connectionStatus == "inactive") {
      $SD.setImage(context, imageb64);
    }
  },
  removeButtonFromCache: function (context) {
    if (this.getButtonFromCache(context)) {
      delete this.buttonCache[context];
    }
  },

  updateAllButtonStates(state) {
    buttons = this.getButtons();
    if (connectionStatus != state) {
      for (button in buttons) {
        if (state == "active") {
          $SD.setImage(button);
        }
        if (state == "inactive") {
          $SD.setImage(button, imageb64);
        }
      }
      connectionStatus = state;
    }
  },
};

globalAction.updateAllButtonStates("inactive");

ws.onmessage = async (event) => {
  data = JSON.parse(await event.data.text());
  if (data["status"] != undefined) {
    if (data.status == "true") {
      globalAction.updateAllButtonStates("active");
    } else {
      globalAction.updateAllButtonStates("inactive");
    }
  }
};

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(
  ({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
    ws.open();
  }
);

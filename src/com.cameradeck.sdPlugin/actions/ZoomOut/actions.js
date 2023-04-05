/// <reference path="../../app.js" />

const zoomOutAction = new Action("com.cameradeck.zoomout.action");

var zoomOutDownCommand = {
  command: [{ zoomOut: 1 }],
};

var zoomOutUpCommand = {
  command: [{ zoomOut: 0 }],
};

zoomOutAction.onKeyUp(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(zoomOutUpCommand));
  console.log("keyup");
});

zoomOutAction.onKeyDown(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(zoomOutDownCommand));
  console.log("keydown");
});

zoomOutAction.onWillAppear(({ action, context, device, event, payload }) => {
  globalAction.addButtonToCache(context, payload);
});

zoomOutAction.onWillDisappear(({ action, context, device, event, payload }) => {
  globalAction.removeButtonFromCache(context, payload);
});

/// <reference path="../../app.js" />

const zoomInAction = new Action("com.cameradeck.zoomin.action");

var zoomInDownCommand = {
  command: [{ zoomIn: 1 }],
};

var zoomInUpCommand = {
  command: [{ zoomIn: 0 }],
};

zoomInAction.onKeyUp(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(zoomInUpCommand));
  console.log("keyup");
});

zoomInAction.onKeyDown(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(zoomInDownCommand));
  console.log("keydown");
});

zoomInAction.onWillAppear(({ action, context, device, event, payload }) => {
  globalAction.addButtonToCache(context, payload);
});

zoomInAction.onWillDisappear(({ action, context, device, event, payload }) => {
  globalAction.removeButtonFromCache(context, payload);
});

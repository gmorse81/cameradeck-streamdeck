/// <reference path="../../app.js" />

const shutterAction = new Action("com.cameradeck.shutter.action");

var shutterDownCommand = {
  command: [{ shutter: 1 }],
};

var shutterUpCommand = {
  command: [{ shutter: 0 }],
};

shutterAction.onKeyUp(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(shutterUpCommand));
  console.log("keyup");
});

shutterAction.onKeyDown(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(shutterDownCommand));
  console.log("keydown");
});

shutterAction.onWillAppear(({ action, context, device, event, payload }) => {
  globalAction.addButtonToCache(context, payload);
});

shutterAction.onWillDisappear(({ action, context, device, event, payload }) => {
  globalAction.removeButtonFromCache(context, payload);
});

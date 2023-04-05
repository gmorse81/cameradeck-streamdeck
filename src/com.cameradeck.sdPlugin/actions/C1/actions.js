/// <reference path="../../app.js" />

const c1Action = new Action("com.cameradeck.c1.action");

var c1DownCommand = {
  command: [{ c1: 1 }],
};

var c1UpCommand = {
  command: [{ c1: 0 }],
};

c1Action.onKeyUp(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(c1UpCommand));
});

c1Action.onKeyDown(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(c1DownCommand));
});

c1Action.onWillAppear(({ action, context, device, event, payload }) => {
  globalAction.addButtonToCache(context, payload);
});

c1Action.onWillDisappear(({ action, context, device, event, payload }) => {
  globalAction.removeButtonFromCache(context, payload);
});

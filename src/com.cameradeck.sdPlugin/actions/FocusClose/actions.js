/// <reference path="../../app.js" />

const focusNearAction = new Action("com.cameradeck.focusnear.action");

var focusNearDownCommand = {
  command: [{ focusClose: 1 }],
};

var focusNearUpCommand = {
  command: [{ focusClose: 0 }],
};

focusNearAction.onKeyUp(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(focusNearUpCommand));
});

focusNearAction.onKeyDown(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(focusNearDownCommand));
});

focusNearAction.onWillAppear(({ action, context, device, event, payload }) => {
  globalAction.addButtonToCache(context, payload);
});

focusNearAction.onWillDisappear(
  ({ action, context, device, event, payload }) => {
    globalAction.removeButtonFromCache(context, payload);
  }
);

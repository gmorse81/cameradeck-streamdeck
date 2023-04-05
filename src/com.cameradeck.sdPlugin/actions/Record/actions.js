/// <reference path="../../app.js" />

const recordAction = new Action("com.cameradeck.record.action");

var recordDownCommand = {
  command: [{ record: 1 }],
};

var recordUpCommand = {
  command: [{ record: 0 }],
};

recordAction.onKeyUp(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(recordUpCommand));
  console.log("keyup");
});

recordAction.onKeyDown(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(recordDownCommand));
  console.log("keydown");
});

recordAction.onWillAppear(({ action, context, device, event, payload }) => {
  globalAction.addButtonToCache(context, payload);
});

recordAction.onWillDisappear(({ action, context, device, event, payload }) => {
  globalAction.removeButtonFromCache(context, payload);
});

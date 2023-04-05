/// <reference path="../../app.js" />

const focusFarAction = new Action("com.cameradeck.focusfar.action");

var focusFarDownCommand = {
  command: [{ focusFar: 1 }],
};

var focusFarUpCommand = {
  command: [{ focusFar: 0 }],
};

focusFarAction.onKeyUp(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(focusFarUpCommand));
  console.log("keyup");
});

focusFarAction.onKeyDown(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(focusFarDownCommand));
  console.log("keydown");
});

focusFarAction.onWillAppear(({ action, context, device, event, payload }) => {
  globalAction.addButtonToCache(context, payload);
});

focusFarAction.onWillDisappear(
  ({ action, context, device, event, payload }) => {
    globalAction.removeButtonFromCache(context, payload);
  }
);

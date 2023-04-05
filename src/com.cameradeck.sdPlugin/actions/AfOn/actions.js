/// <reference path="../../app.js" />

const afOnAction = new Action("com.cameradeck.afon.action");

var afOnDownCommand = {
  command: [{ afOn: 1 }],
};

var afOnUpCommand = {
  command: [{ afOn: 0 }],
};

afOnAction.onKeyUp(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(afOnUpCommand));
  console.log("keyup");
});

afOnAction.onKeyDown(({ action, context, device, event, payload }) => {
  ws.send(JSON.stringify(afOnDownCommand));
  console.log("keydown");
});

afOnAction.onWillAppear(({ action, context, device, event, payload }) => {
  globalAction.addButtonToCache(context, payload);
});

afOnAction.onWillDisappear(({ action, context, device, event, payload }) => {
  globalAction.removeButtonFromCache(context, payload);
});

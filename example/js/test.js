var WebSocket = require('ws');

var robots_ws = new WebSocket('ws://localhost:3000');
robots_ws.on('open', function open() {
  console.log('robot Connection to server opened');
  var r1 = {'device': 'robot', 'topic': 'login', 'data': {'psd': 1990, 'robotID': 'WT_001'}};
  robots_ws.send(JSON.stringify(r1));
});

var ws0 = new WebSocket('ws://localhost:3000');
ws0.on('open', function open() {
  console.log('Client Connection to server opened');
  var r1 = {'device': 'ws0', 'topic': 'login', 'data': {'psd': 1990, 'robotID': 'WT_001'}};
  ws0.send(JSON.stringify(r1));

  var r2 = {'device': 'ws0', 'topic': 'bind', 'data': {'psd': 1990, 'robotID': 'WT_001'}};
  ws0.send(JSON.stringify(r2));

  var r3 = {'device': 'ws0', 'topic': 'xxx', 'data': {'psd': 1990, 'robotID': 'WT_001'}};
  ws0.send(JSON.stringify(r3));

  ws0.on('message', function (msg) {
    console.log(msg);
  });
});



function Socket(http) {
  const io = require('socket.io')(http);
  var userNum = 0;
  io.on('connection', function (socket) {
    socket.on('join', function (username) {
      socket.username = username;
      ++userNum;
      socket.emit('joined', {username: username, userNum: userNum});
    });
    socket.on('subscribe', function (channel) {
      socket.on(channel, function (message) {
        io.emit(channel, message);
      });
    });
    socket.on('disconnect', function () {
      if (userNum > 0) {
        --userNum;
      }
    });
  });
}

module.exports = function (http) {
  return new Socket(http);
};

function Socket(host) {
  this.socket = require('socket.io-client')(host || window.location.origin);
}

Socket.prototype.subscribe = function (callback) {
  this.socket.on(this.channel, function (message) {
    (typeof callback === 'function') && callback(message);
  });
  return this;
};

Socket.prototype.join = function (username, callback) {
  this.socket.on('joined', function (data) {
    (typeof callback === 'function') && callback(data);
  });
  this.socket.emit('join', username);
  return this;
};

Socket.prototype.channel = function (channel, callback) {
  this.channel = channel;
  this.socket.emit('subscribe', channel);
  this.subscribe(callback);
  return this;
};

Socket.prototype.emit = function (message) {
  this.socket.emit(this.channel, message);
  return this;
};

module.exports = function (host) {
  return new Socket(host);
};

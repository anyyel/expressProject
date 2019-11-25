function MyError(message, status){
    this.name = 'Error';
    this.message = message || 'Something went wrong';
    this.status = status || 400; 
  };

  MyError.prototype = Object.create(Error.prototype);
  MyError.prototype.constructor = MyError;

  module.exports = MyError;
  
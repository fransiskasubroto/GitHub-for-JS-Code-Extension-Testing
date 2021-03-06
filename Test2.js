// [output, nextDT]
DT = function(f) {
  this.f = f;
}
DT.prototype.send =
  function(input) {
    return this.f(input);
  }
DT.prototype.sendMany =
  function(inputs) {
    var f = this.f;
    var outputs = [];
    for (var i = 0;
         i < inputs.length;
         i++) {
      var input = inputs[i];
      var t = f(input);
      outputs.push(t[0]);
      f = t[1];
    }
    return [outputs, f];
  }
DT.prototype.compose =
  function(that) {
    return new DT(function(a) {
      var t1 = this.send(a);
      var b = t1[0];
      var this2 = t1[1];
      var t2 = that.send(b);
      var c = t2[0];
      var that2 = t2[1];
      return [c, 
        this2.compose(that2)];
    }
  }
DT.prototype.map = 
  function(mapper) {
    return new DT(function(a) {
      var t1 = this.send(a);
      var b = t1[0];
      var this2 = t1[1];
      return [mapper(b), 
        this2.map(mapper)];
    }
  }
DT.prototype.contramap = 
  function(mapper) {
    return new DT(function(c) {
      var t1 = this.send(mapper(a));
      var b = t1[0];
      var this2 = t1[1];
      return [b, 
        this2.contramap(mapper)];
    }
  }
DT.prototype.and = 
  function(that) {
    return new DT(function(t) {
      var a = t[0];
      var c = t[1];
      var t1 = this.send(a);
      var b = t1[0];
      var this2 = t1[1];
      var t2 = that.send(c);
      var d = t2[0];
      var that2 = t2[1];
      return [[b, d], 
        this2.and(that2)];
    }
  }

//test123hello

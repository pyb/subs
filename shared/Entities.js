var root = global || window;

function Entities(root) {
  this.objects = {};
  // ex.
  // { 'guid-1234' : { constructor: 'Tile', object: [Object object] }
}

Entities.prototype.guid = function() {
  // returns a guid, used to give objects unique ids
  // via http://stackoverflow.com/a/2117523/152729
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

Entities.prototype.create = function(constructor, settings) {
  var id = this.guid();
  this.objects[id] = {
    constructor: constructor, 
    object: new root[constructor](settings)
  };
  return id;
};

Entities.prototype.find = function(id) {
  if (this.objects[id]) return this.objects[id].object;
  return false;
};

Entities.prototype.remove = function(id) {
  return delete this.objects[id];
};

Entities.prototype.update = function() {
  for (var id in this.objects) {
    this.objects[id].update();
  }
};

Entities.prototype._in = function(entities) {
  for (var id in entities) {
    if (this.objects[id]) {
      // update object with new settings
      this.objects[id]._in(entities[id].settings);
    } else {
      // create new object using settings
      this.create(entities[id].constructor, entities[id].settings);
    }
  }
};

Entities.prototype._out = function() {
  var out = {};
  for (var id in this.objects) {
    out[id] = {
      constructor: this.objects[id].constructor,
      object: this.objects[id].object._out()
    };
  }
  return out;
};

if (typeof module != 'undefined') module.exports = Entities;
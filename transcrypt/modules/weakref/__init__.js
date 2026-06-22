var __name__ = 'weakref';

export var ref = function (obj) {
    var ref_ = new WeakRef(obj)
    function deref() {
      return ref_.deref() || null;
    }
    return deref;
}

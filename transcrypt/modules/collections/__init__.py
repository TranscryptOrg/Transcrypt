# __pragma__ ('skip')
def __pragma__(*args): pass
# __pragma__ ('noskip')


__pragma__('js', '{}', '''
var deque_ = function(src) {
    this.push.apply(this, src);
    return this
}
deque_.prototype = Object.create(Array.prototype);
deque_.prototype.appendleft = function(item) {
  this.unshift(item);
}
deque_.prototype.popleft = function() {
  return this.shift();
}
''')


def deque(src=[]):
    return __pragma__('js', '{}', "new deque_(src)")


__pragma__('js', '{}', '''
deque_.prototype.__class__ = deque;
deque.__name__ = 'deque';
deque.__bases__ = [object];
''')

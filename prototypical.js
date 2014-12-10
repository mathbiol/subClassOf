console.log("Hello from Prototypical");

function Thing(initialStuff) {
    var keys = Object.keys(initialStuff);
    for (var i = keys.length - 1; i >= 0; i--) {
        this[keys[i]] = initialStuff[keys[i]]
    };
}

Thing.prototype.get = function get(key) {
    if (this.hasOwnProperty(key)) return this[key];
}

Thing.prototype.set = function set(key, value) {
    this[key] = value;
    return this;
}
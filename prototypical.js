console.log("Hello from Prototypical");

function Thing(initialStuff) {
    var keys = Object.keys(initialStuff);
    for (var i = keys.length - 1; i >= 0; i--) {
        this[keys[i]] = initialStuff[keys[i]]
    };
}

Thing.prototype.get = function get(key) {
    if (this.hasOwnProperty(key)) {
        return this[key];
    }
    else if (this.hasOwnProperty("prototype")) {
        var req = new XMLHttpRequest();
        req.open("GET", this.prototype, false);
        req.send(null);
        return JSON.parse(req.responseText)[key];
    }
}

Thing.prototype.set = function set(key, value) {
    this[key] = value;
    return this;
}

window.prototypical = {
    Thing: Thing,
    demo: function () {
        var dog = { name: "Sam", breed: "Mutt", prototype: "https://48067914bb3d7935906839bc04226b8b5f55d44b-www.googledrive.com/host/0Bzu4cytkv4B8aXZ0UUpiXzkzclE/boxer.json" };
        return new Thing(dog);
    }
}
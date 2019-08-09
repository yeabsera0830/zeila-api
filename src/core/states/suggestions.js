const state = {
    _internal: [],
    _listeners: [],
    set value(value) {
        this._internal = value;
        for (let listener of this._listeners)
            listener(value);
    },
    get value() {
        return this._internal;
    },
    registerListener(listener) {
        this._listeners.push(listener);
    },
    unregisterListener(listener) {
        for (let i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i] === listener) {
                this._listeners.splice(i, 1);
                break;
            }
        }
    },
    reset() {
        this._internal = [];
        this._listeners = [];
    }
};

export default state;
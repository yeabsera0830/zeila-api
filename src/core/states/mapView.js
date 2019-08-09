export default state = {
    types: {
        MANUAL_LOCATION: 1,
        DESTINATION: 2
    },
    isVisible: {
        _internal: false,
        _listeners: [],
        set value(value) {
            this._internal = value;
            for (const listener of this._listeners)
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
        }
    },
    type: -1,
    manualLocation: {
        onSet: null,
        onCancel: null
    },
    destination: {
        location: null,
        placeName: null
    }
};
const NONE = -1;

export default state = {
    header: {
        activeIndex: {
            _internal: NONE,
            _listeners: [],
            set value(value) {
                if (this._internal === value)
                    return;
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
        shouldDisplay: {
            _internal: false,
            _listeners: [],
            set value(value) {
                if (this._internal === value)
                    return;
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
        searchBarDefaultText: {
            _internal: '',
            _listeners: [],
            set value(value) {
                if (this._internal === value)
                    return;
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
        }
    },
    footer: {
        activeIndex: {
            _internal: NONE,
            _listeners: [],
            set value(value) {
                if (this._internal === value)
                    return;
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
        shouldDisplay: {
            _internal: false,
            _listeners: [],
            set value(value) {
                if (this._internal === value)
                    return;
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
        }
    }
};
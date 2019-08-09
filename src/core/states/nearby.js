const state = {
    location: {
        _internal: null,
        _internalLoadingState: false,
        _listeners: [],
        _loadingStateListeners: [],
        set value(value) {
            this._internal = value;
            for (const listener of this._listeners)
                listener(value);
        },
        get value() {
            return this._internal;
        },
        set isLoading(value) {
            this._internalLoadingState = value;
            for (const listener of this._loadingStateListeners)
                listener(value);
        },
        get isLoading() {
            return this._internalLoadingState;
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
        registerLoadingStateChangeListener(listener) {
            this._loadingStateListeners.push(listener);
        },
        unregisterLoadingStateChangeListener(listener) {
            for (let i = 0; i < this._loadingStateListeners.length; i++) {
                if (this._loadingStateListeners[i] === listener) {
                    this._loadingStateListeners.splice(i, 1);
                    break;
                }
            }
        },
        hasValue() {
            return !!this._internal;
        },
        reset() {
            this._internal = null;
            this._internalLoadingState = false;
            this._listeners = [];
            this._loadingStateListeners = [];
        }
    },
    address: {
        value: null,
        hasValue() {
            return !!this.value;
        },
        reset() {
            this.value = null;
        }
    },
    trending: {
        value: null,
        offset: 0,
        hasValue() {
            return !!this.value;
        },
        reset() {
            this.value = null;
            this.offset = 0;
        }
    },
    places: {
        value: null,
        location: null,
        hasValue() {
            return !!this.value;
        },
        reset() {
            this.value = null;
            this.location = null;
        }
    },
    new: {
        value: null,
        offset: 0,
        location: null,
        hasValue() {
            return !!this.value;
        },
        reset() {
            this.value = null;
            this.offset = 0;
            this.location = null;
        }
    },
    reset() {
        this.location.reset();
        this.address.reset();
        this.trending.reset();
        this.places.reset();
        this.new.reset();
    }
};

export default state;
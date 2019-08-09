const state = {
    filters: {
        _internal: {},
        _listeners: [],
        get value() {
            return this._internal;
        },
        add(filter, value) {
            this._internal[filter] = value;
            this._notifyListeners();
        },
        set(filter, value) {
            this._clear();
            this.add(filter, value);
        },
        _clear() {
            this._internal = {};
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
        _notifyListeners() {
            for (const listener of this._listeners)
                listener(this._internal);
        },
        reset() {
            this._internal = {};
            this._listeners = [];
        }
    },
    selectedBusinessId: {
        value: -1
    },
    categoryOrder: {
        value: null,
        hasValue() {
            return !!this.value;
        },
        reset() {
            this.value = null;
        }
    },
    reset() {
        this.filters.reset();
        this.categoryOrder.reset();
    }
};

export default state;
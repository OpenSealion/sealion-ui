export const addMouseWheelEvent = (function (window) {
    const _eventCompat = function (event) {
        const type = event.type;
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
            event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
        }
        // alert(event.delta);
        if (event.srcElement && !event.target) {
            event.target = event.srcElement;
        }
        if (!event.preventDefault && event.returnValue !== undefined) {
            event.preventDefault = function () {
                event.returnValue = false;
            };
        }

        return event;
    };
    if (window.addEventListener) {
        return function (el, type, fn, capture) {
            if (type === 'mousewheel' && document.mozFullScreen !== undefined) {
                type = 'DOMMouseScroll';
            }

            const callback = function (event) {
                fn.call(this, _eventCompat(event));
            };

            el.addEventListener(type, callback, capture || false);

            return function () {
                el.removeEventListener(type, callback, capture);
            };
        };
    }

    if (window.attachEvent) {
        return function (el, type, fn) {
            const callback = function (event) {
                event = event || window.event;
                fn.call(el, _eventCompat(event));
            };

            el.attachEvent(`on${type}`, callback);

            return function () {
                el.detachEvent(`on${type}`, callback);
            };
        };
    }
    return () => undefined;
}(window));

export const throttle = (delay, callback, options?) => {
    const {
        noTrailing = false,
        noLeading = false,
        debounceMode = undefined
    } = options || {};

    let timeoutID;
    let cancelled = false;

    let lastExec = 0;

    const clearExistingTimeout = () => {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
    };

    const cancel = (options?) => {
        const { upcomingOnly = false } = options || {};
        clearExistingTimeout();
        cancelled = !upcomingOnly;
    };
    const wrapper = (...arguments_) => {
        const elapsed = Date.now() - lastExec;

        if (cancelled) {
            return;
        }

        const exec = () => {
            lastExec = Date.now();
            callback.apply(arguments_);
        };

        const clear = () => {
            timeoutID = undefined;
        };

        if (!noLeading && debounceMode && !timeoutID) {
            exec();
        }

        clearExistingTimeout();

        if (debounceMode === undefined && elapsed > delay) {
            if (noLeading) {
                lastExec = Date.now();
                if (!noTrailing) {
                    timeoutID = setTimeout(debounceMode ? clear : exec, delay);
                }
            } else {
                exec();
            }
        } else if (noTrailing !== true) {
            timeoutID = setTimeout(
                debounceMode ? clear : exec,
                debounceMode === undefined ? delay - elapsed : delay
            );
        }
    }

    wrapper.cancel = cancel;

    return wrapper;
};

export const debounce = (delay, callback, options?) => {
    const { atBegin = false } = options || {};
    return throttle(delay, callback, { debounceMode: atBegin !== false });
};

export const deleteKeys = (
    obj: object,
    keys: string[]
) => {
    const clone = {
        ...obj
    };
    keys.forEach((key) => {
        if (key in Object.keys(clone)) {
            delete clone[key];
        }
    });
    return clone;
};

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

import { useState, useLayoutEffect } from 'react';
import {createPortal} from "react-dom";


export const Portal = {
    wrapperElement: null,
    open(children) {
        console.log('open');
        // if (this.wrapperElement) {
        //     document.body.removeChild(this.wrapperElement);
        //     this.wrapperElement = null;
        // }
        if (!this.wrapperElement) {
            this.wrapperElement = document.createElement("div");
            this.wrapperElement.id = "react-portal-wrapper";
            document.body.appendChild(this.wrapperElement);
        }
        return createPortal(children, this.wrapperElement);
    },
    destroy() {
        console.log('destroy');
        if (this.wrapperElement) {
            document.body.removeChild(this.wrapperElement);
            this.wrapperElement = null;
        }
    }
}
export const ReactPortal = ({ children = <></>, wrapperId = "react-portal-wrapper" }) => {
    const [wrapperElement, setWrapperElement] = useState(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        let systemCreated = false;
        if (!element) {
            const wrapper = document.createElement("div");
            document.body.appendChild(wrapper);
            element = wrapper;
            systemCreated = true;
        }
        setWrapperElement(element)

        return () => {
            // If the systemCreated is true, we’ll delete the element from the DOM
            // delete the programatically created element
            if (systemCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    // wrapperElement state will be null on the very first render.
    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}
import { useState, useLayoutEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

export const ReactPortal = ({ children, wrapperId = 'react-portal-wrapper' }) => {
    const [wrapperElement, setWrapperElement] = useState(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        let systemCreated = false;
        if (!element) {
            const wrapper = document.createElement('div');
            document.body.appendChild(wrapper);
            element = wrapper;
            systemCreated = true;
        }
        setWrapperElement(element);

        return () => {
            // If the systemCreated is true, we’ll delete the element from the DOM
            // delete the programatically created element
            if (systemCreated && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    // wrapperElement state will be null on the very first render.
    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
};

export const MessagePortal = {
    messageList: [],
    messageWrapper: null,
    destroy() {
        if (this.messageWrapper && !this.messageWrapper.children.length) {
            this.messageWrapper.parentNode.removeChild(this.messageWrapper);
            this.messageWrapper = null;
            this.messageList = [];
        }
    },
    open(children, getContainer = () => document.body) {
        this.messageList.push(children);
        if (!this.messageWrapper) {
            this.messageWrapper = document.createElement('div');
            this.messageWrapper.classList.add('seal-message-root-wrapper');
            getContainer().appendChild(this.messageWrapper);
        }
        ReactDOM.render(this.messageList.map((item) => item), this.messageWrapper);
    },
};

import { useState, useLayoutEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

export const ReactPortal = ({ children = '', wrapperId = 'react-portal-wrapper' }) => {
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
    destroy() {
        const messageWrapper = document.getElementById('message-root-wrapper');
        if (messageWrapper && !messageWrapper.children.length) {
            document.body.removeChild(messageWrapper);
        }
        this.messageList = [];
    },
    open(children) {
        this.messageList.push(children);
        let messageWrapper = document.getElementById('message-root-wrapper');
        if (!messageWrapper) {
            messageWrapper = document.createElement('div');
            messageWrapper.id = 'message-root-wrapper';
            messageWrapper.className = 'message-root-wrapper';
            document.body.appendChild(messageWrapper);
        }
        ReactDOM.render(this.messageList.map((item) => item), messageWrapper);
    },
};

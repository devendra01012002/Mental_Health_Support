import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatApp.css';

const socket = io('http://localhost:5000');

function ChatApp() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            appendMessage(message.text, "incoming");
        });
         
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const appendMessage = (message, type) => {
        const div = document.createElement("div");
        let className = type;
        div.classList.add("message", className);
        let markup = `${message}`;

        div.innerHTML = markup;
        document.querySelector(".content").appendChild(div);
    };

    const sendMessage = () => {
        if (input.trim() === '') return;

        const message = { sender: 'user', text: input };
        socket.emit('sendMessage', message);
        // appendMessage(input, "outgoing");
        setInput('');
        setShowMessage(true);
    };

    useEffect(() => {
        if (showMessage) {
            // Show the one-time message on the desktop
            // You can use a notification library or a custom implementation here
            console.log('One-time message');
            setShowMessage(false);
        }
    }, [showMessage]);

    return (
        <div className="App">
            <div className="content"></div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatApp;

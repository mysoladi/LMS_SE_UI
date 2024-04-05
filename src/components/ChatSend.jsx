import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

const ChatSend = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleFinishEditing = () => {
        setIsEditing(false);
        // Perform any action with the message, such as sending it
        console.log("Message sent:", message);
    };

    return (
        <div>
            {/* Clickable area to start editing */}
            <div
                className={`flex gap-10 py-2.5 pr-4 pl-8 text-xs bg-white rounded-xl border border-indigo-300 border-solid max-w-[706px] text-zinc-300 max-md:flex-wrap max-md:pl-5 ${isEditing ? 'hidden' : 'block'}`}
                onClick={handleStartEditing}
            >
                <div className="flex-auto my-auto text-black">Send a Message</div>
                <SendIcon fontSize="large" color="primary" />
            </div>
            {/* Input field when editing */}
            <div className={`flex-auto py-2.5 pr-4 pl-8 text-xs bg-white rounded-xl border border-indigo-300 border-solid max-w-[706px] text-zinc-300 max-md:flex-wrap max-md:pl-5 ${isEditing ? 'block' : 'hidden'}`}>
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    onBlur={handleFinishEditing}
                    className="flex-auto py-2.5 pr-4 pl-8 text-xs text-black"
                    style={{ border: 'none', outline: 'none', flexGrow: 1 }}
                />
                <SendIcon
                    fontSize="large"
                    color="primary"
                    onClick={handleFinishEditing}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                />
            </div>
        </div>
    );
}

export default ChatSend;

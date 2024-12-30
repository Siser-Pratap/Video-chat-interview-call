import { socket } from '@/socket';
import React, { useEffect, useState } from 'react';

const Message = () => {
  const [message, setMessage] = useState('');
  const [messageFromServer, setmessageFromServer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Message sent:', message);
      socket.emit('chat message', message);
      setMessage('');
    }
  };
  useEffect(() => {
    socket.on('chat message', (msg) => {
      setmessageFromServer(msg);
    });
  }, [socket]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </form>
      <p className="mt-4 text-gray-700">
        {messageFromServer}
      </p>
    </div>
  );
};

export default Message;
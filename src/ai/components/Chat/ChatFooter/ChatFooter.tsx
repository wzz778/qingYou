import React, { useState } from 'react';
import styles from './index.module.scss';
const ChatFooter = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem('userName'), message });
    setMessage('');
  };
  return (
    <div className={styles.chat__footer}>
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="编写消息"
          className={styles.message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.sendBtn}>发送</button>
      </form>
    </div>
  );
};

export default ChatFooter;

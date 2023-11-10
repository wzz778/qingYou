import React from 'react';
import styles from './index.module.scss';
const ChatBody = () => {
  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    window.location.reload();
  };

  return (
    <>
      <header className={styles.chat__mainHeader}>
        <p>Hangout with Colleagues</p>
        <button className={styles.leaveChat__btn} onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/* 显示你发送消息的内容 */}
      <div className={styles.message__container}>
        <div className={styles.message__chats}>
          <p className={styles.sender__name}>You</p>
          <div className={styles.message__sender}>
            <p>Hello there</p>
          </div>
        </div>

        {/*显示你接收消息的内容*/}
        <div className={styles.message__chats}>
          <p>Other</p>
          <div className={styles.message__recipient}>
            <p>Hey,m good, you?</p>
          </div>
        </div>

        {/* 当有用户正在输入，则被触发 */}
        <div className={styles.message__status}>
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;

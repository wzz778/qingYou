import { memo, useRef, useState } from 'react';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Spin } from '@douyinfe/semi-ui';
import AiTool from '@/ai/server/AiTool';
interface IProps {
  datas?: any[];
}
interface messageInfo {
  text: string;
  user: boolean;
}

const Chat: FC<IProps> = () => {
  const [question, setQuestion] = useState<string>('');
  // const [result, setResult] = useState<string>('');
  let result = '';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<messageInfo[]>([]);
  const ref = useRef<any>(null);
  const messageContainerRef = useRef<any>(null);
  const loadingRef = useRef<any>(null);
  const submit = () => {
    setQuestion('');
    if (!messageList.length) {
      setMessageList([
        {
          user: true,
          text: question
        }
      ]);
    } else {
      setMessageList([
        ...messageList,
        {
          user: true,
          text: question
        }
      ]);
    }
    moveY();
    if (ref.current) {
      ref.current.submitHoodle(question);
    }
  };
  const respondHoodle = (respond: string) => {
    result = respond;
    loadingRef.current.innerText = result;
    moveY();
    // loadingRef.current
  };
  const overRespond = (v: boolean) => {
    if (!v) {
      setMessageList((prevList) => [...prevList, { user: false, text: result }]);
      moveY();
    }
    setIsLoading(v);
  };
  const handleSendMessage = (e: any) => {
    e.preventDefault();
  };
  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      submit();
    }
  };
  //返回底部
  const moveY = () => {
    const h = messageContainerRef.current.scrollHeight;
    messageContainerRef.current.scrollTop = h + 20;
  };
  return (
    <div className={styles.chat}>
      <div className={styles.chat__main}>
        <header className={styles.chat__mainHeader}>
          <p>欢迎使用青邮AI助手！</p>
          <div>
            <Button onClick={moveY} style={{ marginRight: 4 }}>
              返回底部
            </Button>
            <Button type="danger" theme="solid" onClick={() => setMessageList([])}>
              清除聊天记录
            </Button>
          </div>
        </header>
        {/* 显示你发送消息的内容 */}
        <div className={styles.message__container} ref={messageContainerRef}>
          {messageList.map((item, index) => {
            return item.user ? (
              <div key={item.user.toString() + index} className={styles.message__chats}>
                <p className={styles.sender__name}>You</p>
                <div className={styles.message__sender}>
                  <p>{item.text}</p>
                </div>
              </div>
            ) : (
              <div className={styles.message__chats}>
                <p>Ai</p>
                <div className={styles.message__recipient}>
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })}
          {isLoading ? (
            <div className={styles.message__chats}>
              <p>Ai</p>
              <div className={styles.message__recipient}>
                <p ref={loadingRef}>{result}</p>
                <Spin />
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.chat__footer}>
          <form className="form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="编写消息"
              className={styles.message}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <Button onClick={submit} type="primary" theme="solid" className={styles.sendBtn}>
              发送
            </Button>
          </form>
        </div>
        <AiTool loadHoodle={overRespond} respondHoodle={respondHoodle} ref={ref} />
      </div>
    </div>
  );
};

export default memo(Chat);

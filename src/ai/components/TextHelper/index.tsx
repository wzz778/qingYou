import { memo, useRef, useState } from 'react';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Spin } from '@douyinfe/semi-ui';
import AiTool from '@/ai/server/AiTool';
import None from '@/components/dataAcquisition/None';
interface IProps {
  datas?: any[];
}
interface messageInfo {
  text: string;
  user: boolean;
}

const TextHelper: FC<IProps> = () => {
  const [question, setQuestion] = useState<string>('');
  // const [result, setResult] = useState<string>('');
  let result = '';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const ref = useRef<any>(null);
  const messageContainerRef = useRef<any>(null);
  const loadingRef = useRef<any>(null);
  const submit = () => {
    if (ref.current) {
      ref.current.submitHoodle(question);
    }
  };
  const respondHoodle = (respond: string) => {
    result = respond;
    loadingRef.current.innerText = result;
    // loadingRef.current
  };
  const overRespond = (v: boolean) => {
    if (!v) {
      setMessage(result);
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
  return (
    <div className={styles.chat}>
      <div className={styles.chat_main}>
        <header className={styles.chat_mainHeader}>
          <p>欢迎使用青邮AI助手！</p>
          <div>
            <Button type="danger" theme="solid" onClick={() => setMessage('')}>
              清除聊天记录
            </Button>
          </div>
        </header>
        {/* 显示你发送消息的内容 */}
        <div className={styles.message_container} ref={messageContainerRef}>
          <div className={styles.message_chats}>
            <p>Ai</p>
            <div className={styles.message_recipient}>
              <p ref={loadingRef}>{result}</p>
              {isLoading ? <Spin /> : ''}
            </div>
          </div>
        </div>
        <div className={styles.chat_footer}>
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
        <AiTool loadHoodle={overRespond} respondHoodle={respondHoodle} ref={ref} isText={false} />
      </div>
    </div>
  );
};

export default memo(TextHelper);

import { memo, useRef, useState } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Input } from '@douyinfe/semi-ui';
import AiTool from '@/ai/server/AiTool';
import Textarea from '@douyinfe/semi-ui/lib/es/input/textarea';
interface IProps {
  datas?: any[];
}

const Demo: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const [questionInput, setQuestionInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<any>(null);
  const submit = (questionText: string) => {
    if (ref.current) {
      ref.current.submit(questionText);
    }
  };
  const respondHoodle = (result: string) => {
    setResult(result);
  };
  const handleSendMessage = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className={styles.chat}>
      <div className={styles.chat__main}>
        <header className={styles.chat__mainHeader}>
          <p>Hangout with Colleagues</p>
          <button className={styles.leaveChat__btn}>LEAVE CHAT</button>
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
        </div>
        <div className={styles.chat__footer}>
          <form className="form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="编写消息"
              className={styles.message}
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
            />
            <button className={styles.sendBtn}>发送</button>
          </form>
        </div>
      </div>
    </div>
    // <div>
    //   <h1>讯飞星火认知大模型接入网页成功 {isLoading ? '加载中.....' : '加载完成'}</h1>
    //   <div>
    //     <>{result}</>
    //     {/* <textarea value={result} style={{ width: 700, fontSize: 12 }}></textarea> */}
    //   </div>
    //   <div id="sendVal">
    //     <Textarea value={questionInput} onChange={setQuestionInput} />
    //     <Button onClick={() => submit(questionInput)}>发送信息</Button>
    //     <AiTool loadHoodle={setIsLoading} respondHoodle={respondHoodle} ref={ref} />
    //   </div>
    // </div>
  );
};

export default memo(Demo);
Demo.displayName = 'Demo';

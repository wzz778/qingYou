import { memo, useRef, useState } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Input } from '@douyinfe/semi-ui';
import AiTool from '@/ai/server/AiTool';
import Textarea from '@douyinfe/semi-ui/lib/es/input/textarea';
import ChatBody from './ChatBody/ChatBody';
import ChatFooter from './ChatFooter/ChatFooter';
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
  return (
    <div className={styles.chat}>
      <div className={styles.chat__main}>
        <ChatBody />
        <ChatFooter />
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

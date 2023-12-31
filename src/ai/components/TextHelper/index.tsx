import { memo, useRef, useState } from 'react';
//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Button, Radio, RadioGroup, Spin } from '@douyinfe/semi-ui';
import AiTool from '@/ai/server/AiTool';
import None from '@/components/dataAcquisition/None';
import { ToastInfo, ToastWaring, handleCopy } from '@/utils/common';
import { IconCopy } from '@douyinfe/semi-icons';
import { marked } from 'marked';
import HtmlHelper from './HtmlHelper';

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
  const [isText, setIsText] = useState<number>(1);
  const ref = useRef<any>(null);
  const htmlHelperRef = useRef<any>(null);
  const messageContainerRef = useRef<any>(null);
  const loadingRef = useRef<any>(null);
  const submit = () => {
    if (!question) {
      ToastWaring('请输入提问内容');
      return;
    }
    if (isLoading) {
      ToastInfo('加载中，请稍等。。。');
      return;
    }
    setQuestion('');
    result = '';
    setIsLoading(true);
    if (ref.current) {
      if (!isText) {
        ref.current.submitHoodle(
          `
          原生html生成${question}页面，要求只能用内联样式，并且把body删除，换成div并保留样式，最后吧生成的代码，就保留body里的内容输出，要有边框，有背景颜色和背影，有外边距。
          
          `
        );
      } else {
        ref.current.submitHoodle(question);
      }
    }
  };
  const respondHoodle = (respond: string) => {
    result = respond;
    if (isText) {
      setMessage(respond);
    }
    // loadingRef.current.innerText = result;
  };
  const overRespond = (v: boolean) => {
    if (!v) {
      if (isText) {
        setMessage(result);
      } else {
        if (htmlHelperRef.current) {
          var bodyContent = result.substring(
            result.indexOf('<body>') + 9,
            result.indexOf('</body>')
          );
          htmlHelperRef.current.submitHoodle(bodyContent);
        }
      }
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
            <RadioGroup
              type="button"
              buttonSize="large"
              defaultValue={1}
              aria-label="单选组合示例"
              name="demo-radio-large"
              value={isText}
              onChange={(e) => setIsText(e.target.value)}
            >
              <Radio value={1}>纯文本</Radio>
              <Radio value={0}>HTML</Radio>
            </RadioGroup>
            <Button type="danger" theme="solid" onClick={() => setMessage('')}>
              清除聊天记录
            </Button>
          </div>
        </header>
        {/* 显示你发送消息的内容 */}
        <div className={styles.message_container} ref={messageContainerRef}>
          {isText ? (
            <>
              <div dangerouslySetInnerHTML={{ __html: marked(message) }} />
              {isLoading ? (
                <Spin />
              ) : message ? (
                <Button type="secondary" onClick={() => handleCopy(message)} icon={<IconCopy />}>
                  复制生成内容
                </Button>
              ) : (
                <None description="暂无提问内容" />
              )}
            </>
          ) : (
            <>
              <Spin spinning={isLoading} tip="努力生成中... 请稍等">
                <HtmlHelper ref={htmlHelperRef} />
              </Spin>
            </>
          )}
        </div>
        <div className={styles.chat_footer}>
          <form className="form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder={
                isText
                  ? 'ai文本生成，您的需求，即可生成对应文档'
                  : 'Html页面生成，输入您的需求（如：‘给老师的祝福’），即可生成对应页面代码'
              }
              className={styles.message}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <Button
              onClick={submit}
              loading={isLoading}
              type="primary"
              theme="solid"
              className={styles.sendBtn}
            >
              发送
            </Button>
          </form>
        </div>
        <AiTool
          loadHoodle={overRespond}
          respondHoodle={respondHoodle}
          ref={ref}
          isText={isText ? true : false}
        />
      </div>
    </div>
  );
};

export default memo(TextHelper);

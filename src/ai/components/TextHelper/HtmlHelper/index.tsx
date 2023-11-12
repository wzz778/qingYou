import { memo, useRef, useState } from 'react';
//type
import type { FC } from 'react';
import styles from './index.module.scss';

interface IProps {
  datas?: any[];
}

const HtmlHelper: FC<IProps> = () => {
  const [htmlCode, setHtmlCode] = useState(''); // 用于存储用户输入的HTML代码

  const handleInputChange = (event: any) => {
    setHtmlCode(event.target.value); // 更新用户输入的HTML代码
  };
  return (
    <div className={styles.chat}>
      <div style={{ float: 'left', width: '50%', padding: '20px' }}>
        <h2>输入HTML代码</h2>
        <textarea
          value={htmlCode}
          onChange={handleInputChange}
          style={{ width: '100%', height: '300px' }}
        />
      </div>
      <div style={{ float: 'left', width: '50%', padding: '20px' }}>
        <h2>页面预览</h2>
        <div
          dangerouslySetInnerHTML={{ __html: htmlCode }}
          style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px' }}
        />
      </div>
    </div>
  );
};

export default memo(HtmlHelper);

import { forwardRef, memo, useImperativeHandle, useState } from 'react';
//type
import styles from './index.module.scss';
import { Button, Modal } from '@douyinfe/semi-ui';
import { IconCopy, IconMaximize } from '@douyinfe/semi-icons';
import { handleCopy } from '@/utils/common';

interface AiToolProps {
  isText?: boolean;
  respondHoodle?: (result: string) => void; //关联数据
}
interface CropperRef {
  submitHoodle: (v: string) => void; //父类调用
}

const HtmlHelper = forwardRef<CropperRef, AiToolProps>(function HtmlHelper(
  { isText, respondHoodle },
  ref
) {
  useImperativeHandle(ref, () => ({
    submitHoodle: setHtmlCode
  }));
  const [htmlCode, setHtmlCode] = useState(''); // 用于存储用户输入的HTML代码
  const [openVisible, setOpenVisible] = useState(false);
  const handleInputChange = (event: any) => {
    setHtmlCode(event.target.value); // 更新用户输入的HTML代码
  };
  return (
    <div className={styles.htmlHelper}>
      <div style={{ width: '50%' }}>
        <div className={styles.titleSpan}>输入HTML代码</div>
        <textarea
          value={htmlCode}
          onChange={handleInputChange}
          style={{ width: '100%', height: '300px', backgroundColor: '#EEF9EB' }}
        />
      </div>
      <div style={{ width: '50%' }}>
        <div className={styles.titleSpan}>
          页面预览
          <Button
            onClick={() => setOpenVisible(true)}
            style={{ float: 'right' }}
            theme="solid"
            icon={<IconMaximize />}
          >
            放大展示
          </Button>
          <Button
            style={{ float: 'right', marginRight: 5 }}
            type="secondary"
            onClick={() => handleCopy(htmlCode)}
            icon={<IconCopy />}
          >
            复制生成内容
          </Button>
        </div>
        <div
          onClick={() => setOpenVisible(true)}
          dangerouslySetInnerHTML={{ __html: htmlCode }}
          style={{
            border: '1px solid #ccc',
            minHeight: '300px',
            backgroundColor: '#ffffff',
            cursor: 'pointer'
          }}
        />
      </div>
      <Modal
        title={'页面放大展示'}
        footer={null}
        visible={openVisible}
        onCancel={() => setOpenVisible(false)}
        closeOnEsc
        width={'90vw'}
        zIndex={99}
      >
        <div
          dangerouslySetInnerHTML={{ __html: htmlCode }}
          style={{
            border: '1px solid #ccc',
            minHeight: 500,
            minWidth: 700,
            backgroundColor: '#ffffff',
            marginBottom: 20
          }}
        />
      </Modal>
    </div>
  );
});

export default memo(HtmlHelper);

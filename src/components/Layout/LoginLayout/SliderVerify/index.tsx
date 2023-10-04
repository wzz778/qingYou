import React, { useRef, useState, MutableRefObject } from 'react';
import styles from './index.module.scss';
import { Spin } from '@douyinfe/semi-ui';
import { IconSpin } from '@douyinfe/semi-icons';
export default function Slider(props: any) {
  const leftRef: MutableRefObject<any> = useRef();
  const rootRef: MutableRefObject<any> = useRef();
  const rightRef: MutableRefObject<any> = useRef();
  const centerRef: MutableRefObject<any> = useRef();
  const [successText, setSuccessText] = useState<any>('');
  const [textTitle, setTextTitle] = useState('请移动滑块至最右边');
  const [loading, setLoading] = useState(false);
  const antIcon = <IconSpin style={{ fontSize: 24 }} spin />;
  const lashen = (events: any) => {
    var mouseDownX = events.clientX; // 左边位置
    var Wl = leftRef.current.clientWidth;
    leftRef.current.style.backgroundColor = '#76CD4B';
    rootRef.current.style.borderColor = '#76CD4B';
    setSuccessText('');
    rootRef.current.onmousemove = function (event: { clientX: number }) {
      setTextTitle('');
      if (
        rootRef.current.offsetWidth -
          leftRef.current.offsetWidth -
          centerRef.current.offsetWidth -
          2 <
        1
      ) {
        setLoading(true);
        leftRef.current.style.width = 338 + 'px';
        rightRef.current.style.width = 0;
        leftRef.current.style.backgroundColor = '#76CD4B';
        rootRef.current.style.borderColor = '#76CD4B';
        setSuccessText('验证成功');
        props.resultClick(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        leftRef.current.style.width = event.clientX - mouseDownX + Wl + 'px';
        rightRef.current.style.width =
          rootRef.current.offsetWidth -
          leftRef.current.offsetWidth -
          centerRef.current.offsetWidth -
          2 +
          'px';
      }
    };
    rootRef.current.onmouseup = function () {
      setTextTitle('');
      if (
        rootRef.current.offsetWidth -
          leftRef.current.offsetWidth -
          centerRef.current.offsetWidth -
          2 >
        0
      ) {
        setLoading(true);
        leftRef.current.style.backgroundColor = '#F6535B';
        rootRef.current.style.borderColor = '#F6535B';
        props.resultClick(false);
        setTimeout(() => {
          rootRef.current.style.borderColor = '#d9d9d9';
          setTextTitle('请移动滑块至最右边');
          leftRef.current.style.width = 0;
          rightRef.current.style.width = 338 + 'px';
          setLoading(false);
        }, 500);
      }
      rootRef.current.onmousemove = null;
    };
  };
  return (
    <div className={styles['simple-wrap']}>
      <Spin indicator={antIcon} spinning={loading}>
        <div ref={rootRef} className={styles['simple-verify']}>
          <div ref={leftRef} className={styles['simple-left']}>
            {successText}
          </div>
          <div onMouseDown={lashen} ref={centerRef} className={styles['simple-slider']}>
            {'>>>'}
          </div>
          <div ref={rightRef} className={styles['simple-right']}>
            {textTitle}
          </div>
        </div>
      </Spin>
    </div>
  );
}

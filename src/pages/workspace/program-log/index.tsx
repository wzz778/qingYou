import { memo, useEffect, useState } from 'react';
// import classNames from "classnames";

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Descriptions } from '@douyinfe/semi-ui';
import { IconArrowUp } from '@douyinfe/semi-icons';
import None from '@/components/dataAcquisition/None';
interface IProps {
  datas?: any[];
}
const ProjectLog: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const data = [
    { key: '总执行总数', value: <span style={{ color: '#3381DA' }}>0</span> },
    {
      key: '成功条数',
      value: <span style={{ color: '#06C05F' }}>0</span>
    },
    { key: '失败条数', value: <span style={{ color: '#DB4A37' }}>0</span> }
  ];
  const style = {
    boxShadow: 'var(--semi-shadow-elevated)',
    backgroundColor: 'var(--semi-color-bg-2)',
    borderRadius: '4px',
    padding: '10px',
    marginRight: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  };

  return (
    <div className={styles.ProjectLog}>
      <Descriptions data={data} row align="center" size="large" style={style} />
      <None title="什么也没有呢~" />
    </div>
  );
};

export default memo(ProjectLog);
ProjectLog.displayName = 'ProjectLog';

import { memo, useEffect, useState } from 'react';
import cName from 'classnames';

//type
import type { FC, JSX } from 'react';
import styles from './index.module.scss';
import { Avatar, Button, Input, Select, Tag } from '@douyinfe/semi-ui';
import { OptionProps, RenderSelectedItemFn } from '@douyinfe/semi-ui/lib/es/select';
import Option from '@douyinfe/semi-ui/lib/es/select/option';
import install from '@/utils/validator';
import { ToastWaring } from '@/utils/common';
import CustomAvatar from '../CustomAvatar';

interface Props {
  onChange: (v: any) => void;
  initialList?: MemberListProps[];
}
interface MemberListProps {
  nickname: string;
  username: string;
  img?: string;
}

const renderMultipleWithCustomTag: RenderSelectedItemFn = (optionNode: any, { onClose }) => {
  const content = (
    <Tag
      avatarSrc={optionNode.img}
      avatarShape="circle"
      closable={true}
      onClose={onClose}
      size="large"
    >
      {optionNode.nickname}
    </Tag>
  );
  return {
    isRenderInTag: false,
    content
  };
};
const renderCustomOption = (item: MemberListProps, index: number) => {
  const optionStyle = {
    display: 'flex',
    paddingLeft: 24,
    paddingTop: 10,
    paddingBottom: 10
  };
  return (
    <Select.Option value={item.username} style={optionStyle} showTick={true} {...item} key={index}>
      <CustomAvatar src={item?.img ?? ''} username={item?.nickname as string} size="small" />
      <div style={{ marginLeft: 8 }}>
        <div style={{ fontSize: 14 }}>{item.nickname}</div>
        <div
          style={{
            color: 'var(--color-text-2)',
            fontSize: 12,
            lineHeight: '16px',
            fontWeight: 'normal'
          }}
        >
          {item.username}
        </div>
      </div>
    </Select.Option>
  );
};
const AddSelect: FC<Props> = ({ onChange, initialList }) => {
  const [allList, setAllList] = useState<MemberListProps[]>([]);
  console.log(allList);
  useEffect(() => {
    if (initialList) {
      setAllList(initialList);
    } else {
      setAllList([]);
    }
  }, [initialList]);

  const [inputValue, setInputValue] = useState('');
  const addEmail = (email: string) => {
    const emailError = install.emailValidate(email);
    if (emailError) {
      ToastWaring(emailError);
    } else {
      setAllList([
        ...allList,
        {
          nickname: email,
          username: email
        }
      ]);
      setInputValue('');
    }
  };
  let outSlotNode = (
    <div>
      <span className={styles.outSlotNode} style={{ color: 'var(--semi-color-link)' }}>
        <Input
          placeholder="输入你要添加的邮箱"
          prefix="邮箱"
          onChange={setInputValue}
          value={inputValue}
          width={80}
          showClear
        ></Input>
        <Button type="primary" theme="solid" onClick={() => addEmail(inputValue)}>
          添加邮箱
        </Button>
      </span>
    </div>
  );
  return (
    <Select
      outerBottomSlot={outSlotNode}
      placeholder="选择你要发送的对象"
      onChange={onChange}
      autoAdjustOverflow={false}
      multiple
      position="bottom"
      renderSelectedItem={renderMultipleWithCustomTag}
    >
      {allList.map((item, index) => renderCustomOption(item, index))}
    </Select>
  );
};

export default memo(AddSelect);

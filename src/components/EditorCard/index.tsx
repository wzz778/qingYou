import { Card, Button, Input, TextArea } from '@douyinfe/semi-ui';

import styles from './index.module.scss';
import { useEffect, useState } from 'react';

interface BaseSettingCardProps {
  title: string;
  tips?: string;
  description?: string;
  footer?: React.ReactNode;
  onlyDisplay?: boolean;
}

interface InputSettingCardProps extends BaseSettingCardProps {
  type: 'input';
  placeholder: string;
  value: string;
  initialValue: string;
  onInputChange: (
    value: string,
    e: React.MouseEvent<HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
  loading?: boolean;
  isExternallyDisabled?: boolean;
}

interface CumstomSettingCardProps extends BaseSettingCardProps {
  type: 'customDefinition';
  children: React.ReactNode;
}

type SettingCardProps = InputSettingCardProps | CumstomSettingCardProps;

const EditorCard = (props: SettingCardProps) => {
  const { title, type, tips, description, footer, onlyDisplay } = props;

  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (
    value: string,
    e: React.MouseEvent<HTMLTextAreaElement>
  ) => {
    if (type === 'input') {
      setIsDisabled(value === (props as InputSettingCardProps).initialValue);
      props.onInputChange && props.onInputChange(value, e);
    }
  };

  const finalDisabled =
    isDisabled || (props as InputSettingCardProps).isExternallyDisabled;

  const getFooter = () => {
    return footer ? (
      footer
    ) : (
      <div className={styles.footerStyle}>
        {tips}
        {type === 'input' && (
          <Button
            theme='solid'
            type='primary'
            onClick={(props as InputSettingCardProps).onSave}
            disabled={finalDisabled}
            loading={(props as InputSettingCardProps).loading}
          >
            保存
          </Button>
        )}
      </div>
    );
  };
  return (
    <Card
      className={styles.SettingCard}
      cover={
        <div className={styles.cardCover}>
          <div className={styles.title}>{title}</div>
          {type === 'input' ? (
            <TextArea
              autosize
              rows={1}
              value={
                (props as InputSettingCardProps).value ||
                (props as InputSettingCardProps).initialValue
              }
              onChange={handleInputChange}
              placeholder={(props as InputSettingCardProps).placeholder}
              disabled={onlyDisplay}
            />
          ) : (
            props.children
          )}
        </div>
      }
      footerLine={true}
      footerStyle={{
        backgroundColor: 'rgb(250, 250, 250)',
        minHeight: 57,
        fontSize: '0.875rem',
        lineHeight: 1.6,
        padding: '12px 24px',
      }}
      footer={!onlyDisplay && getFooter()}
      bodyStyle={{ display: 'none' }}
    />
  );
};

export default EditorCard;

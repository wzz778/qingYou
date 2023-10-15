import { memo } from 'react';
import classNames from 'classnames';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Form, Button, Space } from '@douyinfe/semi-ui';
import CronInput from '@/components/CronInput';
interface IProps {
  datas?: any[];
}

const Program: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const { Input, DatePicker, Select, Switch } = Form;
  return (
    <div className={styles.Project}>
      <Form
        wrapperCol={{ span: 20 }}
        labelCol={{ span: 3 }}
        labelPosition="left"
        labelAlign="right"
        onSubmit={(values) => console.log(values)}
      >
        {({ formState, values, formApi }) => (
          <>
            <Input
              field="name"
              label="考试名称"
              initValue="TCS任务平台使用"
              style={{ width: 560 }}
            />
            <DatePicker
              field="date"
              type="dateTime"
              initValue={new Date()}
              style={{ width: 272 }}
              label={{ text: '开始时间', required: true }}
            />
            <Select
              field="users"
              label={{ text: '考生', required: true }}
              style={{ width: 560 }}
              multiple
              initValue={['1', '2', '3', '4']}
            >
              <Select.Option value="1">曲晨一</Select.Option>
              <Select.Option value="2">夏可曼</Select.Option>
              <Select.Option value="3">曲晨三</Select.Option>
              <Select.Option value="4">蔡妍</Select.Option>
            </Select>
            <Switch
              field="open"
              label={{ text: '定时邮箱', required: true }}
              checkedText="开"
              uncheckedText="关"
            ></Switch>
            {formState.values.open ? <CronInput /> : null}
            <Space>
              <Button
                type="primary"
                theme="solid"
                htmlType="submit"
                style={{ width: 120, marginTop: 12, marginLeft: 100 }}
              >
                创建考试
              </Button>
              <Button style={{ marginTop: 12 }}>预览</Button>
            </Space>
          </>
        )}
      </Form>
    </div>
  );
};

export default memo(Program);
Program.displayName = 'Program';

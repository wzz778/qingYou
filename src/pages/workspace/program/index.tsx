import { memo } from 'react';
import classNames from 'classnames';

//type
import type { FC } from 'react';
import styles from './index.module.scss';
import { Form, Button, Space } from '@douyinfe/semi-ui';
interface IProps {
  datas?: any[];
}

const Program: FC<IProps> = (props) => {
  const { datas = [] } = props;
  const {
    Section,
    Input,
    DatePicker,
    TimePicker,
    Select,
    Switch,
    InputNumber,
    Checkbox,
    CheckboxGroup,
    RadioGroup,
    Radio
  } = Form;
  return (
    <div className={styles.Project}>
      <div>
        <Form style={{ width: 560 }} onSubmit={(values) => console.log(values)}>
          <Section text={'基本信息'}>
            <Input
              field="name"
              label="考试名称"
              initValue="TCS任务平台使用"
              style={{ width: 560 }}
            />
          </Section>

          <DatePicker
            field="date"
            type="dateTime"
            initValue={new Date()}
            style={{ width: 272 }}
            label={{ text: '开始时间', required: true }}
          />
          <div style={{ display: 'flex' }}>
            <Input
              field="time"
              label="考试时长"
              style={{ width: 176 }}
              initValue={'60'}
              addonAfter="分钟"
            />
            <Checkbox
              initValue={true}
              noLabel
              field="auto"
              style={{ paddingTop: 30, marginLeft: 12 }}
            >
              到时间自动交卷
            </Checkbox>
          </div>
          <div style={{ display: 'flex' }}>
            <Switch
              field="open"
              label={{ text: '对外开放', required: true }}
              checkedText="开"
              uncheckedText="关"
            ></Switch>
          </div>
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
          <Space>
            <Button
              type="primary"
              theme="solid"
              htmlType="submit"
              style={{ width: 120, marginTop: 12, marginRight: 4 }}
            >
              创建考试
            </Button>
            <Button style={{ marginTop: 12 }}>预览</Button>
          </Space>
        </Form>
      </div>
    </div>
  );
};

export default memo(Program);
Program.displayName = 'Program';

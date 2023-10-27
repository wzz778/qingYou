import { Button, ConfigProvider, TimePicker } from '@douyinfe/semi-ui';
import { Fragment, useEffect, useState } from 'react';
import { Select } from '@douyinfe/semi-ui';
import moment from 'moment';
//引入数据
import { dayOfTheMonthOption, dayOfTheWeekData } from '@/utils/cron';
import CronViewer from './CronViewer';
import useMount from '@/hooks/useMount';
import cronParser, { CronDate } from 'cron-parser';
import styles from './index.module.scss';
moment.locale('zh-cn');
const { Option } = Select;
const format = 'HH:mm';
const defaultCron = '0 0 0 * * ?';
const space = ' '; //空格
//类型选择
const timeTypes = [
  { key: 'everyDay', label: '每天' },
  { key: 'everyWeek', label: '每周' },
  { key: 'everyMonth', label: '每月' }
];

interface Props {
  initialCron?: string;
  onChange?: (cron?: string) => void;
  orChange?: boolean;
}
const CronInput: React.FC<Props> = ({ initialCron, onChange, orChange }) => {
  const [defaultTimeType, setDefaultTimeType] = useState(timeTypes[0].key); //选择类型
  const [selectedValue, setSelectedValue] = useState<string[]>([]); //日期，多选数组
  const [selectTime, setSelectTime] = useState<any>(null); //时间
  if (!initialCron) {
    initialCron = defaultCron;
  }
  const [expression, setExpression] = useState<string | null>(initialCron); //bzd
  const extractValuesFromCronExpression = async (cronExpression: string) => {
    const daysOfWeekRegex = /([A-Z]{3})(,[A-Z]{3})*/g;
    const monthsRegex = /(\d+)(,\d+)*/g;

    if (daysOfWeekRegex.test(cronExpression)) {
      setDefaultTimeType('everyWeek');
      const match = cronExpression.match(daysOfWeekRegex);
      if (match) {
        const daysOfWeek = match[0].split(',');
        setSelectedValue(daysOfWeek);
      }
    } else {
      if (cronExpression.split('*').length == 3) {
        return;
      }
      setDefaultTimeType('everyMonth');
      const match = cronExpression.match(monthsRegex);
      if (match) {
        const months = match[3]?.split(',');
        setSelectedValue(months);
      }
    }
  };
  useMount(async () => {
    if (initialCron && initialCron != defaultCron) {
      setExpression(initialCron);
      const interval = cronParser.parseExpression(initialCron);
      const nextDate = interval.next().toDate();
      const nextMoment = moment(nextDate);
      extractValuesFromCronExpression(initialCron);
      setSelectTime(nextMoment);
      onChange?.(initialCron);
    }
  });
  //类型选择函数
  const handleTimeTypeChange = (selectValue: string) => {
    setDefaultTimeType(selectValue);
    setSelectTime(null);
    setSelectedValue([]);
    setExpression(defaultCron);
  };

  //时间选择函数
  const handleTimeChange = (time: moment.Moment | null) => {
    setSelectTime(time);
    if (!time) return;
    const currentCron = expression ? expression.split(' ') : [];
    const [seconds, , , dayOfMonth, month1, dayOfWeek] = currentCron;
    console.log(expression);
    const minutes = moment(time).minutes().toString(); //获取分钟
    const hours = moment(time).hours().toString(); //获取小时
    let result = null;
    if (!Number.isNaN(Number(hours)) && !Number.isNaN(Number(minutes))) {
      const minutesAndHour = seconds
        .concat(space)
        .concat(minutes)
        .concat(space)
        .concat(hours)
        .concat(space);
      if (defaultTimeType === 'everyDay') result = minutesAndHour.concat('* * ?');
      if (defaultTimeType !== 'everyDay')
        result = minutesAndHour
          .concat(dayOfMonth)
          .concat(space)
          .concat(month1)
          .concat(space)
          .concat(dayOfWeek);
    }
    if (result) onChange?.(result);
    setExpression(result);
  };

  const handleSelectChange = (data: string[]) => {
    setSelectedValue(data);
    const selectValues = data.join(',');
    const currentCron = expression ? expression.split(' ') : [];
    const [seconds, minutes, hours, dayOfMonth, month1, dayOfWeek] = currentCron;

    let result = '';

    if (defaultTimeType === 'everyWeek') {
      result = seconds
        .concat(space)
        .concat(minutes)
        .concat(space)
        .concat(hours)
        .concat(space)
        .concat(dayOfMonth)
        .concat(space)
        .concat(month1)
        .concat(space)
        .concat(selectValues);
    }
    if (defaultTimeType === 'everyMonth') {
      result = seconds
        .concat(space)
        .concat(minutes)
        .concat(space)
        .concat(hours)
        .concat(space)
        .concat(data.length ? selectValues : '*')
        .concat(space)
        .concat(month1)
        .concat(space)
        .concat(dayOfWeek);
    }
    if (selectTime) onChange?.(result);
    setExpression(result);
  };

  const RenderSelect = ({
    placeholder,
    data = []
  }: {
    placeholder: string;
    data: { key: string; label: string }[];
  }) => {
    return (
      <Fragment>
        <Select
          multiple
          placeholder={placeholder}
          onChange={(val: any) => handleSelectChange(val)}
          style={{ marginRight: '16px', width: 'auto' }}
          value={selectedValue}
        >
          {data.map((item: { key: string; label: string }) => (
            <Option key={item.key} value={item.key}>
              {item.label}
            </Option>
          ))}
        </Select>
        <ConfigProvider>
          <TimePicker
            value={selectTime && moment(selectTime, format).toDate()}
            format={format}
            placeholder="请选择时间"
            onChange={(val: any) => handleTimeChange(val)}
          />
        </ConfigProvider>
      </Fragment>
    );
  };
  return (
    <div className={styles.cronInput}>
      {orChange && <div className={styles.cronMask}></div>}
      <Select
        // role="cron-type"
        style={{ marginRight: '16px', width: 'auto' }}
        placeholder="请选择类型"
        onChange={(val: any) => handleTimeTypeChange(val)}
        value={defaultTimeType}
      >
        {timeTypes.map((item) => (
          <Option key={item.key} value={item.key}>
            {' '}
            {item.label}
          </Option>
        ))}
      </Select>
      {defaultTimeType === 'everyDay' && (
        <ConfigProvider>
          <TimePicker
            value={selectTime && moment(selectTime, format).toDate()}
            format={format}
            placeholder="请选择时间"
            onChange={(val: any) => handleTimeChange(val)}
          />
        </ConfigProvider>
      )}
      {defaultTimeType === 'everyWeek' && (
        <RenderSelect data={dayOfTheWeekData} placeholder="请选择星期" />
      )}
      {defaultTimeType === 'everyMonth' && (
        <RenderSelect data={dayOfTheMonthOption} placeholder="请选择日期" />
      )}
      {expression && !orChange && <CronViewer cronExpression={expression} />}
    </div>
  );
};

export default CronInput;

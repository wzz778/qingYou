import React, { useEffect, useState } from 'react';
import cronParser, { CronDate } from 'cron-parser';
import { Space, Tag } from '@douyinfe/semi-ui';
import { IconAlarm } from '@douyinfe/semi-icons';

interface CronViewerProps {
  cronExpression: string;
}

const CronViewer: React.FC<CronViewerProps> = ({ cronExpression }) => {
  const [nextExecutionTimes, setNextExecutionTimes] = useState<string[]>([]);

  useEffect(() => {
    handleViewClick();
  }, [cronExpression]);

  const handleViewClick = () => {
    try {
      const options = {
        currentDate: new Date(),
        iterator: true
      };
      const interval = cronParser.parseExpression(cronExpression, options);

      const nextTimes: string[] = [];
      for (let i = 0; i < 3; i++) {
        const { value } = interval.next() as IteratorResult<CronDate>;
        const date = value.toDate();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        nextTimes.push(formattedDate);
      }
      setNextExecutionTimes(nextTimes);
    } catch (error) {
      console.error('Invalid cron expression:', error);
    }
  };

  return (
    <div style={{ padding: 4, marginTop: 5, width: 530, backgroundColor: '#F4F5F5' }}>
      <Tag
        color="light-blue"
        style={{ marginRight: 8 }}
        prefixIcon={<IconAlarm />}
        size="large"
        type="light"
      >
        下三次发送时间:
      </Tag>
      {nextExecutionTimes.length > 0 && (
        <Space>
          {nextExecutionTimes.map((time, index) => (
            <Tag size="large" key={index}>
              {time}
            </Tag>
          ))}
        </Space>
      )}
    </div>
  );
};

export default CronViewer;

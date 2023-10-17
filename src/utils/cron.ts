export const dayOfTheWeekData = [
  { key: 'MON', label: '星期一' },
  { key: 'TUE', label: '星期二' },
  { key: 'WED', label: '星期三' },
  { key: 'THU', label: '星期四' },
  { key: 'FRI', label: '星期五' },
  { key: 'SAT', label: '星期六' },
  { key: 'SUN', label: '星期天' }
];

export const dayOfTheWeekOption = [
  { key: '1', label: '星期一' },
  { key: '2', label: '星期二' },
  { key: '3', label: '星期三' },
  { key: '4', label: '星期四' },
  { key: '5', label: '星期五' },
  { key: '6', label: '星期六' },
  { key: '7', label: '星期天' }
];

export const monthOption = [
  { key: '1', label: '一月' },
  { key: '2', label: '二月' },
  { key: '3', label: '三月' },
  { key: '4', label: '四月' },
  { key: '5', label: '五月' },
  { key: '6', label: '六月' },
  { key: '7', label: '七月' },
  { key: '8', label: '八月' },
  { key: '9', label: '九月' },
  { key: '10', label: '十月' },
  { key: '11', label: '十一月' },
  { key: '12', label: '十二月' }
];

//获取dayOfTheMonthOption的每月对象
function getDayOfTheMonthOption() {
  const days = [];
  for (let i = 1; i < 32; i += 1) {
    days.push({ key: i.toString(), label: i.toString().concat('号') });
  }
  return days;
}

export const dayOfTheMonthOption = getDayOfTheMonthOption();

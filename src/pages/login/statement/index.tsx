import styles from './index.module.scss';
import { Form, Button, AutoComplete } from '@douyinfe/semi-ui';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
import { ToastError, ToastSuccess, ToastWaring } from '@/utils/common';
import { IconHelpCircle, IconMail, IconUser } from '@douyinfe/semi-icons';
import VerificationCodeInput from '@/components/VerificationCodeInput';
import { RegisterByEmail, checkEmail, register } from '@/api/modules/login';
export default function Statement() {
  return <main className={styles.loginScreen}>43534</main>;
}

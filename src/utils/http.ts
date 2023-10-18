import { Hyrequire } from '@/api';
import { ToastError } from './common';

export function Handle401(message: string) {
  const { pathname } = window.location;
  if (!pathname.includes('login') && pathname !== '/') {
    ToastError(message);
    window.location.href = '/login';
  }
}

export const fetcher = (url: string) => Hyrequire.get({ url }).then((res) => res.data);

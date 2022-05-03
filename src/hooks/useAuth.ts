import { useMemo } from 'react';

import { selectAuth } from '../features/auth/authSlice';
import { useAppSelector } from '../store';

export const useAuth = () => {
  const auth = useAppSelector(selectAuth);
  return useMemo(() => auth, [auth]);
};

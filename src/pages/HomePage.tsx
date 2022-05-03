import { Button } from 'antd';

import { Counter } from '../features/counter/Counter';
import { useGetTasksQuery } from '../services/tasks';

export const HomePage = () => {
  const { data, error, isLoading } = useGetTasksQuery();
  return (
    <>
      <Counter />
      <Button type="primary">Primary Button</Button>
      This is home page
    </>
  );
};

import { useRoutes } from 'react-router-dom';

import { HomePage, LoginPage, NotFoundPage } from '../pages';

// import { PrivateRoute } from './PrivateRoute';

const AppRouter = () => {
  const elements = useRoutes([
    { path: '/login', element: <LoginPage /> },
    { path: '/', element: <HomePage /> },
    // {
    //   element: <PrivateRoute />,
    //   children: [
    //     {
    //       path: '/',
    //       element: <BasicLayout />,
    //       children: [
    //         {
    //           path: 'sale',
    //           // element: <SalePage />,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // Not found routes work as you'd expect
    { path: '*', element: <NotFoundPage /> },
  ]);

  return elements;
};

export default AppRouter;

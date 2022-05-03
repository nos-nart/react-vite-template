import ReactDOM from 'react-dom/client';

import { initMocks } from '../mocks';

import App from './App';
import 'antd/dist/antd.less';
import './styles/global.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
);

if (process.env.NODE_ENV === 'development') {
  initMocks().then(() => {
    root.render(<App />);
  });
} else {
  root.render(<App />);
}

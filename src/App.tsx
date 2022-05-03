import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './router/AppRouter';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRouter />
      </Router>
    </Provider>
  );
}

export default App;

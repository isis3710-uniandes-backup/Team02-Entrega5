import ReactDOM from 'react-dom';
import { makeRoutes } from './routes';

import * as serviceWorker from './serviceWorker';

const routes = makeRoutes();

ReactDOM.render(routes, document.getElementById('root'));

serviceWorker.register();

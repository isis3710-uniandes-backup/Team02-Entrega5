import ReactDOM from 'react-dom';
import { makeRoutes } from './routes';

const routes = makeRoutes();

ReactDOM.render(routes, document.getElementById('root'));

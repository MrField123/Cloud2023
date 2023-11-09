
import CreationPage from '../pages/creation.jsx';
import RedemptionPage from '../pages/redemption.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: CreationPage,
  },
  {
    path: '/redemption/',
    component: RedemptionPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;

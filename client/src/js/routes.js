
import CreationPage from '../pages/creation.jsx';
import FormPage from '../pages/form.jsx';
import RedemptionPage from '../pages/redemption.jsx';
import ManagementPage from '../pages/management.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: CreationPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/redemption/',
    component: RedemptionPage,
  },
  {
    path: '/management/',
    component: ManagementPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;

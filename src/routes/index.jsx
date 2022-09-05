import Home from '~/pages/Home';
import Login from '~/pages/Login';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

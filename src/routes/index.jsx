import { Home } from '~/pages/Home';
import { LoginRegister } from '~/pages/LoginRegister';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginRegister },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

import { Home } from '~/pages/Home';
import { LoginRegister } from '~/pages/LoginRegister';
import { ArticleDetail } from '~/pages/ArticleDetail';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginRegister },
    { path: '/ArticleDetail', component: ArticleDetail },
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

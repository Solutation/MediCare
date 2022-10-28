import { Home } from '~/pages/Home';
import { LoginRegister } from '~/pages/LoginRegister';
import { Contact } from '~/pages/Contact';
import { HeaderOnly } from '~/Layouts/HeaderOnly';
import { ArticleDetail } from '~/pages/ArticleDetail';
import { ProfessorDetail } from '~/pages/ProfessorDetail';
import { ProfessorList } from '~/pages/ProfessorList';
import { Community } from '~/pages/Community';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginRegister, layout: HeaderOnly, login: true },
    { path: '/register', component: LoginRegister, layout: HeaderOnly, login: false },
    { path: '/contact', component: Contact, layout: HeaderOnly },
    { path: '/ArticleDetail', component: ArticleDetail, layout: HeaderOnly },
    { path: '/ProfessorDetail', component: ProfessorDetail, layout: HeaderOnly },
    { path: '/ProfessorList', component: ProfessorList, layout: HeaderOnly },
    { path: '/community', component: Community }
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

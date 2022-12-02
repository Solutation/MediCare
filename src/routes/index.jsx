import { Home } from '~/pages/Home';
import { LoginRegister } from '~/pages/LoginRegister';
import { Contact } from '~/pages/Contact';
import { HeaderOnly } from '~/Layouts/HeaderOnly';
import { AdminLayout } from '~/Layouts/AdminLayout';
import { Community } from '~/pages/Community';
import { Profile } from '~/pages/Profile';
import { Admin } from '~/pages/Admin';
import { ArticleDetail } from '~/pages/ArticleDetail';
import { ProfessorDetail } from '~/pages/ProfessorDetail';
import { ProfessorList } from '~/pages/ProfessorList';
import { Categories } from '~/pages/Categories';
import { ToolCategories } from '~/pages/ToolCategories';
import { ArticleList } from '~/pages/ArticleList';
import { ToolCaculator } from '~/pages/ToolCaculator';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginRegister, layout: HeaderOnly, login: true },
    { path: '/register', component: LoginRegister, layout: HeaderOnly, login: false },
    { path: '/contact', component: Contact, layout: HeaderOnly },
    { path: '/profile', component: Profile },
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/news', component: ArticleDetail },
    { path: '/consultant', component: ProfessorDetail },
    { path: '/consultant/list', component: ProfessorList },
    { path: '/categories', component: Categories },
    { path: '/tools', component: ToolCategories },
    { path: '/community', component: Community },
    { path: '/article', component: ArticleList },
    { path: 'tools/calculator', component: ToolCaculator }
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

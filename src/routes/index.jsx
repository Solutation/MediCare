import { Home } from '~/pages/Home';
import { LoginRegister } from '~/pages/LoginRegister';
import { Contact } from '~/pages/Contact';
import { HeaderOnly } from '~/Layouts/HeaderOnly';
import { AdminLayout } from '~/Layouts/AdminLayout';
import { Community } from '~/pages/Community';
import { Profile } from '~/pages/Profile';
import { Admin } from '~/pages/Admin';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginRegister, layout: HeaderOnly, login: true },
    { path: '/register', component: LoginRegister, layout: HeaderOnly, login: false },
    { path: '/contact', component: Contact, layout: HeaderOnly },
    { path: '/community', component: Community },
    { path: '/profile', component: Profile },
    { path: '/admin', component: Admin, layout: AdminLayout }
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

import { Home } from '~/pages/Home';
import { LoginRegister } from '~/pages/LoginRegister';
import { Contact } from '~/pages/Contact';
import { HeaderOnly } from '~/Layouts/HeaderOnly';
<<<<<<< HEAD
import { AdminLayout } from '~/Layouts/AdminLayout';
import { Community } from '~/pages/Community';
import { Profile } from '~/pages/Profile';
import { Admin } from '~/pages/Admin';
=======
import { ArticleDetail } from '~/pages/ArticleDetail';
import { ProfessorDetail } from '~/pages/ProfessorDetail';
import { ProfessorList } from '~/pages/ProfessorList';
import { Community } from '~/pages/Community';
import { Categories } from '~/pages/Categories';
import { OvulationCalculator } from '~/pages/OvulationCalculator';
import { BMRCalculator } from '~/pages/BMRCalculator';
import { ToolCategories } from '~/pages/ToolCategories';
import { ArticleList } from '~/pages/ArticleList';
>>>>>>> front_end_dev

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginRegister, layout: HeaderOnly, login: true },
    { path: '/register', component: LoginRegister, layout: HeaderOnly, login: false },
    { path: '/contact', component: Contact, layout: HeaderOnly },
<<<<<<< HEAD
    { path: '/community', component: Community },
    { path: '/profile', component: Profile },
    { path: '/admin', component: Admin, layout: AdminLayout }
=======
    { path: '/news', component: ArticleDetail },
    { path: '/professor', component: ProfessorDetail },
    { path: '/professorlist', component: ProfessorList },
    { path: '/categories', component: Categories },
    { path: '/toolovulation', component: OvulationCalculator },
    { path: '/toolbmr', component: BMRCalculator },
    { path: '/tools', component: ToolCategories },
    { path: '/community', component: Community },
    { path: '/articlelist', component: ArticleList }
>>>>>>> front_end_dev
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

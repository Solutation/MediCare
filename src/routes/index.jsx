import { Home } from '~/pages/Home';
import { LoginRegister } from '~/pages/LoginRegister';
import { Contact } from '~/pages/Contact';
import { HeaderOnly } from '~/Layouts/HeaderOnly';
import { ArticleDetail } from '~/pages/ArticleDetail';
import { ProfessorDetail } from '~/pages/ProfessorDetail';
import { ProfessorList } from '~/pages/ProfessorList';
import { Community } from '~/pages/Community';

import { BlogNew } from '~/pages/BlogNew';
import { RateDoctors } from '~/pages/RateDocTors';
import { BMICalculator } from '~/pages/BMICalculator';
import { HeartCalculator } from '~/pages/HeartCalculator';
import { FindHospitals } from '~/pages/FindHospitals';

import { Categories } from '~/pages/Categories';
import { OvulationCalculator } from '~/pages/OvulationCalculator';
import { BMRCalculator } from '~/pages/BMRCalculator';
import { ToolCategories } from '~/pages/ToolCategories';
import { ArticleList } from '~/pages/ArticleList';


const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginRegister, layout: HeaderOnly, login: true },
    { path: '/register', component: LoginRegister, layout: HeaderOnly, login: false },
    { path: '/contact', component: Contact, layout: HeaderOnly },

    { path: '/community', component: Community },
    { path: '/blognews', component: BlogNew },
    { path: '/ratedoctor', component: RateDoctors },
    { path: '/bmicalculator', component: BMICalculator },
    { path: '/heartcalculator', component: HeartCalculator },
    { path: '/findhospitals', component: FindHospitals },

    { path: '/news', component: ArticleDetail },
    { path: '/professor', component: ProfessorDetail },
    { path: '/professorlist', component: ProfessorList },
    { path: '/categories', component: Categories },
    { path: '/toolovulation', component: OvulationCalculator },
    { path: '/toolbmr', component: BMRCalculator },
    { path: '/tools', component: ToolCategories },
    { path: '/community', component: Community },
    { path: '/articlelist', component: ArticleList }

];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

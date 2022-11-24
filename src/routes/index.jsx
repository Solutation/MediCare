import { Home } from '~/pages/Home';
import { LoginRegister } from '~/pages/LoginRegister';
import { Contact } from '~/pages/Contact';
import { HeaderOnly } from '~/Layouts/HeaderOnly';
import { Community } from '~/pages/Community';
import { BlogNew } from '~/pages/BlogNew';
import { RateDoctors } from '~/pages/RateDocTors';
import { BMICalculator } from '~/pages/BMICalculator';
import { HeartCalculator } from '~/pages/HeartCalculator';
import { FindHospitals } from '~/pages/FindHospitals';

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
    { path: '/findhospitals', component: FindHospitals }
];

const privateRoutes = {};

export { publicRoutes, privateRoutes };

// import { lazy } from 'react';

// import Layout from '../components/layout';
// import Loadable from '../elements/Loadable';
import Proposal from "../pages/proposal";

// const UIPage = Loadable(lazy(() => import('../pages/UI')));
import ScreeningPage from "../pages/screening";

const MainRoutes = {
    path: '/',
    children: [
        {
            path: '/proposal/:proposalUuid',
            element: <Proposal/>
        },
        {
            path: '/screening/:screeningUuid',
            element: <ScreeningPage/>
        },
    ]
};

export default MainRoutes;

import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';

export default function Routes() {
  return useRoutes([MainRoutes]);
}

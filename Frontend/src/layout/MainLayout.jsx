import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import {Footer} from './Footer';

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        {/* The <Outlet /> component is a placeholder that renders the */}
        {/* active page component (e.g., HomePage, FeaturesPage) */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
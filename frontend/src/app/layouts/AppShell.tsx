import { Outlet } from 'react-router-dom';
import { Header } from '@/features/header/components/Header';
import './AppShell.scss';

export function AppShell() {
  return (
    <div className="app-shell flex w-full justify-center px-4 py-4 sm:px-6">
      <div className="app-shell__container w-full max-w-[900px]">
        <nav className="flex justify-center">
          <div className="w-full py-3">
            <Header />
          </div>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

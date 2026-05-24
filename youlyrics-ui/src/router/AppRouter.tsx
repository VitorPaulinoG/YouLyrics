import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';
import { FeedPage } from '@/pages/FeedPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <FeedPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from '@/app/layouts/AppShell';
import { FeedPage } from '@/features/feed/pages/FeedPage';

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

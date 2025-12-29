import RootPage from './home-page';

// This page is now a simple Server Component.
// The middleware handles redirecting authenticated users to the dashboard.
export default function Page() {
  return <RootPage />;
}

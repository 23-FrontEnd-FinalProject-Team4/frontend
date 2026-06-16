import LandingPage from './_components/LandingPage';

const LOGIN_PAGE_PATH = '/login';

export default function Home() {
  return <LandingPage startHref={LOGIN_PAGE_PATH} />;
}

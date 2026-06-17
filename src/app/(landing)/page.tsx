import LandingPage from './_components/LandingPage';

const LOGIN_PAGE_PATH = '/login';

const Home = () => {
  return <LandingPage startHref={LOGIN_PAGE_PATH} />;
};
export default Home;

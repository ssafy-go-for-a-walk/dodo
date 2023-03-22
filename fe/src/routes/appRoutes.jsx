import SearchPage from "../pages/SearchPage";
import SocialPage from "../pages/SocialPage"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';

const appRoutes = [
  {
    path: "/",
    element: <SearchPage />,
    state: "home",
    sidebarProps: {
      displayText: "담으러 가기",
      icon: <SearchIcon />
    }
  },
  {
    path: "/SocialPage",
    element: <SocialPage />,
    state: "SocialPage",
    sidebarProps: {
      displayText: "구경하러 가기",
      icon: <LanguageIcon />
    }
  }
];

export default appRoutes;
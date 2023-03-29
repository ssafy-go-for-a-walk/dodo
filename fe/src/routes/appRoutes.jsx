import SearchPage from "../pages/search/SearchPage";
import SocialPage from "../pages/social/SocialPage";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ManagePage from "../pages/manage/ManagePage";

const appRoutes = [
  {
    path: "/",
    element: <SearchPage />,
    state: "home",
    sidebarProps: {
      displayText: "담으러 가기",
      icon: <SearchIcon />,
    },
  },
  {
    path: "/socialPage",
    element: <SocialPage />,
    state: "socialPage",
    sidebarProps: {
      displayText: "구경하러 가기",
      icon: <LanguageIcon />,
    },
  },
  {
    path: "/manage",
    element: <ManagePage />,
    state: "manage",
  },
];

export default appRoutes;

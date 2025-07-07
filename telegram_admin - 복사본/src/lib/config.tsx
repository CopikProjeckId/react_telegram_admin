import BotMessageSender from "../Router/Pages/Bot/MessageSender/BotMessageSender";
import SettingBot from "../Router/Pages/Bot/Setting/SettingBot";
import DashBoard from "../Router/Pages/Dashboard/DashBoard";
import CreateMission from "../Router/Pages/Mission/CreateMission";
import MissionList from "../Router/Pages/Mission/MissionList";
import CreateItem from "../Router/Pages/Shop/CreateItem";
import ShopList from "../Router/Pages/Shop/ShopList";
import UserList from "../Router/Pages/User/UserList";
import { ROUTES } from "./types/type";

export const ROUTES_COMPONENTS: Record<string, React.ReactNode> = {
  [ROUTES.DASHBOARD]: <DashBoard />,
  [ROUTES.USER_LIST]: <UserList />,
  [ROUTES.ITEM_LIST]: <ShopList />,
  [ROUTES.ITEM_CREATE]: <CreateItem />,
  [ROUTES.MISSION_LIST]: <MissionList />,
  [ROUTES.CREATE_MISSION]: <CreateMission />,
  [ROUTES.BOT_SETTING]: <SettingBot />,
  [ROUTES.BOT_MESSAGE_SENDER]: <BotMessageSender />,
};

import BotMessageSender from "../Router/Pages/Bot/MessageSender/BotMessageSender";
import SettingBot from "../Router/Pages/Bot/Setting/SettingBot";
import CheolsuUserList from "../Router/Pages/CheolsuUser/CheolsuUser";
import ConfigChanges from "../Router/Pages/Config/ConfigChange/ConfigChanges";
import ConfigChangeItemLevel from "../Router/Pages/Config/ItemLevel/ConfigChangeItemLevel";
import TugConfigChangeItemLevel from "../Router/Pages/Config/ItemLevel/TugConfigChangeItemLevel";
import DashBoard from "../Router/Pages/Dashboard/DashBoard";
import GameList from "../Router/Pages/Game/GameList";
import TugGameList from "../Router/Pages/GameTug/TugGameList";
import CreateMission from "../Router/Pages/Mission/CreateMission";
import MissionList from "../Router/Pages/Mission/MissionList";
import TugCreateMission from "../Router/Pages/MissionTug/CreateMission";
import TugMissionList from "../Router/Pages/MissionTug/MissionList";
import CreateItem from "../Router/Pages/Shop/CreateItem";
import ShopList from "../Router/Pages/Shop/ShopList";
import TugUserList from "../Router/Pages/TugUser/TugUserList";
import UserList from "../Router/Pages/User/UserList";
import Exchange from "../Router/Pages/Wallet/Exchange";
import RubyList from "../Router/Pages/Wallet/Ruby";
import TugExchange from "../Router/Pages/WalletTug/TugExchange";
import TugRubyList from "../Router/Pages/WalletTug/TugRuby";
import YoungheeExchange from "../Router/Pages/WalletYounghee/YoungheeExchange";
import YoungheeRubyList from "../Router/Pages/WalletYounghee/YoungheeRuby";
import YoungheeUserList from "../Router/Pages/YoungheeUser/YoungheeUser";
import { ROUTES } from "./types/type";

export const ROUTES_COMPONENTS: Record<string, React.ReactNode> = {
  [ROUTES.DASHBOARD]: <DashBoard />,
  [ROUTES.USER_LIST]: <UserList />,
  [ROUTES.TUG_USER_LIST]: <TugUserList />,
  [ROUTES.YOUNGHEE_USER_LIST]: <YoungheeUserList />, // Assuming Younghee User List is similar to User List
  [ROUTES.CHEOLSU_USER_LIST]: <CheolsuUserList />,
  [ROUTES.ITEM_LIST]: <ShopList />,
  [ROUTES.ITEM_CREATE]: <CreateItem />,
  [ROUTES.MISSION_LIST]: <MissionList />,
  [ROUTES.MISSION_LIST_TUG]: <TugMissionList />,
  [ROUTES.CREATE_MISSION]: <CreateMission />,
  [ROUTES.CREATE_MISSION_TUG]: <TugCreateMission />,
  [ROUTES.BOT_SETTING]: <SettingBot />,
  [ROUTES.BOT_MESSAGE_SENDER]: <BotMessageSender />,
  [ROUTES.CONFIG_CHANGE]: <ConfigChanges />,
  [ROUTES.CONFIG_CHANGE_ITEM]: <ConfigChangeItemLevel />,
  [ROUTES.GAME_LIST]: <GameList />,
  [ROUTES.GAME_LIST_TUG]: <TugGameList />,
  [ROUTES.EXCHANGE_LIST]: <Exchange />,
  [ROUTES.EXCHANGE_LIST_TUG]: <TugExchange />,
  [ROUTES.EXCHANGE_LIST_YOUNGHEE]: <YoungheeExchange />, // Assuming Younghee Exchange List is similar to Exchange
  [ROUTES.RUBY_LIST]: <RubyList />,
  [ROUTES.RUBY_LIST_TUG]: <TugRubyList />,
  [ROUTES.RUBY_LIST_YOUNGHEE]: <YoungheeRubyList />, // Assuming Younghee Ruby List is similar to Ruby List
  

  [ROUTES.CONFIG_CHANGE_ITEM_TUG]: <TugConfigChangeItemLevel />,
};

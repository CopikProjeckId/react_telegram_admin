import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
} from "@mui/material";
import { CSSProperties } from "react";
import { ROUTES } from "../../lib/types/type";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  sideController: () => void;
};

type MenuType = {
  title: string;
  type: "single" | "multiple";
  icon: React.ReactNode;
  link?: string;
  detail?: MenuType[];
};
const menu_list: MenuType[] = [
  {
    title: "Dashboard",
    type: "single",
    link: ROUTES.DASHBOARD,
    icon: <ExpandMore />,
  },
  {
    title: "User_List",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "User List",
        type: "single",
        link: ROUTES.USER_LIST,
        icon: <ExpandMore />,
      },
      {
        title: "Tug User List",
        type: "single",
        link: ROUTES.TUG_USER_LIST,
        icon: <ExpandMore />,
      },
      {
        title: "Younghee User List",
        type: "single",
        link: ROUTES.YOUNGHEE_USER_LIST,
        icon: <ExpandMore />,
      },
      // {
      //   title: "Cheolsu User List",
      //   type: "single",
      //   link: ROUTES.CHEOLSU_USER_LIST,
      //   icon: <ExpandMore />,
      // },
    ],
  },
  {
    title: "Game",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "Game List",
        type: "single",
        link: ROUTES.GAME_LIST,
        icon: <ExpandMore />,
      },
      {
        title: "Tug Game List",
        type: "single",
        link: ROUTES.GAME_LIST_TUG,
        icon: <ExpandMore />,
      },
    ],
  },
  {
    title: "Exchange",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "Exchange List",
        type: "single",
        link: ROUTES.EXCHANGE_LIST,
        icon: <ExpandMore />,
      },
      {
        title: "Tug Exchange List",
        type: "single",
        link: ROUTES.EXCHANGE_LIST_TUG,
        icon: <ExpandMore />,
      },
      {
        title: "Younghee Exchange List",
        type: "single",
        link: ROUTES.EXCHANGE_LIST_YOUNGHEE,
        icon: <ExpandMore />,
      }
    ],
  },
  {
    title: "Ruby",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "Ruby List",
        type: "single",
        link: ROUTES.RUBY_LIST,
        icon: <ExpandMore />,
      },
      {
        title: "Tug Ruby List",
        type: "single",
        link: ROUTES.RUBY_LIST_TUG,
        icon: <ExpandMore />,
      },
      {
        title: "Younghee Ruby List",
        type: "single",
        link: ROUTES.RUBY_LIST_YOUNGHEE,
        icon: <ExpandMore />,
      },
      // {
      //   title: "Cheolsu Ruby List",
      //   type: "single",
      //   link: ROUTES.RUBY_LIST_CHEOLSU,
      //   icon: <ExpandMore />,
      // },
    ],
  },
  {
    title: "Shop",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "Item List",
        type: "single",
        link: ROUTES.ITEM_LIST,
        icon: <ExpandMore />,
      },
      // {
      //   title: "Item Create",
      //   type: "single",
      //   link: ROUTES.ITEM_CREATE,
      //   icon: <ExpandMore />,
      // },
    ],
  },
  {
    title: "Mission",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "Mission List",
        type: "single",
        link: ROUTES.MISSION_LIST,
        icon: <ExpandMore />,
      },
      {
        title: "Create Mission",
        type: "single",
        link: ROUTES.CREATE_MISSION,
        icon: <ExpandMore />,
      },
      {
        title: "Tug Mission List",
        type: "single",
        link: ROUTES.MISSION_LIST_TUG,
        icon: <ExpandMore />,
      },
      {
        title: "Tug Create Mission",
        type: "single",
        link: ROUTES.CREATE_MISSION_TUG,
        icon: <ExpandMore />,
      },
    ],
  },
  {
    title: "custom",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "configChange",
        type: "single",
        link: ROUTES.CONFIG_CHANGE,
        icon: <ExpandMore />,
      },
      {
        title: "configChangeItem",
        type: "single",
        link: ROUTES.CONFIG_CHANGE_ITEM,
        icon: <ExpandMore />,
      },
      {
        title: "Tug configChangeItem",
        type: "single",
        link: ROUTES.CONFIG_CHANGE_ITEM_TUG,
        icon: <ExpandMore />,
      },
    ],
  },
  {
    title: "Bot",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "Message Sender",
        type: "single",
        link: ROUTES.BOT_MESSAGE_SENDER,
        icon: <ExpandMore />,
      },
    ],
  },
];
const Sidebar = ({ isOpen = false, sideController }: SidebarProps) => {
  const navigate = useNavigate();
  const onclick = (link: string) => {
    setTimeout(() => {
      sideController();
    }, 100);
    navigate(link);
  };
  return (
    <Box
      className="sidebar"
      style={{
        position: "fixed",
        width: "300px",
        left: isOpen ? "0px" : "-300px",
        height: "100%",
        transition: "left 0.3s ease-in-out",
        borderRight: "1px solid #e0e0e0",
        backgroundColor: "white",
        zIndex: 1000,
        top: "50px",
      }}
    >
      <Box>
        {menu_list.map((item, index) => {
          if (item.type === "single") {
            return (
              <Button
                key={index}
                sx={styles.button as CSSProperties}
                onClick={() => onclick(item.link ?? "")}
              >
                {item.title}
              </Button>
            );
          } else {
            return (
              <Accordion
                key={index}
                slotProps={{ heading: { component: "h3" } }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  {item.title}
                </AccordionSummary>
                <AccordionDetails>
                  {item.detail?.map((detail, j) => {
                    return (
                      <Box
                        key={index + j}
                        sx={styles.button as CSSProperties}
                        onClick={() => onclick(detail.link ?? "")}
                      >
                        {detail.title}
                      </Box>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          }
        })}

        {/* <Accordion slotProps={{ heading: { component: "h3" } }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            User
          </AccordionSummary>
          <Button sx={styles.button} onClick={() => navigate(ROUTES.USER_LIST)}>
            User List
          </Button>
        </Accordion>
        <Button sx={styles.button} onClick={() => navigate(ROUTES.USER_LIST)}>
          User List
        </Button> */}
      </Box>
    </Box>
  );
};

const styles: Record<
  string,
  CSSProperties | ((isOpen: boolean) => CSSProperties)
> = {
  button: {
    width: "100%",
    padding: "10px",
    color: "black",
    borderBottom: "1px solid #e0e0e0",
    cursor: "pointer",
    borderRadius: "5px",
  },
};
export default Sidebar;

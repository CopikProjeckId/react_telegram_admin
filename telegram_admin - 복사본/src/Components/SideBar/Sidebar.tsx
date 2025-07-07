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
    type: "single",
    link: ROUTES.USER_LIST,
    icon: <ExpandMore />,
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
      {
        title: "Item Create",
        type: "single",
        link: ROUTES.ITEM_CREATE,
        icon: <ExpandMore />,
      },
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
    ],
  },
  {
    title: "Bot",
    type: "multiple",
    icon: <ExpandMore />,
    detail: [
      {
        title: "Bot Setting",
        type: "single",
        link: ROUTES.BOT_SETTING,
        icon: <ExpandMore />,
      },
      {
        title: "Bot Message Sender",
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
    <Box className="sidebar" style={styles.sidebar(isOpen)}>
      <Box>
        {menu_list.map((item, index) => {
          if (item.type === "single") {
            return (
              <Button
                key={index}
                sx={styles.button}
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
                        sx={styles.button}
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
  sidebar: (isOpen: boolean) => ({
    // display: "-ms-flexbox",
    position: "fixed",
    width: "300px",
    left: isOpen ? "0px" : "-300px",
    height: "100%",
    transition: "left 0.3s ease-in-out",
    borderRight: "1px solid #e0e0e0",
    backgroundColor: "white",
    zIndex: 1000,
    top: "50px",
  }),
  button: {
    width: "100%",
    padding: "10px",
    color: "black",
    borderBottom: "1px solid #e0e0e0",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
};
export default Sidebar;

import { MenuOpenTwoTone } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { CSSProperties } from "styled-components";
import { useAppStatus } from "../../lib/etc";
import { APP_CONFIG, AppStatusType, ROUTES_KEY } from "../../lib/types/type";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Telegram from "../../lib/module/Telegram";

type HeaderProps = {
  sideController: () => void;
};
const Header = ({ sideController }: HeaderProps) => {
  const { app_status, setAppStatus } = useAppStatus((state) => state);
  const location = useLocation();

  useEffect(() => {
    if (app_status === AppStatusType.LOGIN) {
      let ready = Telegram.getInstance().init();
      if (ready.ready) {
        setAppStatus(location.pathname as AppStatusType);
      }
    } else {
      setAppStatus(location.pathname as AppStatusType);
    }
  }, [location.pathname]);
  return (
    <div className="header" style={styles.header}>
      <Button
        variant="text"
        onClick={sideController}
        sx={{ outline: "none", height: "100%" }}
      >
        <MenuOpenTwoTone />
      </Button>
      <Typography sx={{ fontWeight: "bold", fontSize: "1.2 rem" }}>
        {APP_CONFIG.APP_TITLE} - {ROUTES_KEY[app_status]}
      </Typography>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  header: {
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    height: "50px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 0px",
    top: 0,
    left: 0,
    zIndex: 1001,
    position: "fixed",
    width: "100%",
  },
};

export default Header;

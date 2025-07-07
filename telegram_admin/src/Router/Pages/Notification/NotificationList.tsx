import { DB_TYPE } from "../../../lib/types/type";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataCall from "../../../lib/module/data.call";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { changeInput, textEnterJoin, textEnterSlice } from "../../../lib/etc";
export default function NotificationList() {
  const [notification_list, setNotificationList] = useState<
    DB_TYPE["notification"][]
  >([]);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [input, setInput] = useState<string>("");
  const [view, setView] = useState<number>(0);

  const changeView = (view: number) => {
    setView(view);
  };
  const openNotification = async (
    id: string,
    description: string,
    view: number
  ) => {
    setInput(textEnterSlice(description));
    changeView(view);
    setOpen({
      ...open,
      [id]: !open[id],
    });
  };

  const updateNotifications = async (id: string) => {
    let data = {
      id: id,
      description: textEnterJoin(input),
      view: view,
    };
    await DataCall.getInstance()
      .updateNotifications(data)
      .then(async (_res) => {
        alert("Update Notifications Success");
        await DataCall.getInstance()
          .getNotificationList()
          .then((res) => {
            console.log(res);
            setNotificationList(res.data.notification);
          });
      });
  };
  useEffect(() => {
    const NotificationList = async () => {
      await DataCall.getInstance()
        .getNotificationList()
        .then((res) => {
          setNotificationList(res.data.notification);
        });
    };
    NotificationList();

    return () => {
      setNotificationList([]);
    };
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      ></Box>
      {notification_list && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {notification_list.map((notification, index) => (
            <Box key={notification.id}>
              <Accordion
                expanded={open[notification.id ?? ""]}
                onChange={() =>
                  openNotification(
                    notification.id ?? "",
                    notification.description ?? "",
                    Number(notification.view) ?? 0
                  )
                }
                sx={{
                  backgroundColor:
                    Number(notification.view) == 0 ? "#FFD6A5" : "#A5D6A7",
                }}
              >
                <AccordionSummary
                  expandIcon={<GridExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography variant="body1">{`${index + 1} - ${
                      notification.id
                    } -- ${
                      Number(notification.view) == 0 ? "Not Viewed" : "Viewed"
                    }`}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>ID</TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {notification.id}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Thumbnail
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            <img
                              src={notification.thumbnail as string}
                              alt="thumbnail"
                              style={{ height: "100%", width: "100%" }}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Description
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                color: "red",
                              }}
                            >
                              X : 30 , Y : 15
                            </Box>
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            <TextField
                              value={input}
                              onChange={(e) =>
                                changeInput(e.target.value, setInput)
                              }
                              multiline
                              rows={15}
                              sx={{
                                width: "100%",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>View</TableCell>
                          <TableCell sx={style.tableCellContent}>
                            origin View :
                            <span
                              style={{
                                color:
                                  Number(notification.view) == 0
                                    ? "red"
                                    : "green",
                              }}
                            >
                              {Number(notification.view) == 0 ? "OFF" : "ON"}
                            </span>
                            <br />
                            change View :
                            <span
                              style={{
                                color: view == 0 ? "red" : "green",
                              }}
                            >
                              {view == 0 ? "OFF" : "ON"}
                            </span>
                            <Button
                              onClick={() => changeView(view == 0 ? 1 : 0)}
                              variant="contained"
                              color="error"
                              sx={{
                                color: "white",
                                fontFamily: "Pretendard-Regular",
                                marginTop: 1,
                                width: "100%",
                              }}
                            >
                              Change View
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button
                    onClick={() => updateNotifications(notification.id ?? "")}
                    variant="contained"
                    color="info"
                    sx={{
                      color: "white",
                      fontFamily: "Pretendard-Regular",
                      marginTop: 1,
                      height: 50,
                      width: "100%",
                    }}
                  >
                    Update Notifications
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

const style = {
  tableCellTitle: {
    width: "20%",
  },
  tableCellContent: {
    width: "80%",
    fontSize: 14,
    color: "#000",
  },
};

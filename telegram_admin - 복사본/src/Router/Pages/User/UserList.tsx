import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DataCall from "../../../lib/module/data.call";
import { DB_TYPE, UserListEnum } from "../../../lib/types/type";
import { useDashBoard } from "../../../lib/module/data.call";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Typography,
} from "@mui/material";
import { CSSProperties } from "styled-components";
import { Grid } from "@mui/joy";
import { Edit } from "@mui/icons-material";

export default function UserList() {
  const [selected_user, setSelected_user] = useState<
    DB_TYPE["telegramUser"] | null
  >(null);
  const [user_detail, setUser_detail] = useState<any | null>(null);
  const [edit_item, setEdit_item] = useState<any[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const dashBoard = useDashBoard((state) => state);

  const getUserDetail = async (id: string) => {
    const res = await DataCall.getInstance().getUserDetail(id);

    setUser_detail(res);
    setEdit_item(res.user_item.map((item: any) => item.count));
  };
  useEffect(() => {
    let columns: GridColDef[] = [];
    Object.values(UserListEnum).forEach((key) => {
      columns.push({
        field: key,
        headerName: key,
        width: 1280 / Object.values(UserListEnum).length,
      });
    });
    setColumns(columns);
  }, []);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper sx={{ height: 500, overflow: "scroll" }}>
        <DataGrid
          rows={dashBoard?.user_list || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                page: dashBoard?.user_call?.page || 0,
                pageSize: dashBoard?.user_call?.limit || 20,
              },
            },
          }}
          onPaginationModelChange={(model) => {
            if (!dashBoard) return;
            dashBoard?.setUserCall({
              ...dashBoard.user_call,
              page: model.page,
              limit: model.pageSize,
              end: model.page * model.pageSize,
            });
            DataCall.getInstance().getUserList();
          }}
          pageSizeOptions={[1, 15]}
          paginationMode="client"
          checkboxSelection={false}
          onRowClick={(model) => {
            setSelected_user(model.row as DB_TYPE["telegramUser"]);
            getUserDetail(model.row.id);
          }}
          loading={dashBoard?.user_list?.length === 0}
          sx={{ border: 0 }}
        />
      </Paper>
      {selected_user && (
        <Card color="info">
          <CardHeader
            title={`USER TELEGRAM ID : ${selected_user?.telegram_id}`}
            subheader={`USER ID : ${selected_user?.id}`}
          />
          <CardContent>
            {Object.values(UserListEnum).map(
              (key) =>
                key !== "id" &&
                key !== "telegram_id" &&
                key !== "platform_token" &&
                key !== "rank" &&
                selected_user[key] && (
                  <Typography key={key}>
                    {key} :{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#555",
                        fontSize: "1.1rem",
                      }}
                    >
                      {selected_user?.[key] as string | number}
                    </span>
                  </Typography>
                )
            )}
            {user_detail && (
              <Box sx={styles.minisection}>
                {user_detail.user_item.length > 0 && (
                  <>
                    <CardHeader title="User Item" />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {user_detail.user_item.map((item: any, index: number) => (
                        <Box key={item.itemId}>
                          <Grid container>
                            <Grid
                              xs={2}
                              sx={{ textAlign: "left" }}
                              component="div"
                            >
                              {item.name.toUpperCase()} :{" "}
                            </Grid>
                            <Grid xs={2} component="div">
                              <span>{item.count}</span>
                            </Grid>
                            <Grid xs={8} component="div">
                              <Input
                                type="number"
                                value={edit_item[index]}
                                onChange={(e) => {
                                  const new_item = [...edit_item];
                                  new_item[index] = e.target.value;
                                  setEdit_item(new_item);
                                }}
                              />
                              <Button
                                sx={{ marginLeft: "auto" }}
                                variant="text"
                                onClick={() => {
                                  if (edit_item[index] === item.count) return;
                                  DataCall.getInstance()
                                    .editUserItem(
                                      selected_user.id,
                                      item.id,
                                      edit_item[index]
                                    )
                                    .then(() => {
                                      getUserDetail(selected_user.id);
                                    });
                                }}
                              >
                                <Edit />
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                    </CardContent>
                  </>
                )}
                {user_detail.wallet.length > 0 && (
                  <>
                    <CardHeader title="Wallet Item" />
                    <CardContent>
                      {user_detail.wallet.map((item: any) => (
                        <Typography key={item.itemId}>
                          {item.name} : <span>{item.count}</span>
                        </Typography>
                      ))}
                    </CardContent>
                  </>
                )}
                {user_detail.token.length > 0 && (
                  <>
                    <CardHeader title="Token Item" />
                    <CardContent>
                      {Object.keys(user_detail.token[0]).map(
                        (item: any) =>
                          item !== "telegramUserId" &&
                          item !== "created_at" && (
                            <Typography key={item}>
                              {item} : <span>{user_detail.token[0][item]}</span>
                            </Typography>
                          )
                      )}
                    </CardContent>
                  </>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

const styles: Record<string, CSSProperties> = {
  minisection: {
    width: "100%",
    height: "100%",
    marginTop: "10px",
  },
};

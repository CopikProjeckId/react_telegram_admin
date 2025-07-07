import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import DataCall from "../../../lib/module/data.call";
import { DB_TYPE, UserListEnum } from "../../../lib/types/type";
import { useDashBoard } from "../../../lib/module/data.call";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Pagination,
  TextField,
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
  const [edit_token, setEdit_token] = useState<Record<string, number>>({});
  const dashBoard = useDashBoard((state) => state);
  const [page, setPage] = useState<number>(1);
  const [page_data, setPage_data] = useState<DB_TYPE["telegramUser"][]>([]);
  const limit = 5;
  const [sort_key, setSort_key] = useState<string>("");
  const [sort_data, setSort_data] = useState<DB_TYPE["telegramUser"][]>([]);

  useEffect(() => {
    DataCall.getInstance().getUserList();
  }, []);

  useEffect(() => {
    setPage_data(sort_data?.slice((page - 1) * limit, page * limit) ?? []);
  }, [page, limit, sort_data]);

  // 기준에 따른 정렬
  const dataSort = (key: UserListEnum, type: "asc" | "desc") => {
    let data = dashBoard?.user_list;
    if (key === UserListEnum.TOKEN) {
      if (type === "asc") {
        data = data?.sort((a, b) => {
          return (a as any).platform_token - (b as any).platform_token;
        });
      } else {
        data = data?.sort((a, b) => {
          return (b as any).platform_token - (a as any).platform_token;
        });
      }
    }
    setSort_data(data as DB_TYPE["telegramUser"][]);
    setPage_data(data?.slice((page - 1) * limit, page * limit) ?? []);
    setPage(1);
  };
  const getUserDetail = async (id: string) => {
    DataCall.getInstance()
      .getUserDetail(id)
      .then((res) => {
        setUser_detail(res);
        setEdit_item(res.user_item.map((item: any) => item.count));
        let k_arr = Object.keys(res.token[0]).filter(
          (item) =>
            item !== "telegramUserId" &&
            item !== "created_at" &&
            item !== "total_platform_token"
        );
        setEdit_token(
          k_arr.reduce((acc, item) => {
            acc[item] = res.token[0][item];
            return acc;
          }, {} as Record<string, number>)
        );
      });
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Autocomplete
            options={Object.values([UserListEnum.TOKEN]).map((key) => ({
              label: key,
              value: key,
            }))}
            renderInput={(params) => (
              <TextField {...params} label="Choose Option" variant="outlined" />
            )}
            onChange={(_e, value) => {
              if (value) {
                setSort_key(value.value);
              }
            }}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{ width: "calc(100%)" }}
          />
        </Box>
        <Button
          variant="contained"
          sx={{ marginLeft: "10px" }}
          onClick={() => dataSort(sort_key as UserListEnum, "asc")}
        >
          DESC Sort
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: "10px" }}
          onClick={() => dataSort(sort_key as UserListEnum, "desc")}
        >
          ASC Sort
        </Button>
      </Box>
      <Paper sx={{ marginTop: "10px", overflow: "scroll" }}>
        <Grid container>
          {(page_data?.length > 0
            ? page_data
            : dashBoard?.user_list
            ? dashBoard.user_list.slice((page - 1) * limit, page * limit)
            : []
          ).map((user) => (
            <Grid xs={12} key={user.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Grid xs={12}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr",
                      width: "100%",
                    }}
                  >
                    {Object.values(["id", "telegram_id", "username"]).map(
                      (key) => (
                        <Box
                          sx={{ padding: "10px", fontSize: "12px" }}
                          key={key}
                        >
                          <strong style={{ color: "#575757" }}>{key} : </strong>
                          {user[key as keyof DB_TYPE["telegramUser"]]}
                        </Box>
                      )
                    )}
                  </Box>
                </Grid>

                <Button
                  onClick={() => {
                    setSelected_user(user);
                    getUserDetail(user.id);
                  }}
                >
                  Detail
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <Pagination
        count={Math.ceil((dashBoard?.user_list?.length ?? 0) / limit)}
        page={page}
        onChange={(_e, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
        sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      />
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
                selected_user[key as keyof DB_TYPE["telegramUser"]] && (
                  <Typography key={key}>
                    {key} :{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#555",
                        fontSize: "1.1rem",
                      }}
                    >
                      {selected_user?.[key as keyof DB_TYPE["telegramUser"]]}
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
                            {item.lv == 0 && (
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
                            )}
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
                          item !== "created_at" &&
                          item !== "total_platform_token" &&
                          item !== "ton_coin" && (
                            <Box key={item}>
                              <Grid container>
                                <Grid
                                  xs={2}
                                  sx={{ textAlign: "left" }}
                                  component="div"
                                >
                                  {item.toUpperCase() == "TON_COIN"
                                    ? "RUBY"
                                    : item == "adsgram"
                                    ? "ADsGram COUNT"
                                    : item.toUpperCase()}
                                  :{" "}
                                </Grid>

                                <Grid xs={2} component="div">
                                  <span>
                                    {user_detail.token[0][
                                      item
                                    ].toLocaleString()}
                                  </span>
                                </Grid>
                                <Grid xs={8} component="div">
                                  {item !== "adsgram" && (
                                    <>
                                      <Input
                                        type="number"
                                        value={edit_token[item] ?? 0}
                                        onChange={(e) => {
                                          const new_item = { ...edit_token };
                                          new_item[item] = Number(
                                            e.target.value
                                          );
                                          setEdit_token(new_item);
                                        }}
                                      />
                                      <Button
                                        sx={{ marginLeft: "auto" }}
                                        variant="text"
                                        onClick={() => {
                                          if (
                                            edit_token[item] ===
                                            user_detail.token[0][item]
                                          )
                                            return;

                                          DataCall.getInstance()
                                            .editUserToken(
                                              selected_user.id,
                                              item,
                                              edit_token[item]
                                            )

                                            .then(() => {
                                              getUserDetail(selected_user.id);
                                            });
                                        }}
                                      >
                                        <Edit />
                                      </Button>
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </Box>
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

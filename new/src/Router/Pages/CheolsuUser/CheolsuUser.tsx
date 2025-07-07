import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import DataCall from "../../../lib/module/data.call";
import { DB_TYPE } from "../../../lib/types/type";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Pagination,
  Typography,
} from "@mui/material";
import { CSSProperties } from "styled-components";
import { Grid } from "@mui/joy";
import { Edit } from "@mui/icons-material";

export default function CheolsuUserList() {
  const [selected_user, setSelected_user] = useState<
    DB_TYPE["telegramUser"] | null
  >(null);
  const [user_detail, setUser_detail] = useState<any | null>(null);
  const [edit_token, setEdit_token] = useState<Record<string, number>>({});
  const [page, setPage] = useState<number>(1);
  const [page_data, setPage_data] = useState<DB_TYPE["telegramUser"][]>([]);
  const limit = 10;
  const [total_page, setTotal_page] = useState<number>(0);

  useEffect(() => {
    getUserList(page);
  }, []);

  const getUserList = async (_page: number) => {
    setPage(_page);
    //초기화
    setPage_data([]);
    setUser_detail(null);
    setEdit_token({});
    setSelected_user(null);

    const res = await DataCall.getInstance().getUserList("cheolsu", _page, limit);
    setTotal_page(Math.ceil(res.pagination.total / limit));
    const uniqueData = Array.from(
      new Map(res.data.map((user: any) => [user.telegram_id, user])).values()
    );
    setPage_data(uniqueData as DB_TYPE["telegramUser"][]);
  }
  const getUserDetail = async (id: string) => {
    DataCall.getInstance()
      .getUserDetail(id, "cheolsu")
      .then((res) => {
        // data가 null인 것을 모두 제거
        let data = res;
        delete data.deviceInfo;
        Object.keys(data).forEach((key) => {
          if (data[key] === null) {
            delete data[key];
          }
        });
        data.token = {
          SMS: data.sms,
          RUBY: data.ruby,
          TON_COIN: data.ton
        }
        setUser_detail(data);
        setEdit_token({
          SMS: data.sms,
          RUBY: data.ruby,
          TON_COIN: data.ton
        });
        console.log(Object.keys(data));
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

      </Box>
      <Paper sx={{ marginTop: "10px", overflow: "scroll" }}>
        <Grid container>
          {(page_data).map((user) => (
            <Grid xs={12} key={user.telegram_id}>
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
                    {Object.values([
                      "telegram_id",
                    ]).map((key) => (
                      <Box sx={{ padding: "10px", fontSize: "12px" }} key={key}>
                        <strong style={{ color: "#575757" }}>{key} : </strong>
                        {user[key as keyof DB_TYPE["telegramUser"]]}
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Button
                  onClick={() => {
                    setSelected_user(user);
                    getUserDetail(user.telegram_id);
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
        count={total_page}
        page={page}
        onChange={(_e, value) => {
          getUserList(value);
        }}
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
            {user_detail && (
            Object.keys(user_detail).map(
              (key) => 
                (key !== "token" && key !== "sms" && key !== "ruby" && key !== "ton") &&
                (user_detail[key] !== undefined) && (
                  <Typography key={key}>
                    {key} :{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "#555",
                        fontSize: "1.1rem",
                      }}
                    >
                      {user_detail?.[key as any]}
                    </span>
                  </Typography>
                )
            )
            )}
            {user_detail && (
              <Box sx={styles.minisection}>
                {user_detail.token && (
                  <>
                    <CardHeader title="Token Item" />
                    <CardContent>
                      {Object.keys(user_detail.token).map(
                        (item: any) => 
                          (
                            <Box key={item}>
                              <Grid container>
                                <Grid
                                  xs={2}
                                  sx={{ textAlign: "left" }}
                                  component="div"
                                >
                                  {item.toUpperCase()}
                                  :{" "}
                                </Grid>

                                <Grid xs={2} component="div">
                                  <span>
                                    {user_detail.token[
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
                                            user_detail.token[item]
                                          )
                                            return;

                                          DataCall.getInstance()
                                            .editUserToken(
                                              selected_user.telegram_id,
                                              item,
                                              edit_token[item],
                                              "cheolsu"
                                            )
                                            .then(() => {
                                              getUserDetail(selected_user.telegram_id);
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

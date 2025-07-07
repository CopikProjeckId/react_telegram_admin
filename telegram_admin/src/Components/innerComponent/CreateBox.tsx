import {
  Box,
  Button,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  DB_TYPE_typeof,
  ItemType,
  mission_auto_increment,
  mission_SubScription,
  MissionListEnum,
  notification_auto_increment,
  notification_SubScription,
  NotificationListEnum,
  shop_auto_increment,
  shop_SubScription,
  ShopListEnum,
  TokenType,
} from "../../lib/types/type";
import { Grid } from "@mui/joy";
import { useEffect, useState } from "react";
import DataCall from "../../lib/module/data.call";
import { DatePicker } from "@mui/x-date-pickers";
import { textEnterJoin, textEnterSlice } from "../../lib/etc";

interface CreateBoxProps {
  type: "bounsmissiontable" | "item" | "notification";
}
export default function CreateBox({ type }: CreateBoxProps) {
  const [value, setValue] = useState<Record<string, string>>({});
  const [notAddCol, setNotAddCol] = useState<string[]>([]);
  const handleAdd = (values: Record<string, string>) => {
    if (type == "notification" && "description" in values) {
      values["description"] = textEnterSlice(values["description"]);
    }
    let newValues = { ...value, ...values };
    Object.keys(newValues).forEach((item) => {
      if (newValues[item] == "") {
        delete newValues[item];
      }
    });
    setValue(newValues);
  };
  useEffect(() => {
    setNotAddCol(
      type == "bounsmissiontable"
        ? mission_auto_increment
        : type == "item"
        ? shop_auto_increment
        : notification_auto_increment
    );
  }, [value]);
  return (
    <Grid
      container
      sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {Object.keys(
        type == "bounsmissiontable"
          ? MissionListEnum
          : type == "item"
          ? ShopListEnum
          : NotificationListEnum
      ).map((item, index) => {
        return (
          !notAddCol.includes(item) && (
            <Grid
              key={index}
              xs={12}
              sx={{ color: "#5e5e5e", ":hover": { color: "#ff0000" } }}
            >
              {(type == "item"
                ? (shop_SubScription as Record<string, string>)[item]
                : type == "bounsmissiontable"
                ? (mission_SubScription as Record<string, string>)[item]
                : (notification_SubScription as Record<string, string>)[
                    item
                  ]) && (
                <Typography>
                  * sub_scription :{" "}
                  {type == "item"
                    ? (shop_SubScription as Record<string, string>)[item]
                    : type == "bounsmissiontable"
                    ? (mission_SubScription as Record<string, string>)[item]
                    : (notification_SubScription as Record<string, string>)[
                        item
                      ]}
                </Typography>
              )}
              <Box
                sx={{
                  border: "1px solid #e9e9e9",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{item} :</Typography>
                {type == "item" && item == "type" ? (
                  <Select
                    sx={{ width: "60%", height: "100%" }}
                    onChange={(e) => {
                      handleAdd({ [item]: e.target.value as string });
                    }}
                  >
                    {Object.keys(ItemType).map((item, index) => {
                      return (
                        <MenuItem
                          value={item}
                          key={item + index + Math.random()}
                        >
                          {ItemType[item as keyof typeof ItemType]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                ) : item == "token_type" ||
                  item == "reward_type" ||
                  (type == "bounsmissiontable" && item == "type") ? (
                  <Select
                    sx={{ width: "60%", height: "100%" }}
                    onChange={(e) => {
                      handleAdd({ [item]: e.target.value as string });
                    }}
                  >
                    {Object.keys(TokenType).map((item, index) => {
                      return (
                        <MenuItem value={item} key={item + index}>
                          {TokenType[item as keyof typeof TokenType]}
                        </MenuItem>
                      );
                    })}
                  </Select>
                ) : item.includes("at") || item.includes("date") ? (
                  <DatePicker
                    sx={{ width: "60%" }}
                    onChange={(e) => {
                      let date = e
                        ?.toISOString()
                        .split("T")
                        .join(" ")
                        .split("Z")[0];
                      if (date) {
                        handleAdd({
                          [item]: date,
                        });
                      }
                    }}
                  />
                ) : type == "notification" && item == "thumbnail" ? (
                  <Input
                    sx={{ width: "60%", height: "100%" }}
                    onChange={(e: any) => {
                      console.log(e.target.files[0]);
                      handleAdd({ [item]: e.target.files[0] });
                    }}
                    type="file"
                  ></Input>
                ) : type == "notification" && item == "description" ? (
                  <TextField
                    key={item + index}
                    sx={{ width: "60%" }}
                    multiline
                    rows={15}
                    onChange={(e) => {
                      // 입력제한 x : 30 , y : 15 해당값을 넘길시 return
                      let text_array = e.target.value.split("\n");
                      if (text_array.length > 15) {
                        e.target.value = text_array.slice(0, 15).join("\n");
                        alert("Y input limit exceeded");
                        return;
                      }
                      for (let i = 0; i < text_array.length; i++) {
                        if (text_array[i].length > 30) {
                          e.target.value = text_array[i].substring(
                            0,
                            e.target.value.length - 1
                          );
                          alert("X input limit exceeded");
                          return;
                        }
                      }
                      handleAdd({ [item]: e.target.value });
                    }}
                  ></TextField>
                ) : (
                  <Input
                    key={item + index}
                    sx={{ width: "60%" }}
                    type={
                      ((DB_TYPE_typeof[type] as Record<string, string>)[
                        item
                      ] as "string" | "number") == "number"
                        ? "number"
                        : "text"
                    }
                    onChange={(e) => {
                      handleAdd({ [item]: e.target.value });
                    }}
                  ></Input>
                )}
              </Box>
            </Grid>
          )
        );
      })}
      <Button
        variant="outlined"
        sx={{ width: "100%", height: "50px" }}
        onClick={() => {
          if (Object.keys(value).length == 0) {
            alert("Please fill in all the fields");
            return;
          }
          if (type == "notification" && "description" in value) {
            value["description"] = textEnterJoin(value["description"]);
          }
          DataCall.getInstance()
            [
              type == "item"
                ? "createItem"
                : type == "notification"
                ? "createNotification"
                : "createMission"
            ](value as any)
            .then((res: any) => {
              if (res.status == 200) {
                setValue({});
                alert("Create Success");
              } else {
                alert("Create Failed");
              }
            });
        }}
      >
        Create {type} Column
      </Button>
    </Grid>
  );
}

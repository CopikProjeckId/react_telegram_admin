import {
  Box,
  Button,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  DB_TYPE_typeof,
  ItemType,
  mission_auto_increment,
  mission_SubScription,
  MissionListEnum,
  shop_auto_increment,
  shop_SubScription,
  ShopListEnum,
  TokenType,
} from "../../lib/types/type";
import { Grid } from "@mui/joy";
import { useEffect, useState } from "react";
import DataCall from "../../lib/module/data.call";
import { DatePicker } from "@mui/x-date-pickers";

interface CreateBoxProps {
  type: "bounsmissiontable" | "item";
}
export default function CreateBox({ type }: CreateBoxProps) {
  const [value, setValue] = useState<Record<string, string>>({});
  const [notAddCol, setNotAddCol] = useState<string[]>([]);
  const handleAdd = (values: Record<string, string>) => {
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
      type == "bounsmissiontable" ? mission_auto_increment : shop_auto_increment
    );
  }, [value]);
  return (
    <Grid
      container
      sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {Object.keys(
        type == "bounsmissiontable" ? MissionListEnum : ShopListEnum
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
                : (mission_SubScription as Record<string, string>)[item]) && (
                <Typography>
                  * sub_scription :{" "}
                  {type == "item"
                    ? (shop_SubScription as Record<string, string>)[item]
                    : (mission_SubScription as Record<string, string>)[item]}
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
          DataCall.getInstance()
            [type == "item" ? "createItem" : "createMission"](value as any)
            .then((res) => {
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

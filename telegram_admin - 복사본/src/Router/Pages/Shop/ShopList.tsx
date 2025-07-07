import { DB_TYPE } from "../../../lib/types/type";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DataCall, { useDashBoard } from "../../../lib/module/data.call";
import { ShopListEnum } from "../../../lib/types/type";
import { Grid } from "@mui/joy";
import { Edit } from "@mui/icons-material";

export default function ShopList() {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const dashBoard = useDashBoard((state) => state);

  const [selected_item, setSelected_item] = useState<DB_TYPE["item"] | null>(
    null
  );
  const [edit_item, setEdit_item] = useState<any[]>([]);

  const selected_item_detail = (item: DB_TYPE["item"]) => {
    setEdit_item([]);
    Object.values(ShopListEnum).forEach((key) => {
      setEdit_item((prev) => [...prev, (item as any)?.[key]]);
    });
    setSelected_item(item);
  };

  useEffect(() => {
    setColumns(
      Object.values(ShopListEnum).map((key) => ({
        field: key,
        headerName: key,
        width: 1280 / Object.values(ShopListEnum).length,
      }))
    );
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper sx={{ height: 500, overflow: "hidden" }}>
        <DataGrid
          rows={dashBoard?.item_list || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                page: dashBoard?.item_call?.page || 0,
                pageSize: dashBoard?.item_call?.limit || 10,
              },
            },
          }}
          onPaginationModelChange={(model) => {
            if (!dashBoard) return;
            dashBoard?.setItemCall({
              ...dashBoard.item_call,
              page: model.page,
              limit: model.pageSize,
            });
            DataCall.getInstance().getItemList();
            setEdit_item([]);
          }}
          pageSizeOptions={[10]}
          checkboxSelection={false}
          onRowClick={(model) => {
            selected_item_detail(model.row as DB_TYPE["item"]);
          }}
          loading={dashBoard?.item_list?.length === 0}
          sx={{ border: 0 }}
        />
      </Paper>
      {selected_item && (
        <Card color="info">
          <CardHeader
            title={`ITEM NAME : ${selected_item?.name}`}
            subheader={`ITEM ID : ${selected_item?.id}`}
          />
          <CardContent>
            {Object.values(ShopListEnum).map(
              (key, index) =>
                key !== "id" &&
                key !== "name" && (
                  <Grid
                    container
                    key={key}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Grid xs={2}>{key} : </Grid>

                    <Grid
                      xs={3}
                      sx={{
                        fontWeight: "bold",
                        color: "#555",
                        fontSize: "1.1rem",
                        marginLeft: "10px",
                      }}
                    >
                      {selected_item?.[key] as string | number}
                    </Grid>
                    <Grid xs={6}>
                      {![
                        "type",
                        "created_at",
                        "token_type",
                        "description",
                        "lv",
                        "reward_type",
                        "time_seconds",
                      ].includes(key) && (
                        <>
                          <Input
                            value={edit_item[index]}
                            onChange={(e: any) => {
                              const new_item = [...edit_item];
                              new_item[index] = e.target.value;
                              setEdit_item(new_item);
                            }}
                          />

                          <Button
                            onClick={() => {
                              if (edit_item[index] === selected_item?.[key])
                                return;
                              DataCall.getInstance()
                                .updateItem({
                                  ...selected_item,
                                  [key]: edit_item[index],
                                })
                                .then((res) => {
                                  setSelected_item(res[0]);
                                  DataCall.getInstance().getItemList();
                                });
                            }}
                          >
                            <Edit />
                          </Button>
                        </>
                      )}
                    </Grid>
                  </Grid>
                )
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

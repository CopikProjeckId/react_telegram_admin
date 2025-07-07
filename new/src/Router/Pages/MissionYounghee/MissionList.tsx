import { DB_TYPE } from "../../../lib/types/type";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Paper,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DataCall, { useYoungheeDashBoard } from "../../../lib/module/data.call";
import { MissionListEnum } from "../../../lib/types/type";
import { Grid } from "@mui/joy";
import { Edit } from "@mui/icons-material";

export default function YoungheeMissionList() {
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const dashBoard = useYoungheeDashBoard((state) => state);

  const [selected_mission, setSelected_mission] = useState<
    DB_TYPE["bounsmissiontable"] | null
  >(null);
  const [edit_mission, setEdit_mission] = useState<any[]>([]);

  const selected_mission_detail = (mission: DB_TYPE["bounsmissiontable"]) => {
    setEdit_mission([]);
    Object.values(MissionListEnum).forEach((key) => {
      setEdit_mission((prev) => [...prev, (mission as any)?.[key]]);
    });
    setSelected_mission(mission);
  };

  useEffect(() => {
    setColumns(
      Object.values(MissionListEnum).map((key) => ({
        field: key,
        headerName: key,
        width: 1280 / Object.values(MissionListEnum).length,
      }))
    );
  }, []);
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper sx={{ height: 500, overflow: "scroll" }}>
        <DataGrid
          rows={dashBoard?.mission_list || []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                page: dashBoard?.mission_call?.page || 0,
                pageSize: dashBoard?.mission_call?.limit || 20,
              },
            },
          }}
          onPaginationModelChange={(model) => {
            if (!dashBoard) return;
            dashBoard?.setMissionCall({
              ...dashBoard.mission_call,
              page: model.page,
              limit: model.pageSize,
              end: model.page * model.pageSize,
            });
            DataCall.getInstance().getMissionList("younghee");
          }}
          pageSizeOptions={[1, 15]}
          paginationMode="client"
          checkboxSelection={false}
          onRowClick={(model) => {
            selected_mission_detail(model.row as DB_TYPE["bounsmissiontable"]);
          }}
          loading={dashBoard?.mission_list?.length === 0}
          sx={{ border: 0 }}
        />
      </Paper>
      {selected_mission && (
        <Card color="info">
          <CardHeader
            title={`INDEX : ${selected_mission?.idx_key}`}
            subheader={`limit_date : ${selected_mission?.limit_date}`}
          />
          <CardContent>
            {Object.values(MissionListEnum).map(
              (key, index) =>
                key !== "idx_key" &&
                key !== "limit_date" && (
                  <Grid
                    container
                    key={key}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid xs={6} sx={{ display: "flex", alignItems: "center" }}>
                      {key} :
                      <Grid
                        sx={{
                          fontWeight: "bold",
                          color: "#555",
                          fontSize: "1.1rem",
                          marginLeft: "10px",
                        }}
                      >
                        {selected_mission?.[key] as string | number}
                      </Grid>
                    </Grid>
                    <Grid xs={6} sx={{ float: "right" }}>
                      {!["logo", "type"].includes(key) && (
                        <>
                          <Input
                            value={edit_mission[index]}
                            sx={{ width: "80%" }}
                            onChange={(e: any) => {
                              const new_item = [...edit_mission];
                              new_item[index] = e.target.value;
                              setEdit_mission(new_item);
                            }}
                          />
                          <Button
                            onClick={() => {
                              if (
                                edit_mission[index] === selected_mission?.[key]
                              )
                                return;
                              DataCall.getInstance()
                                .updateMission({
                                  ...selected_mission,
                                  [key]: edit_mission[index]
                                }, "younghee")
                                .then((res) => {
                                  setSelected_mission(res[0]);
                                  DataCall.getInstance().getMissionList("younghee");
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

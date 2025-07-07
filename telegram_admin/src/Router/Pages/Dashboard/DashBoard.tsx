import { LineChart } from "@mui/x-charts";
import DataCall, { useDashBoard } from "../../../lib/module/data.call";
import { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { CSSProperties } from "styled-components";
import { DashboardEnum } from "../../../lib/types/type";
export default function DashBoard() {
  const data = useDashBoard((state) => state);
  const [refresh_date, setRefreshDate] = useState<Date>(new Date());
  const [live_up, setLiveUp] = useState<boolean[]>([false, false, false]);
  const [live_count, setLiveCount] = useState<{
    live_game: number;
    token_total: number;
    user_total_count: number;
  }>({
    live_game: 0,
    token_total: 0,
    user_total_count: 0,
  });

  const refresh_data = () => {
    DataCall.getInstance().get_dashboard_data();
    DataCall.getInstance()
      .getLiveGameCount()
      .then((res) => {
        setLiveUp([
          res.live_game != 0 && res.live_game > live_count.live_game
            ? true
            : false,
          res.token_total != 0 && res.token_total > live_count.token_total
            ? true
            : false,
          res.user_total_count != 0 &&
          res.user_total_count > live_count.user_total_count
            ? true
            : false,
        ]);
        setLiveCount(res);
        setRefreshDate(new Date());
      });
  };
  useEffect(() => {
    refresh_data();
  }, []);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography style={{ fontSize: "1rem", fontWeight: "bold" }}>
          Live Dashboard -{" Last Refresh : "}
          {refresh_date.toISOString().split("T")[0] +
            " " +
            refresh_date.toISOString().split("T")[1].split(".")[0]}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: `repeat(${
              width > 1024 ? 5 : width < 540 ? 1 : 2
            }, 1fr)`,
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {Object.keys(DashboardEnum).map((item: any, index: number) => (
            <Card style={styles.headContent} key={item + index}>
              <Typography>{item}</Typography>
              <Typography
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: live_up[index] ? "green" : "#000",
                }}
              >
                {Number(
                  live_count[item as keyof typeof live_count]
                ).toLocaleString()}
              </Typography>
            </Card>
          ))}
        </Box>
        <Card sx={styles.section}>
          <div style={styles.chartContainer}>
            <Typography variant="h6" style={styles.title}>
              Monthly Create User Chart [ totalUser : {data?.total} ]
            </Typography>
            <LineChart
              width={width / 1.5}
              height={height / 5}
              xAxis={[
                {
                  data: data?.chart_data
                    ? data?.chart_data?.map((item: any) =>
                        [item.date.split("-")[1], item.date.split("-")[2]].join(
                          "/"
                        )
                      )
                    : [],
                  scaleType: "band",
                  label: "DATE",
                },
              ]}
              series={[
                {
                  data: data?.chart_data?.map((item: any) => item.total) ?? [],
                  showMark: false,
                  color: "#000000",
                },
              ]}
            />
          </div>
        </Card>
        {data?.traffic_data &&
          data?.traffic_total &&
          Object.keys(data?.traffic_total).map((item: any, index: number) => (
            <Card key={item + index} sx={styles.section}>
              <div style={styles.chartContainer}>
                <Typography variant="h6" style={styles.title}>
                  Monthly {item} Chart [ totalUser :{" "}
                  {((data.traffic_total as Record<string, number>)[
                    item
                  ] as number) || 0}{" "}
                  ]
                </Typography>
                <LineChart
                  width={width / 1.5}
                  height={height / 5}
                  xAxis={[
                    {
                      data: data?.traffic_data
                        ? data?.traffic_data?.map((item: any) =>
                            [
                              item.date.split("-")[1],
                              item.date.split("-")[2],
                            ].join("/")
                          )
                        : [],
                      scaleType: "band",
                      label: "DATE",
                    },
                  ]}
                  series={[
                    {
                      data:
                        data?.traffic_data?.map((items: any) => items[item]) ??
                        [],
                      showMark: false,
                      color: "#000000",
                    },
                  ]}
                />
              </div>
            </Card>
          ))}
      </Box>
    </Box>
  );
}

const styles: Record<string, CSSProperties> = {
  chartContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    flexDirection: "column",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.1)",
  },
  section: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #e0e0e0",
    gap: "10px",
  },
  title: {
    fontFamily: "Pretendard-Regular",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginBottom: "10px",
    padding: "10px 10px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.1)",
  },
};

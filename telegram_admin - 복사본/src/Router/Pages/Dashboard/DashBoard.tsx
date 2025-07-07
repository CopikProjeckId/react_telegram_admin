import { LineChart } from "@mui/x-charts";
import DataCall, { useDashBoard } from "../../../lib/module/data.call";
import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { CSSProperties } from "styled-components";
import { Grid } from "@mui/joy";

export default function DashBoard() {
  const data = useDashBoard((state) => state);

  useEffect(() => {
    DataCall.getInstance().get_dashboard_data();
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
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                {Number(data.traffic_total[item] as any)} ]
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

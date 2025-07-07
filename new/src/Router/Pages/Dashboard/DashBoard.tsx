import { LineChart } from "@mui/x-charts";
import DataCall, { useCheolsuDashBoard, useDashBoard, useYoungheeDashBoard } from "../../../lib/module/data.call";
import { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Typography } from "@mui/material";
import { CSSProperties } from "styled-components";
import { DashboardEnum } from "../../../lib/types/type";
import { useTugDashBoard } from "../../../lib/module/data.call";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
export default function DashBoard() {
  const data = useDashBoard((state) => state);
  const tug_data = useTugDashBoard((state) => state);
  const younghee_data = useYoungheeDashBoard((state) => state);
  const cheolsu_data = useCheolsuDashBoard((state) => state);
  const [refresh_date, setRefreshDate] = useState<Date>(new Date());
  const [refresh_tug_date, setRefreshTugDate] = useState<Date>(new Date());
  const [refresh_younghee_date, setRefreshYoungheeDate] = useState<Date>(new Date());
  const [refresh_cheolsu_date, setRefreshCheolsuDate] = useState<Date>(new Date());
  const [live_up, setLiveUp] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [tug_live_up, setTugLiveUp] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [younghee_live_up, setYoungheeLiveUp] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [cheolsu_live_up, setCheolsuLiveUp] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [live_count, setLiveCount] = useState<{
    live_game: number;
    token_total: number;
    ruby_total: number;
    earn_total: number;
    user_total_count: number;
  }>({
    live_game: 0,
    token_total: 0,
    ruby_total: 0,
    earn_total: 0,
    user_total_count: 0,
  });
  const [tug_live_count, setTugLiveCount] = useState<{
    live_game: number;
    token_total: number;
    ruby_total: number;
    earn_total: number;
    user_total_count: number;
  }>({
    live_game: 0,
    token_total: 0,
    ruby_total: 0,
    earn_total: 0,
    user_total_count: 0,
  });
  const [younghee_live_count, setYoungheeLiveCount] = useState<{
    live_game: number;
    token_total: number;
    ruby_total: number;
    earn_total: number;
    user_total_count: number;
  }>({
    live_game: 0,
    token_total: 0,
    ruby_total: 0,
    earn_total: 0,
    user_total_count: 0,
  });
  const [cheolsu_live_count, setCheolsuLiveCount] = useState<{
    live_game: number;
    token_total: number;
    ruby_total: number;
    earn_total: number;
    user_total_count: number;
  }>({
    live_game: 0,
    token_total: 0,
    ruby_total: 0,
    earn_total: 0,
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
          res.ruby_total != 0 && res.ruby_total > live_count.ruby_total
            ? true
            : false,
          res.earn_total != 0 && res.earn_total > live_count.earn_total
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
    DataCall.getInstance().get_dashboard_data("tug");
    DataCall.getInstance()
      .getLiveGameCount("tug")
      .then((res) => {
        setTugLiveUp([
          res.live_game != 0 && res.live_game > tug_live_count.live_game
            ? true
            : false,
          res.token_total != 0 && res.token_total > tug_live_count.token_total
            ? true
            : false,
          res.ruby_total != 0 && res.ruby_total > tug_live_count.ruby_total
            ? true
            : false,
          res.earn_total != 0 && res.earn_total > tug_live_count.earn_total
            ? true
            : false,
          res.user_total_count != 0 &&
            res.user_total_count > tug_live_count.user_total_count
            ? true
            : false,
        ]);
        setTugLiveCount(res);
        setRefreshTugDate(new Date());
      });
    DataCall.getInstance().get_dashboard_data("cheolsu");
    DataCall.getInstance().getLiveGameCount("cheolsu").then((res) => {
      console.log(res);
      setCheolsuLiveUp([
        res.live_game != 0 && res.live_game > cheolsu_live_count.live_game
          ? true
          : false,
        res.token_total != 0 && res.token_total > cheolsu_live_count.token_total
          ? true
          : false,
        res.ruby_total != 0 && res.ruby_total > cheolsu_live_count.ruby_total
          ? true
          : false,
        res.earn_total != 0 && res.earn_total > cheolsu_live_count.earn_total
          ? true
          : false,
        res.user_total_count != 0 &&
          res.user_total_count > cheolsu_live_count.user_total_count
          ? true
          : false,
      ]);
      setCheolsuLiveCount(res);
      setRefreshCheolsuDate(new Date());
    });
    DataCall.getInstance().get_dashboard_data("younghee");
    DataCall.getInstance().getLiveGameCount("younghee").then((res) => {
      setYoungheeLiveUp([
        res.live_game != 0 && res.live_game > younghee_live_count.live_game
          ? true
          : false,
        res.user_total_count != 0 &&
          res.user_total_count > younghee_live_count.user_total_count
          ? true
          : false,
        res.token_total != 0 && res.token_total > younghee_live_count.token_total
          ? true
          : false,
        res.ruby_total != 0 && res.ruby_total > younghee_live_count.ruby_total
          ? true
          : false,
        res.earn_total != 0 && res.earn_total > younghee_live_count.earn_total
      ]);
      setYoungheeLiveCount(res);
      setRefreshYoungheeDate(new Date());
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
      <Accordion sx={{ boxSizing: "border-box", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
        <AccordionSummary sx={{ backgroundColor: "#fff" }} expandIcon={<GridExpandMoreIcon />}>
          <Typography style={{ fontSize: "1rem", fontWeight: "bold", padding: "10px", zIndex: 1000, color: "#000" }}>
            Red and Green Live Dashboard
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography style={{ fontSize: "1rem", fontWeight: "bold", padding: "10px", zIndex: 1000 }}>
            Red and Green Live Dashboard -{" Last Refresh : "}
            {refresh_date.toISOString().split("T")[0] +
              " " +
              refresh_date.toISOString().split("T")[1].split(".")[0]}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: `repeat(${width > 1024 ? 5 : width < 540 ? 1 : 2
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
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxSizing: "border-box", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
        <AccordionSummary sx={{ backgroundColor: "#fff" }} expandIcon={<GridExpandMoreIcon />}>
          <Typography style={{ fontSize: "1rem", fontWeight: "bold", padding: "10px", zIndex: 1000, color: "#000" }}>
            TUG OF WAR Live Dashboard
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Tug Live Dashboard -{" Last Refresh : "}
              {refresh_tug_date.toISOString().split("T")[0] +
                " " +
                refresh_tug_date.toISOString().split("T")[1].split(".")[0]}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: `repeat(${width > 1024 ? 5 : width < 540 ? 1 : 2
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
                      color: tug_live_up[index] ? "green" : "#000",
                    }}
                  >
                    {Number(
                      tug_live_count[item as keyof typeof tug_live_count]
                    ).toLocaleString()}
                  </Typography>
                </Card>
              ))}
            </Box>
            <Card sx={styles.section}>
              <div style={styles.chartContainer}>
                <Typography variant="h6" style={styles.title}>
                  Monthly Create User Chart [ totalUser : {tug_data?.total} ]
                </Typography>
                <LineChart
                  width={width / 1.5}
                  height={height / 5}
                  xAxis={[
                    {
                      data: tug_data?.chart_data
                        ? tug_data?.chart_data?.map((item: any) =>
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
                      data:
                        tug_data?.chart_data?.map((item: any) => item.total) ?? [],
                      showMark: false,
                      color: "#000000",
                    },
                  ]}
                />
              </div>
            </Card>
            {tug_data?.traffic_data &&
              tug_data?.traffic_total &&
              Object.keys(tug_data?.traffic_total).map(
                (item: any, index: number) => (
                  <Card key={item + index} sx={styles.section}>
                    <div style={styles.chartContainer}>
                      <Typography variant="h6" style={styles.title}>
                        Monthly {item} Chart [ totalUser :{" "}
                        {((tug_data.traffic_total as Record<string, number>)[
                          item
                        ] as number) || 0}{" "}
                        ]
                      </Typography>
                      <LineChart
                        width={width / 1.5}
                        height={height / 5}
                        xAxis={[
                          {
                            data: tug_data?.traffic_data
                              ? tug_data?.traffic_data?.map((item: any) =>
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
                              tug_data?.traffic_data?.map(
                                (items: any) => items[item]
                              ) ?? [],
                            showMark: false,
                            color: "#000000",
                          },
                        ]}
                      />
                    </div>
                  </Card>
                )
              )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxSizing: "border-box", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
        <AccordionSummary sx={{ backgroundColor: "#fff" }} expandIcon={<GridExpandMoreIcon />}>
          <Typography style={{ fontSize: "1rem", fontWeight: "bold", padding: "10px", zIndex: 1000, color: "#000" }}>
            Younghee Live Dashboard
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Younghee Live Dashboard -{" Last Refresh : "}
              {refresh_younghee_date.toISOString().split("T")[0] +
                " " +
                refresh_younghee_date.toISOString().split("T")[1].split(".")[0]}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: `repeat(${width > 1024 ? 5 : width < 540 ? 1 : 2
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
                      color: younghee_live_up[index] ? "green" : "#000",
                    }}
                  >
                    {Number(
                      younghee_live_count[item as keyof typeof younghee_live_count]
                    ).toLocaleString()}
                  </Typography>
                </Card>
              ))}
            </Box>
            <Card sx={styles.section}>
              <div style={styles.chartContainer}>
                <Typography variant="h6" style={styles.title}>
                  Monthly Create User Chart [ totalUser : {younghee_data?.total} ]
                </Typography>
                <LineChart
                  width={width / 1.5}
                  height={height / 5}
                  xAxis={[
                    {
                      data: younghee_data?.chart_data
                        ? younghee_data?.chart_data?.map((item: any) =>
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
                      data:
                        younghee_data?.chart_data?.map((item: any) => item.total) ?? [],
                      showMark: false,
                      color: "#000000",
                    },
                  ]}
                />
              </div>
            </Card>
            {younghee_data?.traffic_data &&
              younghee_data?.traffic_total &&
              Object.keys(younghee_data?.traffic_total).map(
                (item: any, index: number) => (
                  <Card key={item + index} sx={styles.section}>
                    <div style={styles.chartContainer}>
                      <Typography variant="h6" style={styles.title}>
                        Monthly {item} Chart [ totalUser :{" "}
                        {((younghee_data.traffic_total as Record<string, number>)[
                          item
                        ] as number) || 0}{" "}
                        ]
                      </Typography>
                      <LineChart
                        width={width / 1.5}
                        height={height / 5}
                        xAxis={[
                          {
                            data: younghee_data?.traffic_data
                              ? younghee_data?.traffic_data?.map((item: any) =>
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
                              younghee_data?.traffic_data?.map(
                                (items: any) => items[item]
                              ) ?? [],
                            showMark: false,
                            color: "#000000",
                          },
                        ]}
                      />
                    </div>
                  </Card>
                )
              )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxSizing: "border-box", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
        <AccordionSummary sx={{ backgroundColor: "#fff" }} expandIcon={<GridExpandMoreIcon />}>
          <Typography style={{ fontSize: "1rem", fontWeight: "bold", padding: "10px", zIndex: 1000, color: "#000" }}>
            Cheolsu Live Dashboard
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
<Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Cheolsu Live Dashboard -{" Last Refresh : "}
              {refresh_cheolsu_date.toISOString().split("T")[0] +
                " " +
                refresh_cheolsu_date.toISOString().split("T")[1].split(".")[0]}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: `repeat(${width > 1024 ? 5 : width < 540 ? 1 : 2
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
                      color: cheolsu_live_up[index] ? "green" : "#000",
                    }}
                  >
                    {Number(
                      cheolsu_live_count[item as keyof typeof cheolsu_live_count]
                    ).toLocaleString()}
                  </Typography>
                </Card>
              ))}
            </Box>
            <Card sx={styles.section}>
              <div style={styles.chartContainer}>
                <Typography variant="h6" style={styles.title}>
                  Monthly Create User Chart [ totalUser : {cheolsu_data?.total} ]
                </Typography>
                <LineChart
                  width={width / 1.5}
                  height={height / 5}
                  xAxis={[
                    {
                      data: cheolsu_data?.chart_data
                        ? cheolsu_data?.chart_data?.map((item: any) =>
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
                      data:
                        cheolsu_data?.chart_data?.map((item: any) => item.total) ?? [],
                      showMark: false,
                      color: "#000000",
                    },
                  ]}
                />
              </div>
            </Card>
            {cheolsu_data?.traffic_data &&
              cheolsu_data?.traffic_total &&
              Object.keys(cheolsu_data?.traffic_total).map(
                (item: any, index: number) => (
                  <Card key={item + index} sx={styles.section}>
                    <div style={styles.chartContainer}>
                      <Typography variant="h6" style={styles.title}>
                        Monthly {item} Chart [ totalUser :{" "}
                        {((cheolsu_data?.traffic_total as Record<string, number>)[
                          item
                        ] as number) || 0}{" "}
                        ]
                      </Typography>
                      <LineChart
                        width={width / 1.5}
                        height={height / 5}
                        xAxis={[
                          {
                            data: cheolsu_data?.traffic_data
                              ? cheolsu_data?.traffic_data?.map((item: any) =>
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
                              cheolsu_data?.traffic_data?.map(
                                (items: any) => items[item]
                              ) ?? [],
                            showMark: false,
                            color: "#000000",
                          },
                        ]}
                      />
                    </div>
                  </Card>
                )
              )}
          </Box>
        </AccordionDetails>
      </Accordion>
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

import { DB_TYPE } from "../../../lib/types/type";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataCall from "../../../lib/module/data.call";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

export default function YoungheeExchange() {
  const [exchange_list, setExchangeList] = useState<DB_TYPE["exchange_data"][]>(
    []
  );
  const [selectedStatus, setSelectedStatus] = useState<0 | 1 | 2>(0);
  const [user_token, setUserToken] = useState<string>("");

  const fetchExchangeData = async () => {
    const response = await DataCall.getInstance().exchangeList(0, "younghee");
    setExchangeList(response.data.exchange);
  };
  const selected_status = (status: 0 | 1 | 2) => {
    setSelectedStatus(status);
    DataCall.getInstance()
      .exchangeList(status, "younghee")
      .then((res) => {
        setExchangeList(res.data.exchange);
      });
  };
  const getUserDetail = async (id: string) => {
    DataCall.getInstance()
      .getUserDetail(id, "younghee")
      .then((res) => {
        setUserToken(res.token[0].platform_token);
      });
  };

  useEffect(() => {
    fetchExchangeData();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Select
        value={selectedStatus}
        onChange={(e) => selected_status(e.target.value as 0 | 1 | 2)}
      >
        <MenuItem value={0}>Pending</MenuItem>
        <MenuItem value={1}>Success</MenuItem>
        <MenuItem value={2}>Failed</MenuItem>
      </Select>
      {exchange_list && (
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onClick={() => getUserDetail(exchange_list[0].telegramUserId ?? "")}
        >
          {exchange_list.map((exchange) => (
            <Accordion
              key={exchange.id}
              sx={{ overflow: "auto", fontSize: "12px" }}
            >
              <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color:
                      exchange.success == 1
                        ? "green"
                        : exchange.success == 0
                        ? "orange"
                        : "red",
                  }}
                >
                  Exchange ID: {exchange.id} -{" "}
                  {exchange.success == 1
                    ? "Success"
                    : exchange.success == 0
                    ? "Pending"
                    : "Failed"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table aria-label="exchange table">
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          User Now Platform Token
                        </TableCell>
                        <TableCell>{user_token}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          From Token
                        </TableCell>
                        <TableCell>{exchange.from_token}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          To Token
                        </TableCell>
                        <TableCell>{exchange.to_token}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          To Amount
                        </TableCell>
                        <TableCell>{exchange.to_amount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          From Amount
                        </TableCell>
                        <TableCell>{exchange.from_amount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Wallet Address
                        </TableCell>
                        <TableCell>{exchange.wallet_address}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Created At
                        </TableCell>
                        <TableCell>{exchange.created_at}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Success
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              exchange.success == 0
                                ? "orange"
                                : exchange.success == 1
                                ? "green"
                                : "red",
                          }}
                        >
                          {exchange.success == 0
                            ? "Pending"
                            : exchange.success == 1
                            ? "Success"
                            : "Failed"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Telegram User ID
                        </TableCell>
                        <TableCell>{exchange.telegramUserId}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {exchange.success == 0 && (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                      width: "100%",
                      marginTop: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        DataCall.getInstance()
                          .updateExchange(exchange.id ?? "", 1, "younghee")
                          .then((res) => {
                            console.log(res);
                            fetchExchangeData();
                          });
                      }}
                    >
                      Success
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        DataCall.getInstance()
                          .updateExchange(exchange.id ?? "", 2, "younghee")
                          .then((res) => {
                            console.log(res);
                            fetchExchangeData();
                          });
                      }}
                    >
                      Failed
                    </Button>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={fetchExchangeData}>
        Load More
      </Button>
    </Box>
  );
}

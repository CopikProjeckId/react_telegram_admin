import { DB_TYPE } from "../../../lib/types/type";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
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
export default function TugRubyList() {
  const limit = 20;
  const [ruby_list, setRubyList] = useState<DB_TYPE["deposit_checker"][]>([]);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const MoreList = () => {
    DataCall.getInstance()
      .getRubyList(ruby_list.length, limit, "tug")
      .then((res) => {
        let new_ruby_list = res.data.result;
        setRubyList([...ruby_list, ...new_ruby_list]);
      });
  };
  useEffect(() => {
    const fetchRubyList = async () => {
      await DataCall.getInstance()
        .getRubyList(0, limit, "tug")
        .then((res) => {
          setRubyList(res);
        });
    };
    fetchRubyList();
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
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      ></Box>
      {ruby_list.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {ruby_list.map((ruby, index) => (
            <Box key={ruby.id}>
              <Accordion
                expanded={open[ruby.id ?? ""]}
                onChange={() =>
                  setOpen({ ...open, [ruby.id ?? ""]: !open[ruby.id ?? ""] })
                }
                sx={{
                  backgroundColor:
                    ruby.status === "Y"
                      ? "#A5D6A7"
                      : ruby.status === "P"
                      ? "#FFE082"
                      : "#EF9A9A",
                }}
              >
                <AccordionSummary
                  expandIcon={<GridExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography variant="body1">{`${index + 1} - ${ruby.id} : ${
                      ruby.telegram_id
                    }`}</Typography>
                    <Typography variant="body2">{`TIME : ${ruby.created_at}`}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>ID</TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {ruby.id}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Amount (TON)
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {ruby.amount}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Sender Address
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {ruby.sender}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Receiver Address
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {ruby.receiver}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Status
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {ruby.status}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Telegram ID
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {ruby.telegram_id}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            User ID
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {ruby.telegramUserId}
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            window.open(
                              `https://tonscan.org/tx/${ruby.tx_hash}`,
                              "_blank"
                            );
                          }}
                        >
                          <TableCell sx={style.tableCellTitle}>
                            Tx Hash <br />
                            (click to TonScan)
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {ruby.tx_hash}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))}
        </Box>
      )}
      {ruby_list.length > 0 && (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            MoreList();
          }}
          style={{
            height: 56,
          }}
        >
          MORE
        </Button>
      )}
    </Box>
  );
}

const style = {
  tableCellTitle: {
    width: "20%",
  },
  tableCellContent: {
    width: "80%",
    fontSize: 14,
    color: "#000",
  },
};

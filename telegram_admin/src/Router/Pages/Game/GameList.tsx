import { DB_TYPE } from "../../../lib/types/type";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DataCall from "../../../lib/module/data.call";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
export default function GameList() {
  const [select_user, setSelectUser] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [game_list, setGameList] = useState<DB_TYPE["game"][]>([]);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const limit = 20;
  const MoreGame = () => {
    DataCall.getInstance()
      .getCallGameData({
        id: select_user?.value ?? "",
        start: game_list.length,
        limit: limit,
      })
      .then((res) => {
        let new_game_list = res.data.gameData;
        setGameList([...game_list, ...new_game_list]);
      });
  };
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
      >
        <Input
          value={select_user ? select_user.label : ""}
          onChange={(e) =>
            setSelectUser({ label: e.target.value, value: e.target.value })
          }
          placeholder="Enter User ID"
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            height: 56,
          }}
          onClick={async () => {
            setOpen({});
            await DataCall.getInstance()
              .getCallGameData({
                id: select_user?.value ?? "",
                start: game_list.length,
                limit: limit,
              })
              .then((res) => {
                if (res.data.gameData.length > 0) {
                  setGameList(res.data.gameData);
                } else {
                  setGameList([]);
                }
              });
          }}
        >
          Search
        </Button>
      </Box>
      {game_list && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="overline">END GAME</Typography>
          {game_list.map((game, index) => (
            <Box key={game.id}>
              <Accordion
                expanded={open[game.id]}
                onChange={() => setOpen({ ...open, [game.id]: !open[game.id] })}
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
                    <Typography variant="body1">{`${index + 1} - ${
                      game.game_name
                    } : ${game.id}`}</Typography>
                    <Typography variant="body2">{`TIME : ${
                      game.created_at.split("T")[0] +
                      " " +
                      game.created_at.split("T")[1].split("Z")[0]
                    }`}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Game Name
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {game.game_name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Booster
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {game.booster}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Game Status
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {game.status}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Start Time
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {game.created_at.split("T")[0] +
                              " " +
                              game.created_at.split("T")[1].split("Z")[0]}
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
      {game_list.length > 0 && (
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            MoreGame();
          }}
          style={{
            height: 56,
          }}
        >
          MORE END GAME
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

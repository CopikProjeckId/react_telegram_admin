import { DB_TYPE } from "../../../lib/types/type";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataCall, { game_type } from "../../../lib/module/data.call";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { Textarea } from "@mui/joy";
export default function GameList() {
  const [select_user, setSelectUser] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [game_list, setGameList] = useState<DB_TYPE["game"][]>([]);
  const [now_game, setNowGame] = useState<DB_TYPE["game"]>(
    {} as DB_TYPE["game"]
  );
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [open_now_game, setOpenNowGame] = useState<boolean>(false);
  const limit = 20;
  const MoreGame = () => {
    DataCall.getInstance()
      .getCallGameData({
        id: select_user?.value ?? "",
        type: "ended",
        game_type: game_type.red_and_green,
        start: game_list.length,
        limit: limit,
        api_type: "red_and_green",
      })
      .then((res) => {
        let new_game_list = res.data.result;
        setGameList([...game_list, ...new_game_list]);
      });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await DataCall.getInstance().getUserListForMessage();
      setUsers(response.data.user);
    };
    fetchUsers();
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
      >
        <Autocomplete
          value={
            select_user
              ? { label: select_user.label, value: select_user.value }
              : null
          }
          onChange={(_event, value) => setSelectUser(value)}
          options={users.map((user) => ({
            label: user.username,
            value: user.id,
          }))}
          renderInput={(params) => (
            <TextField {...params} label="Choose User" variant="outlined" />
          )}
        />
        <Box sx={{ display: "flex", gap: 2 }}>{game_type.red_and_green}</Box>
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
                type: "ended",
                game_type: game_type.red_and_green,
                start: game_list.length,
                limit: limit,
                api_type: "red_and_green",
              })
              .then((res) => {
                setGameList(res.data.result);
              });
            await DataCall.getInstance()
              .getCallGameData({
                id: select_user?.value ?? "",
                type: "now",
                game_type: game_type.red_and_green,
                start: 0,
                limit: 1,
                api_type: "red_and_green",
              })
              .then((res) => {
                setNowGame(res.data.result[0]);
              });
          }}
        >
          Search
        </Button>
      </Box>
      {now_game.id && (
        <Box key={now_game.id}>
          <Accordion
            expanded={open_now_game}
            onChange={() => setOpenNowGame(!open_now_game)}
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
                <Typography variant="overline">
                  NOW GAME : {now_game.id}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={style.tableCellTitle}>Game Name</TableCell>
                      <TableCell sx={style.tableCellContent}>
                        {now_game.game}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={style.tableCellTitle}>
                        Character Position
                      </TableCell>
                      <TableCell sx={style.tableCellContent}>
                        <Textarea
                          variant="outlined"
                          style={{
                            marginTop: "10px",
                            backgroundColor: "black",
                            color: "white",
                            fontSize: 14,
                          }}
                          value={JSON.stringify(
                            now_game.char_position,
                            null,
                            2
                          )}
                          readOnly
                        ></Textarea>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={style.tableCellTitle}>
                        Game State
                      </TableCell>
                      <TableCell sx={style.tableCellContent}>
                        {now_game.state}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={style.tableCellTitle}>
                        Start Time
                      </TableCell>
                      <TableCell sx={style.tableCellContent}>
                        {now_game.created_at.split("T")[0] +
                          " " +
                          now_game.created_at.split("T")[1].split("Z")[0]}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
      {game_list.length > 0 && (
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
                      game.game
                    } : ${game.id}`}</Typography>
                    <Typography variant="body2">{`TIME : ${
                      game.created_at.split("T")[0] +
                      " " +
                      game.created_at.split("T")[1].split("Z")[0]
                    } ~ ${
                      game.ended_at.split("T")[0] +
                      " " +
                      game.ended_at.split("T")[1].split("Z")[0]
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
                            {game.game}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Character Position
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            <Textarea
                              variant="outlined"
                              style={{
                                marginTop: "10px",
                                backgroundColor: "black",
                                color: "white",
                                fontSize: 14,
                              }}
                              value={JSON.stringify(
                                game.char_position,
                                null,
                                2
                              )}
                              readOnly
                            ></Textarea>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            Game State
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {game.state}
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
                        <TableRow>
                          <TableCell sx={style.tableCellTitle}>
                            End Time
                          </TableCell>
                          <TableCell sx={style.tableCellContent}>
                            {game.ended_at.split("T")[0] +
                              " " +
                              game.ended_at.split("T")[1].split("Z")[0]}
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

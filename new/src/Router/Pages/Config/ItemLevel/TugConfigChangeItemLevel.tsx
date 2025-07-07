import { useEffect, useState } from "react";
import DataCall from "../../../../lib/module/data.call";
import { Button } from "@mui/material";
import { useTWA } from "../../../../lib/module/Telegram";

export default function TugConfigChangeItemLevel() {
  const [config, setConfig] = useState<any>(null);
  useEffect(() => {
    DataCall.getInstance()
      .getConfigChangeItem("tug")
      .then((res) => {
        setConfig(res.data);
      });
  }, []);

  return (
    <div>
      <textarea
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          fontSize: "18px",
          color: "#fff",
          borderRadius: "10px",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
        rows={50}
        value={JSON.stringify(config, null, 2)}
        onChange={(e) => setConfig(JSON.parse(e.target.value))}
      />

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "10px", width: "100%", height: "50px" }}
        onClick={() => {
          DataCall.getInstance()
            .updateConfigChangeItem(config, "tug")
            .then(() => {
              if (useTWA.getState().ready) {
                useTWA.getState().webApp?.showPopup({
                  title: "Update Config Changes",
                  message: "Update Config Changes Success",
                  buttons: [
                    {
                      text: "OK",
                      type: "default",
                    },
                  ],
                });
              }
            });
        }}
      >
        Update
      </Button>
    </div>
  );
}

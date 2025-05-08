import React, { useEffect, useState } from "react";
import { TypeState } from "../../context/TypeProvider.jsx";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";

const InformationBar = () => {
  const navigate = useNavigate();

  const { handleTimeChange, setReset, reset, multiplayer } = TypeState();

  const [dialog, setDialog] = useState(false);

  const handleClick = (clickTime) => {
    localStorage.setItem("prevSelectTime", clickTime);
    handleTimeChange();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMultiPlayer = (name) => {
    navigate("/multiplayer", { state: { name } });
  };

  return (
    <div className="InformationBar">
      <div className="SelectTime">
        <span onClick={() => handleClick(15)}>15</span>
        <span onClick={() => handleClick(30)}>30</span>
        <span onClick={() => handleClick(60)}>60</span>
        <span onClick={() => handleClick(120)}>120</span>
      </div>
      <div className="button">
        <button onClick={() => handleClickOpen()}>MultiPlayer</button>
        <button style={{ marginLeft: "40px" }} onClick={() => setReset(!reset)}>
          New Game
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const name = formJson.name;
              handleMultiPlayer(name);
              handleClose();
            },
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Your Name"
              type="text"
              name="name"
              fullWidth
              variant="standard"
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default InformationBar;

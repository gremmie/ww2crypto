import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Switch } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { configNameSaved, selectConfigNames } from "./enigmaSlice.ts";

interface SaveConfigDialogProps {
  disabled: boolean;
}

export default function SaveConfigDialog(props: SaveConfigDialogProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [configName, setConfigName] = React.useState("");
  const [canOverwrite, setCanOverwrite] = React.useState(false);
  const configNames = useAppSelector(selectConfigNames);
  const configExists = configNames.includes(configName);
  const canSave = configName.length !== 0 && (!configExists || canOverwrite);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.name as string;
    dispatch(configNameSaved(name.trim()));
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        disabled={props.disabled}
        onClick={handleClickOpen}
      >
        Save this setup
      </Button>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Save Setup</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseOutlinedIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>Enter a name for this setup:</DialogContentText>
          <form onSubmit={handleSubmit} id="enigma-save-setup-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              fullWidth
              variant="filled"
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              error={configExists && !canOverwrite}
              helperText={
                configExists ? "A setup with this name already exists." : ""
              }
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    value={canOverwrite}
                    onChange={() => setCanOverwrite(!canOverwrite)}
                  />
                }
                label="Overwrite existing setup"
              />
            </FormGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            form="enigma-save-setup-form"
            disabled={!canSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

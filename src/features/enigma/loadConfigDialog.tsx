import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { loadConfigInitiated, selectConfigs } from "./enigmaSlice.ts";
import SetupCard from "./setupCard.tsx";

export default function LoadConfigDialog() {
  const dispatch = useAppDispatch();
  const configs = useAppSelector(selectConfigs);
  const [open, setOpen] = React.useState(false);
  const [setupName, setSetupName] = React.useState("");
  const canLoad = setupName.length > 0;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSetupName("");
  };

  const handleLoad = () => {
    if (setupName.length === 0) return;
    dispatch(loadConfigInitiated(setupName));
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        disabled={configs.length === 0}
        onClick={handleClickOpen}
      >
        Load / Manage Setups
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        closeAfterTransition={false}
      >
        <DialogTitle>Load & Manage Setups</DialogTitle>
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
          <Stack direction="column" spacing={2} alignItems="center">
            <Box
              sx={{
                height: { xs: 200, sm: 400, md: "60vh" },
                width: "100%",
                overflowY: "auto",
                p: 2,
                border: (theme) => `1px solid ${theme.palette.grey[400]}`,
              }}
            >
              <Stack direction="column" spacing={2}>
                {configs.map((config) => (
                  <SetupCard
                    key={config.name}
                    config={config}
                    isSelected={setupName === config.name}
                    selectedCallback={(config) => setSetupName(config.name)}
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" disabled={!canLoad} onClick={handleLoad}>
            Load
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

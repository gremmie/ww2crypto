import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import type { MachineConfig } from "../../../common/config/machineConfig.ts";
import type { MachineType } from "../../../common/config/machineType.ts";
import {
  deleteConfigInitiated,
  loadConfigInitiated,
  selectConfigsByType,
  undoDeleteConfigInitiated,
} from "../../../config/configSlice.ts";
import SetupCard from "./setupCard.tsx";

interface LoadConfigDialogProps {
  machineType: MachineType;
}

export default function LoadConfigDialog(props: LoadConfigDialogProps) {
  const dispatch = useAppDispatch();
  const configs = useAppSelector((s) =>
    selectConfigsByType(s, props.machineType),
  );
  const [open, setOpen] = React.useState(false);
  const [selectedConfigId, setSelectedConfigId] = React.useState("");
  const canLoad = selectedConfigId.length > 0;
  const [deletedConfig, setDeletedConfig] =
    React.useState<MachineConfig | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedConfigId("");
    setDeletedConfig(null);
  };

  const handleLoad = () => {
    if (selectedConfigId.length === 0) return;
    dispatch(loadConfigInitiated(selectedConfigId));
    handleClose();
  };

  const handleCardDblClick = (config: MachineConfig) => {
    setSelectedConfigId(config.id);
    handleLoad();
  };

  const handleDelete = (config: MachineConfig) => {
    setDeletedConfig(config);
    dispatch(deleteConfigInitiated(config.id));
  };

  const handleUndo = () => {
    if (deletedConfig === null) return;
    dispatch(undoDeleteConfigInitiated(deletedConfig));
    setDeletedConfig(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        disabled={configs.length === 0}
        onClick={handleClickOpen}
      >
        Load Setup
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
          {deletedConfig !== null && (
            <Alert
              severity="success"
              onClose={() => setDeletedConfig(null)}
              sx={{ m: 2 }}
            >
              <Typography variant="body1" component="span">
                Setup deleted.{" "}
                <Link
                  component="button"
                  variant="inherit"
                  sx={{ verticalAlign: "baseline" }}
                  onClick={handleUndo}
                >
                  Undo
                </Link>
                .
              </Typography>
            </Alert>
          )}
          <Stack direction="column" spacing={2} alignItems="center">
            <Box
              sx={{
                height: { xs: "70vh" },
                width: "100%",
                overflowY: "auto",
                p: 2,
                border: (theme) => `1px solid ${theme.palette.grey[300]}`,
              }}
            >
              <Stack direction="column" spacing={2}>
                {configs.map((config) => (
                  <SetupCard
                    key={config.id}
                    config={config}
                    isSelected={selectedConfigId === config.id}
                    clickCallback={(config) => setSelectedConfigId(config.id)}
                    dblClickCallback={handleCardDblClick}
                    deleteCallback={handleDelete}
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

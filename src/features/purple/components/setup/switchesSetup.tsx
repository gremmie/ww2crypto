import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { SWITCH_ORDERS, type SwitchOrder } from "../../models/switchOrder.ts";
import { selectSwitchOrder, switchOrderSet } from "../../purpleSlice.ts";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const SwitchesSetup = () => {
  const dispatch = useAppDispatch();
  const switchOrder = useAppSelector(selectSwitchOrder);

  const makeChip = (label: string, index: number) => {
    const speed = index === 0 ? "Fast" : index === 1 ? "Middle" : "Slow";
    const color = index === 0 ? "success" : index === 1 ? "warning" : "error";
    const chipLabel = `${speed}: ${label}`;
    return (
      <ListItem key={index}>
        <Chip label={chipLabel} color={color} />
      </ListItem>
    );
  };

  const handleChange = (e: SelectChangeEvent<SwitchOrder>) => {
    dispatch(switchOrderSet(e.target.value as SwitchOrder));
  };

  return (
    <Stack direction="column" spacing={2} sx={{ alignItems: "center", pb: 3 }}>
      <Typography variant="h6">Set Twenties Switch Order</Typography>
      <Box
        component="ul"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          m: 0,
        }}
      >
        {switchOrder.split("-").map(makeChip)}
      </Box>
      <Box sx={{ pt: 3 }}>
        <FormControl sx={{ width: 100 }}>
          <InputLabel id="switch-order-label">Switch Order</InputLabel>
          <Select
            labelId="switch-order-label"
            id="switch-order-select"
            value={switchOrder}
            label="Switch Order"
            onChange={handleChange}
          >
            {SWITCH_ORDERS.map((order) => (
              <MenuItem key={order} value={order}>
                {order}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};

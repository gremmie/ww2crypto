import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
  selectAnimateFlag,
  selectInputText,
  toggleAnimateFlag,
} from "../../m209Slice.ts";
import {
  convertInputText,
  convertInputTextWithAnimation,
} from "../../m209Thunks.ts";
import { validTextRegex } from "../../machine/constants.ts";

const options = ["Convert", "Fast Convert"] as const;

export const ConvertButton = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const showAnimation = useAppSelector(selectAnimateFlag);
  const inputText = useAppSelector(selectInputText);

  const selectedIndex = showAnimation ? 0 : 1;
  const inputEmpty = inputText.length === 0;
  const inputValid = validTextRegex.test(inputText);

  const handleClick = () => {
    if (showAnimation) {
      dispatch(convertInputTextWithAnimation());
    } else {
      dispatch(convertInputText());
    }
  };

  const handleMenuItemClick = (index: number) => {
    if (index !== selectedIndex) {
      dispatch(toggleAnimateFlag());
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (anchorEl && anchorEl.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={setAnchorEl}
        aria-label="Button group with a nested menu"
      >
        <Button disabled={inputEmpty || !inputValid} onClick={handleClick}>
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select convert style"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

import Step, { type StepProps } from "@mui/material/Step";
import { forwardRef } from "react";
import { RouterStepButton } from "../../../routerLinkComponents/routerStepButton.tsx";
import type { TRoutes } from "../../../routeTypes.ts";

interface SetupStepperStepProps extends StepProps {
  label: string;
  isComplete: boolean;
  routePath: TRoutes;
}

export const SetupStepperStep = forwardRef<
  HTMLDivElement,
  SetupStepperStepProps
>((props: SetupStepperStepProps, ref) => {
  const { label, isComplete, routePath, ...stepProps } = props;
  return (
    <Step completed={isComplete} {...stepProps} ref={ref}>
      <RouterStepButton
        color="inherit"
        to={routePath}
        sx={{
          // Active completed steps are shown in primary so we don't lose our place.
          "& .MuiStepLabel-iconContainer.Mui-active.Mui-completed": {
            "& .MuiStepIcon-root": {
              color: "primary.main",
            },
          },
          // Completed, non-active steps are shown in success color.
          "& .MuiStepLabel-iconContainer.Mui-completed": {
            "& .MuiStepIcon-root": {
              color: "success.light",
            },
          },
        }}
      >
        {label}
      </RouterStepButton>
    </Step>
  );
});

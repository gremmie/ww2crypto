import { useAppSelector } from "../../../../app/hooks.ts";
import { selectIsSetupComplete } from "../../enigmaSlice.ts";
import OperateEmptyView from "../operate/operateEmptyView.tsx";
import OperateView from "../operate/operateView.tsx";

export function EnigmaOperateTab() {
  const isSetupComplete = useAppSelector(selectIsSetupComplete);

  return (
    <>
      {isSetupComplete && <OperateView />}
      {!isSetupComplete && <OperateEmptyView />}
    </>
  );
}

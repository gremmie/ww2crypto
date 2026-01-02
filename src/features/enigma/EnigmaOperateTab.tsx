import { useAppSelector } from "../../app/hooks.ts";
import { selectIsSetupComplete } from "./enigmaSlice.ts";
import OperateEmptyView from "./OperateEmptyView.tsx";
import OperateView from "./OperateView.tsx";

export function EnigmaOperateTab() {
  const isSetupComplete = useAppSelector(selectIsSetupComplete);

  return (
    <>
      {isSetupComplete && <OperateView />}
      {!isSetupComplete && <OperateEmptyView />}
    </>
  );
}

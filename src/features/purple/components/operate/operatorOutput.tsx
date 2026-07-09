import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { OperatorOutputView } from "../../../common/components/operatorOutputView.tsx";
import { outputTextCleared, selectOutputText } from "../../purpleSlice.ts";

export const OperatorOutput = () => {
  const dispatch = useAppDispatch();
  const outputText = useAppSelector(selectOutputText);

  return (
    <OperatorOutputView
      id="purple-operator-output"
      value={outputText}
      onClear={() => dispatch(outputTextCleared())}
    />
  );
};

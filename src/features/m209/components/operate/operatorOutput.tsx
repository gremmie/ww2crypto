import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { OperatorOutputView } from "../../../common/components/operatorOutputView.tsx";
import { outputTextCleared, selectOutputText } from "../../m209Slice.ts";

export const OperatorOutput = () => {
  const dispatch = useAppDispatch();
  const outputText = useAppSelector(selectOutputText);

  return (
    <OperatorOutputView
      id="m209-operator-output"
      value={outputText}
      onClear={() => dispatch(outputTextCleared())}
    />
  );
};

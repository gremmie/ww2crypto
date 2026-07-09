import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { OperatorInputView } from "../../../common/components/operatorInputView.tsx";
import {
  formatInputText,
  inputTextChanged,
  selectInputText,
} from "../../m209Slice.ts";
import { validTextRegex } from "../../machine/constants.ts";
import { ConvertButton } from "./convertButton.tsx";

export const OperatorInput = () => {
  const dispatch = useAppDispatch();
  const inputText = useAppSelector(selectInputText);

  return (
    <OperatorInputView
      id="m209-operator-input"
      value={inputText}
      inputValid={validTextRegex.test(inputText)}
      onChange={(value) => dispatch(inputTextChanged(value))}
      onClear={() => dispatch(inputTextChanged(""))}
      onPaste={(text) => dispatch(inputTextChanged(inputText + text))}
      onFormat={() => dispatch(formatInputText())}
      convertButton={<ConvertButton />}
    />
  );
};

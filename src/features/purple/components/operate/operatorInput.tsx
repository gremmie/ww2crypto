import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import { OperatorInputView } from "../../../common/components/operatorInputView.tsx";
import {
  formatInputText,
  inputTextChanged,
  selectInputText,
  selectMode,
} from "../../purpleSlice.ts";
import {
  validInputDecryptRegex,
  validInputEncryptRegex,
} from "../../machine/constants.ts";
import { ConvertButton } from "./convertButton.tsx";

export const OperatorInput = () => {
  const dispatch = useAppDispatch();
  const inputText = useAppSelector(selectInputText);
  const mode = useAppSelector(selectMode);

  const inputValid =
    mode === "encrypt"
      ? validInputEncryptRegex.test(inputText)
      : validInputDecryptRegex.test(inputText);

  return (
    <OperatorInputView
      id="purple-input"
      value={inputText}
      inputValid={inputValid}
      onChange={(value) => dispatch(inputTextChanged(value))}
      onClear={() => dispatch(inputTextChanged(""))}
      onPaste={(text) => dispatch(inputTextChanged(inputText + text))}
      onFormat={() => dispatch(formatInputText())}
      convertButton={<ConvertButton />}
    />
  );
};

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { type JSX, useState } from "react";
import { groupText } from "../../utils.ts";

interface CopyButtonProps {
  textToCopy: string;
  isGrouped: boolean;
}

export function CopyButton(props: CopyButtonProps): JSX.Element {
  const [hasCopied, setHasCopied] = useState(false);
  const copyTooltip = hasCopied ? "Copied!" : "Copy to clipboard";

  const handleCopy = async () => {
    const copyText = props.isGrouped
      ? groupText(props.textToCopy)
      : props.textToCopy;
    await navigator.clipboard.writeText(copyText);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 1500);
  };
  return (
    <IconButton aria-label="Copy" onClick={handleCopy} disabled={hasCopied}>
      {hasCopied ? (
        <CheckIcon sx={{ color: (theme) => theme.palette.success.main }} />
      ) : (
        <Tooltip title={copyTooltip}>
          <ContentCopyIcon />
        </Tooltip>
      )}
    </IconButton>
  );
}

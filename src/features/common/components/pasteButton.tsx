import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export interface PasteButtonProps {
  processPaste: (pastedText: string) => void;
}

export const PasteButton = ({ processPaste }: PasteButtonProps) => {
  const handlePasteClick = async () => {
    const pastedText = await navigator.clipboard.readText();
    processPaste(pastedText);
  };

  return (
    <Tooltip title="Paste from clipboard" arrow>
      <IconButton aria-label="Paste" onClick={handlePasteClick}>
        <ContentPasteIcon />
      </IconButton>
    </Tooltip>
  );
};

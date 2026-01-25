import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface ComingSoonProps {
  pageTitle: string;
}

export default function ComingSoon(props: ComingSoonProps) {
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mt: 2, ml: 2 }}>
        {props.pageTitle}
      </Typography>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 10 }}
      >
        <Stack spacing={2} alignItems="center">
          <Box>
            <ConstructionOutlinedIcon sx={{ fontSize: "7rem" }} />
          </Box>
          <Typography variant="h6" sx={{ pt: 2 }}>
            Coming Soon!
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

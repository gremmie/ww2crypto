import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { RouterLink } from "../../routerLinkComponents/routerLink.tsx";
import ExternalLink from "../common/components/externalLink.tsx";
import { ExternalLinkListItem } from "../common/components/externalLinkListItem.tsx";
import { links } from "../common/links.ts";

export function AboutPage() {
  return (
    <Box display="flex" width="100%" justifyContent="center">
      <Paper elevation={2} sx={{ mt: 3, ml: 3, p: 3, maxWidth: 950 }}>
        <Typography
          variant="h4"
          sx={{ fontFamily: '"Special Elite", cursive', fontWeight: 400 }}
          gutterBottom
        >
          About
        </Typography>
        <Typography gutterBottom>
          Hello! This website was created by Brian Neal, a software developer
          from Des Moines, Iowa, USA.
        </Typography>
        <Typography gutterBottom>
          In the Spring of 2012 I discovered Dirk Rijmenants' Enigma Challenge
          at his website <ExternalLink id="cipher-machines" />. I was hooked! In
          2012 and 2013 I created Python libraries to simulate Enigma, the
          M-209, and PURPLE (see the{" "}
          <RouterLink to="/links">Links page</RouterLink>). I always wanted to
          create browser-based simulations of these machines, but I never seemed
          to have the time and my interests drifted elsewhere.
        </Typography>
        <Typography gutterBottom>
          Fast forward to the end of 2025 when I needed to quickly learn
          Typescript for work. This seemed like a great opportunity to port my
          Python code to Typescript and finally create browser-based
          simulations. Thus <i>ww2crypto.online</i> was born!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Special Elite", cursive',
            fontWeight: 400,
            mt: 3,
          }}
          gutterBottom
        >
          Contact
        </Typography>
        <Typography gutterBottom>
          I would love to hear your questions, feedback, suggestions, bug
          reports, etc. You can reach me at{" "}
          <ExternalLink
            url="mailto:bgneal@gmail.com"
            name="bgneal@gmail.com"
            showArrow={false}
          />
          . In particular I would love to hear what brought you to the site and
          what you are using it for.
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Special Elite", cursive',
            fontWeight: 400,
            mt: 3,
          }}
          gutterBottom
        >
          Source Code
        </Typography>
        <Typography gutterBottom>
          Development of this site takes place on the{" "}
          <ExternalLink id="ww2crypto-github" />.
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Special Elite", cursive',
            fontWeight: 400,
            mt: 3,
          }}
          gutterBottom
        >
          Leave a Tip
        </Typography>
        <Typography gutterBottom>
          If you've enjoyed this site, you can buy me a beer at ko-fi.
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <a
            href="https://ko-fi.com/brianneal2026"
            target="_blank"
            rel="noopener"
          >
            <img
              src="/kofi_blue.png"
              alt="Leave a tip for me at ko-fi"
              width={326.7}
              height={66}
            />
          </a>
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Special Elite", cursive',
            fontWeight: 400,
            mt: 3,
          }}
          gutterBottom
        >
          Colophon
        </Typography>
        <Typography gutterBottom>
          I used the following tools to create this website:
        </Typography>
        <ul>
          {links
            .filter((link) => link.tags.includes("colophon"))
            .map((link) => (
              <ExternalLinkListItem key={link.id} link={link} />
            ))}
        </ul>
      </Paper>
    </Box>
  );
}

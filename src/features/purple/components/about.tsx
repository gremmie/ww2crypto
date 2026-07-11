import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CodeFont } from "../../common/components/codeFont.tsx";
import ExternalLink from "../../common/components/externalLink.tsx";
import { ExternalLinkListItem } from "../../common/components/externalLinkListItem.tsx";
import { SpecialFont } from "../../common/components/specialFont.tsx";
import { links } from "../../common/links.ts";

export const PurpleAbout = () => {
  return (
    <TabPanel value={"about"}>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Paper elevation={2} sx={{ p: 3, maxWidth: 950 }}>
          <SpecialFont variant="h3" gutterBottom>
            The PURPLE Cipher Machine
          </SpecialFont>
          <Typography gutterBottom>
            The PURPLE Machine was a cipher machine used by the Japanese Foreign
            Office before and during the Second World War. PURPLE was the code
            name given to the machine by U.S. cryptanalysts. The Japanese called
            the machine 97-shiki ōbun inji-ki (System 97 Printing Machine for
            European Characters), and Angōki B-kata (Type B Cipher Machine). The
            machine was used for secure diplomatic communications and was
            implemented as an electromechanical stepping-switch device.
          </Typography>
          <Typography gutterBottom>
            In an astonishing feat of brainpower, U.S. cryptanalysts were able
            to break the PURPLE cipher without actually seeing or having access
            to the machine itself. A handful of replica machines, or "analogs",
            were built by the U.S. armed forces in order to read Japanese
            diplomatic traffic. No known instances or photographs of an actual
            Japanese machine appear to have survived the war. Fragments of a
            PURPLE machine were recovered from the Japanese embassy in Berlin,
            and these are now on display at the <ExternalLink id="nsa-museum" />
            along with several U.S.-made analogs.
          </Typography>
          <Typography gutterBottom>
            Because the PURPLE cipher was broken, the allies were able to
            secretly read high-level diplomatic traffic between Tokyo and
            Berlin, and, before the U.S. entry to the war, between Tokyo and
            Washington. Notably, the Japanese ambassador in Berlin, Baron
            Hiroshi Ōshima, frequently reported back to Tokyo minutes of
            meetings with Adolf Hitler, providing valuable intelligence to the
            U.S. and the allies.
          </Typography>
          <SpecialFont
            variant="h4"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Setting up the PURPLE Machine
          </SpecialFont>
          <Typography gutterBottom>
            In order to understand the operation and components of the PURPLE
            machine, please refer to the references at the bottom of this page.
            Configuring the machine required setting up the plugboard "alphabet"
            and then setting the order of the three "twenties" switches.
          </Typography>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Plugboard Setup
          </SpecialFont>
          <Typography gutterBottom>
            On the PURPLE "Setup" tab there is a step to configure the plugboard
            alphabet. Type or paste in the desired plugboard wiring. This
            establishes how the input letters are mapped to the stepping
            switches. Note that the first 6 letters are mapped to the "sixes"
            switch (shown in blue). The rest of the letters are wired to the
            first stage of the twenties switches. The string of letters you type
            here must contain all 26 letters of the alphabet, with each letter
            appearing exactly once.
          </Typography>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Twenties Switch Order
          </SpecialFont>
          <Typography gutterBottom>
            The next step on the PURPLE "Setup" tab is to configure the stepping
            order of the three "twenties" switches. These switches are numbered
            1-3, and their stepping order must be established. One switch is
            designated the "fast" switch, another the "middle" switch, and
            finally the remaining switch is the "slow" switch. There are 6
            combinations an operator can select from using the dropdown.
          </Typography>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Saving your Settings
          </SpecialFont>
          <Typography gutterBottom>
            Once you have completed setup for your PURPLE machine, you can save
            your settings using the "Save Setup" bottom on the bottom of each
            setup step. The settings are stored in your browser's local storage.
            The "Load Setup" button can be used to retrieve a previously saved
            setup. Note that currently these settings are tied to a specific
            browser on a specific device.
          </Typography>
          <Typography>
            To delete these saved setups, click the "Load Setup" button, and
            then click the red trash can icon on the setting you wish to delete.
            You can also clear your browser's local storage to delete all saved
            settings at once.
          </Typography>
          <SpecialFont
            variant="h4"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Operating the PURPLE Machine
          </SpecialFont>
          <Typography gutterBottom>
            The PURPLE "Operate" tab is where you operate your PURPLE machine.
            At the top are indicators and controls for the 4 stepping switches:
            the "sixes", and the 3 "twenties". Colored indicators are shown to
            remind you which twenties switch is currently set to be "fast",
            "middle", or "slow". You can type a number from 1-25, inclusive,
            into each switch field to set the current switch position. For small
            adjustments you can use the + and - buttons.
          </Typography>
          <Typography gutterBottom>
            Below the switch indicators is an "Encrypt/Decrypt" switch, which
            toggles the mode of the PURPLE machine. There is also a "Reset
            Switches" button which sets all stepping switches to their "1"
            position.
          </Typography>
          <Typography gutterBottom>
            At the bottom of the tab are two text fields. The input text field
            is on the right, while the read-only output field is on the left (or
            top to bottom if you are on a phone or smaller handheld device).
            There are controls to clear these fields and perform copy & paste.
          </Typography>
          <Typography gutterBottom>
            The input box is where you prepare text to be converted (either
            encrypted or decrypted). The "Format" button is provided as a
            convenience to format the text depending on what mode you are
            currently in (encrypt or decrypt). In encrypt mode, all letters are
            converted to uppercase, and all spaces are removed. Numbers are
            spelled out as words, e.g. "1" becomes "ONE". This is the same in
            decrypt mode, except "-" characters are also accepted to indicate a
            "garbled" letter whose true value is unknown. The "-" is copied
            directly to the output window when processed.
          </Typography>
          <Typography gutterBottom>
            Once your text is prepared and it is time to run it through the
            PURPLE machine, you have two choices. In encrypt mode, the button to
            perform the processing can be toggled between "Encrypt" and "Fast
            Encrypt". In the former mode, the text will be processed a letter at
            a time as if someone was quickly typing on the input typewriter. You
            will be able to see the switch positions step according to the
            PURPLE algorithm. If you'd rather not see this animation, toggle the
            button to "Fast Encrypt" and the encrypt operation will be performed
            instantly. Likewise in decrypt mode, the button can be toggled
            between "Decrypt" and "Fast Decrypt".
          </Typography>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Encrypting a Message
          </SpecialFont>
          <Typography gutterBottom>
            To communicate with another party, each side must have configured
            their PURPLE machine in exactly the same way. This includes the
            plugboard alphabet, the twenties switches stepping order, and the
            initial positions of all 4 stepping switches. If you read the
            CryptoCellar references below, you'll see that the Japanese employed
            elaborate procedures to ensure that both sides were in sync. These
            methods were changed throughout the war, and often involved using
            the current date and various offline lookup tables. For our
            purposes, we'll assume both sender and receiver have agreed on
            machine settings in advance, or have included these settings in the
            message as "message indicators" (usually obscured or encoded in some
            way).
          </Typography>
          <Typography gutterBottom>
            For this example, let's assume the current plugboard alphabet is{" "}
            <CodeFont component="span">NOKTYUXEQLHBRMPDICJASVWGZF</CodeFont>,
            and the twenties switch order is set to{" "}
            <CodeFont component="span">2-3-1</CodeFont>. Make sure the "Setup"
            tab has these settings configured.
          </Typography>
          <Typography gutterBottom>
            Next we'll assume the initial positions of the stepping switches
            have been indicated as sixes: 10, twenties #1: 13, twenties #2: 8,
            and twenties #3: 5. On the "Operate" tab, ensure the switches
            positions are set to these values. Next, slide the "Encrypt/Decrypt"
            switch to the "Encrypt" position.
          </Typography>
          <Typography gutterBottom>
            Now let's assume the secret message to be sent is{" "}
            <CodeFont component="span">
              Diplomatic talks have resumed order the pizza
            </CodeFont>
            . Type or paste this text exactly into the input field. Click the
            "Format" button to remove spaces and put all letters into uppercase.
            Now click "Encrypt" and watch the message get encrypted letter by
            letter. If your machine was setup exactly as in our example, the
            encrypted output should be{" "}
            <CodeFont component="span">
              FBFPOXLYQWSQWSNENYJQZGZIADYJCIKJQHCTLFIHRCW
            </CodeFont>
            .
          </Typography>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Decrypting a Message
          </SpecialFont>
          <Typography gutterBottom>
            In order to decrypt the message we received in the example above, we
            must ensure our PURPLE machine is setup in exactly the same way. Go
            into the "Setup" tab and ensure the plugboard alphabet and twenties
            switch order is set as per the above section.
          </Typography>
          <Typography gutterBottom>
            Next, on the "Operate" tab, ensure the initial switch positions are
            again set to the same values (sixes: 10, twenties #1: 13, twenties
            #2: 8, and twenties #3: 5). Slide the "Encrypt/Decrypt" switch to
            the "Decrypt" position. Be sure to clear both the input and output
            fields. Then type or paste the encrypted message text{" "}
            <CodeFont component="span">
              FBFPOXLYQWSQWSNENYJQZGZIADYJCIKJQHCTLFIHRCW
            </CodeFont>{" "}
            into the input field. Click either the "Decrypt" or "Fast Decrypt"
            button, and you should then see the original plaintext message in
            the output window:{" "}
            <CodeFont component="span">
              DIPLOMATICRELATIONSHAVERESUMEDORDERTHEPIZZA
            </CodeFont>
            .
          </Typography>
          <SpecialFont
            variant="h4"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            References
          </SpecialFont>
          <Typography gutterBottom>
            Here are some resources that I found extremely useful to
            understanding the PURPLE machine. I also include a link to my own
            Python PURPLE library, which inspired this web-based simulation.
          </Typography>
          <Typography gutterBottom>
            This simulator would not have been possible without Frode Weierud's
            CryptoCellar page and the detailed explanations and analysis found
            in the first reference, below. The author is also deeply grateful
            for email discussions with Frode Weierud and Geoff Sullivan who
            provided me with plaintext, advice, and encouragement.
          </Typography>
          <ul>
            {links
              .filter((link) => link.tags.includes("purple"))
              .map((link) => (
                <ExternalLinkListItem key={link.id} link={link} />
              ))}
          </ul>
        </Paper>
      </Box>
    </TabPanel>
  );
};

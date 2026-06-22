import TabPanel from "@mui/lab/TabPanel";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { CodeFont } from "../../common/components/codeFont.tsx";
import ExternalLink from "../../common/components/externalLink.tsx";
import { ExternalLinkListItem } from "../../common/components/externalLinkListItem.tsx";
import { SpecialFont } from "../../common/components/specialFont.tsx";
import { links } from "../../common/links.ts";

const exampleSettings = {
  "Key List Indicator": "ZT (The name for this setting in the key sheet)",
  Lugs: "0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6",
  "Key Wheel 1": "ABCEFGHIJMNPQRTWX",
  "Key Wheel 2": "ABDGHKMSUXZ",
  "Key Wheel 3": "ABCEKLMNORSX",
  "Key Wheel 4": "BIJLOQU",
  "Key Wheel 5": "BCDEJMQS",
  "Key Wheel 6": "ACFGIJKMNOQ",
  "Letter Check": "QXIAS TCPIU WZAFN FFSIF AOLSY D",
} as const;

export const M209About = () => {
  return (
    <TabPanel value={"about"}>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Paper elevation={2} sx={{ p: 3, maxWidth: 950 }}>
          <SpecialFont variant="h3" gutterBottom>
            The M-209 Cipher Machine
          </SpecialFont>
          <Typography gutterBottom>
            The Converter M-209 is a portable mechanical cipher machine used by
            the US Army and USAAF during World War II and into the Korean War
            for medium-level tactical communications. It was also used by the US
            Navy under the designation CSP-1500. The machine was designed by the
            Swedish cryptographer Boris Hagelin, and is known to be one of the
            many "Hagelin devices" or "pin and lug" machines. The M-209 is a
            completely mechanical device and produces output onto a paper strip.
          </Typography>
          <Typography gutterBottom>
            Only the letters A-Z could be used on the M-209. Spaces were
            indicated by the letter "Z". When the converter was placed in
            "Decipher" mode, the Z letters were printed as spaces on the paper
            tape. Numbers had to be spelled out. The conventions for punctuation
            and abbreviations were changed periodically to keep the enemy
            guessing.
          </Typography>
          <Typography gutterBottom>
            For more information on the history, components, and operation of
            the M-209 please see the references, below. In particular I
            recommend watching the <ExternalLink id="m209-training-film" />, a
            4-part YouTube playlist. The video quality is unfortunately not good
            but it gives an excellent overview of the components and operation.
          </Typography>
          <SpecialFont
            variant="h4"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Setting up the M-209
          </SpecialFont>
          <Typography gutterBottom>
            To understand how the M-209 works and how it is setup, please see{" "}
            <ExternalLink id="bouchaudy-m209" /> and the{" "}
            <ExternalLink id="m209-wikipedia" />.
          </Typography>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Key Lists
          </SpecialFont>
          <Typography gutterBottom>
            Key lists are instructions on how to setup the M-209. These were
            issued to M-209 operators and settings were changed daily. A key
            list for a specific day of the month was given a two letter code
            known as a key list indicator, e.g. "RJ". This code was sent over
            the air along with the message to indicate which key list was being
            used. A key list for a given day included the drum lug settings and
            the key wheel pin settings.
          </Typography>
          <Typography gutterBottom>
            Because the M-209 was extremely tedious and error prone to setup,
            key lists also included a "letter check". Once the machine was
            configured according to the daily key settings, the operator could
            check their work by encoding the letter "A" 26 times. The key list
            would include the expected encrypted output of this test. If the
            actual text did not match the letter check in the key list the
            operator knew something was wrong, and they would have to double
            check their setup.
          </Typography>
          <Typography gutterBottom>
            To communicate with others, each party must have the same key list.
            To obtain your own key lists you have several options.
          </Typography>
          <ol>
            <Typography component="li" gutterBottom>
              You could create your own based on instructions from the M-209
              operator manual. We have several links to the 1942 and 1943
              manuals in the references, below.
            </Typography>
            <Typography component="li" gutterBottom>
              Mark Blair has created a library of ready-to-use keying material
              for hobbyists. See <ExternalLink id="blair-m209-key-tables" />.
            </Typography>
            <Typography component="li" gutterBottom>
              The author's own <ExternalLink id="m209" /> Python simulation
              contains a key list generator that is based on the algorithm
              described in the M-209 operator manual. Once you've installed the
              application, you can run{" "}
              <CodeFont component="span">$ m209 keygen -n 30</CodeFont> to
              generate 30 days of key lists.
            </Typography>
          </ol>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Drum & Lug Setup
          </SpecialFont>
          <Typography gutterBottom>
            Once you have have a key list in mind, you can set the drum lugs on
            the first step of the "Setup" tab. On the left is a set of controls
            for rotating the drum cage and sliding the 2 lugs on each of the 27
            bars to the desired positions. As you make changes, a summary of the
            lug setup will appear in the read-only text field titled "Current
            Lug Settings".
          </Typography>
          <Typography gutterBottom>
            To save time you can also type or paste your drum lug settings into
            the text field titled "Bulk Set Lugs". Click the "Bulk Set Lugs"
            button below the text field to apply your changes. An example format
            that is accepted here is{" "}
            <CodeFont component="span">
              0-5*8 1-0*4 1-3 2-4*2 3-0*8 3-4 3-5*2 4-6
            </CodeFont>
            . This indicates the first 8 bars are set to "0-5", then next 4 to
            "1-0", the next is set to "1-3", and so on. Note that order does not
            matter as the drum cage makes one complete cycle whenever the
            operator pulls the drive knob to process a letter.
          </Typography>
          <Typography gutterBottom>
            Two other buttons of interest are present here. "Reset All Lugs"
            will reset all lugs to their zero positions. And finally a "Sort
            Lugs" button will sort the lug settings. This is just for
            convenience and tidying up the display, as again, the ordering of
            the lug settings is not significant.
          </Typography>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Key Wheel Pin Setup
          </SpecialFont>
          <Typography gutterBottom>
            The second step of the "Setup" tab is where you set the key wheel
            pins. At the top of the display is a set of 6 radio-style buttons
            for selecting the key wheel of interest. Below these buttons on the
            left is a set of switches for the selected wheel. The key wheel can
            be rotated forward or back to see all of the pins on the wheel.
            Sliding the switches to the right moves the pins to the "effective"
            position. As you make changes, a summary of the current pin settings
            will be shown in the read-only text field titled "Wheel X Effective
            Pins", where X indicates which wheel (1-6) you are configuring. In
            this display a letter will appear for each pin in the effective
            position.
          </Typography>
          <Typography gutterBottom>
            You can also type or paste your key wheel pin settings into the text
            field titled "Bulk Set Pins". Just remember that not every wheel has
            the full set of 26 letters. When finished, click the "Bulk Set Pins"
            button to apply your changes. If you need to start over, the "Reset
            All Pins" button will move all pins to their ineffective positions.
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
            Once you have completed setup for your M-209, you can save your
            settings using the "Save Setup" bottom on the bottom of each setup
            step. The settings are stored in your browser's local storage. The
            "Load Setup" button can be used to retrieve a previously saved
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
            Operating the M-209
          </SpecialFont>
          <Typography gutterBottom>
            The Operate tab is used to operate the converter, performing both
            encrypt and decrypt operations. At the top of the tab are the six
            key wheels. You can set individual key wheels to display the desired
            letter either by clicking the up or down arrows to rotate the wheel,
            or you can type directly into the text field.
          </Typography>
          <Alert variant="outlined" severity="info" sx={{ my: 1.5 }}>
            The up and down arrows can be confusing, but remember that the down
            arrow is rotating the key wheel towards you, and thus advancing to
            the next letter. Up rotates the wheel away from you and thus
            "rewinds" to the previous letter.
          </Alert>
          <Typography gutterBottom>
            Below the key wheels are three controls. On the left is the Cipher /
            Decipher switch (which is a knob on the actual converter). When the
            switch is in the "C" or "Cipher" position, the output text is
            formatted in five letter groups. In the "D" or "Decipher" position,
            all "Z" letters in the output are turned into spaces.
          </Typography>
          <Typography gutterBottom>
            On the right is the control for rotating the main axle. This will
            rotate all key wheels at once. This is required to reset the letter
            counter, described below.
          </Typography>
          <Typography gutterBottom>
            The center control below the key wheels is the letter counter which
            is useful for keeping track of where you are when working on a
            message. Next to the counter is a reset button, which does not exist
            on a real converter, but is provided as a convenience to save you
            time rolling the main axle backwards after converting a long
            message.
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
            currently in (cipher or decipher). In cipher mode, all letters are
            converted to uppercase, and all spaces are converted to "Z" letters.
            Numbers are spelled out as words, e.g. "1" becomes "ONE". In
            decipher mode, all spaces from 5-letter grouping is removed.
          </Typography>
          <Typography gutterBottom>
            Once your text is prepared and it is time to run it through the
            converter, you have two choices. The default "Convert" option runs
            each letter through the machine one at a time, simulating a human
            operator pulling the drive knob (albeit much quicker than a human
            could). In this mode you can watch the wheels rotate and the letter
            counter advance. If you'd prefer to skip this "animation" and get an
            instantaneous conversion, toggle the button to the "Fast Convert"
            option.
          </Typography>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Performing a Letter Check
          </SpecialFont>
          <Typography gutterBottom>
            Let's suppose the daily key sheet has the following settings:
          </Typography>
          <TableContainer component={Paper} sx={{ maxWidth: "80%", my: 2 }}>
            <Table size="small">
              <TableBody>
                {Object.entries(exampleSettings).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      {key}:
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography gutterBottom>
            Once the lugs and key wheels are setup according to the table,
            above, we can now perform a "letter check" to see if we got
            everything correct.
          </Typography>
          <ol>
            <Typography gutterBottom component="li">
              Reset the letter counter to 0 by pressing the reset button (or
              turning the main axle).
            </Typography>
            <Typography gutterBottom component="li">
              Ensure all key wheels are showing the letter "A".
            </Typography>
            <Typography gutterBottom component="li">
              Set the mode to "Cipher" (C).
            </Typography>
            <Typography gutterBottom component="li">
              If necessary, clear the input and output boxes.
            </Typography>
            <Typography gutterBottom component="li">
              Type the letter "A" 26 times in the input text field.
            </Typography>
            <Typography gutterBottom component="li">
              Press "Convert", or if you prefer, "Fast Convert".
            </Typography>
            <Typography gutterBottom component="li">
              The text in the output box should now be "QXIAS TCPIU WZAFN FFSIF
              AOLSY D". If it does not match, the converter was not setup
              correctly and the settings need to be reviewed again.
            </Typography>
          </ol>

          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Sending a Message
          </SpecialFont>
          <Typography gutterBottom>
            This section and the next were largely informed by{" "}
            <ExternalLink id="m209-training-film" /> and{" "}
            <ExternalLink id="blair-practical-ch-1" />.
          </Typography>
          <Typography gutterBottom>
            Before sending a message to a receiver, each party involved must be
            using the same set of key sheets. For this example, let's assume
            both sender and receiver are using the setting "ZT" as described
            above in the Letter Check section. Each party must configure their
            M-209 according to those settings.
          </Typography>
          <SpecialFont
            variant="h6"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Choosing an External Message Indicator
          </SpecialFont>
          <Typography gutterBottom>
            After configuring their M-209 according to the "ZT" settings, the
            sender first chooses a parameter at random: the "
            <b>external message indicator</b>." The external message indicator
            is a string of six letters, taken from the six key wheels. The
            operator simply sets the key wheels to some pattern of their
            choosing. Operators were instructed to always use a unique external
            message indicator for each message. Reusing the external message
            indicators would make it easier for the enemy to break into message
            traffic. For this example, let's choose "RAXFSH" as our external
            message indicator. The operator would then set the key wheels to
            this string of letters, and write this down for use later.
          </Typography>
          <SpecialFont
            variant="h6"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Choosing the System Indicator
          </SpecialFont>
          <Typography gutterBottom>
            Next, the operator randomly chooses a value for the next parameter:
            the "<b>system indicator</b>". This is just a random letter of the
            alphabet A-Z. For this example, let's choose the letter "P". The
            operator will write this down or remember this for later.
          </Typography>
          <SpecialFont
            variant="h6"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Generating the Internal Message Indicator
          </SpecialFont>
          <Typography gutterBottom>
            The operator can now generate the "<b>internal message indicator</b>
            ".
          </Typography>
          <ol>
            <Typography gutterBottom component="li">
              Reset the letter counter to 0 either by clicking the reset button
              or rotating the main axle.
            </Typography>
            <Typography gutterBottom component="li">
              Set the Cipher / Decipher switch to "Cipher" (C).
            </Typography>
            <Typography gutterBottom component="li">
              Ensure the key wheels are set to the external message indicator.
              In our current example this is "RAXFSH".
            </Typography>
            <Typography gutterBottom component="li">
              Type the system indicator "P" 12 times in the input field, and
              then click either "Convert" or "Fast Convert". If the M-209 is
              setup correctly and you followed this procedure exactly, you
              should see the text "BAJTM ZLPXQ LK" in the output field.
            </Typography>
            <Typography gutterBottom component="li">
              Reset the letter counter again by clicking the reset button or
              rotating the main axle.
            </Typography>
            <Typography gutterBottom component="li">
              Use the 12 letters in the output field to build the internal
              message indicator. This is accomplished by setting the key wheels
              from left to right to the output text. If a letter is not present
              on a particular key wheel, skip that one and move onto the next
              letter in the output text. In our example, the sixth key wheel
              does not have the letter "Z", so it should be set to "L". In our
              example, the internal message indicator is thus "BAJTML".
            </Typography>
          </ol>
          <Alert variant="outlined" severity="info" sx={{ my: 1.5 }}>
            If you run out of letters in the output text before setting all six
            key wheels, start over with a new external message indicator and
            system indicator.
          </Alert>
          <SpecialFont
            variant="h6"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Encrypting a Message
          </SpecialFont>
          <Typography gutterBottom>
            Clear both the input and output text fields. With the internal
            message indicator showing on the key wheels and the letter counter
            set to 0, the operator can now enter the desired message into the
            input field. For this example, let's choose the message: "ORDER THE
            PIZZA AT SEVENTEEN HUNDRED HOURS". Type or paste this into the input
            field. Notice that the "Convert" button is still disabled. This is
            because the converter cannot process the spaces in our message. Use
            the "Format" button to conveniently replace the spaces with "Z"
            letters. Now you should be able to click "Convert" or "Fast Convert"
            to encrypt your message. This should result in the output text{" "}
            <CodeFont component="span">
              JBJLM VPXIB TJBNZ ROXBI ZHEFA OMFMA GACBH TBSKI RA
            </CodeFont>
          </Typography>
          <SpecialFont
            variant="h6"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Assembling the Final Message
          </SpecialFont>
          <Typography gutterBottom>
            Finally we can put together the complete message, in 5-letter
            groups, to be sent over the air. This is accomplished by putting
            message indicators on both the front and the end of our encrypted
            message, as follows:
          </Typography>
          <ol>
            <Typography gutterBottom component="li">
              The message indicator starts with the system indicator, repeated
              twice. In our example, this is{" "}
              <CodeFont component="span">PP</CodeFont>.
            </Typography>
            <Typography gutterBottom component="li">
              Next, append the external message indicator. This give us:
              <CodeFont component="span">PPRAX FSH</CodeFont>.
            </Typography>
            <Typography gutterBottom component="li">
              To complete the message indicator, append the key list indicator.
              We used "ZT". Our complete message indicator is now{" "}
              <CodeFont component="span">PPRAX FSHZT</CodeFont>.
            </Typography>
            <Typography gutterBottom component="li">
              Prepend the message indicator onto the front of our encrypted
              message. This give us{" "}
              <CodeFont component="span">
                PPRAX FSHZT JBJLM VPXIB TJBNZ ROXBI ZHEFA OMFMA GACBH TBSKI RA
              </CodeFont>
              .
            </Typography>
            <Typography gutterBottom component="li">
              We must now pad our message out to make a complete 5-letter group.
              We are short 3 letters, so let's pad with "X":{" "}
              <CodeFont component="span">
                PPRAX FSHZT JBJLM VPXIB TJBNZ ROXBI ZHEFA OMFMA GACBH TBSKI
                RAXXX
              </CodeFont>
              .
            </Typography>
            <Typography gutterBottom component="li">
              Finally append the message indicator onto the end of the entire
              message. This is what is finally sent over the air to our
              recipient:{" "}
              <CodeFont component="span">
                PPRAX FSHZT JBJLM VPXIB TJBNZ ROXBI ZHEFA OMFMA GACBH TBSKI
                RAXXX PPRAX FSHZT
              </CodeFont>
              .
            </Typography>
          </ol>
          <SpecialFont
            variant="h5"
            sx={{
              mt: 3,
            }}
            gutterBottom
          >
            Receiving a Message
          </SpecialFont>
          <Typography gutterBottom>
            On the receiving end, our M-209 operator is handed the following
            message:{" "}
            <CodeFont component="span">
              PPRAX FSHZT JBJLM VPXIB TJBNZ ROXBI ZHEFA OMFMA GACBH TBSKI RAXXX
              PPRAX FSHZT
            </CodeFont>
            .
          </Typography>
          <Typography gutterBottom>
            The operator notes that the first two letter groups match the last
            two letter groups. Furthermore, the first two letters of these two
            groups repeats. This indicates this is a M-209 message with key list
            indicator "ZT", system indicator "P", and external message indicator
            "RAXFSH".
          </Typography>
          <Typography gutterBottom>
            The operator now performs the following operations decrypt the
            message.
          </Typography>
          <ol>
            <Typography gutterBottom component="li">
              First the operator takes notes of the key list indicator "ZT". The
              operator must first configure the M-209 according to the "ZT" key
              list settings.
            </Typography>
            <Typography gutterBottom component="li">
              Clear both the input and output text fields.
            </Typography>
            <Typography gutterBottom component="li">
              Reset the letter counter to 0, either by clicking the reset button
              or rotating the main axle.
            </Typography>
            <Typography gutterBottom component="li">
              Set the Cipher / Decipher switch to "Cipher" (C).
            </Typography>
            <Typography gutterBottom component="li">
              Set the key wheels to the external message indicator "RAXFSH".
            </Typography>
            <Typography gutterBottom component="li">
              Type the letter "P" 12 times into the input text field.
            </Typography>
            <Typography gutterBottom component="li">
              Click the "Convert" or "Fast Convert" button. This should produce{" "}
              <CodeFont component="span">BAJTM ZLPXQ LK</CodeFont> in the output
              text field.
            </Typography>
            <Typography gutterBottom component="li">
              Reset the letter counter to 0, either by clicking the reset button
              or rotating the main axle.
            </Typography>
            <Typography gutterBottom component="li">
              Set the Cipher / Decipher switch to "Decipher" (D).
            </Typography>
            <Typography gutterBottom component="li">
              As before, the use the output text to set the key wheels to the
              internal message indicator. Because the last key wheel does not
              have the letter "Z" we should end up with "BAJTML".
            </Typography>
            <Typography gutterBottom component="li">
              Clear both the input and output text fields.
            </Typography>
            <Typography gutterBottom component="li">
              Now type or paste in the actual message into the input field. You
              can omit the spaces between the 5-letter groups, or just use the
              "Format" button to remove them all when you are finished. The text
              in the input field should now be:{" "}
              <CodeFont component="span">
                JBJLMVPXIBTJBNZROXBIZHEFAOMFMAGACBHTBSKIRAXXX
              </CodeFont>
              .
            </Typography>
            <Typography gutterBottom component="li">
              Click the "Convert" or "Fast Convert" button. This should result
              in the text{" "}
              <CodeFont component="span" sx={{ whiteSpace: "pre-wrap" }}>
                {"ORDER THE PI  A AT SEVENTEEN HUNDRED HOURSVVI"}
              </CodeFont>
              in the output text field.
            </Typography>
            <Typography gutterBottom component="li">
              Because the converter automatically replaces "Z" letters with
              spaces when in the Decipher mode, the operator now has to mentally
              put them back into the message where it makes sense. Furthermore
              there could be padding letters on the end of the message, so these
              need to be stripped off. Finally the message is assembled and
              passed up the chain of command as:{" "}
              <CodeFont component="span">
                ORDER THE PIZZA AT SEVENTEEN HUNDRED HOURS
              </CodeFont>
              .
            </Typography>
          </ol>
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
            understanding the M-209. I also include a link to my own Python
            M-209 library, which inspired this web-based simulation.
          </Typography>
          <ul>
            {links
              .filter((link) => link.tags.includes("m209"))
              .map((link) => (
                <ExternalLinkListItem key={link.id} link={link} />
              ))}
          </ul>
        </Paper>
      </Box>
    </TabPanel>
  );
};

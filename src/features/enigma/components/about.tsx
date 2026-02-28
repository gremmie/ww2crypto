import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ExternalLinkListItem } from "../../common/components/externalLinkListItem.tsx";
import { links } from "../../common/links.ts";

export default function EnigmaAbout() {
  return (
    <TabPanel value="about">
      <Paper elevation={2} sx={{ p: 3, maxWidth: 950 }}>
        <Typography variant="h3" gutterBottom>
          The Enigma Cipher Machine
        </Typography>
        <Typography variant="body1">
          The Enigma machine is not actually one machine, there is a whole
          family of devices which were used for both civilian and military
          purposes before and after World War 2. You can read more about this
          fascinating history in the references below. Our simulation here is
          for the military versions used during World War 2:
        </Typography>
        <ul>
          <Typography variant="body1" component="li" gutterBottom>
            The German Army (<i>Heer</i>) and Air Force (<i>Luftwaffe</i>) model
            known as "<strong>Enigma I</strong>".
          </Typography>
          <Typography variant="body1" component="li">
            The German Navy (<i>Kriegsmarine</i>) models "<strong>M3</strong>"
            and "<strong>M4</strong>".
          </Typography>
        </ul>
        <Typography variant="body1">
          The Enigma I and M3 models are essentially identical 3-rotor machines.
          There are small cosmetic differences in how the rotors and plugboard
          were labelled. Our simulation lets you decide which notation you
          prefer. Both models used 3 rotating rotors, chosen from a set of five
          (Enigma I) or eight (M3). The M4 model was used by certain
          Kriegsmarine divisions, notably the U-Boats. A fourth, non-moving
          rotor was added to the machine, squeezed between the reflector and the
          movable rotors. The fourth rotor was chosen from a set of two, while
          the remaining three rotating rotors were chosen from the same set of
          eight used by the M3.
        </Typography>
        <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
          Setting up the Enigma
        </Typography>
        <Typography variant="body1">
          In order for two Enigma machine operators to exchange messages, each
          machine had to be setup in an identical manner. In practice this was
          performed by consulting "code books" which designated the settings for
          each day of the month. These code books were highly prized by the
          Allies, and they went to great lengths to capture them. The Allies
          knew how the Enigma machine worked, but without the daily settings
          decrypting intercepted messages was extremely difficult. The following
          components need to be configured in order to exchange messages:
        </Typography>
        <ul>
          <Typography variant="body1" component="li" gutterBottom>
            The <b>rotors</b>, also known as cipher wheels, or <i>Walzen</i>.
            The type of rotor and the order of how they were placed in the
            machine was dictated by daily settings described in the code books.
            Enigma I models had a set of five rotors, numbered in roman numerals
            I through V. The Navy added 3 rotors to this set, VI - VIII, for use
            in the M3 and M4. On the M4, the thin, non-movable fourth rotor was
            chosen from a set of two, named Beta and Gamma.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            The <b>ring settings</b>, or <i>Ringstellung</i>. Each rotor has a
            movable ring which is locked into place over the rotor. The ring is
            labelled with either numbers (Enigma I) or letters (M3 or M4). The
            ring can be placed in one of 26 positions on the rotor. The ring
            also contains one or more notches, which influence how the rotors
            "turn over" after each key press.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            The <b>reflector</b>, or <i>Umkehrwalze (UKW)</i>, sits on the left
            side of the machine and both receives the electrical signal from the
            3 (or 4) rotors and sends it back through them. This part was not
            changed in the field and was omitted from the code books. The most
            widely used reflectors during the war were known as "B" or "C", each
            with different wiring. Late in the war a rewirable version "D" was
            produced. In this version the wiring could be changed in the field
            according to code book procedure. On the M4, the reflector's width
            had to be reduced in order to accommodate the added fourth rotor.
            These reflectors were known as the "thin" versions, and we refer to
            them as "B-Thin" or "C-Thin". These were wired differently than
            their "fatter" cousins.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            The <b>plugboard</b>, or <i>Steckerbrett</i>, allows the operator to
            cross the electrical signal between two pairs of letters using
            cables. The plugboard was added to the Enigma by the German military
            to vastly increase the security of the machine compared to civilian
            models. During the war, procedure dictated that ten cables be used.
            For simulation purposes we allow you to use anywhere from no cables
            to 13.
          </Typography>
        </ul>
        <Typography variant="body1" gutterBottom>
          For more information about these components and Enigma settings,
          please see the reference links at the bottom of this page for photos,
          detailed information, and fascinating history.
        </Typography>
        <Typography variant="body1">
          For our simulation, setup takes place on the "Setup" tab, where we
          walk you through the steps of configuring the machine.
        </Typography>
        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
          Saving your Settings
        </Typography>
        <Typography variant="body1" gutterBottom>
          Once you have completed setup for your Enigma machine, you can save
          your settings using the "Save Setup" bottom on the bottom of each
          setup step. The settings are stored in your browser's local storage.
          The "Load Setup" button can be used to retrieve a previously saved
          setup. Note that currently these settings are tied to a specific
          browser on a specific device.
        </Typography>
        <Typography variant="body1">
          To delete these saved setups, click the "Load Setup" button, and then
          click the red trash can icon on the setting you wish to delete. You
          can also clear your browser's local storage to delete all saved
          settings at once.
        </Typography>
        <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
          Operating the Enigma
        </Typography>
        <Typography variant="body1" gutterBottom>
          Once your machine is setup, you can operate it on the "Operate" tab.
          At the top of the screen you can see the "windows" that show the
          current rotor positions. To set the initial position of the rotors you
          can use the up and down arrows above each window, and you can also
          type directly into the window. Please note that we always show the
          rotors in alphabet notation on this tab for convenience. Enigma I
          models used numbers on their rotors, and the operator had to translate
          to letters using a table printed on the underside of the case lid.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Whether you are encrypting or decrypting a message, you enter text in
          the "input" box. Note that Enigma machine keyboards consisted only of
          letters A-Z, so the input box only accepts letter input. For
          convenience lower case letters are accepted and translated to upper
          case. You can also paste text from your clipboard, but please note
          that non-letter characters in your text will be ignored.
        </Typography>
        <Typography variant="body1" gutterBottom>
          As you type, the lights on the lampboard will "light" up, indicating
          the result of encrypting or decrypting your input text. On an actual
          machine, a second person was usually present to write down each
          indicated letter of the message. For your convenience this text is
          collected in the output box.
        </Typography>
        <Typography variant="body1" gutterBottom>
          It was common for Enigma messages to be grouped in 5-letter groups. We
          provide switches to enable this grouping for both the input and output
          box.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please see the references below to learn about actual military
          procedures for sending and receiving messages. The Kriegsmarine
          employed additional steps to encode their messages using code books
          before using the Enigma for additional security.
        </Typography>
        <Typography variant="body1" gutterBottom>
          We hope you enjoy encrypting and decrypting messages using our Enigma
          simulator!
        </Typography>
        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
          Example
        </Typography>
        <Typography variant="body1" gutterBottom>
          This example walks you through setting up your virtual Enigma machine
          and preparing your first message, based upon an actual procedure used
          by the German military.
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
          Setup
        </Typography>
        <ol>
          <Typography variant="body1" component="li" gutterBottom>
            On the Setup tab, choose the "Model" step, and let's use the default
            "Three Rotor" model.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            On the "Reflector and Rotors" step, choose the "B" reflector and
            rotors (from left to right) "III", "I", "V".
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            On the "Ring Settings" step, let's switch to letter notation and
            then choose the ring settings (from left to right) "G", "A", "M".
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            On the final "Plugboard" step, leave the number of cables at the
            default of 10 and in letter notation. Here you can either "wire"
            letters together or set them all at once by typing in one string.
            Copy and paste the following sequence into the "Connection String"
            input and click "Set": AX BI DP EK GL HO JQ MS RW YZ. This swaps the
            signal for "A" and "X", "B", and "I", etc.
          </Typography>
        </ol>
        <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
          Encrypting your first message
        </Typography>
        <ol>
          <Typography variant="body1" component="li" gutterBottom>
            Navigate to the "Operate" tab.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            We need to make up an arbitrary initial setting for our rotors.
            Let's choose "ESG". You can either type this initial setting into
            the rotor windows, or use the up and down arrows to rotate each
            rotor. Make sure the rotor windows read "ESG" when you are finished.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            Now we are also going to makeup our message key. Let's choose "RAX".
            We now encrypt our message key by typing "RAX" into the "Input" box.
            If you've setup your machine correctly, you should see "HUQ" in the
            output box. This is your encrypted message key that will be sent
            "over the air" to your recipient.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            Now reset your rotor positions to your message key of "RAX".
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            Clear your input and output boxes by clicking the "Clear" buttons
            above each box.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            Now we can finally type the message we want to send. For the sake of
            this example, type the following into the input box:
            "PLEASEORDERTHEPIZZA".
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            If you've done everything correctly your rotor windows should
            display "RBQ" and the encrypted message in the output box should be
            "YKHXCMEDSZDRYFREYMO".
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            The message you send to your recipient will now be the initial rotor
            settings, followed by the encrypted message key, and finally the
            encrypted message text. For our example here, this will be
            "ESGHUQYKHXCMEDSZDRYFREYMO".
          </Typography>
        </ol>
        <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
          Decrypting your first message
        </Typography>
        <ol>
          <Typography variant="body1" component="li" gutterBottom>
            On the recipient's side, the receiver of your message will have to
            setup their Enigma machine in exactly the same way. Perhaps they are
            using the same code book that you are, and this tells them the daily
            machine settings, or perhaps you both have made some other
            agreement. If you are following along and pretending to be the
            receiver there is nothing to do. Otherwise see the section above to
            use the same settings on the "Setup" tab.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            The recipient now analyzes the received message
            "ESGHUQYKHXCMEDSZDRYFREYMO". They know that the first 3 letters are
            the initial rotor setting. They will set their rotor display windows
            to show "ESG".
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            The receiver should make sure both their input and output boxes are
            cleared of any text to avoid confusion. They will now type the
            encrypted message key (the next 3 letters) into the input box:
            "HUQ". This should reveal the actual message key of "RAX" in the
            output box.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            The receiver now sets their rotor positions to "RAX" and clears
            their input and output boxes.
          </Typography>
          <Typography variant="body1" component="li" gutterBottom>
            Finally, the encrypted message, the rest of the text,
            "YKHXCMEDSZDRYFREYMO" can be typed (or pasted) into the input box.
            This should reveal the original message in the output box:
            "PLEASEORDERTHEPIZZA"!
          </Typography>
        </ol>
        <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
          Links
        </Typography>
        <Typography gutterBottom>
          Here are some resources that I found extremely useful to understanding
          the Enigma machine.
        </Typography>
        <ul>
          {links
            .filter((link) => link.tags.includes("enigma"))
            .map((link) => (
              <ExternalLinkListItem link={link} />
            ))}
        </ul>
      </Paper>
    </TabPanel>
  );
}

export interface LinkInfo {
  id: string;
  name: string;
  url: string;
  description: string;
  tags: string[];
}

export const links: LinkInfo[] = [
  {
    id: "cipher-machines",
    name: "Cipher Machines and Cryptology",
    url: "https://www.ciphermachinesandcryptology.com/",
    description:
      "Technical and historical information about cipher machines and the fascinating world of cryptology. " +
      "Dirk Rijmenants has created a gold mine of information for the crypto enthusiast. His Enigma Challenge " +
      'is one of the reasons I got interested in this subject. I greatly relied on his "Technical Details ' +
      'of the Enigma machine" article to create my simulation.',
    tags: ["enigma", "m-209"],
  },
  {
    id: "crypto-museum",
    name: "Crypto Museum",
    url: "https://www.cryptomuseum.com/",
    description:
      "A virtual museum of cryptographical history featuring a treasure trove of photos and " +
      "detailed technical information on an ever growing list of cipher machines and related technology. " +
      "I poured over this site for hours learning about the different Enigma models. Highly recommended.",
    tags: ["enigma", "m-209"],
  },
  {
    id: "crypto-cellar",
    name: "Crypto Cellar Research",
    url: "https://cryptocellar.org/",
    description:
      "Frode Weierud's website about cryptology and its history. Lots of fascinating material here. " +
      "I was particularly interested in his paper on breaking Enigma with modern computers and his " +
      "detailed research on Enigma development and production history.",
    tags: ["enigma"],
  },
  {
    id: "jared-owen-enigma-video",
    name: "How did the Enigma Machine work?",
    url: "https://www.youtube.com/watch?v=ybkkiGtJmkM",
    description:
      "Jared Owen's amazing animated video showing exactly how the Enigma machine works. " +
      "Watch this first if you are brand new to the Enigma machine.",
    tags: ["enigma"],
  },
  {
    id: "py-enigma",
    name: "Py-Enigma",
    url: "https://github.com/gremmie/enigma",
    description:
      "A historically accurate Enigma Machine library written in Python 3. " +
      "Contains library code and a command-line application. Created by the author of this site.",
    tags: ["misc"],
  },
  {
    id: "m209",
    name: "M-209",
    url: "https://github.com/gremmie/m209",
    description:
      "A historically accurate M-209 library written in Python 3. " +
      "Contains library code and a command-line application. Created by the author of this site.",
    tags: ["misc"],
  },
  {
    id: "purple",
    name: "PURPLE",
    url: "https://github.com/gremmie/purple",
    description:
      "A historically accurate PURPLE library written in Python 3. " +
      "Contains library code and a command-line application. Created by the author of this site.",
    tags: ["misc"],
  },
  {
    id: "pallocks-enigma",
    name: "Enigma simulation in Javascript/HTML",
    url: "https://people.physik.hu-berlin.de/~palloks/js/enigma/index_en.html",
    description:
      "Daniel Pallocks' browser-based Enigma simulation. This one simulates a much wider variety of Enigma " +
      "models.",
    tags: ["misc"],
  },
  {
    id: "crypto-collectors",
    name: "Crypto Collectors Mailing List",
    url: "https://groups.io/g/cryptocollectors/",
    description: "Mailing list for collectors of vintage crypto equipment.",
    tags: ["misc"],
  },
];

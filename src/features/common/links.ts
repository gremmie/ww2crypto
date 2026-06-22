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
      'of the Enigma machine" article to create my simulation. Also contains a graphical M-209 simulator.',
    tags: ["enigma", "m209", "all"],
  },
  {
    id: "crypto-museum",
    name: "Crypto Museum",
    url: "https://www.cryptomuseum.com/",
    description:
      "A virtual museum of cryptographical history featuring a treasure trove of photos and " +
      "detailed technical information on an ever growing list of cipher machines and related technology. " +
      "I poured over this site for hours learning about the different Enigma models. Highly recommended.",
    tags: ["enigma", "m209", "all"],
  },
  {
    id: "crypto-cellar",
    name: "Crypto Cellar Research",
    url: "https://cryptocellar.org/",
    description:
      "Frode Weierud's website about cryptology and its history. Lots of fascinating material here. " +
      "I was particularly interested in his paper on breaking Enigma with modern computers and his " +
      "detailed research on Enigma development and production history.",
    tags: ["enigma", "all"],
  },
  {
    id: "jared-owen-enigma-video",
    name: "How did the Enigma Machine work?",
    url: "https://www.youtube.com/watch?v=ybkkiGtJmkM",
    description:
      "Jared Owen's amazing animated video showing exactly how the Enigma machine works. " +
      "Watch this first if you are brand new to the Enigma machine.",
    tags: ["enigma", "all"],
  },
  {
    id: "py-enigma",
    name: "Py-Enigma",
    url: "https://github.com/gremmie/enigma",
    description:
      "A historically accurate Enigma Machine library written in Python 3. " +
      "Contains library code and a command-line application. Created by the author of this site.",
    tags: ["misc", "all"],
  },
  {
    id: "m209",
    name: "M-209",
    url: "https://github.com/gremmie/m209",
    description:
      "A historically accurate M-209 library written in Python 3. " +
      "Contains library code and a command-line application, including a key list " +
      "generator. Created by the author of this site.",
    tags: ["m209", "misc", "all"],
  },
  {
    id: "purple",
    name: "PURPLE",
    url: "https://github.com/gremmie/purple",
    description:
      "A historically accurate PURPLE library written in Python 3. " +
      "Contains library code and a command-line application. Created by the author of this site.",
    tags: ["misc", "all"],
  },
  {
    id: "pallocks-enigma",
    name: "Enigma simulation in Javascript/HTML",
    url: "https://people.physik.hu-berlin.de/~palloks/js/enigma/index_en.html",
    description:
      "Daniel Pallocks' browser-based Enigma simulation. This one simulates a much wider variety of Enigma " +
      "models.",
    tags: ["misc", "all"],
  },
  {
    id: "crypto-collectors",
    name: "Crypto Collectors Mailing List",
    url: "https://groups.io/g/cryptocollectors/",
    description: "Mailing list for collectors of vintage crypto equipment.",
    tags: ["misc", "all"],
  },
  {
    id: "ww2crypto-github",
    name: "ww2crypto.online GitHub Page",
    url: "https://github.com/gremmie/ww2crypto",
    description: "GitHub page for this website. Development happens here.",
    tags: ["misc", "all"],
  },
  {
    id: "typescript",
    name: "Typescript",
    url: "https://www.typescriptlang.org/",
    description: "Programming language",
    tags: ["colophon"],
  },
  {
    id: "react",
    name: "React",
    url: "https://react.dev/",
    description: "UI framework",
    tags: ["colophon"],
  },
  {
    id: "redux-toolkit",
    name: "Redux Toolkit",
    url: "https://redux-toolkit.js.org/",
    description: "State management",
    tags: ["colophon"],
  },
  {
    id: "tanstack-router",
    name: "Tanstack Router",
    url: "https://tanstack.com/router/latest",
    description: "Route management",
    tags: ["colophon"],
  },
  {
    id: "material",
    name: "Material UI",
    url: "https://mui.com/material-ui/",
    description: "UI elements and components",
    tags: ["colophon"],
  },
  {
    id: "pnpm",
    name: "pnpm",
    url: "https://pnpm.io/",
    description: "Package management",
    tags: ["colophon"],
  },
  {
    id: "vite",
    name: "Vite",
    url: "https://vite.dev/",
    description: "Build tool and swiss army knife",
    tags: ["colophon"],
  },
  {
    id: "rtl",
    name: "React Testing Library",
    url: "https://testing-library.com/docs/react-testing-library/intro",
    description: "For unit tests",
    tags: ["colophon"],
  },
  {
    id: "vitest",
    name: "Vitest",
    url: "https://vitest.dev/",
    description: "For unit tests",
    tags: ["colophon"],
  },
  {
    id: "playwright",
    name: "Playwright",
    url: "https://playwright.dev/",
    description: "For integration tests",
    tags: ["colophon"],
  },
  {
    id: "special-elite",
    name: "Special Elite Font",
    url: "https://fonts.google.com/specimen/Special+Elite",
    description: "Vintage typewriter font",
    tags: ["colophon"],
  },
  {
    id: "universfield-click",
    name: "Computer Mouse Click",
    url: "https://pixabay.com/sound-effects/film-special-effects-computer-mouse-click-352734/",
    description: "Click sound effect by Universfield, hosted on Pixabay",
    tags: ["colophon"],
  },
  {
    id: "m209-wikipedia",
    name: "M-209 Wikipedia Page",
    url: "https://en.wikipedia.org/wiki/M-209",
    description: "The M-209 cipher machine on Wikipedia.",
    tags: ["m209", "all"],
  },
  {
    id: "bouchaudy-m209",
    name: "The cipher machine M-209",
    url: "http://www.jfbouch.fr/crypto/m209/index.html",
    description: "Jean-François Bouchaudy's M-209 pages",
    tags: ["m209", "all"],
  },
  {
    id: "maritime-csp-1500",
    name: "Operating Instructions for CSP-1500 (a.k.a. M-209)",
    url: "https://maritime.org/tech/csp1500inst.php",
    description: "An OCR'ed version of the 1942 M-209 manual",
    tags: ["m209", "all"],
  },
  {
    id: "1942-m209-pdf",
    name: "M-209 1942 Manual (PDF)",
    url: "https://www.cryptomuseum.com/crypto/hagelin/m209/files/m209_tm11-380_19420427.pdf",
    description:
      "The 1942 version of the M-209 manual scanned as a PDF. Hosted by The Crypto Museum.",
    tags: ["m209", "all"],
  },
  {
    id: "1943-m209-pdf",
    name: "M-209 1943 Manual (PDF)",
    url: "http://www.jfbouch.fr/crypto/m209/TM_11-380B_20Sep1943.pdf",
    description:
      "The 1943 version of the M-209 manual scanned as a PDF. Hosted by Jean-François Bouchaudy.",
    tags: ["m209", "all"],
  },
  {
    id: "blair-m209",
    name: "Mark Blair's Converter M-209-B",
    url: "https://www.nf6x.net/2009/02/converter-m-209-b/",
    description: "Mark Blair's page on the M-209-B.",
    tags: ["m209", "all"],
  },
  {
    id: "blair-m209-key-tables",
    name: "Mark Blair's Collection of M-209 Key Tables",
    url: "https://www.nf6x.net/2013/03/a-collection-of-m-209-key-tables/",
    description: "A collection of ready-to-use M-209 key lists.",
    tags: ["m209", "all"],
  },
  {
    id: "blair-practical-ch-1",
    name: "Mark Blair's Practical Use of the M-209 Cipher Machine: Chapter 1",
    url: "https://www.nf6x.net/2013/03/practical-use-of-the-m-209-cipher-machine-chapter-1/",
    description:
      "The first of several chapters on the operation and usage of the M-209.",
    tags: ["m209", "all"],
  },
  {
    id: "m209-training-film",
    name: "War Department Official Training Film - Converter M-209",
    url: "https://www.youtube.com/playlist?list=PLCPgncK_sTnEny2-uoTV-1_GC72zo-vKq",
    description:
      "This is a 4-part YouTube playlist of an official War Department training film for the M-209. " +
      "Although the digital transfer is quite poor, the film itself is quite fascinating and it details " +
      "the setup, letter check, and message procedures.",
    tags: ["m209", "all"],
  },
  {
    id: "christos-m209",
    name: "The American M-209 cipher machine",
    url: "https://chris-intel-corner.blogspot.com/2024/07/the-american-m-209-cipher-machine.html",
    description:
      "Interesting article on the M-209 on Christo T's Military and Intelligence blog.",
    tags: ["m209", "all"],
  },
];

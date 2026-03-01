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
    tags: ["enigma", "m-209", "all"],
  },
  {
    id: "crypto-museum",
    name: "Crypto Museum",
    url: "https://www.cryptomuseum.com/",
    description:
      "A virtual museum of cryptographical history featuring a treasure trove of photos and " +
      "detailed technical information on an ever growing list of cipher machines and related technology. " +
      "I poured over this site for hours learning about the different Enigma models. Highly recommended.",
    tags: ["enigma", "m-209", "all"],
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
      "Contains library code and a command-line application. Created by the author of this site.",
    tags: ["misc", "all"],
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
    id: "mui",
    name: "Material UI",
    url: "https://mui.com/",
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
];

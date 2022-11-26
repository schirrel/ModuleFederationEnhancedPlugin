export default {
  title: "MFEnhacedPlugin",
  description: "ModuleFederation with a bit more",
  themeConfig: {
    footer: {
      copyright: "Copyright © 2022-present Alan Balen Schio",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/schirrel/ModuleFederationEnhancedPlugin",
      },
    ],
    sidebar: [
      {
        text: "The Plugin",
        items: [
          {
            text: "About",
            link: "/about",
          },
          {
            text: "Installation",
            link: "/installation",
          },
          {
            text: "Getting Started",
            link: "/getting-started",
          },
        ],
      },
      {
        text: "Functionalities",
        items: [
          { text: "Default Async", link: "/default-async" },
          { text: "Modules' Name Map", link: "/modules-map" },
          { text: "Remotes' Name Map", link: "/remotes-map" },
          { text: "Remotes' URL", link: "/remotes-url" },
          {
            text: "Object Definition",
            link: "/object-definition",
          },
        ],
      },
    ],
  },
};

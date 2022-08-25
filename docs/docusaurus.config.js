// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CodeTogether Documentation',
  tagline: 'CodeTogether Documentation',
  url: 'https://codetogether.com/',
  
  baseUrl: '/docs/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Genuitec',
  projectName: 'CodeTogether',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js')          
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'CodeTogether',
          src: 'img/codetogether-full-logo.png',
          href: 'https://www.codetogether.com'
        },
        items: [          
          {
            href: 'https://github.com/Genuitec/CodeTogether',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {       
        copyright: `Copyright © ${new Date().getFullYear()} Genuitec, LLC. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

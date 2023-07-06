import { DefaultTheme, defineConfig } from 'vitepress'
import pkg from '../../package.json'

export default defineConfig({
  lang: 'en-US',
  title: "Vue Modern Table",
  description: "A simple but modern Vue 3 data table with sorting, filtering and pagination",
  cleanUrls: true,
  base: '/vue-modern-table/',
  themeConfig: {
    nav: nav(),

    sidebar: {
      '/guide/': sidebarGuide(),
      '/reference/': sidebarReference()
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bastien-j/vue-modern-table' }
    ],
  },

})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
    { text: 'Reference', link: '/reference/plugin-options', activeMatch: '/reference/' },
    { text: pkg.version, link: 'https://www.npmjs.com/package/@bastien-j/vue-modern-table/v/' + pkg.version }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' }
      ]
    },
    {
      text: 'Configuration',
      items: [
        { text: 'Global vs. Local', link: '/guide/conf-global-vs-local' },
        { text: 'Sorting', link: '/guide/conf-sorting' },
        { text: 'Filtering', link: '/guide/conf-filtering' },
        { text: 'Pagination', link: '/guide/conf-pagination' },
        { text: 'Theme', link: '/guide/conf-theme' },
        { text: 'Export', link: '/guide/conf-export' },
        { text: 'Messages', link: '/guide/conf-messages' }
      ]
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Slots', link: '/guide/advanced-slots' },
        { text: 'Checkboxs', link: '/guide/advanced-checkboxs' }
      ]
    }
  ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Reference',
      items: [
        {
          text: 'Plugin Options',
          link: '/reference/plugin-options'
        },
        {
          text: 'Table Column',
          link: '/reference/table-column'
        }
      ]
    }
  ]
}
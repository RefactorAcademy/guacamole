import { generate } from 'grommet/themes/base'
import * as merge from 'deepmerge'

import theme from './theme'

const grommetBase = generate(20)
const overrides = {
  global: {
    font: {
      family: 'Muli',
    },
    colors: {
      brand: theme.colors.contrast,
      icon: theme.colors.contrast,
      text: {
        dark: theme.colors.brand,
        light: theme.colors.contrast,
      },
      control: {
        dark: theme.colors.brand,
        light: theme.colors.contrast,
      },
    },
  },
  heading: {
    2: {
      small: {
        maxWidth: 'none',
      },
      medium: {
        maxWidth: 'none',
      },
    },
  },
  button: {
    color: {
      light: theme.colors.accent1,
      dark: theme.colors.contrast,
    },
    primary: {
      color: {
        light: theme.colors.accent1,
        dark: theme.colors.contrast,
      },
    },
    border: {
      color: theme.colors.accent1,
    },
  },
  meter: {
    color: theme.colors.brand,
  },
  ...theme,
}

export default merge(grommetBase, overrides)

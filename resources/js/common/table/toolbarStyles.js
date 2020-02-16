import {lighten} from "@material-ui/core/styles/colorManipulator";
import {searchStyles, searchIcon} from './SearchStyles';

export const toolbarStyles = theme => ({
  ...searchStyles(theme),
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  search: {
    display: 'inline-block',
    ...searchIcon(theme).search,
  },
});

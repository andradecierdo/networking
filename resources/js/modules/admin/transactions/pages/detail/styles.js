import {modalStyles} from '../../../../../common/table/AdminModalStyles';

export const styles = theme => ({
  submit: {
    color: 'white',
    width: 120,
  },
  cancel: {
    marginLeft: theme.spacing.unit * 3,
    width: 120,
  },
  ...modalStyles(theme)
});

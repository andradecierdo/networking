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
  ...modalStyles(theme),
  paper: {
    top: '10%',
    left: '25%',
    width: '50%',
    minHeight: '380px',
    position: 'absolute',
    backgroundColor: 'rgb(251, 251, 251)',
  }
});

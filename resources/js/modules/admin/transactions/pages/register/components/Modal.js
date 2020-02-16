import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { styles } from './../../detail/styles';

import { withStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { HighlightOff as CloseIcon, Image } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Table from './table'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

const fields = [
  { id: 'thumbnail', disablePadding: false, sortable: false, label: '' },
  { id: 'title', disablePadding: false, sortable: true, label: 'タイトル' },
  { id: 'company_name', disablePadding: false, sortable: true, label: '登録会社' },
  { id: 'length', disablePadding: false, sortable: true, label: '秒数' },
  { id: 'aspect_ratio', disablePadding: false, sortable: true, label: '画角' },
  { id: 'action', disablePadding: false, sortable: false, label: '選択' },
];

class TemplateListModal extends Component {
  static propTypes = {
    dispatch: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
    customTemplateList: PropTypes.array.isRequired,
    temporaryTemplateList: PropTypes.array.isRequired,
    handleSubmitTemplateList: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    openModal: PropTypes.bool.isRequired,
    customTemplates: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleCustomTemplateList = this.handleCustomTemplateList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      temporaryTemplateList: []
    }
  }

  componentDidMount() {
    if (!_.isNil(this.props.customTemplateList)) {
      for (let i = 0; i < this.props.customTemplateList.length; i++) {
        this.state.temporaryTemplateList.push(this.props.customTemplateList[i]);
      }
    }
  }

  handleSubmit() {
    const {temporaryTemplateList} = this.state;
    this.props.handleSubmitTemplateList(temporaryTemplateList);
  }

  handleCustomTemplateList(value) {
    let i = this.state.temporaryTemplateList.indexOf(value);
    if (i !== -1) {
      this.state.temporaryTemplateList.splice(i, 1);
    } else {
      this.state.temporaryTemplateList.push(value);
    }
    this.setState({temporaryTemplateList: this.state.temporaryTemplateList});
  }

  render() {
    const { classes, customTemplates } = this.props;
    const props = {
      list: customTemplates,
      dispatch: this.props.dispatch,
      history: this.props.history,
      handleCustomTemplateList: this.handleCustomTemplateList,
      customTemplateList: this.props.customTemplateList,
      temporaryTemplateList: this.state.temporaryTemplateList,
      fields,
    };
    return (
      <div>
        <Modal
          onClose={this.props.handleOpenModal}
          open={this.props.openModal}
          aria-labelledby="simple-dialog-title"
          style={{'overflowY':'scroll'}}>
          <Paper style={{'width':'62%', 'margin':'10% auto'}}>
            <Tooltip title="閉まる">
              <IconButton
                onClick={this.props.handleOpenModal}
                aria-label="閉まる"
                className={classes.close}>
                <CloseIcon/>
              </IconButton>
            </Tooltip>
            <Typography
              style={{ padding: '20px' }}
              variant="h5"
              id="modal-title">
              限定公開テンプレート選択
            </Typography>
            <Table {...props}/>
            <div style={{'textAlign':'right', 'padding': '10px'}}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                className={classes.submit}>
                確定
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.props.handleOpenModal}
                className={classes.cancel}>
                キャンセル
              </Button>
            </div>
          </Paper>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(TemplateListModal);

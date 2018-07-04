import React from 'react'
import Othello from '../organims/Othello'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    height: "100vh",
    width: "100vw",
    background: "#eee",
    textAlign: 'center',
  },
}


class Index extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid
          justify="center"
          container>
          <Othello />
        </Grid>
      </div>
    )
  }
}

Index.PropTypes = {
  classes: PropTypes.object.isRequired
}


export default withStyles(styles)(Index)
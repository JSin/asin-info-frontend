import React from 'react';
import * as _ from 'lodash';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grow from '@material-ui/core/Grow';
import withStyles, { WithStyles, CSSProperties } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

interface State {
  asinSearchText: string;
  showSearchError: boolean;
  asin: string;
}

class App extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    asinSearchText: '',
    showSearchError: false,
    asin: '',
  };

  getAsinInfo = (searchText: string) => {
    const showSearchError = searchText.length !== 10 && searchText.length !== 0;
    const currentAsin = searchText.length === 10 ? searchText : this.state.asin;
    this.setState({ showSearchError, asin: currentAsin });
  };

  debouncedGetAsinInfo = _.debounce(this.getAsinInfo, 500);

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    this.setState({ asinSearchText: searchText });
    this.debouncedGetAsinInfo(searchText);
  };

  render() {
    const { showSearchError, asinSearchText, asin } = this.state;
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ visibility: showSearchError ? 'visible' : 'hidden' }}>
            <h4 className="error-text">Invalid ASIN.</h4>
          </div>
          <TextField
            className="search-asin"
            classes={{ root: classes.textFieldMargin }}
            label="Search ASIN"
            value={asinSearchText}
            margin="normal"
            variant="outlined"
            onChange={this.handleSearchChange}
          />
        </header>
        <main className="App-main">
          <Grow in={asin !== ''}>
            <Paper className="display-asin-container">
              <div className="display-asin-header">
                <Typography variant="headline" align="center">
                  {asin}
                </Typography>
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Rank/Category</TableCell>
                    <TableCell>Test 1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product Dimensions</TableCell>
                    <TableCell>Test 2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grow>
        </main>
      </div>
    );
  }
}

const styles = (): Record<string, CSSProperties> =>
  createStyles({
    textFieldMargin: {
      marginTop: 0,
      marginBottom: 0,
    },
  });

export default withStyles(styles)(App);

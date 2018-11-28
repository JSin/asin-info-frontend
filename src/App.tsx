import React from 'react';
import * as _ from 'lodash';
import axios from 'axios';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grow from '@material-ui/core/Grow';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles, { WithStyles, CSSProperties } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

interface State {
  asinSearchText: string;
  searchError: string;
  asin: string;
  isLoading: boolean;
  productDimensions: string;
  rank: string;
}

interface AsinInfoResponse {
  productDimensions: string;
  rank: string;
}

const defaultErrorMessage = 'Invalid ASIN.';

class App extends React.Component<WithStyles<typeof styles>, State> {
  state = {
    asinSearchText: '',
    searchError: '',
    asin: '',
    isLoading: false,
    productDimensions: '',
    rank: '',
  };

  getAsinInfo = async (searchText: string) => {
    const showSearchError = searchText.length !== 10 && searchText.length !== 0;
    if (showSearchError) {
      this.setState({ searchError: defaultErrorMessage });
      return;
    }
    const currentAsin = searchText.length === 10 ? searchText : this.state.asin;
    try {
      this.setState({ searchError: '', isLoading: true });
      const response = await axios.post('http://localhost:4000/asin-info', { asin: currentAsin });
      const responseData: AsinInfoResponse = response.data;
      const { productDimensions, rank } = responseData;
      this.setState({ asin: currentAsin, productDimensions, rank });
    } catch (e) {
      const errorMessage = (e.response && e.response.data && e.response.data.errorMessage) || defaultErrorMessage;
      this.setState({ searchError: errorMessage });
      return;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  debouncedGetAsinInfo = _.debounce(this.getAsinInfo, 500);

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    this.setState({ asinSearchText: searchText });
    this.debouncedGetAsinInfo(searchText);
  };

  render() {
    const { searchError, asinSearchText, asin, isLoading, productDimensions, rank } = this.state;
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div style={{ visibility: searchError !== '' ? 'visible' : 'hidden' }}>
            <h4 className="error-text">{searchError}</h4>
          </div>
          <div className="search-wrapper">
            <TextField
              disabled={isLoading}
              className="search-asin"
              classes={{ root: classes.textFieldMargin }}
              label="Search ASIN"
              value={asinSearchText}
              margin="normal"
              variant="outlined"
              onChange={this.handleSearchChange}
            />
            {isLoading ? <CircularProgress className="search-loading" /> : null}
          </div>
        </header>
        <main className="App-main">
          <Grow in={asin !== ''}>
            <div className="display-asin-container">
              <Paper className="display-asin-paper">
                <div className="display-asin-header">
                  <Typography variant="h5" align="center">
                    {asin}
                  </Typography>
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Rank/Category</TableCell>
                      <TableCell>{productDimensions}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Product Dimensions</TableCell>
                      <TableCell>{rank}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </div>
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

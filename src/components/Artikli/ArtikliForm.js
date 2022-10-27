import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  Card,
  Typography,
  TextField,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { getRequest } from '../../services/httpService';
import useStyles from './ArtikliStyles';
import ConfirmationDialog from '../UI/ConfirmationDialog';

const ArtikliForm = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [artikli, setArtikli] = useState([]);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false);
  const [artikalToDelete, setArtikalToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    onFetchArtikli();
  }, []);

  const onFetchArtikli = useCallback(async () => {
    const result = await getRequest('/artikli');
    if (result.status === 200) {
      setArtikli(result.data);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
  };

  const redirectToCreateArtikal = () => {
    let path = `/artikli/create`;
    history.push(path);
  };

  const editArtikal = (event, artikal) => {
    event.stopPropagation();
    let path = `/artikli/create`;
    console.log('REDIRECT TO EDIT ', artikal);
    history.push(path, artikal);
  };

  const onDeleteArtikal = (event, artikal) => {
    event.stopPropagation();
    setArtikalToDelete(artikal);
    setShouldOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    onFetchArtikli();
    setShouldOpenDeleteDialog(false);
  };

  const onDeleteMessage = (message, status) => {
    console.log('message ', message);
    if (status === 1) {
      setSuccessMessage(message);
    } else {
      setErrorMessage(message);
    }
    setOpenSnackbar(true);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMessage('');
    setErrorMessage('');
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
      <div className={classes.searchContainer}>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => redirectToCreateArtikal()}
        >
          Kreiraj Nov Artikal
        </Button>

        <form noValidate autoComplete='off'>
          <TextField
            id='filter-artikli'
            label='Пребарувај артикли'
            fullWidth
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
      </div>
      {artikli.length === 0 ? (
        <Typography variant='h6' style={{ marginTop: 30 }}>
          Ne se pronajdeni artikli vo databazata.
        </Typography>
      ) : (
        <Card className={classes.card} elevation={6}>
          <Table
            style={{ whiteSpace: 'pre', minWidth: '750px' }}
            stickyHeader={true}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant='subtitle2'>Id</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>Slika</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>Ime</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>Grupa</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>Podgrupa</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>Opis</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>Cena</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>Dostapnost</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle2'>Korekcija</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artikli
                .filter(
                  (artikal) =>
                    artikal.id
                      .toString()
                      .toLowerCase()
                      .indexOf(search.toLowerCase()) !== -1 ||
                    artikal.ime.toLowerCase().indexOf(search.toLowerCase()) !==
                      -1
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((artikal, index) => (
                  <TableRow
                    key={artikal.id}
                    className={classes.tableRow}
                    onClick={(event) => editArtikal(event, artikal)}
                  >
                    <TableCell>{artikal.id}</TableCell>
                    <TableCell>
                      <div className={classes.imageContainer}>
                        <img
                          className={classes.image}
                          src={artikal.slikaUrl}
                          alt=''
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                    >
                      {artikal.ime}
                    </TableCell>
                    <TableCell>{artikal.grupa}</TableCell>
                    <TableCell>{artikal.podgrupa}</TableCell>
                    <TableCell>{artikal.opis}</TableCell>
                    <TableCell>{artikal.cena} MKD</TableCell>
                    <TableCell>
                      {artikal.dostapnost === 1 ? (
                        <CheckCircleIcon
                          style={{ color: '#4BB543', marginLeft: 25 }}
                        />
                      ) : (
                        <CancelIcon color='danger' style={{ marginLeft: 25 }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => editArtikal(event, artikal)}
                      >
                        <EditIcon color='secondary'>edit</EditIcon>
                      </IconButton>
                      <IconButton
                        onClick={(event) => onDeleteArtikal(event, artikal)}
                      >
                        <DeleteIcon color='error'>delete</DeleteIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={artikli.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleRowsPerPage}
          />
        </Card>
      )}
      {shouldOpenDeleteDialog && (
        <ConfirmationDialog
          open={shouldOpenDeleteDialog}
          handleClose={handleDeleteDialogClose}
          onYesClick={() => {}}
          text='Дали сигурно сакате да го избришете артиклот ?'
          item={artikalToDelete}
          path='artikli'
          onDeleteMessage={onDeleteMessage}
        />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={successMessage !== '' ? 'success' : 'error'}
        >
          {successMessage !== '' ? successMessage : errorMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default ArtikliForm;

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

import { getRequest } from '../../services/httpService';
import useStyles from './GrupiStyles';
import ConfirmationDialog from '../UI/ConfirmationDialog';

const GrupiForm = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [grupi, setGrupi] = useState([]);
  const [search, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [shouldOpenDeleteDialog, setShouldOpenDeleteDialog] = useState(false);
  const [grupaToDelete, setGrupaToDelete] = useState(null);

  useEffect(() => {
    onFetchGrupi();
  }, []);

  const onFetchGrupi = useCallback(async () => {
    const result = await getRequest('/grupi');
    if (result.status === 200) {
      setGrupi(result.data);
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

  const redirectToCreateGrupa = () => {
    let path = `/grupi/create`;
    history.push(path);
  };

  const editGrupa = (event, grupa) => {
    event.stopPropagation();
    let path = `/grupi/create`;
    history.push(path, grupa);
  };

  const onDeleteGrupa = (event, grupa) => {
    event.stopPropagation();
    setGrupaToDelete(grupa);
    setShouldOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    onFetchGrupi();
    setShouldOpenDeleteDialog(false);
  };

  console.log('process.env.PUBLIC_URL ', process.env.PUBLIC_URL);

  return (
    <React.Fragment>
      <div className={classes.searchContainer}>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => redirectToCreateGrupa()}
        >
          Kreiraj Nova Grupa
        </Button>

        <form noValidate autoComplete='off' className={classes.formSearch}>
          <TextField
            id='filter-grupi'
            label='Пребарувај групи'
            fullWidth
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </form>
      </div>
      {grupi.length === 0 ? (
        <Typography variant='h6' style={{ marginTop: 30 }}>
          Не се пронајдени групи во датабазата.
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
                  <Typography variant='subtitle2'>Korekcija</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grupi
                .filter(
                  (grupa) =>
                  grupa.id
                      .toString()
                      .toLowerCase()
                      .indexOf(search.toLowerCase()) !== -1 ||
                      grupa.ime
                      .toLowerCase()
                      .indexOf(search.toLowerCase()) !== -1
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((grupa, index) => (
                  <TableRow
                    key={grupa.id}
                    className={classes.tableRow}
                    onClick={(event) => editGrupa(event, grupa)}
                  >
                    <TableCell>{grupa.id}</TableCell>
                    <TableCell>
                      <div className={classes.imageContainer}>
                        <img
                          className={classes.image}
                          // src={grupa.slikaUrl} use this when local images implemented
                          src={grupa.url}
                          alt=''
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      align='left'
                      style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                    >
                      {grupa.ime}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) =>
                          editGrupa(event, grupa)
                        }
                      >
                        <EditIcon color='secondary'>edit</EditIcon>
                      </IconButton>
                      <IconButton
                        onClick={(event) =>
                          onDeleteGrupa(event, grupa)
                        }
                      >
                        <DeleteIcon color='error'>delete</DeleteIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            className='px-16'
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={grupi.length}
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
          text='Дали сигурно сакате да ја избришете групата ?'
          item={grupaToDelete}
          path='grupi'
        />
      )}
    </React.Fragment>
  );
};

export default GrupiForm;

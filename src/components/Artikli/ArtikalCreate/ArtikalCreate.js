import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  Card,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './ArtikalCreateStyles';
import {
  postRequest,
  putRequest,
  getRequest,
} from '../../../services/httpService';

const ArtikalCreate = (props) => {
  const classes = useStyles();
  const formRef = useRef('form');
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [id, setid] = useState(location.state ? location.state.id : '');
  const [ime, setIme] = useState(location.state ? location.state.ime : '');
  const [slikaUrl, setSlikaUrl] = useState(
    location.state ? location.state.slikaUrl : ''
  );
  const [grupa, setGrupa] = useState(
    location.state ? location.state.grupa : ''
  );
  const [podgrupa, setPodgrupa] = useState(
    location.state ? location.state.podgrupa : ''
  );
  const [opis, setOpis] = useState(location.state ? location.state.opis : '');
  const [cena, setCena] = useState(location.state ? location.state.cena : '');
  const [dostapnost, setDostapnost] = useState(
    location.state ? location.state.dostapnost : ''
  );

  const [siteGrupi, setSiteGrupi] = useState([]);
  const [sitePodgrupi, setSitePodgrupi] = useState([]);

  console.log('location.state  ', location.state);

  useEffect(() => {
    onFetchGrupi();
  }, []);

  useEffect(() => {
    if (location.state) {
      onFetchGrupaObject(location.state.grupa);
      onFetchPodgrupaObject(location.state.podgrupa);
    }
  }, []);

  useEffect(() => {
    if (grupa) {
      onFetchPodgrupi(grupa.ime);
    }
  }, [grupa]);

  const onFetchGrupaObject = useCallback(async (ime) => {
    const result = await getRequest(`/grupi/byname/${ime}`);
    if (result.status === 200) {
      setGrupa(result.data);
    }
  }, []);

  const onFetchPodgrupaObject = useCallback(async (ime) => {
    const result = await getRequest(`/podgrupi/byname/${ime}`);
    if (result.status === 200) {
      setPodgrupa(result.data);
    }
  }, []);

  const onFetchGrupi = useCallback(async () => {
    const result = await getRequest('/grupi');
    if (result.status === 200) {
      setSiteGrupi(result.data);
    }
  }, []);

  const onFetchPodgrupi = useCallback(
    async (imeNaGrupa) => {
      const result = await getRequest(`/podgrupi/grupa/${imeNaGrupa}`);
      if (result.status === 200) {
        setSitePodgrupi(result.data);
      }
    },
    [grupa]
  );

  const onCreateArtikal = async (path, body) => {
    const result = await postRequest(path, body);
    if (result.status === 200 || result.status === 201) {
      setTimeout(() => {
        setIsLoading(false);
        setid('');
        setIme('');
        setSlikaUrl('');
        setCena('');
        setDostapnost('');
        setOpis('');
        setGrupa('');
        setPodgrupa('');
        setSuccessMessage(
          location.state
            ? 'Artiklot e uspeshno promenet!'
            : 'Artiklot e uspeshno kreiran!'
        );
        setOpenSnackbar(true);
      }, 1000);
    }
  };

  const onUpdateArtikal = async (path, body, params) => {
    const result = await putRequest(path, body, params);
    if (result.status === 200 || result.status === 201) {
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage(
          !location.state
            ? 'Artiklot e uspeshno kreiran!'
            : 'Artiklot e uspeshno promenet!'
        );
        setOpenSnackbar(true);
      }, 1000);
    }
  };

  const handleFormSubmit = () => {
    console.log("SUBMIT FORM START ");
    setIsLoading(true);
    const imeNaGrupa = grupa.ime;
    const imeNaPodgrupa = podgrupa?.ime;
    console.log("podgrupa ", podgrupa);

    const novArtikal = {
      ime,
      cena,
      grupa: imeNaGrupa,
      slikaUrl,
      opis,
      dostapnost,
      podgrupa: imeNaPodgrupa || null,
    };

    console.log("SUBMIT FORM ", novArtikal);

    if (location.state) {
      console.log('UPDT ', novArtikal);
      onUpdateArtikal('/artikli', novArtikal, `/${location.state.id}`);
    } else {
      console.log('CRTE ', novArtikal);
      onCreateArtikal('/artikli', novArtikal);
    }
  };

  const handleGrupaChange = (event, grupa) => {
    setGrupa(grupa);
  };

  const handlePodgrupaChange = (event, podgrupa) => {
    setPodgrupa(podgrupa);
  };

  const handleChange = (event, source) => {
    console.log('handleChange ', event.target.value);
    switch (source) {
      case 'ime':
        return setIme(event.target.value);
      case 'cena':
        return setCena(+event.target.value);
      case 'grupa':
        return setGrupa(source.ime);
      case 'podgrupa':
        return setPodgrupa(event.target.value);
      case 'slikaUrl':
        return setSlikaUrl(event.target.value);
      case 'opis':
        return setOpis(event.target.value);
      case 'dostapnost':
        return setDostapnost(+event.target.value);
      default:
        return;
    }
  };

  const goBackToArtikliList = () => {
    // let path = `/artikli/list`;
    history.goBack();
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  console.log('site podgrupi ', sitePodgrupi);

  return (
    <div className={classes.container}>
      <Typography variant='h5'>Kreiraj Nov Artikal</Typography>
      <Card className={classes.card}>
        <ValidatorForm
          ref={formRef}
          onSubmit={handleFormSubmit}
          onError={(errors) => {}}
        >
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                disabled
                className={classes.inputField}
                fullWidth
                label='Id'
                type='text'
                name='id'
                value={id}
              />
              <Autocomplete
                id='najdiGrupa'
                className={classes.inputField}
                options={siteGrupi}
                getOptionLabel={(option) => (option.ime ? option.ime : '')}
                style={{ minWidth: 210 }}
                onChange={(event, values) => handleGrupaChange(event, values)}
                value={grupa}
                renderInput={(params) => (
                  <TextField {...params} label='Izberi Grupa' />
                )}
              />
              <TextValidator
                className={classes.inputField}
                fullWidth
                label='Cena'
                onChange={(event) => handleChange(event, 'cena')}
                type='text'
                name='cena'
                value={cena}
                validators={['required']}
                errorMessages={['poleto e zadolzhitelno']}
              />
              <FormControl fullWidth>
                <InputLabel id='dostapnost-select-label'>
                  Dali e artiklot dostapen ?
                </InputLabel>
                <Select
                  labelId='dostapnost-select'
                  id='dostapnost-select'
                  value={dostapnost}
                  onChange={(event) => handleChange(event, 'dostapnost')}
                >
                  <MenuItem value={0}>NE</MenuItem>
                  <MenuItem value={1}>DA</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className={classes.inputField}
                fullWidth
                label='Ime na artikal'
                onChange={(event) => handleChange(event, 'ime')}
                type='text'
                name='imeNaArtikal'
                value={ime}
              />
              <Autocomplete
                id='najdiPodgrupa'
                className={classes.inputField}
                options={sitePodgrupi}
                getOptionLabel={(option) => (option.ime ? option.ime : '')}
                style={{ minWidth: 210 }}
                onChange={(event, values) =>
                  handlePodgrupaChange(event, values)
                }
                value={podgrupa}
                renderInput={(params) => (
                  <TextField {...params} label='Izberi Podgrupa' />
                )}
              />
              <TextValidator
                className={classes.inputField}
                fullWidth
                label='Slika na artikal'
                onChange={(event) => handleChange(event, 'slikaUrl')}
                type='text'
                name='slikaNaArtikal'
                value={slikaUrl}
              />
              <TextValidator
                className={classes.inputField}
                fullWidth
                label='Opis na artikal'
                onChange={(event) => handleChange(event, 'opis')}
                type='text'
                name='opisNaArtikal'
                value={opis}
                multiLine
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            {isLoading ? (
              <div className={classes.spinner}>
                <CircularProgress color='secondary' />
              </div>
            ) : (
              <div>
                <Button
                  color='primary'
                  variant='contained'
                  type='submit'
                  className={classes.buttonSave}
                >
                  <span className='pl-8 capitalize'>Save</span>
                </Button>
                <Button
                  color='primary'
                  className={classes.buttonCancel}
                  onClick={goBackToArtikliList}
                >
                  <span className='pl-8 capitalize'>Cancel</span>
                </Button>
              </div>
            )}
          </div>
        </ValidatorForm>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity='success'>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ArtikalCreate;

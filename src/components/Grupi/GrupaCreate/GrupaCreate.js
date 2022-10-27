import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  InputLabel,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './GrupaCreateStyles';
import {
  postRequest,
  putRequest,
  getRequest,
} from '../../../services/httpService';
import PodGrupaItem from '../../PodGrupi/PodGrupaItem';

const GrupaCreate = (props) => {
  const classes = useStyles();
  const formRef = useRef('form');
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const [podgrupi, setPodgrupi] = useState([]);

  const [id, setId] = useState(location.state ? location.state.id : '');
  const [ime, setIme] = useState(location.state ? location.state.ime : '');
  const [slika, setSlika] = useState(
    location.state ? location.state.slikaUrl : ''
  );
  const [slikaUrl, setSlikaUrl] = useState(
    location.state ? location.state.slikaUrl : ''
  );
  const [url, setUrl] = useState(location.state ? location.state.url : '');
  const [podGrupa, setPodGrupa] = useState(
    location.state ? location.state.podGrupa : ''
  );

  console.log('LLOCATION STATE ', location.state);

  useEffect(() => {
    if (id) {
      onFetchPodgrupi();
    }
  }, []);

  const onFetchPodgrupi = useCallback(async () => {
    const result = await getRequest(`/podgrupi/grupa/${id}`);
    if (result.status === 200) {
      setPodgrupi(result.data);
    }
  }, []);

  const onCreateGrupa = async (path, body) => {
    try {
      const result = await postRequest(path, body);

      if (
        result.status === 301 ||
        result.status === 500 ||
        result.status === 404
      ) {
        setErrorMessage(
          location.state
            ? 'Greshka pri promena na grupa!'
            : 'Greshka pri kreiranje na grupa!'
        );
        setOpenSnackbar(true);
        setIsLoading(false);
      }

      if (result.status === 200 || result.status === 201) {
        setTimeout(() => {
          setIsLoading(false);
          setId('');
          setIme('');
          setSlika('');
          setPodGrupa('');
          setSuccessMessage(
            location.state
              ? 'Grupata e uspeshno promeneta!'
              : 'Grupata e uspeshno kreirana!'
          );
          setOpenSnackbar(true);
        }, 1000);
      }
      //   setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('Error catched ', err);
    }
  };

  const onUpdateGrupa = async (path, body, params) => {
    const result = await putRequest(path, body, params);
    if (result.status === 200 || result.status === 201) {
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage(
          !location.state
            ? 'Grupata e uspeshno kreiran!'
            : 'Grupata e uspeshno promenet!'
        );
        setOpenSnackbar(true);
      }, 1000);
    }
    setIsLoading(false);
  };

  const handleFormSubmitWithUrl = () => {
    setIsLoading(true);

    const novaGrupa = {
      ime,
      slikaUrl: '',
      url: url,
    };

    if (location.state) {
      onUpdateGrupa('/grupi', novaGrupa, `/${location.state.id}`);
    } else {
      onCreateGrupa('/grupiWithUrl', novaGrupa);
    }
  };

  // Use this submitHandler instead when uploading local images needed
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append('image', slika);
    formData.append('url', slikaUrl);
    formData.append('ime', ime);

    console.log('handleFormSubmit location.state ', location.state);

    if (location.state) {
      onUpdateGrupa('/grupi', formData, `/${location.state.id}`);
    } else {
      onCreateGrupa('/grupi', formData);
    }
  };

  const handleChange = (event, source) => {
    if (source === 'slika') {
      setSlikaUrl(URL.createObjectURL(event.target.files[0]));
    }
    switch (source) {
      case 'ime':
        return setIme(event.target.value);
      case 'slika':
        return setSlika(event.target.files[0]);
      case 'slikaUrl':
        return setSlikaUrl(event.target.value);
      case 'url':
        return setUrl(event.target.value);
      default:
        return;
    }
  };

  const goBackToGrupiList = () => {
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

  const FileData = () => (
    <Card>
      <CardMedia
        className={classes.image}
        image={url} // use this when local images implemented
        // src={url}
        title='Slika na grupa'
      />
    </Card>
  );

  return (
    <div className={classes.container}>
      <Typography variant='h5' className={classes.title}>
        {location.state ? ime : 'Креирај нова група'}
      </Typography>
      <Card className={classes.card}>
        <ValidatorForm
          ref={formRef}
          onSubmit={handleFormSubmitWithUrl}
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
              <TextValidator
                className={classes.inputField}
                fullWidth
                label='Ime na grupa'
                onChange={(event) => handleChange(event, 'ime')}
                type='text'
                name='imeNaGrupa'
                value={ime}
                validators={['required']}
                errorMessages={['poleto e zadolzhitelno']}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <InputLabel htmlFor='image'>Slika na grupa</InputLabel>
              <TextValidator
                id='image'
                className={classes.inputField}
                fullWidth
                onChange={(event) => handleChange(event, 'slika')}
                type='file'
                name='image'
              />
              <TextValidator
                className={classes.inputField}
                fullWidth
                label='Url slika na artikal'
                onChange={(event) => handleChange(event, 'url')}
                type='text'
                name='url'
                value={url}
              />
              {/* {slika && <FileData />} should be like this when local images are implemented */}
              {url && <FileData />}
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
                  onClick={goBackToGrupiList}
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
        <Alert
          onClose={handleCloseSnackbar}
          style={{ backgroundColor: errorMessage ? 'red' : '' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {location.state && (
        <div className={classes.podgrupi}>
          <Typography variant='h5' className={classes.title}>
            Подгрупи
          </Typography>
          <div className={classes.podgrupiList}>
            {podgrupi.length < 1 && (
              <Typography variant='body1' className={classes.title}>
                Креирајте подгрупи
              </Typography>
            )}
            {podgrupi && podgrupi.map((item) => <PodGrupaItem item={item} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrupaCreate;

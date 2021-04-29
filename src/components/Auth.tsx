import React, { ReactEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import styles from './Auth.module.css';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CameraIcon from '@material-ui/icons/Camera';
import EmailIcon from '@material-ui/icons/Email';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1619089941305-65d654dde46f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNDl8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onChangeImgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }
    if (e.target.files[0]) {
      setProfileImg(e.target.files[0]);
      e.target.value = '';
    }
  };

  const signIn = async () => {
    // TODO ここでサーバーにアドレスとパスワードを送信する
    // user data, tokenをストアに保存する
    dispatch(
      login({
        id: 1,
        name,
        profileImgUrl:
          'https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
      }),
    );
  };

  const signUp = async () => {
    // TODO ここでサーバーにname,アドレスとパスワードを送信する
    // user data, をストアに保存する
    dispatch(
      login({
        id: 1,
        name,
        profileImgUrl:
          'https://images.unsplash.com/photo-1524638431109-93d95c968f03?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
      }),
    );
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isLoggedIn ? 'Login' : 'Register'}
          </Typography>
          <form className={classes.form} noValidate>
            {!isLoggedIn && (
              <>
                <Box textAlign="center">
                  <IconButton>
                    <label>
                      <AccountCircleIcon
                        fontSize="large"
                        className={profileImg ? styles.login_addIconLoaded : styles.login_addIcon}
                      />
                      <input className={styles.login_hiddenIcon} type="file" onChange={onChangeImgHandler} />
                    </label>
                  </IconButton>
                </Box>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                />
              </>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              disabled={
                isLoggedIn ? !email || password.length < 6 : !name || !email || password.length < 6 || !profileImg
              }
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={
                isLoggedIn
                  ? async () => {
                      try {
                        await signIn();
                      } catch (error) {
                        alert(error.message);
                      }
                    }
                  : async () => {
                      try {
                        await signUp();
                      } catch (error) {
                        alert(error.message);
                      }
                    }
              }
            >
              {isLoggedIn ? 'Login' : 'Register'}
            </Button>
            <Grid container>
              <Grid item xs>
                <span onClick={() => setIsLoggedIn(!isLoggedIn)} className={styles.login_toggleMode}>
                  {isLoggedIn ? 'Create new account' : 'Back to Login'}
                </span>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Auth;

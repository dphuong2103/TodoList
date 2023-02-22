import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { width } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../components/PageTitle';
import { AppDispatch, RootState } from '../../stores/store';
import styles from "../authenticate/authenticate.module.scss";
import googleIconPath from '../../assets/google.svg';
import { signInWithGoogle } from '../../firebaseConfig';
import { createUserFromGoogleUser } from '../../types/app-types';
import { useFirebaseContext } from '../../context/FirebaseContext';
import { login } from '../../stores/authenticationStore';

function SignIn() {
    const { writeGoogleUser } = useFirebaseContext();
    const reduxDispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    function handleSignInWithGoogle() {

        signInWithGoogle()
            .then(data => {
                const user = createUserFromGoogleUser(data);
                reduxDispatch(login(user));
                writeGoogleUser(user);
            }).catch(console.log)
    }

    return (
        <div className={styles['signin__container']}>
            <PageTitle>Sign In</PageTitle>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className={styles['signin-form']}

            >
                <TextField fullWidth id="standard-basic" label="Email" variant="standard" />
                <TextField fullWidth id="standard-basic" type='password' label="Password" variant="standard" />
                <Button variant="contained">Log in</Button>
            </Box>
            <div className={styles['other-signin-icon__container']}>
                <button onClick={handleSignInWithGoogle}>
                    <img src={googleIconPath} className={styles['other-signin-icon']} />
                </button>

            </div>
        </div>
    )
}

export default SignIn
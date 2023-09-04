import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import GoogleButton from "react-google-button";
import {useNavigate} from "react-router-dom";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            Mateo&Mateo Kibord Kąąpany
            Wszystkie Lewa zastrzeżone
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const jsonData = {
            email: formData.get("email"),
            password: formData.get("password")
        };

        try {
            const response = await fetch("http://localhost:8800/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonData)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.error("Response data:", responseData);
                //TODO: Nawigacja na brudno, trzeba to sensowniej zrobić
                if(responseData.message == "Login successful"){
                    navigate("/dashboard");
                }
                console.log("Response message: ", responseData.message);
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };


    /*
    //logowanie z formData
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const jsonData = {
            user: [
                {
                    email: formData.get("email"),
                    password: formData.get("password")
                }
            ]
        };

        const response = await fetch("http://localhost:8800/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        }).catch(error => {
            console.error("Error: ", error);
        });

        const data = await response.json();

        if (response.ok) {
            const responseData = await response.json();
            console.log("Response data:", responseData);
        } else {
            console.error("Login failed");
        }
    };

     */

    /*
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        let jsonData = {
            "user": [
                {
                    "email": formData.get("email"),
                    "password": formData.get('password')
                }
            ]
        }
        console.log(jsonData["user"][0]);
        const response = await fetch("http://localhost:8800/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Set the content type to JSON
            },
            body: JSON.stringify(jsonData) // Convert JSON object to string
        })
            .catch(error => {
                console.error("Error: ", error);
            });
        if (response.ok) {
            const responseData = await response.json(); // or response.text()
            console.log("Response data:", responseData);
        } else {
            console.error("Login failed");
        }

     */
        // event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // let jsonData = {
        //     "user": [
        //         {
        //             "email": data.get("email"),
        //             "password": data.get('password')
        //         }
        //     ]
        // }
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        // let formData = new FormData();
        // formData.append('json_login', JSON.stringify(jsonData));
        //
        // const response = await fetch("http://localhost:8800/login", {
        //     method: 'POST',
        //     mode: 'cors',
        //     body: formData
        // })
        // console.log(response);


    //};

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <GoogleButton
                            type={'dark'}
                            label='Log In with Google'
                            onClick={() => {
                                navigate("/login/federated/google"),
                                console.log("Google Btn pressed")
                            }}
                        />
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}
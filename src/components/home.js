import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import Background from '../Assets/covid.png';
import logo from '../Assets/Logo.png';

import axios from 'axios';


import { useState } from "react";
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({

    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgb(26, 31, 41)',
    },
    paper: {
        margin: theme.spacing(1, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 1),
        fontSize: 20,
        fontWeight: 25,
    },
}));

export default function Home() {
    const classes = useStyles();
    const [value, setValue] = useState(12, 'Delhi', 'Arvind', 12, 'Assam', 12, 12, 12);
    const [formsubmit, setFormsubmit] = useState(false);

    const refreshPage = () => {
        window.location.reload();
        localStorage.clear();
    }

    function getCurrentDate(separator = "-") {

        let newDate = new Date()
        let date_raw = newDate.getDate();
        let month_raw = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        var date, month;

        if (date_raw < 10) { date = "0" + date_raw.toString() } else { date = date_raw.toString() }
        if (month_raw < 10) { month = "0" + month_raw.toString() } else { month = month_raw.toString() }

        date = date + separator + month + separator + year;
        return (
            <div>{date}</div>
        );
    }

    const fetchData = (date, pincode) => {
        return axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`)
            .then((response) => {
                setFormsubmit(true);
                localStorage.setItem('datastored', JSON.stringify(response.data.sessions));
            });
    }



    function handleSubmit(e) {
        e.preventDefault()
        const { firstname, lastname, pincode, email } = e.target.elements
        console.log({ firstname: firstname.value, lastname: lastname.value, pincode: pincode.value, email: email.value })

        var date = getCurrentDate();
        console.log(date.props.children);
        console.log(pincode.value);
        localStorage.setItem('date', date.props.children);
        localStorage.setItem('pincode', pincode.value);
        localStorage.setItem('name', firstname.value + " " + lastname.value);
        localStorage.setItem('email', email.value);
        fetchData(date.props.children, pincode.value);

    }

    useEffect(() => {
        if (localStorage.getItem('datastored') != undefined) {
            setFormsubmit(true);
        }
        return () => {

        }
    })

    return (

        formsubmit ? <Redirect to="/result" /> : (

            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} >
                    <div style={{
                        position: 'absolute',
                        color: 'white',
                        top: 10,
                        left: '10%',
                        transform: 'translateX(-20%)',
                        lineHeight: "25px",
                    }} ><h1>Vaccine Tracker</h1>
                        <p>Find all the important information and<br /> all the things related to Covid Virus<br /> and Vaccine Here</p></div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <div style={{ paddingLeft: "300px" }}>
                            <img src={logo} alt="Logo" width="193" height="130" float="right" />
                        </div>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <label style={{ fontSize: 21, fontWeight: 21 }}>First Name</label>
                            <TextField
                                variant="filled"
                                margin="normal"
                                fullWidth
                                id="firstname"
                                placeholder="First Name"
                                name="firstname"
                                autoComplete="firstname"
                            />
                            <label style={{ fontSize: 21, fontWeight: 21 }}>Last Name</label>
                            <TextField
                                variant="filled"
                                margin="normal"

                                fullWidth
                                name="lastname"
                                placeholder="Last Name"
                                id="lastname"
                                autoComplete="lastname"
                            />
                            <label style={{ fontSize: 21, fontWeight: 21 }}>Pincode</label>
                            <TextField
                                variant="filled"
                                margin="normal"

                                fullWidth
                                name="pincode"
                                placeholder="Pincode"
                                id="pincode"
                                autoComplete="pincode"
                            />
                            <label style={{ fontSize: 21, fontWeight: 21 }}>Email</label>
                            <TextField
                                variant="filled"
                                margin="normal"

                                fullWidth
                                name="email"
                                placeholder="Email"
                                id="email"
                                autoComplete="email"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Show Statistics
                            </Button>

                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                className={classes.submit}
                                onClick={refreshPage}
                            >
                                Reset Form
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        )
    );
}
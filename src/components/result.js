import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

import logo from '../Assets/Logo.png';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 18,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.background.default,
        },
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(pincode, district_name, name, fee_type, state_name, vaccine, min_age_limit, slots) {
    return { pincode, district_name, name, fee_type, state_name, vaccine, min_age_limit, slots };
}

const demorows = [
    createData(12, 'Delhi', 'Arvind', 12, 'Assam', 12, 12, 12),
    createData(12, 'Delhi', 'Arvind', 12, 'Assam', 12, 12, 12),
    createData(12, 'Delhi', 'Arvind', 12, 'Assam', 12, 12, 12),
    createData(12, 'Delhi', 'Arvind', 12, 'Assam', 12, 12, 12),


];

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },

    root: {
        '& > *': {
            margin: theme.spacing(5),

        },
    },

    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        paddingLeft: "500px",

    },

    text: {
        fontSize: "20px",
        paddingLeft: "0px",
        paddingRight: "200px",
        lineHeight: "5px",
    },

}));




export default function Result() {


    const [rows, setRows] = useState(demorows);
    const classes = useStyles();
    console.log("ram");

    function goback() {
        window.location.href = '/';
        localStorage.clear();
    }

    function resetdata() {
        var date = localStorage.getItem('date');
        var pincode = localStorage.getItem('pincode');
        return axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`)
            .then((response) => {

                localStorage.setItem('datastored', JSON.stringify(response.data.sessions));

                setRows(response.data.sessions);
            });
    }

    useEffect(() => {
        let result = localStorage.getItem('datastored');
        if (result != undefined) setRows(JSON.parse(result));
        console.log(result);
        return () => {

        }
    }, [])

    return (
        <Container>
            <div className={classes.container}>
                <div float="left" className={classes.text}>
                    <p>{localStorage.getItem('name') ? localStorage.getItem('name') : "Rahul Sharma"}, <small>{localStorage.getItem('pincode') ? localStorage.getItem('pincode') : "250002"}</small></p>
                    <p style={{ color: 'grey' }}>{localStorage.getItem('email') ? localStorage.getItem('email') : "ashishbhardwajexcel@gmail.com"}</p>
                </div>
                <div className={classes.image}>
                    <img src={logo} alt="Logo" width="193" height="130" float="right" />
                </div>

            </div>

            &nbsp;&nbsp;&nbsp;
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow  >
                            <StyledTableCell style={{ fontSize: 20 }} >Pincode</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 20 }}>District&nbsp;Name</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 20 }}>Name</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 20 }}>Fee&nbsp;Type</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 20 }}>State&nbsp;Name</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 20 }}>Vaccine</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 20 }}>Age&nbsp;Limit</StyledTableCell>
                            <StyledTableCell style={{ fontSize: 20 }}>Slots</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <StyledTableRow key={index}>

                                <StyledTableCell component="th" scope="row">
                                    {row.pincode}
                                </StyledTableCell>
                                <StyledTableCell >{row.district_name}</StyledTableCell>
                                <StyledTableCell >{row.name}</StyledTableCell>
                                <StyledTableCell >{row.fee_type}</StyledTableCell>
                                <StyledTableCell >{row.state_name}</StyledTableCell>
                                <StyledTableCell >{row.vaccine}</StyledTableCell>
                                <StyledTableCell >{row.min_age_limit}</StyledTableCell>
                                <StyledTableCell >{row.slots}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

            <div className={classes.root}>
                <center>
                    <Button style={{ fontSize: 20 }} variant="contained" color="secondary" onClick={goback}>
                        Go Back
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button style={{ fontSize: 20 }} variant="contained" color="primary" onClick={resetdata} >
                        Update Data
                    </Button>
                </center>
            </div>
        </Container>
    );
}


"use client";
import React, { useState } from "react";
import {
  Button,
  Typography,
  FormControl,
  styled,
  MenuItem,
  Select,
  InputLabel,
  Box,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";
import Login from "../components/forms/theme-elements/login";
import AuthProvider from '../../../context/JWTContext/AuthContext.provider'

const BasicInfo = () => {
  // const { respdata } = props;
  // console.log(respdata, "dataaa")
  const [ChangeDM, setChangeDM] = useState(true);
  const [value, setValue] = useState("");
  const [details, setDetails] = useState("");

  const Heading3 = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(1),
    fontFamily: "Nunito",
    fontSize: "24px",
    lineHeight: "30.01px",
    fontWeight: 500,

    height: "54px",
  }));

  const FirstTextField = styled(TextField)`
    width: 100%;
  `;

  const handleInputValue = (e: any) => {
    setValue(e.target.value);
  };

  const handleDetails = (e: any) => {
    setDetails(e.target.value);
  };
 
  return (
  <Login/>
)};

export default BasicInfo;
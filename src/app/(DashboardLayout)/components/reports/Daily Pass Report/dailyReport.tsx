'use client'
import React from "react";
import {
  Grid,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridValueGetterParams,
} from "@mui/x-data-grid";


function DailyMontlyReport() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "S.no", maxWidth:30},
    {
      field: "UserId",
      headerName: "User ID",
      type: "number",
      maxWidth:100, flex:1
    },
    {
      field: "name",
      headerName: "Name",
      width:100, flex:1
    },
    {
      field: "designation",
      headerName: "Designation",
      width:150, flex:1
    },
    {
      field: "branch",
      headerName: "Branch",
      width:150, flex:1
    },
    {
      field: "email",
      headerName: "Email",
      width:150, flex:1
    },
    {
      field: "contact",
      headerName: "Contact No",
      type: "number",
      width:150, flex:1
    },
  ];

  const rows = [
    {
      id: 1,
      UserId: 12345,
      name: "Nitish Tiwari",
      designation: "JDeputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 8788972829,
    },
    {
      id: 2,
      UserId: 12345,
      name: "Aman Pratap",
      designation: "Deputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 8788972829,
    },
    {
      id: 3,
      UserId: 12345,
      name: "Manish",
      designation: "Deputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 8788972829,
    },
    {
      id: 4,
      UserId: 12345,
      name: "Kanak Dwivedi",
      designation: "Deputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 8788972829,
    },
    {
      id: 5,
      UserId: 12345,
      name: "paras Tiwari",
      designation: "Deputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 8788972829,
    },
    {
      id: 6,
      UserId: 12345,
      name: "Mahipal Singh",
      designation: "Deputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 87889728290,
    },
    {
      id: 7,
      UserId: 12345,
      name: "Akki Singh",
      designation: "Deputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 8788972829,
    },
    {
      id: 8,
      UserId: 12345,
      name: "Nitish Tiwari",
      designation: "Deputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 8788972829,
    },
    {
      id: 9,
      UserId: 12345,
      name: "paras Tiwari",
      designation: "Deputy Secretary",
      branch: "Advisor Suit",
      email: "Nitish@cipl.org.in",
      contact: 8788972829,
    },
  ];

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  };


  return (
    <Grid
      rowSpacing={1}
      columnSpacing={{ xs: 3, sm: 2, md: 3 }}
      sx={{
        width: "100%",
        height: "auto",
        background: "#F7F7F7",
      }}
    >
      <Grid
        sx={{
          width: "auto",
          height: "auto",
          padding: "10px",
          margin: "20px",
        }}
      >

        <Grid
          container
          sx={{
            width: "auto",
            height: "auto",
            color: "#000000",
            backgroundColor: "white",
            padding: "10px",
            boxShadow: "0px 4px 250px 0px #00000000",
            margin: "20px",
          }}
        >
          <DataGrid
            slots={{ toolbar: CustomToolbar }}
            rows={rows}
            columns={columns}
            
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DailyMontlyReport;
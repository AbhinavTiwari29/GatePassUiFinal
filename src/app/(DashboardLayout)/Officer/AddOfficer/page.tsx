"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/shared/DashboardCard";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { createOfficer } from "@/utils/api";
import { useAuth } from "@/context/JWTContext/AuthContext.provider";
import { useRouter } from "next/navigation";

const requiredField = {
  color: 'red',
  marginRight: '4px',
};

const defaultValue = {
  officer_name:"", 
  building_room_num:"", 
  status:"", 
  designation:""
}

const Page = () => {

    const auth = useAuth()
    const router = useRouter();
    let[officerdata, setOfficerdata]=useState(defaultValue)

    const handleChange=(e:any)=>{
        setOfficerdata({...officerdata, [e.target.name]:e.target.value})
    }

    const handleSubmit = async()=>{
      if(officerdata.officer_name===""||officerdata.building_room_num===""||officerdata.designation===""){
        alert("All fields are mandatory")
      }
      else{
      const res =  await createOfficer(officerdata)
      if(res?.officer){
        alert(res.message)
        setOfficerdata(defaultValue)
      }
      }
    }

    
  useEffect(() => {
    if (
      !auth.user
    ) {
      router.push("/login");
    }
  }, [auth, router]);


  return (
    <DashboardCard title="Add Officer">
      <>
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "flex",
              md: "flex",
            },
          }}
        >
          <Stack
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
              },
              mr: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Name<span style={requiredField}>*</span>
            </Typography>
            <CustomTextField name="officer_name" onChange={(event:any)=>{handleChange(event)}} variant="outlined" value={officerdata.officer_name} fullWidth />

            <Typography
              variant="subtitle1"
              fontWeight={700}
              component="label"
              htmlFor="location"
              mb="5px"
              mt="25px"
            >
              Location<span style={requiredField}>*</span>
            </Typography>
            <CustomTextField
              id="location"
              onChange={(event:any)=>{handleChange(event)}}
              sx={{ mb: 5 }}
              variant="outlined"
              fullWidth
              name="building_room_num"
              value={officerdata.building_room_num}
            />
          </Stack>
          <Stack
            sx={{
              width: {
                xs: "100%",
                sm: "50%",
              },
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="status"
              mb="5px"
            >
              Status<span style={requiredField}>*</span>
            </Typography>
            {/* <CustomTextField id="status" variant="outlined" fullWidth /> */}
            <Select
            //   displayEmpty
            name='status'
            value={officerdata.status}
            onChange={(event:any)=>{handleChange(event)}}
            //   input={<OutlinedInput />}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Placeholder</em>
              </MenuItem>

              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">In-Active</MenuItem>
            </Select>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="designation"
              mb="5px"
              mt="25px"
            >
              Designation<span style={requiredField}>*</span>
            </Typography>
            <CustomTextField
              sx={{ mb: 5 }}
              id="designation"
              variant="outlined"
              name='designation'
              value={officerdata.designation}
              onChange={(event:any)=>{handleChange(event)}}
              fullWidth
            />
          </Stack>
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "49.3%",
            },
          }}
        >
          <Button color="primary" variant="contained" size="large" fullWidth
          onClick={handleSubmit}
          >
            <Typography
              sx={{
                fontWeight: 750,
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              ADD
            </Typography>
          </Button>
        </Box>
      </>
    </DashboardCard>
  );
};

export default Page;

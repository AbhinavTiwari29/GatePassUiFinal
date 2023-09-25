"use client";
import { Grid } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import CustomTextField2 from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField2";
import SearchIcon from "@mui/icons-material/Search";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { format } from 'date-fns';
import { createMonthlyPass, getAllVendors, getPassData } from "@/utils/api";
import { Box, Button, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TakePhotoM from "../../components/webcam/takePhotoMonthly";
import dayjs from "dayjs"
import styled from "@emotion/styled"
import CustomModalMonthly from "../../components/CustomModal/CustomModalMonthly";
import { useAuth } from "@/context/JWTContext/AuthContext.provider";
import { useRouter } from "next/navigation";

const defaultValue = {
  mobile: "",
  name: "",
  gender: "",
  unique_id_type: "",
  unique_id: "",
  address: "",
  designation: "",
  vendorName: "",
  authorityCode: "",
  passFrom: new Date().toISOString().substr(0, 10),
  passTo: "",
  purpose: "",
};

const ModalFieldWrapper = styled(Box)(() => ({
  display: "flex",
  marginBottom: "5px",
  "& > *": {
    fontSize: "12px",
  },
}));

const requiredField = {
  color: 'red',
  marginRight: '4px',
};

const Dashboard = () => {
  const authD = useAuth()
  const router = useRouter();
  const [form, setForm] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [picture, setPicture] = useState("");
  const [modalState, setModalState] = useState(false);
  const [passData, setPassData] = useState<any>({});


  const onValueChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "unique_id_type") {
      setForm({ ...form, [name]: value, });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const regExp = /^[a-z A-Z0-9]*$/;
  const RegExpNum = /^[0-9]*$/;
  const regExpdir = /^[a-z A-Z0-9]*$/;

  const validateInput = (inputLimit: any, selectedType: any) => {
    switch (selectedType) {
      case "Aadhar Card":
        return inputLimit.length <= 12 && RegExpNum.test(inputLimit);
      case "Voter ID":
        return inputLimit.length <= 10 && regExp.test(inputLimit);
      case "Pan Card":
        return inputLimit.length <= 10 && regExp.test(inputLimit)
      case "Photo ID":
        return inputLimit.length <= 15 && regExp.test(inputLimit)
      case "Passport":
        return inputLimit.length <= 12 && regExp.test(inputLimit);
      case "Driving License":
        return inputLimit.length <= 15 && regExpdir.test(inputLimit);
      default:
        return true;
    }
  };

  const alldata = async () => {
    const data = await getAllVendors();
    setVendors(data?.data)
    console.log(data.data, "data")
  };

  function formatDate(date: string) {
    return format(new Date(date), 'yyyy-MM-dd');
  };

  const searchData = async (param: any) => {
    const res = await getPassData(param)
    if (res?.allData) {
      setForm({
        ...res?.allData,
        passFrom: formatDate(res?.allData.passFrom),
        passTo: formatDate(res?.allData.passTo)
      });
    }
    else if (!res?.allData?.name) {
      window.alert(res)
      setForm(defaultValue)
    }
  };

  const auth = () => {
    const newData: any = vendors?.filter((p: any) => {
      return p.vendor_name === form.vendorName
    })
    // console.log(newData)
    setForm({ ...form, authorityCode: newData[0]?.unique_code });
  };

  useEffect(() => {
    alldata()
  }, []);

  useEffect(() => {
    auth()
  }, [form.vendorName]);


  const handleSubmit = async () => {
    const res = await createMonthlyPass({ ...form, picture: picture });
    setForm(defaultValue);
    setPicture("")
    console.log(res, "Montly pass created successfully.");
    // for visitorData
    if (res?.historyData) {
      const { historyData } = res;
      setModalState(true);
      setPassData(historyData);
    };

    // for historyData
    if (res?.historyData) {
      const { historyData } = res;
      setModalState(true);
      setPassData(historyData);
    };
  };

  useEffect(() => {
    if (
      !authD.user
    ) {
      router.push("/login");
    }
  }, [authD, router]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box sx={{ marginTop: "-80px", paddingBottom: "0px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardCard title="Monthly Pass">
              <>
                <Box sx={{ display: "flex" }}>
                  <Stack sx={{ width: { xs: "100%", sm: "50%", }, mr: 2, }}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name">
                      Mobile Number<span style={requiredField}>*</span>
                    </Typography>
                    <CustomTextField2
                      name="mobile"
                      value={form.mobile}
                      variant="outlined"
                      fullWidth
                      type="text"
                      onChange={(e: any) => {
                        const newValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                        if (newValue.length <= 10) {
                          setForm({ ...form, [e.target.name]: newValue });
                        }
                      }}
                    />


                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mt="10px">
                      Name<span style={requiredField}>*</span>
                    </Typography>
                    <CustomTextField2 id="name" variant="outlined" fullWidth name="name" value={form.name} onChange={(e: any) => {
                      if (e.target.value.toString().length <= 50) {
                        setForm({ ...form, [e.target.name]: e.target.value });
                      }
                    }} />
                  </Stack>

                  <Stack sx={{ width: { xs: "30%", sm: "50%" } }}>
                    <Button sx={{
                      width: { xs: "100%", sm: "50%", md: "30%" }, height: 32, color: "white", mt: 3.1, background: "#5D87FF", fontWeight: 600, fontSize: "12px",
                      borderRadius: "8px", "&:hover": { backgroundColor: "#1976d2", }, px: 2,
                    }}
                      onClick={() => searchData(form.mobile)}
                    >
                      <SearchIcon /> &nbsp;&nbsp; Search
                    </Button>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="status" mt="10px">
                      Gender<span style={requiredField}>*</span>
                    </Typography>
                    <Select name="gender" placeholder="Select Gender" value={form.gender} onChange={(e: any) => onValueChange(e)} style={{ height: '32px', }} inputProps={{ "aria-label": "Without label" }}>
                      <MenuItem disabled value=""><em>Select Gender</em></MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Others</MenuItem>
                    </Select>
                  </Stack>
                </Box>

                <Box sx={{ display: { xs: "block", sm: "flex", md: "flex" } }}>
                  <Stack sx={{ width: { xs: "100%", sm: "50%" }, mr: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="status" mt="10px">
                      Unique ID Type<span style={requiredField}>*</span>
                    </Typography>
                    <Select value={form.unique_id_type} onChange={(e: any) => onValueChange(e)} name="unique_id_type" style={{ height: '32px', }} inputProps={{ "aria-label": "Without label" }}>
                      <MenuItem disabled value=""><em>ID Proof</em></MenuItem>
                      <MenuItem value="Aadhar Card">Aadhar Card / VID of Aadhar Card</MenuItem>
                      <MenuItem value="Voter ID">Voter ID </MenuItem>
                      <MenuItem value="Pan Card">Pan Card</MenuItem>
                      <MenuItem value="Driving License">Driving License</MenuItem>
                      <MenuItem value="Photo ID issued By Central/State Goverment">Photo ID issued By Central/State Goverment</MenuItem>
                      <MenuItem value="Passport">Passport</MenuItem>
                    </Select>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mt="10px">
                      Address<span style={requiredField}>*</span>
                    </Typography>
                    <CustomTextField2 id="location" variant="outlined" fullWidth name="address" value={form.address} onChange={(e: any) => onValueChange(e)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="status" mt="10px">
                      Associate With<span style={requiredField}>*</span>
                    </Typography>
                    <Select name="vendorName" value={form.vendorName} onChange={(e: any) => { setForm({ ...form, vendorName: e.target.value }) }} style={{ height: '32px', }} inputProps={{ "aria-label": "Without label" }}>
                      <MenuItem disabled value="">
                        <em>Reporting Officer</em></MenuItem>
                      {vendors?.map((ven: any, id: any) => (
                        <MenuItem value={ven.vendor_name} key={id}>
                          {ven.vendor_name}
                        </MenuItem>
                      ))}
                    </Select>

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mt="10px">
                      Pass Valid From<span style={requiredField}>*</span>
                    </Typography>
                    <CustomTextField2 type="date" name="passFrom" value={form.passFrom} onChange={(e: any) => onValueChange(e)}   />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="status" mt="10px">
                      Purpose<span style={requiredField}>*</span>
                    </Typography>
                    {/* <CustomTextField2 id="status" variant="outlined" fullWidth /> */}
                    <Select name="purpose" value={form.purpose} onChange={(e: any) => onValueChange(e)} style={{ height: '35px', }} inputProps={{ "aria-label": "Without label" }}>
                      <MenuItem disabled value=""><em>ID Proof</em></MenuItem>
                      <MenuItem value="Casual Work">Casual Work</MenuItem>
                      <MenuItem value="CPWD">CPWD</MenuItem>
                      <MenuItem value="Housekeeping">House Keeping</MenuItem>
                      <MenuItem value="Hindi Training">Hindi Training</MenuItem>
                      <MenuItem value="On Duty">On Duty</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </Stack>

                  <Stack sx={{ width: { xs: "100%", sm: "50%" } }}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mt="10px">
                      Unique ID
                    </Typography>
                    <CustomTextField2 name="unique_id" value={form.unique_id} variant="outlined" fullWidth onChange={(e: any) => {
                      const inputLimit = e.target.value;
                      if (validateInput(inputLimit, form.unique_id_type)) {
                        setForm({ ...form, [e.target.name]: e.target.value });
                      }
                    }} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mt="10px">
                      Designation<span style={requiredField}>*</span>
                    </Typography>
                    <CustomTextField2 id="location" variant="outlined" fullWidth name="designation" value={form.designation} onChange={(e: any) => onValueChange(e)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mt="10px">
                      Authority
                    </Typography>
                    <CustomTextField2 variant="outlined" fullWidth disabled name="authorityCode" value={form.authorityCode} onChange={(e: any) => onValueChange(e)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mt="10px">
                      Pass Valid To<span style={requiredField}>*</span>
                    </Typography>
                    <CustomTextField2 type="date" name="passTo" value={form.passTo} onChange={(e: any) => onValueChange(e)} />

                    <Box sx={{ mt: 5, display: "flex", justifyContent: "space-around" }}>
                      <Button sx={picture === "" ? Photo : { display: "none" }} onClick={() => setOpen(true)} style={{ height: "35px", marginTop: "-5px" }}>
                        <CameraAltIcon sx={{ mr: 1, }} />
                        Take Photo
                      </Button>
                      <Button sx={picture === "" ? { display: 'none' } : submit} onClick={handleSubmit}>
                        Save & Print
                      </Button>
                    </Box>
                    <Box sx={{ marginLeft: "100px", marginTop: "70px" }}>
                      <TakePhotoM open={open} handleClose={() => setOpen(false)} setPicture={setPicture} setOpen={setOpen} />
                    </Box>
                  </Stack>
                </Box>
                <CustomModalMonthly modalState={modalState} setModalState={setModalState}  >
                  <Grid sx={{ width: "100%", marginTop: "30px" }}>
                    <Box sx={{display: 'flex' }}>
                        <img style={{ width: "22%", border: '1px solid grey' }} src={passData.qr_code} />
                        <Typography sx={{ fontSize: "8px",}}>पास संख्या/ Pass No.: <span style={{fontSize: "9px", fontWeight: 'bold'}}>{passData.passNumber}</span></Typography>
                        <Box sx={{ display: 'flex'}}>
                          <Typography sx={{ fontSize: "8px" }}>Valid From: <span style={{fontSize: "10px", fontWeight: 'bold'}}>{dayjs(passData.passFrom).format("DD/MM/YYYY")}</span></Typography>
                          <Typography sx={{ fontSize: "8px" }}>Valid Upto: <span style={{fontSize: "10px", fontWeight: 'bold'}}>{dayjs(passData.passTo).format("DD/MM/YYYY")}</span></Typography>
                        </Box>
                      {/* <Typography sx={{ fontSize: "8px" }}></Typography> */}
                      
                    </Box>
                    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "0px" }}>
                      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                  
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", }}>
                      
                      
                      </div>
                    
                    </section>
                    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "0px", textAlign: "left" }}>
                      <Box>
                        <Typography sx={{ fontSize: "8px" }}>नाम/ Name:</Typography>
                      </Box>
                      <div>
                        <Typography sx={{ fontSize: "10px", lineHeight: '0.743rem' }} variant="body1" fontWeight="bold" >{passData.name}</Typography>
                      </div>
                      
                    </section>
                    <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "0px", textAlign: "left" }}>
                      <div>
                        <Typography sx={{ fontSize: "8px" }}>लिंग/ Gender:</Typography>
                        <Typography sx={{ fontSize: "8px" }}>मोबाइल/ Mobile:</Typography>
                        <Typography sx={{ fontSize: "8px" }}>पद/ Designation:</Typography>
                        <Typography sx={{ fontSize: "8px" }}>उद्देश्य/ Purpose:</Typography>
                        <Typography sx={{ fontSize: "8px", lineHeight: "0.9rem" }}>संबंधित/<br />Associated With:</Typography>
                      </div>
                      <div>
                        <Typography sx={{ fontSize: "8px" }}>{passData.gender}</Typography>
                        <Typography sx={{ fontSize: "8px" }}>{passData.mobile}</Typography>
                        <Typography sx={{ fontSize: "10px" }} variant="body1" fontWeight="bold">{passData.designation}</Typography>
                        <Typography sx={{ fontSize: "10px" }}>{passData.purpose}</Typography>
                        <Typography sx={{ fontSize: "10px" }}>{passData.vendorName}</Typography>
                      </div>
                        <Box sx={{ width: "100%", display: "flex", flexDirection: "column",marginTop: '-23px' }}>
                          <img style={{ width: "100%", height: "80%", border: '1px solid grey', padding: '0px' }} src={passData.picture} alt="Pass Picture" />
                        </Box>
                    </section>
                      <Box sx={{ display: "flex-start", textAlign: "start", fontSize: "10px", marginTop: "10px", marginBottom: "20px" }}>
                        Signature of Holder
                      </Box>
                      <Box sx={{ display: "flex-end", textAlign: "end", fontSize: "10px", marginTop: "-64px", marginBottom: "20px", lineHeight: '0.9rem' }}>
                        Signature <br />
                        (Issuing Authority / Officer)<br />
                        Reg. Date: {dayjs(passData.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </Box> 
                  </Grid>
                </CustomModalMonthly>

              </>
            </DashboardCard>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Dashboard;

const submit = { width: 172, height: 48, color: "white", background: "#E15A11", fontWeight: 600, fontSize: "14px", "&:hover": { backgroundColor: "#1976d2" } };

const Photo = { width: 172, height: 48, color: "white", background: "#5D87FF", fontWeight: 600, fontSize: "14px", "&:hover": { backgroundColor: "#1976d2" }, px: 2 };
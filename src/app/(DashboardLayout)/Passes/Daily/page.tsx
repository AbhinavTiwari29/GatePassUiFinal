"use client";
import { Divider, Grid } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import CustomTextField2 from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField2";
import CustomTextArea from "../../components/forms/theme-elements/CustomTextField2";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Button, MenuItem, Select, Stack, Typography, } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import TakePhoto from "../../components/webcam/takePhoto";
import axios from "axios";
import { createDailyPass, getDailyPassDetails } from "@/utils/api";
import dayjs from "dayjs"
import CustomModal from "../../components/CustomModal/CustomModal";
import AddressTextArea from "../../components/forms/theme-elements/AddressTextArea";
import icon4 from 'public/icon4.png';
import icon5 from 'public/icon5.png';
import icon6 from 'public/icon6.png';
import icon7 from 'public/icon7.png';
import { useAuth } from "@/context/JWTContext/AuthContext.provider";
import { useRouter } from "next/navigation";

interface FormField {
  name: string;
  showRemoveButton: boolean;
};

 const requiredField = {
  color: 'red',
  marginRight: '4px',
};

 const ps = {
  lineHeight: '0.54rem'
}

const nameRegExp = /^[a-z A-Z]*$/;

const Dashboard = () => {
  const auth = useAuth()
  const router = useRouter();
  const [formFields, setFormFields] = useState<FormField[]>([{ name: '', showRemoveButton: false }]);
  const [open, setOpen] = useState(true);
  const [mobile_num, setMobile_num] = useState("");
  const [formattedNames, setFormattedNames] = useState<string[]>([]);
  const [gender, setGender] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [unique_id_type, setUnique_id_type] = useState("");
  const [building_room_num, setBuilding_room_num] = useState("");
  const [reporting_officer, setReporting_officer] = useState('');
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [purpose, setPurpose] = useState("");
  const [material, setMaterial] = useState("");
  const [vendor, setVendor] = useState([]);
  const [modalState, setModalState] = useState(false)
  const [passData, setPassData] = useState<any>({})
  const [picture, setPicture] = useState("");
  const [messageConveyedBy, setMessageConveyedBy] = useState("");

  useEffect(() => {
    var options = {
      method: "GET",
      url: "http://172.16.15.42:5500/api/officers/getAll",
      headers: {
      },
    };

    axios.request(options)
      .then(function (response) {
        setVendor(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleChange1 = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value
    if (name.length <= 50 && nameRegExp.test(name)) {
      const updatedFields = [...formFields];
      updatedFields[index].name = event.target.value;
      setFormFields(updatedFields);
    }
  };

  const addFieldName = () => {
    if (formFields.length < 5) {
      setFormFields([...formFields, { name: '', showRemoveButton: true }]);
    }
  };

  const handleRemove = (index: number) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  const handleReportingOfficer = (e: any) => {
    const ReportValue = e.target.value;
    setReporting_officer(ReportValue);
    const details: any = vendor.filter((vendor: any) => vendor.officer_name === ReportValue);
    setBuilding_room_num(details[0].building_room_num)
  };

  const handledchanged = (event: any) => {
    const selectedType = event.target.value;
    setUnique_id_type(selectedType);
    setUnique_id("");
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

  const searchData = async (param: any) => {
    const res = await getDailyPassDetails(param);
    console.log(res)
    if (res?.allData) {
      delete res?.alldata?.__v;
      delete res?.allData?._id;
      const data: any = res.allData;
      setFormFields([{ name: data.formattedNames[0], showRemoveButton: false }]);
      setGender(data.gender);
      setUnique_id(data.unique_id);
      setUnique_id_type(data.unique_id_type);
      setReporting_officer(data.reporting_officer);
      setBuilding_room_num(data.building_room_num);
      setAddress(data.address);
      setMaterial(data.material);
      setMessage(data.message);
      setPurpose(data.purpose)
    }
    else if (!res?.allData?.name) {
      setFormFields([{ name: '', showRemoveButton: false }]);
      setGender("");
      setUnique_id("");
      setUnique_id_type("");
      setReporting_officer("");
      setBuilding_room_num("");
      setAddress("");
      setMaterial("");
      setMessage("");
      setPurpose("")
      alert("No Data Found")
    }
  };

  const handleSubmit = async () => {
    const formData = { mobile_num, formattedNames, unique_id, unique_id_type, gender, reporting_officer, building_room_num, address, material, message, picture, purpose };
    const res = await createDailyPass(formData);
    console.log(res);
    setMobile_num("");
    setFormFields([{ name: '', showRemoveButton: false }]);
    setUnique_id('');
    setUnique_id_type('');
    setGender('');
    setReporting_officer('');
    setBuilding_room_num('');
    setAddress('');
    setMessage('');
    setPurpose('');
    setMaterial('');
    setPicture('');

    // for visitorData
    // if (res?.visitorData) {
    //   const { visitorData } = res
    //   setModalState(true)
    //   setPassData(visitorData)
    // };

    // for historyData
    if (res?.historyData) {
      setModalState(true);
      setPassData(res.historyData);
    };
  };

  const maskUniqueId = (uniqueId: string) => {
    if (uniqueId?.length < 4) {
      return uniqueId;
    };
  
    const lastFourDigits = uniqueId?.slice(-4);
    const maskedPart = 'X'.repeat(uniqueId?.length - 4);
  
    return maskedPart + lastFourDigits;
  };
  

  useEffect(() => {
    const namesArray = formFields.map((field, index) => {
      const firstSpaceIndex = field.name.indexOf(' ');
      const firstName = firstSpaceIndex !== -1 ? field.name.slice(0, firstSpaceIndex + 1) : field.name;
      const restOfName = firstSpaceIndex !== -1 ? field.name.slice(firstSpaceIndex + 1) : '';
      return `${firstName}${restOfName.replace(/\s/g, '')}`;
    });
    setFormattedNames(namesArray);
  }, [formFields]);


  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <>
        <Box sx={{ marginTop: "0px", paddingBottom: "0px" }}>
          <Grid container spacing={2}  >
            <Grid item xs={12} >
              <DashboardCard title="Daily Pass" >
                <>
                  <Box sx={{ display: "flex" }}>
                    <Stack sx={{ width: { xs: "100%", sm: "50%", }, mr: 2, }}>
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name">
                        Mobile Number<span style={requiredField}>*</span>
                      </Typography>
                      <CustomTextField2 name="mobile_num"value={mobile_num} variant="outlined" fullWidth type="text"
                        onChange={(e: any) => {
                          if (/^\d{0,10}$/.test(e.target.value)) {
                            setMobile_num(e.target.value);
                          }
                        }}
                      />
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mt="10px">
                        Name<span style={requiredField}>*</span>
                      </Typography>
                      {formFields.map((field, index) => (
                        <div key={index} style={{display:"flex", padding: '1px'}}>
                          <CustomTextField2 value={field.name} width="80%" variant="outlined" fullWidth name={field.name}
                            onChange={(event: any) => handleChange1(index, event)}
                          />
                          {field.showRemoveButton && (
                            <Button style={{marginLeft: '2px'}} onClick={() => handleRemove(index)} variant="contained" color="error" size="small">
                              <RemoveCircleOutlineIcon fontSize="small" />
                            </Button>
                          )}
                        </div>
                      ))}

                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="status" mt="10px">
                        Gender<span style={requiredField}>*</span>
                      </Typography>
                      {/* <CustomTextField2 id="status" variant="outlined" fullWidth /> */}
                      <Select name="status" value={gender} inputProps={{ "aria-label": "Without label" }}
                        onChange={(e: any) => handleGenderChange(e)} style={{ height: '32px', }}>
                        <MenuItem disabled value="">
                          <em>Select Gender</em>
                        </MenuItem>

                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                      </Select>
                    </Stack>
                    <Stack sx={{ width: { xs: "30%", sm: "50%", }, }}>
                      <Button sx={{width: { xs: "100%", sm: "50%", md: "30%", }, height: 32, color: "white", mt: 3.1, background: "#5D87FF", fontWeight: 600, fontSize: "12px", borderRadius: "8px",
                      "&:hover": { backgroundColor: "#1976d2", }, px: 2,}}
                        onClick={() => searchData(mobile_num)}
                      >
                        <SearchIcon /> &nbsp;&nbsp; search
                      </Button>

                      <Button sx={{ width: { xs: "5%", sm: "5%", md: "5%", }, height: 31, mt: 4, fontWeight: 600, fontSize: "12px", borderRadius: "8px", }}
                        variant="contained" color="success" onClick={addFieldName}>
                        <PersonAddAlt1Icon />
                      </Button>
                    </Stack>
                  </Box>
                  <Box sx={{ display: { xs: "block", sm: "flex", md: "flex" } }}>
                    <Stack sx={{ width: { xs: "100%", sm: "50%", }, mr: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="status" mt="10px">
                        Unique ID Type<span style={requiredField}>*</span>
                      </Typography>
                      {/* <CustomTextField2 id="status" variant="outlined" fullWidth /> */}
                      <Select style={{ height: '32px', }} value={unique_id_type} onChange={handledchanged} name="unique_id_type" inputProps={{ "aria-label": "Without label" }}>
                        <MenuItem disabled value=""><em>ID Proof</em></MenuItem>
                        <MenuItem value="Aadhar Card">Aadhar Card / VID of Aadhar Card</MenuItem>
                        <MenuItem value="Voter ID">Voter ID </MenuItem>
                        <MenuItem value="Pan Card">Pan Card</MenuItem>
                        <MenuItem value="Driving License">Driving License</MenuItem>
                        <MenuItem value="Photo ID issued By Central/State Goverment">Photo ID issued By Central/State Goverment</MenuItem>
                        <MenuItem value="Passport">Passport</MenuItem>
                      </Select>

                      <Typography  variant="subtitle1" fontWeight={600} component="label" htmlFor="location"  mt="10px">
                        Address<span style={requiredField}>*</span>
                      </Typography>
                      <AddressTextArea  id="location" variant="outlined"  fullWidth name="location"  value={address} inputProps={{ maxLength: 550 }}
                        onChange={(e: any) => {
                          if (e.target.value.length <= 550) {
                            setAddress(e.target.value);
                          }
                        }}
                      />
                      <Typography variant="subtitle1"  fontWeight={600}  component="label"  htmlFor="status"  mt="10px">
                        Host Officer<span style={requiredField}>*</span>
                      </Typography>
                      {/* <CustomTextField2 id="status" variant="outlined" fullWidth /> */}
                      <Select name="reportstatus"
                        inputProps={{ "aria-label": "Without label" }}
                        value={reporting_officer}
                        style={{ height: '32px', }}
                        onChange={(e) => handleReportingOfficer(e)}
                      >
                        <MenuItem disabled value="">
                          <em>Host Officer</em>
                        </MenuItem>
                        {vendor.map((option: any, index) => (
                          <MenuItem key={option._id} value={option.officer_name}>
                            {option.officer_name}
                          </MenuItem>
                        ))}
                      </Select>

                      <Typography variant="subtitle1" fontWeight={600}  component="label" htmlFor="location" mt="10px">
                        Message Conveyed By<span style={requiredField}>*</span>
                      </Typography>
                      <CustomTextField2 value={message} width="80%" variant="outlined" fullWidth name="message"
                        onChange={(event: any) => setMessage(event.target.value)}
                      />
                    </Stack>
                    <Stack sx={{ width: { xs: "100%", sm: "50%", }, }}>
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mt="10px">
                        Unique ID Number
                      </Typography>
                      <CustomTextField2 name="unique_id" variant="outlined" fullWidth value={unique_id}
                        onChange={(e: any) => {
                          const inputLimit = e.target.value;
                          if (validateInput(inputLimit, unique_id_type)) {
                            setUnique_id(inputLimit);
                          }
                        }}
                        disabled={!unique_id_type} inputProps={{ maxLength: 15 }}
                      />
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location"  mt="10px">
                        Purpose Of Visiting <span style={requiredField}>*</span>
                      </Typography>
                      <AddressTextArea id="location" variant="outlined" fullWidth name="location" value={purpose} inputProps={{ maxLength: 300 }} onChange={(e: any) => {
                          if (e.target.value.length <= 300) {
                            setPurpose(e.target.value);
                          }
                        }}
                      />

                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mt="10px">
                        Building Room Number
                      </Typography>
                      <CustomTextField2 id="location"  variant="outlined"  fullWidth  disabled  name="location"  value={building_room_num}
                        onChange={(e: any) => {
                          setBuilding_room_num(e.target.value);
                        }}
                      />
                      <Typography  variant="subtitle1"  fontWeight={600}  component="label" htmlFor="location" mt="10px">
                        Vehicle No./Material:
                      </Typography>
                      <CustomTextArea id="location"  variant="outlined"  fullWidth  name="location"  value={material}
                        onChange={(e: any) => {
                          setMaterial(e.target.value);
                        }}
                      />
                      
                      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-around", }}>
                        {/* <Button sx={picture === "" ? Photo : { display: "none", }} style={{ height: "35px", marginTop: "3px" }} onClick={() => setOpen(true)}>
                          <CameraAltIcon sx={{ mr: 1, }} />
                          Take Photo
                        </Button> */}
                        <Button sx={submit} onClick={handleSubmit}>
                          Save & Print
                        </Button>
                      </Box>

                      <Box sx={{ marginLeft: "100px", marginTop: "70px", }}>
                        <TakePhoto open={open} handleClose={() => setOpen(false)} setPicture={setPicture} setOpen={setOpen} />
                      </Box>

                    </Stack>
                  </Box>
                </>
              </DashboardCard>
            </Grid>
          </Grid>
        </Box>

        <CustomModal modalState={modalState} setModalState={setModalState} modalWidth="800px" altBtnText="Print" altBtnFn={() => window.print()}>
          <Box sx={{ width: "600px", padding: "10px", }}>
            <Grid container xs={12} sx={{}}>
              <Grid xs={8} sx={{ paddingRight: '10px', }}>
                <Grid xs={8}>
                  <Box>
                    <Typography sx={{}} fontWeight="bold" > दैनिक आगंतुक पास/ Daily Visitor Pass</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "10px", marginTop: '5px', display: 'flex', height: '14px', alignItems: 'center' }} fontWeight="bold" >
                      <img src={icon6.src} alt="Icon 6" height="15px" />&nbsp; पास संख्या/ Pass No.:
                      <span style={{ marginLeft: "15px" }}>{passData.passNumber}</span>
                    </Typography>
                  </Box>
                </Grid>
                <Grid xs={4}>

                </Grid>

                <Grid container xs={12} >
                  <Box sx={{ width: "100%", fontSize: "12px", display: 'flex', marginTop: '7px', borderBottom: '1px dashed #333', justifyContent: "start", alignItems: "center" }}>
                    <img src={icon4.src} alt="Icon 03" height="14px" />&nbsp;
                    <Typography sx={{ fontSize: "10px" }} fontWeight="bold">आगंतुक विवरण/ Visitor Details</Typography>
                  </Box>
                </Grid>

                <Grid container xs={12} >
                  <Grid xs={5} sx={{ marginTop: "10px" }}>
                    <Box>
                      <Typography sx={{ fontSize: "10px", lineHeight: '0.54rem' }} >नाम/ Name:</Typography>
                      <Typography sx={{ fontSize: "10px" }}>
                        {passData?.formattedNames && passData.formattedNames.length > 0 && (
                          <Typography sx={{ fontSize: '12px', lineHeight: '0.964rem' }} fontWeight="bold">{passData.formattedNames.join(', ')}</Typography>
                        )}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid xs={4} sx={{ marginTop: "10px" }}>
                    <Typography sx={{ fontSize: "10px", lineHeight: '0.54rem' }}>लिंग/ Gender:</Typography>
                    <Typography sx={{ fontSize: '12px' }} fontWeight="bold">{passData.gender}</Typography>
                  </Grid>
                  <Grid xs={3} sx={{ marginTop: "10px" }}>
                    <Box>
                      <Typography sx={{ fontSize: "10px", lineHeight: '0.54rem' }}>मोबाइल/ Mobile:</Typography>
                      <Typography sx={{ fontSize: '12px' }} fontWeight="bold">{passData.mobile_num}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container xs={12} sx={{ marginTop: '10px' }}>
                  <Grid xs={5}>
                    <Box>
                      <Typography sx={{ fontSize: "10px", lineHeight: '0.54rem' }}>आईडी विवरण/ ID Details:</Typography>
                      <Typography sx={{ fontSize: '12px' }} fontWeight="bold">{passData.unique_id_type}</Typography>
                    </Box>
                  </Grid>

                  <Grid xs={4}>
                    <Box>
                      <Typography sx={{ fontSize: "10px", lineHeight: '0.54rem' }}>आईडी नं/ ID No.:</Typography>
                      <Typography sx={{ fontSize: '12px' }} fontWeight="bold">{maskUniqueId(passData.unique_id)}</Typography>
                    </Box>
                  </Grid>

                  <Grid container xs={12} >
                    <Box sx={{ width: "100%", padding: '0px 0px', marginTop: "8px", borderBottom: '1px dashed #333', marginBottom: "5px", display: "flex", justifyContent: "start", alignItems: "center" }}>
                      <img src={icon5.src} alt="Icon 05" height="14px" />&nbsp;
                      <Typography fontWeight="bold" sx={{ fontSize: "10px", }}>मिलने के लिए/ To Meet</Typography>
                    </Box>
                  </Grid>

                  <Grid container xs={12}  >
                    <Grid xs={5}>
                      <Box>
                        <Typography sx={{ fontSize: "10px", lineHeight: '0.8rem' }}>अनुरोध करने वाले अधिकारी का नाम<br />Host Officer Name:</Typography>
                        <Typography sx={{ marginBottom: "18px", fontSize: "12px" }} fontWeight="bold">{passData.reporting_officer}</Typography>
                      </Box>
                    </Grid>
                    <Grid xs={4}>
                      <Box>
                        <Typography sx={{ fontSize: "10px", lineHeight: '0.8rem' }}>कमरा नं./भवन<br />Room No./ Building:</Typography>
                        <Typography sx={{ fontSize: "12px" }} fontWeight="bold">{passData.building_room_num}</Typography>
                      </Box>
                    </Grid>
                    <Grid xs={2}>
                      <Box>
                        <Typography sx={{ fontSize: "10px", lineHeight: '0.8rem' }}>उ्देश्य/<br />Purpose:</Typography>
                        <Typography sx={{ fontSize: "12px" }} variant="body1" fontWeight="bold">{passData.message_and_purpose}</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container xs={12}>
                    <Grid xs={5}>
                        <Box>
                          <Typography sx={{ fontSize: "10px", lineHeight: '0.8rem' }}>Message Conveyed By:</Typography>
                          <Typography sx={{ marginBottom: "18px", fontSize: "12px" }} fontWeight="bold">Dhirendra Shastri</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={4}>
                      <Box>
                        <Typography sx={{ fontSize: "10px", lineHeight: '0.8rem' }}>Vehicle No. / Material:</Typography>
                        <Typography sx={{ marginBottom: "18px", fontSize: "12px" }} fontWeight="bold">Bike DL 0007</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container xs={12}>
                    <Grid xs={4}>
                      <Typography sx={{ fontSize: "10px", marginTop: "65px" }} fontWeight="bold">Exit Time: _________</Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography sx={{ fontSize: "9px", marginBottom: "20px", marginTop: "40px", lineHeight: '0.8rem', textAlign: "center" }} fontWeight="bold">
                        जारीकर्ता प्राधिकारी/अधिकारी के हस्ताक्षर और मुहर <br />
                        Signature Seal of Issuing Authority / Officer <br />
                        Reg. Date: {dayjs(passData.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                      </Typography>
                     
                    </Grid>
                  </Grid>
                </Grid>

              </Grid>
              {/* END LEFT SIDE DIV */}
              <Grid xs={4} sx={{ paddingLeft: '7px' }} >
                <Box>
              
                </Box>

                <Grid container xs={12} sx={{ width: "auto", marginTop: '10px', }}>
                  <Typography sx={{ fontSize: "10px", display: 'flex', height: '14px', alignItems: 'center', marginTop: '20px' }} variant="body1" fontWeight="bold">
                    <img src={icon7.src} alt="Icon 07" height="14px" />&nbsp; Valid on:  
                    <span style={{ marginLeft: "7px" }}>{dayjs(passData.createdAt).format("DD/MM/YYYY")}</span>
                  </Typography>
                  <img style={{ width: "180px",  marginTop: '15px', height: "180px", padding: "8px", border: '1px solid rgb(192, 189, 189)' }} src={passData.picture} />
                  <img style={{ width: "70px", marginTop: '12px', marginLeft: "55px", border: '1px solid rgb(192 189 189)' }} src={passData.qr_code} />
                </Grid>
                
              </Grid>
            </Grid>
          </Box>
        </CustomModal>
      </>
    </PageContainer>
  );
};

export default Dashboard;

const submit = {
  width: 172,
  height: 48,
  color: "white",
  background: "#E15A11",
  fontWeight: 600,
  fontSize: "14px",
  "&:hover": {
    backgroundColor: "#1976d2",
  },
}

const Photo = {
  width: 172,
  height: 48,
  color: "white",
  background: "#5D87FF",
  fontWeight: 600,
  fontSize: "14px",

  "&:hover": {
    backgroundColor: "#1976d2",
  },
  px: 2,
}

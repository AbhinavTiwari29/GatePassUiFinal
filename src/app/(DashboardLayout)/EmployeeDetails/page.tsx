"use client"

import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, styled, Button, Select, MenuItem, TextField, Grid, Modal, Divider, TablePagination, SelectChangeEvent, Stack, } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility"
import CancelIcon from "@mui/icons-material/Cancel";
import PageContainer from "../components/container/PageContainer"
import DashboardNew from "../components/shared/DashboardNew"
import { ChangeEventHandler, useEffect, useState } from "react"
import { createEmployee, getAllEmployee } from "@/utils/api"
import CustomTextField from "../components/forms/theme-elements/CustomTextField";
import CustomTextField2 from "../components/forms/theme-elements/CustomTextField2";
import { useAuth } from "@/context/JWTContext/AuthContext.provider"
import { useRouter } from "next/navigation"
const empDetailsHeader = [
  "Employee Name",
  "Mobile Number",
  "Email",
  "Date",
  "Action",
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "auto",
  bgcolor: "white",
  p: 2,
};

const TextCentered = styled(Typography)(() => ({
  textAlign: "center",
}));

interface IUser {
  _id: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  phone_num: number | null;
  email_id: string;
  emp_id: number | null;
  password: string;
  role: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface EmployeeData {
  emp_id: number | null;
  name: string;
  gender: string;
  phone_num: number | null;
  email_id: string;
  password: string;
  genderOptions: string[]
};

const EmployeeDetails = () => {
  const auth = useAuth()
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [employees, setEmployees] = useState<IUser[]>([]);
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    emp_id: null,
    name: "",
    gender: "",
    phone_num: null,
    email_id: "",
    password: "",
    genderOptions: ["Male", "Female", "Other"],
  });

  useEffect(() => {
    if (
      !auth.user
    ) {
      router.push("/login");
    }
  }, [auth, router]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function fetchEmployees() {
    const employees = await getAllEmployee();
    setEmployees(employees.data);
  };


  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddEmployee = async () => {
    try {
      const {emp_id, name, gender, email_id,phone_num, password} = employeeData;
      const formattedEmployeeData = {
        emp_id, name, gender, email_id, phone_num, password
        // phone_num: employeeData.phone_num !== null ? parseInt(employeeData.phone_num.toString(), 10) : null,
        // emp_id: employeeData.emp_id !== null ? parseInt(employeeData.emp_id.toString(), 10) : null,
      };

      await createEmployee(formattedEmployeeData);
      setEmployeeData({
        emp_id: null,
        name: "",
        gender: "",
        phone_num: null,
        email_id: "",
        password: "",
        genderOptions: ["Male", "Female", "Other"],
      });
      setShowAddForm(false);
      fetchEmployees();
    }
    catch (error: any) {
      console.error("Failed to add employee:", error.message);
    }
  };


  const handleOpen = (id: string) => {
    const selectedProductData = employees.find((emp) => emp._id === id);
    setSelectedProduct(selectedProductData || null);
    setOpen(true);
  };

  const handleClose = () =>{ 
    setShowAddForm(false)
    setOpen(false)};

  const ModalContent = () => {
    if (!selectedProduct) {
      return null;
    };

    return (
      <div>
        <Box sx={style}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{
                  background: "#5d87FF",
                  color: "#fff",
                  p: 2,
                  justifyContent: "space-between",
                  display: "flex",
                  fontWeight: "700",
                  fontSize: "1.125rem",
                }}
                >
                  Employee Details
                  <CancelIcon onClick={handleClose}></CancelIcon>
                </Typography>
                <Box sx={{
                  overflow: "auto",
                  width: { xs: "280px", sm: "auto" },
                  padding: "20px",
                }}
                >
                  <Table aria-label="simple table" sx={{ whiteSpace: "nowrap" }} key={selectedProduct.id}>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Name
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Email Id
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.email_id}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          Mobile
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                        }}
                      >
                        {selectedProduct.phone_num}
                      </TableCell>
                    </TableRow>
                  </Table>
                </Box>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      width: "13%",
                      background: "#5d87FF",
                      height: "30px",
                      color: "#fff",
                      marginBottom: "20px",
                    }}
                    onClick={handleClose}
                  >
                    close
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Divider />
      </div>
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleGenderChange = (event: SelectChangeEvent<string>) => {
    setEmployeeData((prevState) => ({
      ...prevState,
      gender: event.target.value
    }));
  };

  // const handleGenderChangeAssertion = handleGenderChange as ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  return (
    <>
      <PageContainer title="Manage Employee" description="View Employee Details here">
        <DashboardNew title="Employee Details" titleVariant="h2">
          <>
            <Button variant="contained" onClick={handleAddClick}>
              Add Employee
            </Button>
            <Table aria-label="simple table" sx={{ marginTop: "50px" }}>
              <TableHead>
                <TableRow>
                  {empDetailsHeader.map((header, i) => (
                    <TableCell key={i}>
                      <TextCentered variant="subtitle2" fontWeight={600}>
                        {header}
                      </TextCentered>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {employees?.map((employee:any,key:any) => (
                  <TableRow key={employee._id}>
                    <TableCell>
                      <TextCentered>{employee.name}</TextCentered>
                    </TableCell>
                   
                    <TableCell>
                      <TextCentered>{employee.phone_num}</TextCentered>
                    </TableCell>
                    <TableCell>
                      <TextCentered>{employee.email_id}</TextCentered>
                    </TableCell>
                    <TableCell>
                      <TextCentered>{formatDate(employee.createdAt)}</TextCentered>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <VisibilityIcon
                        sx={{
                          ":hover": { cursor: "pointer" },
                          color: "#556cd6",
                        }}
                        onClick={() => handleOpen(employee._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        </DashboardNew>
      </PageContainer>
      <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
        <ModalContent />
      </Modal>
      {showAddForm && (
        <Modal keepMounted open={showAddForm}  onClose={() => setShowAddForm(false)} aria-labelledby="add-employee-modal-title" aria-describedby="add-employee-modal-description">
          <Grid container spacing={4} sx={style}>
            <Grid item xs={12} width={400}>
              <Typography sx={{
                  background: "#5d87FF",
                  color: "#fff",
                  p: 2,
                  justifyContent: "space-between",
                  display: "flex",
                  fontWeight: "700",
                  marginRight: "25px",
                  fontSize: "1.125rem",
                }}
                >
                  Employee Details
                  <CancelIcon onClick={handleClose}></CancelIcon>
                </Typography>
            </Grid>
              <Box sx={{ marginLeft: '25px', width: '520px', display: { xs: "block", sm: "flex", md: "flex" }}}>
                <Stack sx={{ width: { xs: "100%", sm: "50%", }, padding: '5px' }}>
                  <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px" mt="10px">
                    Employee ID
                  </Typography>
                  <CustomTextField2  type="number" name="emp_id" value={employeeData.emp_id} onChange={handleInputChange} variant="outlined" fullWidth  inputProps={{ maxLength: 15 }}/>

                  <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mt="10px" mb="5px">
                    Gender
                  </Typography>
                  <Select value={employeeData.gender} onChange={handleGenderChange} style={{height: '32px', }}>
                    {employeeData.genderOptions.map((option) => (
                      <MenuItem key={option} value={option} >
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                
                  <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px" mt="10px">
                    Email Id
                  </Typography>
                  <CustomTextField2 type="email" name="email_id" value={employeeData.email_id} onChange={handleInputChange} variant="outlined" fullWidth />
                
                </Stack>

                <Stack sx={{ width: { xs: "100%", sm: "50%", },  padding: '5px' }}>
                  <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px" mt="10px">
                    Name
                  </Typography>
                  <CustomTextField2 type="text" name="name" value={employeeData.name} onChange={handleInputChange} inputProps={{ maxLength: 15 }}/>

                  <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px" mt="10px">
                    Mobile
                  </Typography>
                  <CustomTextField2 type="number" name="phone_num" value={employeeData.phone_num} onChange={handleInputChange} variant="outlined" fullWidth  inputProps={{ maxLength: 15 }}/>
                  
                  <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px" mt="10px">
                    Password
                  </Typography>
                  <CustomTextField2 type="password" name="password" value={employeeData.password} onChange={handleInputChange} variant="outlined" fullWidth inputProps={{ maxLength: 15 }} />
                  
                </Stack>
              </Box>

              
              
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button variant="contained" size="small" fullWidth sx={{
                    width: "80%",
                    background: "#5d87FF",
                    height: "40px",
                    color: "#fff",
                    marginBottom: "20px",
                  }}
                  onClick={() => {
                    handleAddEmployee();
                  }}
                >
                  Add Employee
                </Button>
              </Grid>
          </Grid>
        </Modal>
      )}
    </>
  )
}

export default EmployeeDetails

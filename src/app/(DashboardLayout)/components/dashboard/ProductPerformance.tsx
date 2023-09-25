"use client"
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    styled,
    Button,
    Select,
    MenuItem,
    TextField
} from '@mui/material';
import React,{ useState } from 'react';
import CustomTextField from '../forms/theme-elements/CustomTextField2';

const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];
const TableProp = styled(Box)`
display:flex;
justify-content:right;
&>div{
    margin-right:15px;
}
`;
const ExportButton = styled(Select)`
width:13%;
background:#FA896B; 
height:30px;
color:#fff;
&>svg{
    color:white;
}
`;

const FilterButton = styled(Select)`
width:13%;
background:#5d87FF;
height:30px;
color:#fff;
&>svg{
    color:white;
}
`;

const Search = styled(TextField)`
color:#fff;
&>div>input{
    height:20px;
    width:150px;
    padding:5px 5px
}
`;

const ProductPerformance = () => {

    const [exp, setExp] = useState("null");
    const [filter, setFilter] = useState("null2");

    return (

      
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <TableProp>
                <FilterButton
                value={filter}
                name="filter"
                onChange={(e:any)=>{
                    setFilter(e.target.value)
                }}>
                <MenuItem value={"null2"} disabled>Select Filter</MenuItem>
                <MenuItem value={"20"}>Type</MenuItem>
                <MenuItem value={"30"}>Mobile Number</MenuItem>
                <MenuItem value={"40"}>Name</MenuItem>
                <MenuItem value={"50"}>Date</MenuItem>
                </FilterButton>
                <Search id="email" variant="outlined" placeholder="Search here" disabled={filter==="null2"?true:false}/>                
                <ExportButton
                value={exp}
                name="exp"
                onChange={(e:any)=>{
                    setExp(e.target.value)
                }}>
                <MenuItem value={"null"} disabled>Export As</MenuItem>
                <MenuItem value={20}>PDF</MenuItem>
                <MenuItem value={30}>CSV</MenuItem>
                </ExportButton>
                </TableProp>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Assigned
                                </Typography>                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Priority
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Budget
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.name}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {product.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {product.post}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {product.pname}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: product.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={product.priority}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">${product.budget}k</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
    );
};

export default ProductPerformance;

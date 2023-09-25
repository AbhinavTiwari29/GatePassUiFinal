"use client"
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, styled, Button, Select, MenuItem, TextField, Grid, Modal, Divider, } from "@mui/material";
import { ChangeEvent, useEffect, useState } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAllOfficers } from '../../../../utils/api';
import { useAuth } from "@/context/JWTContext/AuthContext.provider";
import { useRouter } from "next/navigation";

const TableProp = styled(Box)`
	display: flex;
	justify-content: right;
	& > div{
			margin-right: 15px;
	}
`;

const ExportButton = styled(Select)`
	width: 13%;
	background: #FA896B; 
	height: 30px;
	color: #fff;
	& > svg {
			color: white;
	}
`;

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "400px",
	height: "auto",
	bgcolor: "white",
	p: 2,
};

const FilterButton = styled(Select)`
	width: 13%;
	background: #5d87FF;
	height: 30px;
	color: #fff;
	& > svg {
			color: white;
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

interface OfficerData {
  _id: string;
  officer_name: string;
  building_room_num: string;
  status: string;
  designation: string;
  visitor_report: {
    visitor_name: string;
    mobile_num: string;
    visitor_pass_id: string;
    visiting_date_and_time: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ProductPerformance = () => {

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
		return date.toLocaleDateString('en-US', options);
	  };

	const auth = useAuth();
	const router = useRouter()
	const [exp, setExp] = useState("null");
	const [filter, setFilter] = useState("null2");
	const [search, setSearch] = useState("")
	const [products, setProducts] = useState<OfficerData[]>([]);
	const [originalProducts, setOriginalProducts] = useState<OfficerData[]>([]);
	const TYPE = filter === "phone" ? "number" : filter === "date" ? "date" : "text"
	const numberType = {
		'& input[type=number]': {
			'-moz-appearance': 'textfield'
		},
		'& input[type=number]::-webkit-outer-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0
		},
		'& input[type=number]::-webkit-inner-spin-button': {
			'-webkit-appearance': 'none',
			margin: 0
		}
	};
	const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
	const [open, setOpen] = useState(false);


	useEffect(() => {
		if (
		  !auth.user
		) {
		  router.push("/login");
		}
	  }, [auth, router]);
	
	useEffect(() => {
    async function fetchOfficers() {
      const officers = await getAllOfficers();
      setOriginalProducts(officers.data);
      setProducts(officers.data); 
    }

    fetchOfficers();
  }, []);

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
								<Typography	sx={{
										background: "#5d87FF",
										color: "#fff",
										p: 2,
										justifyContent: "space-between",
										display: "flex",
										fontWeight: "700",
										fontSize: "1.125rem",
									}}
								>
									Officer Details
									<CancelIcon onClick={handleClose}></CancelIcon>
								</Typography>
								<Box sx={{
										overflow: "auto",
										width: { xs: "280px", sm: "auto" },
										padding: "20px",
									}}
								>
									<Table aria-label="simple table"	sx={{ whiteSpace: "nowrap" }}		key={selectedProduct.id}>
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
												{selectedProduct.officer_name}
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
													Designation
												</Typography>
											</TableCell>
											<TableCell
												sx={{
													fontSize: "14px",
												}}
											>
												{selectedProduct.designation}
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
													Room No
												</Typography>
											</TableCell>
											<TableCell
												sx={{
													fontSize: "14px",
												}}
											>
												{selectedProduct.building_room_num}
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
													Date
												</Typography>
											</TableCell>
											<TableCell
												sx={{
													fontSize: "14px",
												}}
											>
												{formatDate(selectedProduct.createdAt)}
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
	
	const handleOpen = (id: string) => {
		const selectedProductData = products.find((prod) => prod._id === id);
		setSelectedProduct(selectedProductData || null);
		setOpen(true); 
	};

	const handleClose = () => setOpen(false);

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);

    if (filter !== "null2") {
      const filteredProducts = originalProducts.filter((prod) => {
        switch (filter) {
          case "name":
            return prod.officer_name.toLowerCase().includes(value.toLowerCase());
          case "designation":
            return prod.designation.toLowerCase().includes(value.toLowerCase());
          case "building_room_num":
            return prod.building_room_num.toLowerCase().includes(value.toLowerCase());
          default:
            return false;
        }
      });

      setProducts(filteredProducts);
    } else {
      setProducts(originalProducts); // Reset to the original data when search input is empty
    }
  };

	const highlightText = (text: string, search: string) => {
		return (
			<>
				{text.split(new RegExp(`(${search})`, "gi")).map((part, i) =>
					i % 2 === 1 ? (
						<Box component="span" key={i} sx={{ backgroundColor: "yellow" }}>
							{part}
						</Box>
					) : (
						part
					)
				)}
			</>
		);
	};



	return (
		<>
			<PageContainer title="Dashboard" description="this is Dashboard">
				<Box>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<DashboardCard title="Show Officer">
								<Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
									<TableProp>
										<FilterButton value={filter} name="filter" onChange={(e: any) => setFilter(e.target.value)}>
											<MenuItem value={"null2"} disabled>Select Filter</MenuItem>
											<MenuItem value={"name"}>Name</MenuItem>
											<MenuItem value={"designation"}>Designation</MenuItem>
											<MenuItem value={"building_room_num"}>Room No</MenuItem>
										</FilterButton>
										<Search
											variant="outlined"
											placeholder="Search here"
											name="search"
											value={search}
											onChange={handleSearch}
											type={TYPE}
											sx={TYPE === "number" ? numberType : null}
											onKeyDown={(e: any) => {
												if ((TYPE === "number") && (e.key == "." || e.key === "-" || e.key === 'e' || e.key === 'E')) {
													e.preventDefault();
												}
											}}
											disabled={filter === "null2"}
										/>
										<ExportButton value={exp} name="exp" onChange={(e: any) => setExp(e.target.value)}>
											<MenuItem value={"null"} disabled>Export As</MenuItem>
											<MenuItem value={20}>PDF</MenuItem>
											<MenuItem value={30}>CSV</MenuItem>
										</ExportButton>
									</TableProp>
									<Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
										<TableHead>
											<TableRow>
												<TableCell>
													<Typography variant="subtitle2" fontWeight={600}> Name </Typography>
												</TableCell>
												
												<TableCell>
													<Typography variant="subtitle2" fontWeight={600}>	Designation	</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="subtitle2" fontWeight={600}>	Room No	</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="subtitle2" fontWeight={600}>	Action </Typography>
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{products.map((product, index) => (
												<TableRow key={index}>
													<TableCell>
														<Box sx={{ display: "flex", alignItems: "center" }}>
															<Box>
																<Typography variant="subtitle2" fontWeight="600">
																	{filter === "name"
																		? highlightText(product.officer_name, search)
																		: product.officer_name}
																</Typography>
															</Box>
														</Box>
													</TableCell>
													<TableCell>
														<Box sx={{ display: "flex", alignItems: "center" }}>
															<Box>
																<Typography variant="subtitle2" fontWeight="600">
																	{filter === "designation"
																		? highlightText(product.designation, search)
																		: product.designation}
																</Typography>
															</Box>
														</Box>
													</TableCell>
													<TableCell>
														<Typography variant="subtitle2" fontWeight="600">
															{filter === "building_room_num"
																? highlightText(product.building_room_num, search)
																: product.building_room_num}
														</Typography>
													</TableCell>
													<TableCell>
															<VisibilityIcon onClick={() => handleOpen(product._id)} sx={{marginLeft:"10px"}}/>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Box>
							</DashboardCard>
						</Grid>
					</Grid>
				</Box>
			</PageContainer>
			<Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <ModalContent />
      </Modal>
		</>
	);
};

export default ProductPerformance;



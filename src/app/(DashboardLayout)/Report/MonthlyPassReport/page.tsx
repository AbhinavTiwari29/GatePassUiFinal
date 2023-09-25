"use client"
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, styled, Button, Select, MenuItem, TextField, Grid, Modal, Divider, } from "@mui/material";
import { ChangeEvent, useEffect, useState } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAllMonthlyPasses } from "@/utils/api";
import { useAuth } from "@/context/JWTContext/AuthContext.provider";
import { useRouter } from "next/navigation";

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

interface IPassData {
  address: string;
  authorityCode: string;
  createdAt: string;
  designation: string;
  gender: "Male" | "Female" | "Other";
  mobile: number;
  name: string;
  passNumber: string;
  passFrom: string;
  passTo: string;
  picture: string;
  purpose: string;
  unique_id: string;
  unique_id_type: string;
  updatedAt: string;
  vendorName: string;
  purposeDescription:string;
  __v: number;
  _id: string;
}


const ProductPerformance = () => {

	const [exp, setExp] = useState("null");
	const [filter, setFilter] = useState("null2");
	const [search, setSearch] = useState("")
	const [products, setProducts] = useState<IPassData[]>([]);
	const [originalProducts, setOriginalProducts] = useState<IPassData[]>([]);
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const auth = useAuth();
	const router = useRouter()
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

	const ModalContent = () => {
		if (!selectedProduct) {
			return null;
		}
	
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
									Daily Pass Report Details
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
												{selectedProduct.name}
											</TableCell>
										</TableRow>
										{/* <TableRow>
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
												{selectedProduct.}
											</TableCell>
										</TableRow> */}
										<TableRow>
											<TableCell>
												<Typography
													variant="subtitle2"
													sx={{
														fontSize: "14px",
														fontWeight: 600,
													}}
												>
													Pass Number
												</Typography>
											</TableCell>
											<TableCell
												sx={{
													fontSize: "14px",
												}}
											>
												{selectedProduct.passNumber}
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
												{selectedProduct.mobile}
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
													Purpose
												</Typography>
											</TableCell>
											<TableCell
												sx={{
													fontSize: "14px",
												}}
											>
												{selectedProduct.purpose}
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
												{formatDate(selectedProduct.updatedAt)}
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
      const formattedValue = value.trim().toLowerCase();

      const newArray = originalProducts.filter((prod) => {
        switch (filter) {
          case "name":
            return prod.name.toLowerCase().includes(formattedValue);
          case "phone":
            return prod.mobile
          case "date":
            return prod.passFrom.includes(formattedValue); // No need for additional formatting
          default:
            return prod;
        }
      });

      setProducts(newArray);
    } else {
      setProducts(originalProducts);
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

	const filterTableData = () => {
		let filteredData = products;
	
		if (startDate && endDate) {
			filteredData = filteredData.filter(
				(product) =>
					new Date(product.passFrom).getTime() >= new Date(startDate).getTime() &&
					new Date(product.passTo).getTime() <= new Date(endDate).getTime()
			);
		}
	
		if (search) {
			const formattedSearch = search.trim().toLowerCase();
			filteredData = filteredData.filter((product) => {
				switch (filter) {
					case "name":
						return product.name.toLowerCase().includes(formattedSearch);
					case "phone":
						return String(product.mobile).includes(formattedSearch)
					case "officer":
						return product.name.toLowerCase().includes(formattedSearch);
					default:
						return true;
				}
			});
		}
	
		setProducts(filteredData);
	};

	const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };
	
	useEffect(() => {
		async function fetchMonthlyPasses() {
			const passes = await getAllMonthlyPasses();
			setOriginalProducts(passes.allData);
			setProducts(passes.allData);
		};

		fetchMonthlyPasses();

	}, [])
	
	useEffect(() => {
    filterTableData();
  }, [startDate, endDate, search, filter]);

  useEffect(() => {
    if (
      !auth.user
    ) {
      router.push("/login");
    }
  }, [auth, router]);


	return (
		<>
			<PageContainer title="Dashboard" description="this is Dashboard">
				<Box>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<DashboardCard title="Monthly Pass Report">
								<Box sx={{ padding : '15px',  width: { xs: '280px', sm: 'auto' } }}>
									<TableProp>
										<TextField
											label="From"
											type="date"					
											value={startDate}
											onChange={(e) => setStartDate(e.target.value)}
											InputLabelProps={{
												shrink: true,
											}}
											inputProps={{
												style: {
													padding: '6px 12px',
												},
										}}
											/>
											<TextField
												label="To"
												type="date"
												value={endDate}
												onChange={(e) => setEndDate(e.target.value)}
												InputLabelProps={{
													shrink: true,
												}}
												inputProps={{
													style: {
														padding: '6px 12px',
													},
											}}
										/>
										<FilterButton	value={filter} name="filter" onChange={(e: any) => {setFilter(e.target.value); setSearch('')}}>
											<MenuItem value={"null2"} disabled>Select Filter</MenuItem>
											<MenuItem value={"phone"}>Phone</MenuItem>
											<MenuItem value={"name"}>Name</MenuItem>
											{/* <MenuItem value={"officer"}>Officer</MenuItem> */}
										</FilterButton>
										<Search	variant="outlined" placeholder="Search here" name="search" value={search}	onChange={handleSearch}
											type={TYPE}	sx={TYPE === "number" ? numberType : null}	onKeyDown={(e: any) => {
												if ((TYPE === "number") && (e.key == "." || e.key === "-" || e.key === 'e' || e.key === 'E')) {
													e.preventDefault();
												}
											}}
											disabled={filter === "null2"}
										/>
										<ExportButton
											value={exp}
											name="exp"
											onChange={(e: any) => {
												setExp(e.target.value)
											}}>
											<MenuItem value={"null"} disabled>Export As</MenuItem>
											<MenuItem value={20}>PDF</MenuItem>
											<MenuItem value={30}>CSV</MenuItem>
										</ExportButton>
									</TableProp>
									<Table aria-label="simple table"	sx={{	whiteSpace: "nowrap",	mt: 2	}}>
										<TableHead>
											<TableRow>
												<TableCell>
													<Typography variant="subtitle2" fontWeight={600}>
														Pass Number
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="subtitle2" fontWeight={600}>
														Name
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="subtitle2" fontWeight={600}>
														Mobile No.
													</Typography>
												</TableCell>
												<TableCell>
													<Typography variant="subtitle2" fontWeight={600}>
														Purpose
													</Typography>
												</TableCell>
												<TableCell align="center">
													<Typography variant="subtitle2" fontWeight={600}>
														Date
													</Typography>
												</TableCell>
												<TableCell align="center">
													<Typography variant="subtitle2" fontWeight={600}>
														Action
													</Typography>
												</TableCell>

											</TableRow>
										</TableHead>
										<TableBody>
											{products.map((product) => (
												<TableRow key={product._id}>
													<TableCell>
														<Typography
															sx={{
																fontSize: "15px",
																fontWeight: "500",
															}}
														>
															{product.passNumber}
														</Typography>
													</TableCell>
													<TableCell>
														<Box sx={{
																display: "flex",
																alignItems: "center",
															}}
														>
															<Box>
															<Typography variant="subtitle2" fontWeight="600">
																	{filter === "name"
																		? highlightText(product.name, search)
																		: product.name}
																</Typography>

															</Box>
														</Box>
													</TableCell>
													<TableCell>
													<Typography variant="subtitle2" fontWeight="600">
													{filter === "phone"
															? highlightText(String(product.mobile), search)
															: product.mobile}
													</Typography>
													</TableCell>
													<TableCell>
														<Chip	sx={{
																px: "4px",
																// backgroundColor: product.pbg,
																// color: "#fff",
															}}
															size="small"
															label={product.purpose==="Other"?product?.purposeDescription:product.purpose}
														></Chip>
													</TableCell>
													<TableCell align="center">
													<Typography variant="subtitle2" fontWeight="600">
														{filter === "date"
															? highlightText(formatDate(product.passFrom), search)
															: formatDate(product.passFrom)}
													</Typography>
													</TableCell>
													<TableCell align="center">
														<VisibilityIcon onClick={() => handleOpen(product._id)} />
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

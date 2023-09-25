"use client"
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, styled, Button, Select, MenuItem, TextField, Grid, Modal, Divider, Pagination, PaginationItem, } from "@mui/material";
import { ChangeEvent, useEffect, useState } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAllDailyPasses } from "@/utils/api";
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


interface IDailyPass {
	passNumber: number;
  address: string;
  building_room_num: string;
  createdAt: string;
  formattedNames: string[];
  gender: string;
  material: string;
  message_and_purpose: string;
  mobile_num: number;
  reporting_officer: string;
  unique_id: string;
  unique_id_type: string;
  updatedAt: string;
  visitor: any[]; // You can replace 'any' with a more specific type if you have one for the visitor field.
  __v: number;
  _id: string;
};

const pageSize = 10;

const ProductPerformance = () => {

	const auth = useAuth()
    const router = useRouter();
	const [exp, setExp] = useState("null");
	const [filter, setFilter] = useState("null2");
	const [search, setSearch] = useState("")
	const [products, setProducts] = useState<IDailyPass[]>([]);
	const [originalProducts, setOriginalProducts] = useState<IDailyPass[]>([]);
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
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
	const [selectedProduct, setSelectedProduct] = useState<typeof products[number] | null>(null);
	const [universalSearch, setUniversalSearch] = useState("");
	const [open, setOpen] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / 10);
	
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentData = products.slice(startIndex, endIndex);
	console.log(currentData);

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
		setCurrentPage(newPage);
  };
	
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
									Daily Pass Report Details
									<CancelIcon onClick={handleClose}></CancelIcon>
								</Typography>
								<Box sx={{
										overflow: "auto",
										width: { xs: "280px", sm: "auto" },
										padding: "20px",
									}}
								>
									<Table aria-label="simple table"	sx={{ whiteSpace: "nowrap" }}		key={selectedProduct._id}>
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
												{selectedProduct.formattedNames[0]}
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
												{selectedProduct.mobile_num}
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
												{selectedProduct.message_and_purpose}
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

	const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };
	
	const handleOpen = (id: string) => {
		const selectedProductData = products.find((prod) => prod._id === id);
		setSelectedProduct(selectedProductData || null);
		setOpen(true); 
	};

	const handleClose = () => setOpen(false);
	
	// const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
	// 	const { value } = event.target;
  //   setSearch(value);
		
  //   if (filter !== "null2") {
	// 		const formattedValue = value.trim().toLowerCase();
	// 	  const newArray = originalProducts.filter((prod) => {
  //       switch (filter) {
  //         case "name":
  //           return prod.formattedNames[0].toLowerCase().includes(formattedValue);
  //         case "phone":
  //           return String(prod.mobile_num).includes(formattedValue);
  //         case "officer":
  //           return prod.reporting_officer.includes(formattedValue);
  //         default:
  //           return prod;
  //       }
  //     });

  //     setProducts(newArray);
  //   } else {
	// 		const newArray = originalProducts.filter((prod) => {
	// 			return (
	// 				prod.formattedNames.join(" ").toLowerCase().includes(formattedValue) ||
	// 				String(prod.mobile_num).includes(formattedValue) ||
	// 				prod.reporting_officer.toLowerCase().includes(formattedValue) ||
	// 				String(prod.passNumber).includes(formattedValue) 
	// 				// Add more conditions for other fields as needed
	// 			)
	// 		});
	
	// 		setProducts(newArray);
	// 	}
  // };

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);

    const formattedValue = value.trim().toLowerCase();
		console.log(formattedValue)

    if (filter !== "null2") {
        const newArray = originalProducts.filter((prod) => {
            switch (filter) {
                case "name":
                    return prod.formattedNames[0].toLowerCase().includes(formattedValue);
                case "phone":
                    return String(prod.mobile_num).includes(formattedValue);
                case "officer":
                    return prod.reporting_officer.includes(formattedValue);
                case "passNumber": // Updated case for passNumber
                    return String(prod.passNumber).toLowerCase() === formattedValue;
                default:
                    return false;
            }
        });

        setProducts(newArray);
    } else {
			const newArray = originalProducts.filter((prod) => {
				const nameMatch = prod.formattedNames.join(" ").toLowerCase().includes(formattedValue);
				const mobileMatch = String(prod.mobile_num).includes(formattedValue);
				const officerMatch = prod.reporting_officer.toLowerCase().includes(formattedValue);
				const passNumberMatch = String(prod.passNumber).toLowerCase().includes(formattedValue);

				// Add date search logic here
				const formattedDate = formatDate(prod.updatedAt); // Format the date
				const dateMatch = formattedDate.includes(formattedValue); // Check for partial match

				return nameMatch || mobileMatch || officerMatch || passNumberMatch || dateMatch;
		});

        setProducts(newArray);
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
		let filteredData = originalProducts;
	
		if (startDate && endDate) {
			const startTimestamp = new Date(startDate).getTime();
			const endTimestamp = new Date(endDate).getTime() + 24 * 60 * 60 * 1000; // Add one day's worth of milliseconds
	
			filteredData = filteredData.filter((product) => {
				const updatedAt = new Date(product.updatedAt).getTime();
				return updatedAt >= startTimestamp && updatedAt < endTimestamp;
			});
		}
	
		if (search) {
			const formattedSearch = search.trim().toLowerCase();
			filteredData = filteredData.filter((product) => {
				switch (filter) {
					case "name":
						return product.formattedNames[0].toLowerCase().includes(formattedSearch);
					case "phone":
						return String(product.mobile_num).includes(formattedSearch);
					case "officer":
						return product.reporting_officer.toLowerCase().includes(formattedSearch);
					default:
						return true;
				}
			});
		}
	
		setProducts(filteredData);
	};

	useEffect(() => {
    async function fetchOfficers() {
      const passes = await getAllDailyPasses();
      setOriginalProducts(passes.allData);
      setProducts(passes.allData); 
    };
		
    fetchOfficers();
  }, []);

	useEffect(() => {
    filterTableData();
  }, [startDate, endDate, filter]);

	useEffect(() => {
		const formattedValue = universalSearch.trim().toLowerCase();
	
		if (formattedValue === "") {
			setProducts(originalProducts);
		} 
		else {
			const newArray = originalProducts.filter((prod) => {
				return (
					prod.formattedNames.join(" ").toLowerCase().includes(formattedValue) ||
					String(prod.mobile_num).includes(formattedValue) ||
					prod.reporting_officer.toLowerCase().includes(formattedValue) ||
					String(prod.passNumber).includes(formattedValue) 
				)
			});
	
			setProducts(newArray);
		}
	}, [universalSearch]);


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
							<DashboardCard title="Daily Pass Report">
								<Box sx={{ padding : '15px',  width: { xs: '280px', sm: 'auto' } }}>
									<TableProp>
										<TextField label="From"	type="date"	value={startDate}	onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{shrink: true,}} inputProps={{ style: {
											padding: '6px 12px',cursor: "pointer"},}}
											/>
											<TextField label="To"	type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{shrink: true,}}
												inputProps={{	style: {padding: '6px 12px',cursor: "pointer"},
											}}
										/>
										<FilterButton	value={filter} name="filter" onChange={(e: any) => {setFilter(e.target.value); setSearch('')}}>
											<MenuItem value={"null2"} disabled>Select Filter</MenuItem>
											<MenuItem value={"phone"}>Phone</MenuItem>
											<MenuItem value={"name"}>Name</MenuItem>
											<MenuItem value={"officer"}>Officer</MenuItem>
										</FilterButton>
										<Search	variant="outlined" placeholder="Search here" name="search" value={search}	onChange={handleSearch}
											type={TYPE}	sx={TYPE === "number" ? numberType : null}	onKeyDown={(e: any) => {
												if ((TYPE === "number") && (e.key == "." || e.key === "-" || e.key === 'e' || e.key === 'E')) {
													e.preventDefault();
												}
											}}
											// disabled={filter === "null2"}
										/>
										<Search	variant="outlined"
											placeholder="Search for anything"
											value={universalSearch}
											onChange={(e) => setUniversalSearch(e.target.value)}
										/>
										
										<ExportButton	value={exp}	name="exp" onChange={(e: any) => {setExp(e.target.value)}}>
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
											{currentData.map((product, index) => (
												<TableRow key={index}>
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
																		? highlightText(product.formattedNames[0], search)
																		: product.formattedNames[0]}
																</Typography>

															</Box>
														</Box>
													</TableCell>
													<TableCell>
													<Typography variant="subtitle2" fontWeight="600">
														{filter === "phone"
															? highlightText(String(product.mobile_num), search)
															: product.mobile_num}
													</Typography>
													</TableCell>
													<TableCell>
														<Chip	sx={{
																px: "4px",
																// backgroundColor: product.pbg,
																// color: "#fff",
															}}
															size="small"
															label={product.message_and_purpose}
														></Chip>
													</TableCell>
													<TableCell align="center">
													<Typography variant="subtitle2" fontWeight="600">
														{filter === "date"
															? highlightText(formatDate(product.updatedAt), search)
															: formatDate(product.updatedAt)}
													</Typography>
													</TableCell>
													<TableCell align="center" style={{cursor: 'pointer'}} onClick={() => handleOpen(product._id)}>
														<VisibilityIcon   />
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

			<Pagination style={{display: 'flex', justifyContent: 'center', marginTop:"2px"}}
				color="primary"	size="large" count={totalPages} page={currentPage} onChange={handleChangePage}
        renderItem={(item) => (
          <PaginationItem component="a" {...item} />
        )}
      />

			<Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title"	aria-describedby="keep-mounted-modal-description">
				<ModalContent />
			</Modal>
		</>
	);
};

export default ProductPerformance;
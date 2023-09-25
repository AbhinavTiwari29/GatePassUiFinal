"use client"
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import PageContainer from "../../components/container/PageContainer"
import DashboardCard from "../../components/shared/DashboardCard"
import DashboardNew from "../../components/shared/DashboardNew"
// import { FILTER_OPTIONS } from "@/constants/authorityConstants"
import DownloadIcon from "@mui/icons-material/Download"
import VisibilityIcon from "@mui/icons-material/Visibility"

import axios from "axios"
import CustomModal from "../../components/CustomModal/CustomModal"
import {saveAs} from "file-saver";
import { useAuth } from "@/context/JWTContext/AuthContext.provider"
import { useRouter } from "next/navigation"

const FILTER_OPTIONS = ["number", "text", "date"]

const TableProp = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "right",
  gap: "15px",
  height: "30px",
  margin: "30px 0",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "center",
    height: "auto",
    "& > *": {
      height: "30px",
    },
  },
}))

const FilterButton = styled(Select)`
  background: #5d87ff;
  color: #fff;
  & > svg {
    color: white;
  }
`

const Search = styled(TextField)`
  color: #fff;
  & > div > input {
    padding: 5px 5px;
  }
`

const BoxWrapper = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  margin: "30px 0",
}))

const authorityHeaders = [
  "Vedor Name",
  "Authority Name",
  "Status",
  "Authority Letter",
  "Expiry Date",
  "Action",
  "Approval Status"
]

// Filters the authority list based on selected filters
const filterAuthorities = (data: any, filter: any) => {
  const { searchText, startDate, endDate } = filter

  // Copy of authority list
  let filteredData = [...data]

  if (searchText) {
    filteredData = filteredData.filter(
      (item) =>
        item.vendor_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.authority_name.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  if (startDate && endDate) {
    const startDateTimestamp = new Date(startDate).getTime()
    const endDateTimestamp = new Date(endDate).getTime()

    filteredData = filteredData.filter((item) => {
      const expiryDate = new Date(item.expiryDate).getTime()

      return expiryDate >= startDateTimestamp && expiryDate <= endDateTimestamp
    })
  }

  return filteredData
}

const initialFilterState = {
  select_filter: "disabled",
  searchText: "",
  startDate: "",
  endDate: "",
}

const ShowAuthorities = () => {
  const auth = useAuth();
  const router = useRouter()
  const [authorityList, setAuthorityList] = useState([])
  const [mainFilter, setMainFilter] = useState(initialFilterState)
  // Modal states
  const [modalState, setModalState] = useState(false)
  const [selectedAuthority, setSelectedAuthority] = useState<any>({})


  const downloadImage:any = (params:any)=>{
    let url= `http://172.16.15.42:5500/images/${params.authority_letter}`
    saveAs(url,`Image-${params.authority_name}`)
  }

  // Fetch authority list
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          "http://172.16.15.42:5500/api/authorities/getAll/false"
        )
        setAuthorityList(res.data.data)
      } catch (e: any) {
        console.log(e.message)
      }
    }

    getData()
  }, [])

  const handleFilters = (e: any) => {
    // Ignore text if > 10
    if (e.target.name === "searchText" && e.target.value.length > 10) {
      return
    }

    setMainFilter((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFilterRest = () => {
    setMainFilter(initialFilterState)
  }

  // Toggles modal state and populates authority data
  const handleViewAuthority = (id: any) => {
    const authority = authorityList.find((item: any) => item._id === id)

    if (authority) {
      setSelectedAuthority(authority)
      setModalState(true)
    }
  }

  // Filtered list of items
  let renderedList = filterAuthorities(authorityList, mainFilter)


  useEffect(() => {
    
    if (
      !auth.user
    ) {
      router.push("/login");
    }
  }, [auth, router]);


  return (
    <PageContainer
      title="Show Authorities"
      description="Check all the authorities here!"
    >
      <DashboardNew title="Bulk Approval" titleVariant="h3">
        <>
          <TableProp>
            <Search
              variant="outlined"
              name="startDate"
              type="date"
              value={mainFilter.startDate}
              onChange={(e) => handleFilters(e)}
            />
            <Search
              variant="outlined"
              name="endDate"
              type="date"
              value={mainFilter.endDate}
              onChange={(e) => handleFilters(e)}
            />
            <FilterButton
              value={mainFilter.select_filter}
              name="select_filter"
              onChange={(e: any) => {
                // setSearchBy("")
                handleFilters(e)
              }}
            >
              <MenuItem value="disabled" disabled>
                Select Filter
              </MenuItem>
              {/* <MenuItem value={FILTER_OPTIONS[0]}>Mobile Number</MenuItem> */}
              <MenuItem value={FILTER_OPTIONS[1]}>
                Vendor/Authority Name
              </MenuItem>
              {/* <MenuItem value={FILTER_OPTIONS[2]}>Date</MenuItem> */}
            </FilterButton>
            <Search
              variant="outlined"
              placeholder="Search here"
              name="searchText"
              value={mainFilter.searchText}
              disabled={mainFilter.select_filter === "disabled" ? true : false}
              type={mainFilter.select_filter}
              onChange={(e) => handleFilters(e)}
              onKeyDown={(e: any) => {
                if (
                  mainFilter.select_filter === "number" &&
                  (e.key == "." ||
                    e.key === "-" ||
                    e.key === "e" ||
                    e.key === "E")
                ) {
                  e.preventDefault()
                }
              }}
            />
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleFilterRest}
            >
              Clear
            </Button>
          </TableProp>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
              overflowX: "auto",
              display: "block",
              width: { xs: 600, sm: "auto" },
            }}
          >
            <TableHead sx={{ display: "block", width: "auto" }}>
              <TableRow
                sx={{
                  display: "grid",
                  justifyItems: "center",
                  alignItems: "center",
                  gridTemplateColumns: "repeat(7, minmax(100px , 1fr))",
                }}
              >
                {authorityHeaders.map((header, i) => (
                  <TableCell key={i}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {header}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ display: "block", width: "auto" }}>
              {renderedList?.map((authority: any, i: any) => (
                <TableRow
                  key={i}
                  sx={{
                    display: "grid",
                    justifyItems: "center",
                    alignItems: "center",
                    gridTemplateColumns: "repeat(7, minmax(100px , 1fr))",
                    gap: "10px",
                  }}
                >
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {authority.vendor_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      whiteSpace="normal"
                      sx={{ textAlign: "center" }}
                    >
                      {authority.authority_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                      whiteSpace="normal"
                      sx={{ textAlign: "center" }}
                    >
                      {authority.status}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      ":hover": { cursor: "pointer" },
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize:"14px",
                      fontWeight:"600"
                    }}
                  >
                    Download <DownloadIcon onClick={()=>{downloadImage(authority)}}/>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {dayjs(authority.expiryDate).format("DD/MM/YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <VisibilityIcon
                      sx={{
                        ":hover": { cursor: "pointer" },
                        color: "#556cd6",
                      }}
                      onClick={() => handleViewAuthority(authority._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                      whiteSpace="normal"
                      sx={{ textAlign: "center" }}
                    >
                      {authority.approvedStatus.toString().toUpperCase()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Authority Modal */}
          <CustomModal modalState={modalState} setModalState={setModalState}>
            <>
              <BoxWrapper>
                <Typography fontWeight={600}>Vendor Name:</Typography>
                <Typography>{selectedAuthority?.vendor_name}</Typography>
              </BoxWrapper>
              <BoxWrapper>
                <Typography fontWeight={600}>Authority Name:</Typography>
                <Typography>{selectedAuthority?.authority_name}</Typography>
              </BoxWrapper>
              <BoxWrapper>
                <Typography fontWeight={600}>Status:</Typography>
                <Typography>{selectedAuthority?.status}</Typography>
              </BoxWrapper>
              <BoxWrapper>
                <Typography fontWeight={600}>Authority Letter:</Typography>
                <Typography>{selectedAuthority?.authority_letter}</Typography>
              </BoxWrapper>
              <BoxWrapper>
                <Typography fontWeight={600}>Expiry Date:</Typography>
                <Typography>
                  {dayjs(selectedAuthority?.expiryDate).format("DD/MM/YYYY")}
                </Typography>
              </BoxWrapper>
              <BoxWrapper>
                <Typography fontWeight={600}>Approved Status:</Typography>
                <Typography>{selectedAuthority?.approvedStatus?.toString()?.toUpperCase()}</Typography>
              </BoxWrapper>
            </>
          </CustomModal>
        </>
      </DashboardNew>
    </PageContainer>
  )
}

export default ShowAuthorities

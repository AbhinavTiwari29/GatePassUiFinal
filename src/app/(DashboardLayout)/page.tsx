"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import IconManageUser from "./components/icons/IconManageUser"
import IconOfficers from "./components/icons/IconOfficers"
import IconAuthority from "./components/icons/IconAuthority"
import IconViewPass from "./components/icons/IconViewPass"
import IconReports from "./components/icons/IconReports"
import IconBulkApproval from "./components/icons/IconBulkApproval"
import { useAuth } from "@/context/JWTContext/AuthContext.provider"
import PageContainer from "./components/container/PageContainer"
import DashboardCard from "./components/shared/DashboardCard"

import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
  Paper,
} from "@mui/material"
import styled from "@emotion/styled"
import DashboardNew from "./components/shared/DashboardNew"
import { useEffect } from "react"

const dashboardLinks = [
  { name: "Manage User", href: "/EmployeeDetails", icon: <IconManageUser /> },
  { name: "Officers", href: "/Officer/ShowOfficer", icon: <IconOfficers /> },
  { name: "Authority", href: "/Authority/ShowAuthority", icon: <IconAuthority /> },
  { name: "Daily Pass Reports", href: "/Report/DailyPassReport", icon: <IconViewPass /> },
  { name: "Monthly Pass Reports", href: "/Report/MonthlyPassReport", icon: <IconReports /> },
  { name: "Bulk Approval", href: "/Authority/BulkApproval", icon: <IconBulkApproval /> },
]

const PaperWrapper = styled(Box)(() => ({
  marginTop: "80px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "repeat(2, 200px)",
  gap: "30px 20px",
}))

const Dashboard = () => {

  const auth:any = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (
      !auth.user
    ) {
      router.push("/login");
    }
  }, [auth, router]);

  return (
    <PageContainer
      title="Welcome to Dashboard"
      description="You can navigate the website from here"
    >
      <DashboardNew title="Welcome to the Gate Pass Portal" titleVariant="h1">
      { auth?.user?.role?.name==="Employee"?<></>:
        <PaperWrapper>
          {dashboardLinks.map((link, i) => (
            <Link key={i} href={link.href} style={{ textDecoration: "none" }}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  {link.name}
                </Typography>
                <Box>{link.icon}</Box>
              </Paper>
            </Link>
          ))}
        </PaperWrapper>
}
      </DashboardNew>
    </PageContainer>
  )
}

export default Dashboard

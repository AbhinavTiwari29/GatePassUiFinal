import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";
import PageviewIcon from '@mui/icons-material/Pageview';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { uniqueId } from "lodash";
import SummarizeIcon from '@mui/icons-material/Summarize';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';

const Menuitems =
// auth.user.role==="Employee"?[

// ]:
[
  {
    navlabel: true,
    subheader: "Home",
    present:"yes"
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
    present:"yes"

  },
  {
    id: uniqueId(),
    title: "Create Daily",
    icon: EditNoteIcon,
    href: "/Passes/Daily",
    present:"yes"
  },
  {
    id: uniqueId(),
    title: "Create Monthly",
    icon: EditNoteIcon,
    href: "/Passes/Monthly",
    present:"yes"

  },
  {
    id: uniqueId(),
    title: "Daily Pass Report",
    icon: PageviewIcon,
    href: "/Report/DailyPassReport",
    present:"yes"

  },
  {
    id: uniqueId(),
    title: "Monthly Pass Report",
    icon: PageviewIcon,
    href: "/Report/MonthlyPassReport",
    present:"yes"

  },
  {
    id: uniqueId(),
    title: "Add Authorities",
    icon: AddHomeWorkIcon,
    href: "/Authority/AddAuthority",
    present:"no"

  },
  {
    id: uniqueId(),
    title: "Show Authorities",
    icon: PageviewIcon,
    href: "/Authority/ShowAuthority",
    present:"no"

  },
  {
    id: uniqueId(),
    title: "Add Officer",
    icon: AddHomeWorkIcon,
    href: "/Officer/AddOfficer",
    present:"no"

  },
  {
    id: uniqueId(),
    title: "Show Officer",
    icon: PageviewIcon,
    href: "/Officer/ShowOfficer",
    present:"no"

  },
]

export default Menuitems;

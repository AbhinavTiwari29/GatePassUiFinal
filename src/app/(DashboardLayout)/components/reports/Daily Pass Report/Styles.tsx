import styled from "@emotion/styled";
import { Typography, Button } from "@mui/material";

export const  Heading1 = styled(Typography)(({ theme }) => ({
    font: "Nunito",
        fontWeight: "600",
        fontSize: "17px",
        lineHeight: "36.83px",
        alignItem: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#FFFFFF",
        paddingTop: "10px",
  }));

  export const  Heading1Black = styled(Typography)(({ theme }) => ({
    font: "Nunito",
        fontWeight: "600",
        fontSize: "17px",
        lineHeight: "36.83px",
        alignItem: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "black",
        paddingTop: "10px",
  }));

  export const Heading2 = styled(Typography)(({ theme }) => ({
    fontFamily: "Nunito",
    fontSize: "13px",
    letterSpacing: "0em",
    textAlign: "left",
    color: "000000",
    
  }));

  export const Bodytxt = styled(Typography)({
    fontSize:"14px",
    lineHeight:2.5
  });
  
  export const DelButton = styled(Button)({
    backgroundColor: "#E15A11",
    color: "#FFFFFF",
    justifyContent: "right",
    borderRadius: "18px",
    "&:hover": {
        backgroundColor: "#E15A11",
      },
  });
  
  export const AddButton = styled(Button)({
    backgroundColor: "#3E7D60",
    color: "#FFFFFF",
    justifyContent: "right",
    borderRadius: "18px",
    "&:hover": {
        backgroundColor: "#3E7D60",
      },
  });
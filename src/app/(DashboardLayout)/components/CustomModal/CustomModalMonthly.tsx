// import styled from "@emotion/styled"
// import { Box, Button, Modal } from "@mui/material"

// const ButtonWrapper = styled("div")(() => ({
//   marginTop: "40px",
//   textAlign: "center",
// }))

// const CustomModalMonthly = ({ modalState, setModalState, children }: any) => {

//   const Printfunction = ()=>{
//     setModalState(false)
//   }

//   return modalState ? (
//     <Modal
//       keepMounted
//       open={modalState}
//       onClose={() => setModalState(false)}
//       aria-labelledby="keep-mounted-modal-title"
//       aria-describedby="keep-mounted-modal-description"
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "450px",
//           height: "auto",
//           bgcolor: "white",
//           padding: "30px",
//         }}
//       >
//         {children}
//         <ButtonWrapper>
//           <Button
//             color="primary"
//             variant="contained"
//             size="small"
//             onClick={Printfunction}
//           >
//             Print
//           </Button>
//         </ButtonWrapper>
//       </Box>
//     </Modal>
//   ) : null
// }

// export default CustomModalMonthly

import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Modal } from "@mui/material";

const ButtonWrapper = styled("div")(() => ({
  marginTop: "40px",
  textAlign: "center",
}));

const CustomModalMonthly = ({ modalState, setModalState, children }: any) => {
  const Printfunction = () => {
    setModalState(false);
    window.print(); 
  };

  return modalState ? (
    <Modal keepMounted open={modalState}  onClose={() => setModalState(false)} aria-labelledby="keep-mounted-modal-title"  aria-describedby="keep-mounted-modal-description">
      <>
      <Box sx={{ position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",  width: "300px", height: "auto", bgcolor: "white", padding: "10px", textAlign: "center", }} className="modal-content" >
        {children}
        <ButtonWrapper className="print-button-wrapper">
          <Button color="primary" variant="contained" size="small" onClick={Printfunction}>
            Print
          </Button>
        </ButtonWrapper>
      </Box>

      <style>
        {`
          @media print {
            @page {
              size: auto; 
              margin: 0;
            }
            body {
              margin: 0;
            }
            .print-button-wrapper {
              display: none;
            }
          `}
      </style>
      </>
    </Modal>
  ) : null;
};

export default CustomModalMonthly;


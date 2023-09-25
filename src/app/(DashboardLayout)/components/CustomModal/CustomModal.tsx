// import styled from "@emotion/styled"
// import { Box, Button, Modal } from "@mui/material"

// const ButtonWrapper = styled("div")(() => ({
//   marginTop: "40px",
//   textAlign: "center",
// }))

// const CustomModal = ({ modalState, setModalState, children }: any) => {
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
//           width: "660px",
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
//             onClick={() => setModalState(false)}
//           >
//             Print
//           </Button>
//         </ButtonWrapper>
//       </Box>
//     </Modal>
//   ) : null
// }

// export default CustomModal


import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Modal } from "@mui/material";

const ButtonWrapper = styled("div")(() => ({
  marginTop: "-50px",
  textAlign: "center",
}));

const CustomModal = ({ modalState, setModalState, children }: any) => {
  
  const handlePrint = () => {
    setModalState(false);
    window.print(); 
  };

  return modalState ? (
    <Modal keepMounted open={modalState} onClose={() => setModalState(false)} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
      <>
        <Box sx={{ position: "absolute", top: "5px",  left: "50%", transform: "translateX(-50%)",  width: "660px", height: "auto", bgcolor: "white", padding: "50px 30px 90px", }} className="modal-content" >
          {children}

          <ButtonWrapper className="print-button-wrapper">
            <Button color="primary" variant="contained" size="small" onClick={handlePrint}>
              Print
            </Button>
          </ButtonWrapper>
        </Box>

        <style>
          {`
            @media print {
              @page {
                size: auto; /* Use 'auto' for the default paper size or specify a paper size if needed */
                margin: 0;
              }
              body {
                margin: 0;
              }
              .modal-content .print-button-wrapper {
                display: none;
              }
            }
          `}
        </style>
      </>
    </Modal>
  ) : null;
};

export default CustomModal;

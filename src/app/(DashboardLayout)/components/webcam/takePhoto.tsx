import { Box, Button, Modal, styled } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

const TakePhoto = (props: any) => {

  const [click, setClick] = useState(0)
  const [image, setImage] = useState('');
  const webcamRef: any = useRef(null);

  const style = {
    position: 'absolute' as 'absolute',
    top: '35%',
    right: '0%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: 24,
  }

  const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    right: '12%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

  }

  const btn = {
    background: "#E15A11",
    "&:hover": {
      backgroundColor: "#E15A11",
    },
  }

  const style3 = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '75%',
    transform: 'translate(-50%, -50%)',
    height: '40px',
    border: '1px solid #000',
    boxShadow: 24,
    display: "grid"
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImage(imageSrc);
    props.setPicture(imageSrc)
    props.setOpen(false)
  }, [])

  const handleSubmit = async () => {
    // props.setPicture(image)
    // props.setOpen(false)
    // alert("Photo is saved")
  };

  return (
    <>
      {/* <Modal
        keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      > */}
        <>
          <Box sx={style}>
            {image == '' 
            ? <Webcam  audio={false} height={200} ref={webcamRef} screenshotFormat="image/jpeg" width={220} videoConstraints={videoConstraints}/> 
            : <img src={image} />}
          </Box>

          <Box sx={style2}>
            {image != '' 
            ? <button className="webcam-btn" onClick={(e) => {
                e.preventDefault();
                setImage('');
                setClick(0);
              }}
              >Retake</button> 
            : <button className="webcam-btn" onClick={(e) => {
                e.preventDefault();
                capture();
                setClick(click + 1);
              }}
              >Capture</button>
            }
          </Box>

          <Box sx={style3}>
            {/* <img src={image} /> */}
            {/* <Button sx={click === 0 ? { display: 'none' } : btn} onClick={handleSubmit}>Submit</Button> */}
          </Box>
        </>
      {/* </Modal> */}
    </>
  );
}

export default TakePhoto;
import React from "react";
import axios from "axios";
import '../ChatRoom/ChatRoom.css';
// import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

// const Button = styled.


const FileUpload = ({fun}) => {

  const [file, setFile] = React.useState(null);

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  
  const handleSubmit = async (upload_file) => {
    try {
      console.log(upload_file);
      const formData = new FormData();
      // formData.append('file', file);
      formData.append('file', upload_file);
      console.log(file);
      // const 
      const res = await axios.post('http://localhost:4000/api/upload', formData);
      console.log(res);
      // if(res.)
      fun(res.data.link);
      setFile(null);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (event) =>{
    console.log(event.target.value);
    setFile(event.target.files[0]);
    if(file){

      console.log(file);
    }
    await handleSubmit(event.target.files[0]);
    
  };
 
  return (
    <>
      {/* <input style={{ diplay: 'none' }} type="file" accept="image/*" onChange={handleFileChange} />
      <button className="file-input" onClick={handleSubmit}>
      Submit</button> */}

<Button className="file-input" style={{backgroundColor:"#31a24c"}} onClick={handleClick}>
        Upload
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}}
      />
      {/* {file && <p>{file.name}</p>} */}
    </>
  );


}
export default FileUpload;
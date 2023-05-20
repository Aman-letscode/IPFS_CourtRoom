import React from "react";
import axios from "axios";
import '../ChatRoom/ChatRoom.css';

const FileUpload = ({fun}) => {

  const [file, setFile] = React.useState(null);

  const handleFileChange = async (event) => {
    setFile(event.target.files[0]);
    
  }
  
  const handleSubmit = async (e) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);
      // const 
      const res = await axios.post('http://localhost:4000/api/upload', formData);
      console.log(res);
      // if(res.)
      fun(res.data.link);
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <>
      <input style={{ diplay: 'none' }} type="file" accept="image/*" onChange={handleFileChange} />
      <button className="file-input" onClick={handleSubmit}>
      file</button>
      {file && <p>{file.name}</p>}
    </>
  );


}
export default FileUpload;
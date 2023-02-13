import React, {useState, useEffect} from 'react';
import './uploader.css';

interface FileProps {
    setSelectedFile: (selectedFile:string) => void,
    setIsFileSelected: (isFileSelected:boolean) => void;
  }

function Uploader(props:FileProps) {
    const reader = new FileReader();

    const changeHandler = (event:any) => {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            props.setSelectedFile(reader.result as string);
            props.setIsFileSelected(true);
          }
	};

    const removeSelected = () => {
        props.setSelectedFile("")
        props.setIsFileSelected(false)
    }

    return(
        <div>
            <input type="file" name='file' onChange={changeHandler} />
            <button onClick={removeSelected}>Remove</button>
            <div>
            </div>
        </div>
    )
}

export default Uploader;
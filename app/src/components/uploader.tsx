import React, {useState, useEffect} from 'react';
import './uploader.css';

function Uploader() {
    const [selectedFile, setSelectedFile] = useState("");
	const [isFileSelected, setIsFileSelected] = useState(false);
    const reader = new FileReader();

    const changeHandler = (event:any) => {
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            setSelectedFile(reader.result as string);
            setIsFileSelected(true);
          }
	};

    const removeSelected = () => {
        setSelectedFile("")
        setIsFileSelected(false)
    }

	const handleSubmission = () => {
	};

    return(
        <div>
            <input type="file" name='file' onChange={changeHandler} />
            {!isFileSelected  ? '' :
            <div>
                <img className="uploadedImage" src={selectedFile} alt="reference_image"/>
            </div>
            }
            <div>
                <button onClick={removeSelected}>Remove</button>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}

export default Uploader;
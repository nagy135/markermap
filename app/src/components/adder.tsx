import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

import { TRootStore } from "../store";

export default function Detail(_props: any) {
  const userId = useSelector((state: TRootStore) => state.log.userId);

  const [uploadedFile, setUploadedFile] = useState<any>({});

  const fileData = () => {
    if (uploadedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {uploadedFile?.name}</p>

          <p>File Type: {uploadedFile?.type}</p>

          <p>Last Modified: {uploadedFile.lastModifiedDate?.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  const onFileChange = (event: any) => {
    // Update the state
    setUploadedFile({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  const onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "image", // NOTE: REQUIRED FORM DATA NAME! validated at api
      uploadedFile.selectedFile,
      uploadedFile.selectedFile.name
    );

    // Details of the uploaded file
    console.log(uploadedFile.selectedFile);

    // Request made to the backend api
    // Send formData object
    const endpoint = "http://localhost:4200/v1";

    const recordUploadResponse = (
      await axios.post(`${endpoint}/records`, {
        name: "TEST",
        lat: (Number("49.18382677567287") + Math.random() / 10).toFixed(14),
        lon: (Number("19.752156530646067") + Math.random() / 10).toFixed(14),
        altitude: 2200,
      })
    ).data?.data;
    console.log(
      "================\n",
      "recordUploadResponse: ",
      recordUploadResponse,
      "\n================"
    );

    formData.append(
      "recordId", // NOTE: REQUIRED FORM DATA NAME! validated at api
      recordUploadResponse.recordId
    );

    console.log(
      "================\n",
      "UPLOADING image ! formData: ",
      formData,
      "\n================"
    );

    const imageUploadResponse = await axios.post(
      `${endpoint}/images`,
      formData
    );
    console.log(
      "================\n",
      "imageUploadResponse: ",
      imageUploadResponse,
      "\n================"
    );
  };

  return (
    <div>
      <h1>GeeksforGeeks</h1>
      <h3>File Upload using React!</h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
    </div>
  );
}

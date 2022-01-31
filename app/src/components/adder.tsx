import { Box, Button, Container, Input } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import useMapLogin from "../hooks/useMapLogin";
import "./css/adder.css";

import { TRootStore } from "../store";

export default function Detail(_props: any) {
  useMapLogin();
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
    setUploadedFile({ selectedFile: event.target.files[0] });
  };

  const onFileUpload = async () => {
    const formData = new FormData();

    formData.append(
      "image", // NOTE: REQUIRED FORM DATA NAME! validated at api
      uploadedFile.selectedFile,
      uploadedFile.selectedFile.name
    );

    const endpoint = "http://localhost:4200/v1";

    const recordUploadResponse = (
      await axios.post(`${endpoint}/records`, {
        userId,
        name: "TEST",
        lat: (Number("49.18382677567287") + Math.random() / 10).toFixed(14),
        lon: (Number("19.752156530646067") + Math.random() / 10).toFixed(14),
        altitude: 2200,
      })
    ).data?.data;

    formData.append("recordId", recordUploadResponse.recordId);

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
    <Container>
      <h1>Create New Record</h1>
      <Box className="create-record">
        <Input type="file" onChange={onFileChange} />
        <Button sx={{ ml: 2 }} variant="contained" onClick={onFileUpload}>
          Upload!
        </Button>
      </Box>
      {fileData()}
    </Container>
  );
}

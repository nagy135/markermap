import { Box, Button, Container, Input, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./css/adder.css";

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useSearchParams } from "react-router-dom";

export default function Detail(_props: any) {
  const { userId } = useSessionContext();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [uploadedFile, setUploadedFile] = useState<any>({});
  const [recordName] = useState("");
  const [recordLat] = useState(lat ?? "");
  const [recordLng] = useState(lng ?? "");

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
        <Stack spacing={2}>
          <TextField label="Name" value={recordName} />
          <TextField label="Latitude" value={recordLat} />
          <TextField label="Longitude" value={recordLng} />
          <Button variant="contained" component="label">
            upload image
            <input type="file" hidden onChange={onFileChange} />
          </Button>
          <Button variant="contained" onClick={onFileUpload}>
            Upload
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

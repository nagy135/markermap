import { Box, Button, Container, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./css/adder.css";
import { toast } from "../utils/toast";

import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useSearchParams } from "react-router-dom";

export default function Detail(_props: any) {
  const { userId } = useSessionContext();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [recordId, setRecordId] = useState<string | null>(null);
  const [recordName, setRecordName] = useState("");
  const [recordLat, setRecordLat] = useState(lat ?? "");
  const [recordLng, setRecordLng] = useState(lng ?? "");
  const [recordAltitude, setRecordAltitude] = useState("");

  /**
   * uploads image, can be called multiple times but only first call creates record
   *
   * @author Viktor Nagy <viktor.nagy@01people.com>
   */
  const onFileChange = async (event: any) => {
    const uploadedFile = event.target.files[0];
    const formData = new FormData();

    formData.append(
      "image", // NOTE: REQUIRED FORM DATA NAME! validated at api
      uploadedFile,
      uploadedFile.name
    );

    const endpoint = "http://localhost:4200/v1";

    if (recordId) {
      formData.append("recordId", recordId);
    } else {
      const recordUploadResponse = (
        await axios.post(`${endpoint}/records`, {
          userId,
          name: recordName,
          lat: Number(recordLat).toFixed(14),
          lon: Number(recordLng).toFixed(14),
          altitude: Number(recordAltitude),
        })
      ).data?.data;

      setRecordId(recordUploadResponse.recordId);
      toast("Record created!");

      formData.append("recordId", recordUploadResponse.recordId);
    }

    await axios.post(`${endpoint}/images`, formData);
    toast("Image uploaded!");
  };

  return (
    <Container>
      <h1>Create New Record</h1>
      <Box className="create-record">
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={recordName}
            onChange={(e) => setRecordName(e.target.value)}
          />
          <TextField
            label="Latitude"
            value={recordLat}
            onChange={(e) => setRecordLat(e.target.value)}
          />
          <TextField
            label="Longitude"
            value={recordLng}
            onChange={(e) => setRecordLng(e.target.value)}
          />
          <TextField
            label="Altitude"
            value={recordAltitude}
            onChange={(e) => setRecordAltitude(e.target.value)}
          />
          <Box className="upload-info">
            To upload multiple files, simply click "upload image" multiple times
          </Box>
          <Button variant="contained" component="label">
            upload image
            <input type="file" hidden onChange={onFileChange} />
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

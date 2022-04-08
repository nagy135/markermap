import { Box, Button, Container, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import "./css/adder.css";
import { toast } from "../utils/toast";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useSearchParams } from "react-router-dom";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Detail(_props: any) {
  // hooks {{{
  const { userId } = useSessionContext();
  const [searchParams] = useSearchParams();
  // }}}
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // states {{{
  const [recordId, setRecordId] = useState<string | null>(null);
  const [recordName, setRecordName] = useState("");
  const [recordLat, setRecordLat] = useState(lat ?? "");
  const [recordLng, setRecordLng] = useState(lng ?? "");
  const [recordAltitude, setRecordAltitude] = useState("");
  const [recordDate, setRecordDate] = useState(new Date());

  const [nameHasError, setNameHasError] = useState(false);
  const [altitudeHasError, setAltitudeHasError] = useState(false);
  // }}}

  // refs {{{
  const nameRef = useRef<HTMLInputElement | null>(null);
  const altitudeRef = useRef<HTMLInputElement | null>(null);
  // }}}

  /**
   * validates inputs
   *
   * @author Viktor Nagy<viktor.nagy@01people.com>
   */
  const validateForm = async (event: any) => {
    let error = false;
    let toFocus: HTMLInputElement | null = null;

    if (!recordAltitude) {
      setAltitudeHasError(true);
      error = true;
      if (altitudeRef.current) toFocus = altitudeRef.current;
    } else {
      setAltitudeHasError(false);
    }

    if (!recordName) {
      setNameHasError(true);
      error = true;
      if (nameRef.current) toFocus = nameRef.current;
    } else {
      setNameHasError(false);
    }

    if (error) event.preventDefault();
    if (toFocus) toFocus.focus();
  };

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
          date: recordDate.toISOString(),
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
    <>
      <Container>
        <Box className="create-record">
          <h1>Create New Record</h1>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={recordName}
              required
              inputRef={nameRef}
              error={nameHasError ? true : false}
              onChange={(e) => setRecordName(e.target.value)}
            />
            <TextField
              label="Latitude"
              value={recordLat}
              variant="standard"
              required
              InputProps={{
                readOnly: true,
              }}
              onChange={(e) => setRecordLat(e.target.value)}
            />
            <TextField
              label="Longitude"
              value={recordLng}
              variant="standard"
              InputProps={{
                readOnly: true,
              }}
              required
              onChange={(e) => setRecordLng(e.target.value)}
            />
            <TextField
              label="Altitude"
              value={recordAltitude}
              variant="standard"
              inputRef={altitudeRef}
              required
              error={altitudeHasError ? true : false}
              onChange={(e) => setRecordAltitude(e.target.value)}
            />
            <Calendar onChange={setRecordDate} value={recordDate} />
            <Box className="upload-info">
              To upload multiple files, simply click "upload image" multiple
              times
            </Box>
            <Button variant="contained" component="label">
              upload image
              <input
                type="file"
                hidden
                onClick={validateForm}
                onChange={onFileChange}
              />
            </Button>
          </Stack>
        </Box>
      </Container>
      <div className="back-to-map">
        <Button
          size="large"
          color="warning"
          variant="contained"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back
        </Button>
      </div>
    </>
  );
}

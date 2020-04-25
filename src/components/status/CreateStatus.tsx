import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_STATUS } from "./statusMutations";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function CreateStatus() {
  const [image, setImage] = useState<File>();
  const [status_text, setStatusText] = useState("");

  const [create, result] = useMutation(CREATE_STATUS, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (image !== undefined) formData.append("file", image);
    formData.append("upload_preset", "pxs3cjzn");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/alexaaj/image/upload`,
      formData
    );
    console.log(response);

    create({
      variables: {
        status_text: status_text,
        status_picture_url: response.data.url,
      },
    });
  };
  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          value={status_text}
          onChange={({ target }) => setStatusText(target.value)}
          id="standard-basic"
          label="Standard"
        />
        <IconButton>
          <input
            type="file"
            onChange={({ target }) =>
              target.files ? setImage(target.files[0]) : null
            }
          />
          <CloudUploadIcon />
        </IconButton>
        <Button onClick={handleSubmit}>Submit</Button>
      </form>
    </div>
  );
}

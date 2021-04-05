import React, { FC, useRef, useState } from 'react';
import {
  Box,
  Avatar,
  ButtonBase,
  Button,
  LinearProgress,
} from '@material-ui/core';

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useStyles } from './styled';

type FileInputProps = {
  uploadImg: Function;
  imageURL: string;
  isLoadingImg: boolean;
};

export const FileInput: FC<FileInputProps> = ({
  uploadImg,
  imageURL,
  isLoadingImg,
}) => {
  const refInput = useRef<HTMLInputElement>(null);

  const handleChange = (event: { target: HTMLInputElement }) => {
    if (event.target.files) {
      const { files } = event.target;
      console.log('files[0]', files[0]);
      uploadImg(files[0]);
    }
  };

  const classes = useStyles();
  return (
    <>
      {isLoadingImg ? (
        <LinearProgress />
      ) : (
        <Box className={classes.wrapper}>
          <Avatar className={classes.avatar} src={imageURL} />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            component="label"
          >
            <input
              ref={refInput}
              type="file"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
            add
          </Button>
        </Box>
      )}
    </>
  );
};

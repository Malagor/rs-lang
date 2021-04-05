import React, { FC, useRef } from 'react';
import { Box, Avatar, Button, LinearProgress } from '@material-ui/core';
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
      uploadImg(files[0]);
    }
  };

  const classes = useStyles();
  return (
    <>
      {isLoadingImg ? (
        <Box className={classes.wrapperLoader}>
          <LinearProgress />
        </Box>
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

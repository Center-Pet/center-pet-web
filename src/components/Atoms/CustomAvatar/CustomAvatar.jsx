import * as React from 'react';
import PropTypes from 'prop-types';
import { Stack, Avatar as MuiAvatar } from '@mui/material';
import "./CustomAvatar.css";

export default function CustomAvatar({ imageSrc }) {
  return (
    <Stack direction="row" spacing={2}>
      <MuiAvatar alt="Avatar" src={imageSrc} />
    </Stack>
  );
}

CustomAvatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
};
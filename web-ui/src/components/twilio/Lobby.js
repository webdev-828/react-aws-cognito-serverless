import React from 'react';
import Button from '@material-ui/core/Button'
const Lobby = ({
  handleSubmit,
  loading
}) => {
  return (
    <div>
      <Button
        size="large"
        disabled={loading}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Start Video Call
      </Button>
    </div>
  );
};

export default Lobby;

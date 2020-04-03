import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

const SearchBar = ({ setSearchTerm, prefix }) => {
  return (
    <Grid
      item
      container
      spacing={1}
      xs={12}
      md={5}
      lg={4}
      alignItems='flex-end'
    >
      <Grid item xs={1}>
        <Icon color='primary' style={{ fontSize: 25 }}>
          search
        </Icon>
      </Grid>
      <Grid item xs={11}>
        <TextField
          name='searchEmail'
          type='text'
          label={`Search by ${prefix}`}
          fullWidth
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SearchBar;

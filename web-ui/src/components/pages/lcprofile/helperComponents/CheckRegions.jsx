import React from 'react';
import uuid from 'uuidv4';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { regionsArr } from '../Component.Data';
const CheckRegions = ({ regionList }) => {
  const [regions, setRegions] = React.useState(null);

  const handleChange = name => event => {
    setRegions({ ...regions, [name]: event.target.value });
  };

  console.log('Regions', regions);
  return (
    <React.Fragment>
      <FormControl component='fieldset' style={{ marginTop: '1rem' }}>
        <FormGroup>
          {regionsArr.map(region => (
            <FormControlLabel
              key={uuid()}
              control={
                <Checkbox
                  onChange={handleChange(region)}
                  color='primary'
                  value={region}
                />
              }
              label={region}
            />
          ))}
        </FormGroup>
      </FormControl>
    </React.Fragment>
  );
};

export default CheckRegions;

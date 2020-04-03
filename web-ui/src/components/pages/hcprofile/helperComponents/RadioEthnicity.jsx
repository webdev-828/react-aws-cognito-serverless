import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { ethnicityArr } from '../Component.Data';

const RadioEthnicity = ({ curentEthninity }) => {
  const [radioValue, setRadioValue] = React.useState(null);

  const handleChange = e => {
    setRadioValue(e.target.value);
  };

  console.log('RadioValue:', radioValue);
  return (
    <React.Fragment>
      <FormControl component='fieldset' style={{ marginTop: '1rem' }}>
        <RadioGroup onChange={handleChange}>
          {ethnicityArr.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio color='primary' />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </React.Fragment>
  );
};

export default RadioEthnicity;

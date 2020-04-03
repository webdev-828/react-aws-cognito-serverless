import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import useStyles from '../styles';
//Form Components
import BasicForm from './BasicForm';


const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const a11yProps = index => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const ProfileTabs = ({ sub }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const formComponents = [BasicForm];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='Basic information' {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      {formComponents.map((TabForm, id) => (
        <TabPanel
          key={id}
          className={classes.tabPanel}
          value={value}
          index={id}
        >
          <TabForm sub={sub} />
        </TabPanel>
      ))}
    </div>
  );
};

export default ProfileTabs;

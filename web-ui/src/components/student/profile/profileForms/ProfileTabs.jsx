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
import ChancingForm from './ChancingForm';
import SchoolPref from './SchoolPref';

const TabPanel = props => {
  const {children, value, index, ...other} = props;

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

const ProfileTabs = ({sub}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const formComponents = [BasicForm, ChancingForm, SchoolPref];

  const handleChange = (event, newValue) => {
    setValue(newValue);
 };

  return (
    <div className={classes.root}>
      <div style = {{paddingTop: '3rem'}}>
        <h1 style = {{
          letterSpacing: '-0.02rem',
          fontSize: '2rem',
          fontWeight: '600',
          lineHeight: '1.1'
        }}>Profile</h1>
        <AppBar 
          position='static' 
          style = {{
            backgroundColor: '#f7f8fc', 
            color: '#f7f8fc',
            borderBottom: 'solid',
            borderBottomWidth: '1px',
            borderBottomColor: '#e3ebf6',
            boxShadow: 'none'
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps = {{
              style: {
                backgroundColor: '#0000ff',
              }
            }}
            textColor = 'primary'
            aria-label='simple tabs example'
          >
            <Tab label='Basic information' {...a11yProps(0)} />
            <Tab label='Chancing profile' {...a11yProps(1)} />
            <Tab label='School preferences' {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </div>
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

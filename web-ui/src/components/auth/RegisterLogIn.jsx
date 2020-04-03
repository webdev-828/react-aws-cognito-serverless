import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import SignUp from './SignUp';
import SignIn from './SignIn';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Container maxWidth='md'>
      <Typography
        component='div'
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    </Container>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },

  tabHeadImg: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '20rem',
    width: '100%',
    height: '3.5rem',
    margin: '.5rem auto 1.5rem',
    '&>img': {
      maxWidth: '100%',
      heigth: 'auto'
    }
  }
}));

const RegisterLogIn = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.registerWrapper}>
      <Container maxWidth='md'>
        <div className={classes.tabHeadImg}>
          <img src='https://static1.squarespace.com/static/5c7f5eadb7c92c0b397663ff/t/5c7f7536e2c4833644d197d1/1574091544954/?format=1500w' />
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='secondary'
          aria-label='simple tabs example'
          centered
        >
          <Tab label='Sign Up' {...a11yProps(0)} />
          <Tab label='Sign In' {...a11yProps(1)} />
        </Tabs>
      </Container>
      <TabPanel value={value} index={0}>
        <SignUp setValue={setValue} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SignIn />
      </TabPanel>
    </div>
  );
};

export default RegisterLogIn;

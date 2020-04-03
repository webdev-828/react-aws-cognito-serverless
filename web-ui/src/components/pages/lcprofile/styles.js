import { makeStyles } from '@material-ui/core/styles';
import { indigo, blue } from '@material-ui/core/colors';

//Colors
const lightBlue = indigo[200];
const darkerBlue = blue[600];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  textArea: {
    width: '100%',
    padding: '.6rem',
    marginBottom: '1rem'
  },
  tabPanel: {
    paddingTop: 20,
    '&>div': {
      padding: 0
    }
  },
  after: {
    color: lightBlue
  },
  calcLink: {
    color: darkerBlue,
    cursor: 'pointer'
  },
  infoBlock: {
    marginBottom: '1.5rem !important'
  },
  activityBlock: {
    marginTop: '2rem'
  },
  flexBoxRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
    // flexWrap: 'wrap'
  },
  iconHover: {
    color: blue[200],
    cursor: 'pointer',
    marginBottom: '2px',
    fontSize: '1.2rem',
    '&:hover': {
      color: blue[400]
    }
  },
  formSection: {
    marginTop: '1rem !important',
    marginBottom: '2rem !important !important'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  menu: {
    width: 200
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1
  },

  pre: {
    fontSize: '1.2rem',
    marginBottom: '.25rem',
    maxWidth: '50rem'
  },
  activityBlock: {
    marginTop: '2.5rem'
  },
  button: {
    minWidth: '9rem',
    marginTop: '1.2rem'
  },
  modalBtn: {
    width: '100% !important',
    margin: '.5rem 0 0 0'
  },
  btnAdd: {
    margin: '1rem 0',
    width: '9rem'
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    minWidth: '9rem',
    marginTop: '1.2rem'
  },
  menu: {
    width: 200
  },
  dvr: {
    borderTop: '1px solid #ccc'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default useStyles;

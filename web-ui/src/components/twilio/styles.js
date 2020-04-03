export default () => ({
  room: {
    display: 'flex',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    background: '#212121',
    color: 'white',
    '& .participants': {
      right: 0,
      top: 0,
      bottom: 0,
      overflow: 'auto',
      width: '100%',
      display: 'flex',
      transition: 'all .2s ease',
      '&.small': {
        width: 260,
        flexDirection: 'column',
        '& .participant': {
          flex: 0,
        }
      },
    },
    '& .participant': {
      flex: 1,
      '& video': {
        width: '100%',
      }
    },
    '& .screen-container': {
      flex: 1
    },
    '& .screen': {
      width: '100%',
    }
  },
  activeVideo: {

  },
  videoSmall: {
    width: 200,
    height: 200,
    border: '1px solid red'
  },
  footer: {
    position: 'fixed',
    bottom: 30,
    margin: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    '& button': {
      margin: '0 8px',
    }
  }
});

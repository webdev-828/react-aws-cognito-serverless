import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Auth } from 'aws-amplify';
import Fab from '@material-ui/core/Fab';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SetS3Config } from '../../../../Services';
import Storage from '@aws-amplify/storage';

//Mutation
import { USER_UPDATE_PIC } from '../Profile.Mutations';

//Query
import { USER_QUERY_PIC } from '../Profile.Queries';
const useStyles = makeStyles({
  profilePic: {
    margin: 0,
    width: 215,
    height: 215,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    // TEST BACKGROUND
    background:
      'url(https://weadmit-user-pics-bucket.s3.us-east-2.amazonaws.com/public/user.png)',
    cursor: 'pointer',
    position: 'relative'
  },
  fabProgress: {
    color: blue[500],
    position: 'absolute',
    top: -5,
    left: -5,
    zIndex: 1
  },
  picBox: {
    position: 'relative'
  },
  fabAdd: {
    position: 'absolute',
    right: '1%',
    top: '70%'
  }
});

const FileUpload = ({ userId, sub }) => {
  const classes = useStyles();

  const [picName, setPicName] = useState('');
  const [profilePic, setProfilePic] = useState({});
  const [profilePicPath, setProfilePath] = useState('');
  const [fileLoading, setFileLoading] = useState(false);
  const [response, setResponse] = useState('');
  const inputFile = useRef(null);

  const [disable, setDisable] = useState(true);

  const [uploadPic] = useMutation(USER_UPDATE_PIC);

  const { data, loading, error } = useQuery(USER_QUERY_PIC, {
    variables: { sub }
  });
  if (loading) return <CircularProgress />;
  if (error) return <p>Error ...</p>;

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data, error, loading } = await client.query({
  //       query: USER_QUERY_PIC,
  //       ariables: { sub }
  //     });
  //     const { data, loading, error } = useQuery(USER_QUERY_PIC, {
  //       variables: { sub }
  //     });
  //     if (loading) return <CircularProgress />;
  //     if (error) return <p>Error ...</p>;
  //     if (!!data.user[0].profile[0].user_pic) {
  //       setProfilePath(data.user[0].profile[0].user_pic);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const uploadImage = async e => {
    e.preventDefault();

    try {
      const creds = await Auth.currentCredentials(); //This will give unauthenticated credentials object
      await SetS3Config('weadmit-user-pics-bucket', 'public');
      const resp = await Storage.put(`${profilePic.name}`, profilePic, {
        contentType: setProfilePic.type
      });
      console.log('RESPONSE', resp);

      setResponse('Success uploading file!');
      // const path = await Storage.get(profilePic.name);
      //temp solution to get path
      const path = `https://weadmit-user-pics-bucket.s3.us-east-2.amazonaws.com/public/${profilePic.name}`;
      setProfilePath(path);
      setProfilePic({});
      console.log('PAAAATH', path);
      uploadPic({ variables: { userId: Number(userId), path: path } });
    } catch (err) {
      console.log('ERROR UPLOADING');
      setResponse(`Cannot uploading file: ${err}`);
    }
  };

  const fileSelectedHandler = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);

    setFileLoading(true);

    reader.onloadend = () => {
      setProfilePic(file);
      setProfilePath(reader.result);
    };
    setTimeout(() => setFileLoading(false), 1000);
    setDisable(false);
  };

  console.log('profilePic', profilePic);

  return (
    <React.Fragment>
      <input
        style={{ display: 'none' }}
        type='file'
        ref={inputFile}
        onChange={fileSelectedHandler}
      />
      <Box className={classes.picBox}>
        <Avatar
          alt='Remy Sharp'
          // src={
          //   !!data.user[0].profile[0].user_pic &&
          //   data.user[0].profile[0].user_pic
          // }
          className={classes.profilePic}
          onClick={() => inputFile.current.click()}
        />
        {fileLoading && (
          <CircularProgress
            thickness={0.6}
            size={225}
            className={classes.fabProgress}
          />
        )}

        <Fab
          disabled={disable}
          onClick={uploadImage}
          color='secondary'
          size='small'
          aria-label='add'
          className={classes.fabAdd}
        >
          <CloudUploadIcon />
        </Fab>
      </Box>
    </React.Fragment>
  );
};

export default FileUpload;

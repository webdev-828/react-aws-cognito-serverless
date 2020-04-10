import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Storage, API } from 'aws-amplify';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import {createStyles, withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GET_DOCUMENTS } from '../../../graphql/student/documents';


const styles = (theme) => createStyles({
  root: {
    '& iframe': {
      width: '100%',
      height: '100vh'
    }
  }
});

const Document = ({ user, classes }) => {
  const [file, setFile] = useState();
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState();
  const [name, setName] = useState('');
  const fileRef = useRef();

  const upload = async (onComplete) => {
    setSaving(true);
    const { key } = await Storage.put(file.name, file, {
      level: 'public',
    });
    const url = `https://weadmit-user-pics-bucket.s3.us-east-2.amazonaws.com/public/${key}`;

    await API.post('api', '/document', {
      body: {
        url,
      },
    });
    await Storage.remove(key);
    setSaving(false);
    setFile();
    onComplete();
    fileRef.current.value = null;
  };

  const onCreate = async (onComplete) => {
    setSaving(true);
    const resp = await API.post('api', '/document/new', {
      body: {
        name,
      },
    });
    const doc = resp.insert_documents.returning[0];
    setSaving(false);
    setName('');
    onComplete();
    setSelected(doc);
  };

  const onView = (e, file) => {
    e.preventDefault();
    setSelected(file);
  };

  return (
    <Query
      query={GET_DOCUMENTS}
      variables={{
        userId: user.id,
      }}
    >
      {({ loading, data, refetch }) => (
        <div className={classes.root}>
          <div className="mb-4">
            <input
              ref={fileRef}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={saving || !file}
              onClick={() => upload(refetch)}
            >
              {saving ? <CircularProgress size={16} /> : 'Upload'}
            </Button>
          </div>
          <hr />
          <div>
            <TextField
              fullWidth
              label="Create new document"
              placeholder="Example, my resume"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              disabled={saving || !name}
              onClick={() => onCreate(refetch)}
            >
              {saving ? <CircularProgress size={16} /> : 'Create'}
            </Button>
          </div>
          <hr />
          <h5>My Files</h5>
          {loading ? (
            <CircularProgress size={16} />
          ) : (
            <ol className="list-unstyled">
              {data.documents.map((i) => (
                <li key={i.id}>
                  <span>{i.filename}</span>
                  <a className="ml-2" href="#" onClick={(e) => onView(e, i)}>
                    Open
                  </a>
                </li>
              ))}
            </ol>
          )}
          {selected && (
            <iframe
              frameBorder={0}
              src={selected.url}
            />
          )}
        </div>
      )}
    </Query>
  );
};

export default withStyles(styles)(Document);

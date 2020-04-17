import React, { useState, useRef } from 'react';
import { Storage, API } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { Query } from 'react-apollo';
import { createStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { GET_DOCUMENTS } from '../../../graphql/lc/documents';

const styles = (theme) => createStyles({
  root: {
    '& iframe': {
      width: '100%',
      height: '100vh'
    }
  }
});

const Document = ({ classes }) => {
  const [selected, setSelected] = useState();
  const user = useSelector(s => s.user.user);
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
      {({ loading, data }) => (
        <div className={classes.root}>
          <h5>My Files</h5>
          {loading ? (
            <CircularProgress size={16} />
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>Student</td>
                  <td>File name</td>
                </tr>
              </thead>
              <tbody>
              {data.documents.map((i) => (
                <tr key={i.id}>
                  <td>
                    {i.document.creator.user_first_name} {i.document.creator.user_last_name}
                  </td>
                  <td>{i.document.filename}</td>
                  <td>
                    <a href="#" onClick={(e) => onView(e, i)}>
                      Open
                    </a>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          )}
          {selected && (
            <iframe
              frameBorder={0}
              src={selected.document.url}
            />
          )}
        </div>
      )}
    </Query>
  );
};

export default withStyles(styles)(Document);

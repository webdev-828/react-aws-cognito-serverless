import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import School from './School';

const Reach = ({ loading, schools, onRemoveSchool }) => {
  return (
    <div>
      <p>This is School List Reach Page</p>
      {loading && <CircularProgress />}
      <div className="row">
        {schools.map((s) => (
          <div className="col col-md-6 col-lg-5" key={s.college_id}>
            <School
              collegeId={s.college_id}
              renderActions={() => (
                <Button
                  color="secondary"
                  onClick={() => onRemoveSchool(s.college_id)}
                >
                  Remove
                </Button>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reach;

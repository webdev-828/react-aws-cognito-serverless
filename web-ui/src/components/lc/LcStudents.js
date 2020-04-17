import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import ReplyIcon from '@material-ui/icons/Reply';
import Worksheets from './../student/worksheets/Worksheets';
import {
  GET_ADMIN_STUDENTS,
  ADD_LC,
} from './../../graphql/admin/gql_admin_students';
import { GET_LC_STUDENTS } from './../../graphql/lc/students';
import { GET_ADMIN_LCS } from './../../graphql/admin/gql_admin_lcs';
import { fetchUser } from './../../reducers/user';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (_) => dispatch(fetchUser()),
  };
};

const LcStudents = (props) => {
  props.onFetchUser();
  const [userSub, setSub] = useState(String);
  const [student, setStudent] = useState(Object);
  const [students, setData] = useState([]);
  const columns = [
    { title: 'User Id', field: 'user_id', type: 'numeric' },
    { title: 'First Name', field: 'user_first_name' },
    { title: 'Last Name', field: 'user_last_name' },
    { title: 'User Email', field: 'user_email' },
  ];

  useEffect(() => {
    async function fetchData() {
      const userid = props.user.id;
      const { client } = props;
      var { data } = await client.query({
        query: GET_LC_STUDENTS,
        variables: { user_type: 'student', user_id: userid },
      });
      setData([...students, ...data.v_all_students]);
    }
    fetchData();
  }, []);

  const handleClickRow = (rowData) => {
    setStudent(rowData);
    setSub(rowData.user_cognito_sub);
  };

  const handleClick = () => {
    props.history.push('/lcstudents');
    setSub();
    setStudent();
  };

  const displayWorksheets = () => {
    return (
      <React.Fragment>
        <p
          style={{ fontSize: '1rem', color: 'grey', cursor: 'pointer' }}
          onClick={handleClick}
        >
          Go To Student Page
        </p>
        <Worksheets
          {...props}
          sub={userSub}
          student={student}
          pathname="/lcstudents"
          type="lc"
        />
      </React.Fragment>
    );
  };

  const displayStudents = () => {
    return (
      <MaterialTable
        title="High School Students"
        columns={columns}
        data={students}
        onRowClick={(event, rowData, togglePanel) => handleClickRow(rowData)}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setData([...students, newData]);
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                const pData = students;
                pData.splice(students.indexOf(oldData), 1);
                setData([...students, pData]);
              }, 600);
            }),
        }}
      />
    );
  };

  return <div>{userSub ? displayWorksheets() : displayStudents()}</div>;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withApollo(LcStudents));

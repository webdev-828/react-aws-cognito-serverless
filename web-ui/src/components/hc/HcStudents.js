import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import ReplyIcon from '@material-ui/icons/Reply';
import Worksheets from './../student/worksheets/Worksheets';
import { GET_ADMIN_STUDENTS, ADD_LC } from './../../graphql/admin/gql_admin_students';
import { GET_HC_STUDENTS } from './../../graphql/hc/students';
import { GET_ADMIN_LCS } from './../../graphql/admin/gql_admin_lcs';
import { fetchUser } from './../../reducers/user';

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUser: _ => dispatch(fetchUser())
    };
};

const HcStudents = (props) => {
    props.onFetchUser();
    const [flag, setFlag] = useState(true);
    const [userSub, setSub] = useState(String);
    const [student, setStudent] = useState(Object);
    const [columns, setColumns] = useState([
          { title: 'User Id', field: 'user_id', type: 'numeric' },
          { title: 'First Name', field: 'user_first_name' },
          { title: 'Last Name', field: 'user_last_name' },
          { title: 'User Email', field: 'user_email' }, 
        ])
    const [students, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const userid = props.user.id;
            console.log(props.user.id);
            const { client } = props;
            var { data } = await client.query({query: GET_HC_STUDENTS, variables: {user_type: 'student', user_id: props.user.id}});
            setData([...students,...data.v_all_students]);
        };
        fetchData();
    }, []);

    const handleClickRow = (rowData) => {
      setStudent(rowData);
      setSub(rowData.user_cognito_sub);
      setFlag(false);
    };

    const handleClick = () => {
      props.history.push('/hcstudents')
      setFlag(true);
    };

    const displayWorksheets = () => {
        return (
          <React.Fragment>
              <p style = {{fontSize: '1rem', color: 'grey', cursor: 'pointer'}} onClick = {handleClick}>Go To Student Page</p>
              <Worksheets {...props} sub = {userSub} student = {student} pathname = '/hcstudents' type = 'lc'/>
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
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setData([...students,newData]);                  
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const pData = students;
                      pData.splice(students.indexOf(oldData), 1);
                      setData([...students,pData]);

                    }, 600);
                  }),
              }}
            />
          );
    };

    return (
        <div>
           { (flag == true) ? displayStudents() : displayWorksheets() }
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withApollo(HcStudents));

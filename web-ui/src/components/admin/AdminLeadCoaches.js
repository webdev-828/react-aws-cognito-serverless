import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
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

const AdminLeadCoaches = (props) => {
    props.onFetchUser();  
    //var students = [];
    const [columns, setColumns] = useState([
          { title: 'User Id', field: 'user_id', type: 'numeric' },
          { title: 'First Name', field: 'user_first_name' },
          { title: 'Last Name', field: 'user_last_name' },
          { title: 'User Email', field: 'user_email' },
          
        ])
    const [students, setData] = useState([
        { user_id: 99, user_first_name: 'Baran', user_last_name: 'Borat', user_email: 'iran@gmail.com' },
        { user_id: 999, user_first_name: 'Barran', user_last_name: 'Borrat', user_email: 'irrran@gmail.com' },
      ])

    useEffect(() => {
        async function fetchData() {
            const userid = props.user.id;
            const { client } = props;
            const { data } = await client.query({query: GET_ADMIN_LCS, variables: {user_type: 'lead_coach'}});
            setData([...students,...data.users]);
        };
        fetchData();
    }, [])

   
    const displayStudents = () => {
        
          return (
            <MaterialTable
              title="Lead Coaches"
              columns={columns}
              data={students}
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
                      if (oldData) {
                        const pData = students;
                        pData[pData.indexOf(oldData)] = newData;
                        setData([...students,pData]);
                      }
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
           { displayStudents() }
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withApollo(AdminLeadCoaches));

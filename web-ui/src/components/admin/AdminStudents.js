import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { GET_ADMIN_STUDENTS, ADD_LC } from './../../graphql/admin/gql_admin_students';
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

const AdminStudents = (props) => {
    props.onFetchUser();
    const [flag, setFlag] = useState(true);
    const [scolumns, setScolumns] = useState({ 1: 'pradeep', 2: 'maria', 3: 'leo'});
    const [columns, setColumns] = useState([
          { title: 'User Id', field: 'user_id', type: 'numeric' },
          { title: 'First Name', field: 'user_first_name' },
          { title: 'Last Name', field: 'user_last_name' },
          { title: 'User Email', field: 'user_email' },
          { title: 'Lead Coach', field: 'lc_name' },
          { title: 'LC Id', field: 'lc_id' },
          { title: 'Change LC', 
            field: 'lead_coach',
            lookup: scolumns,
          },  
        ])
    const [students, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            console.log("USER", props.user);
            const userid = props.user.id;
            const { client } = props;
            var { data } = await client.query({query: GET_ADMIN_STUDENTS, variables: {user_type: 'student', user_id: props.user.id}});
            setData([...students,...data.v_all_students]);
            console.log("DATA", data.users);
            data  = await client.query({query: GET_ADMIN_LCS, variables: {user_type: 'lead_coach'}});
            var lookup = {}
            lookup = data.data.users.map((user) => {
                      var tuser = {};
                      if( user.user_email != null && user.user_id){
                        tuser = Object.assign(user.user_id + ':' + user.user_first_name + ' ' + user.user_last_name, tuser);                        
                      }
                      else{
                        tuser = Object.assign('none',tuser);
                      }
                      return tuser;
                    });
            console.log("Lookup", lookup);
            setScolumns(old => { return([...lookup])});
            setColumns(prev => {
              var nw = prev.map((column) => {
                if(column.field === 'lead_coach'){
                  column.lookup = Object.assign({...lookup}) ;
                }
                return column;
              });
              return ([...nw]);
            });
        };
        fetchData();
    }, [])

   
    const displayStudents = () => {
          console.log("pradeep columns: " + JSON.stringify(scolumns));
          return (
            <MaterialTable
              title="High School Students"
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
                        var lc = scolumns[parseInt(newData.lead_coach, 10)];
                        var lc_id = lc.split(':')[0];
                        var lc_name = lc.split(':')[1];
                        setData([...students,pData]);
                        if(newData.lc_id != lc_id){
                            props.client.mutate({
                              mutation: ADD_LC,
                              variables: {
                                  user_id: newData.user_id,
                                  lc_id: lc_id,
                                  lc_name: lc_name,
                              }
                            })
                          window.location.reload();
                        }
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
)(withApollo(AdminStudents));
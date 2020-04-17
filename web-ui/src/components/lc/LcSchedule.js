import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {useSelector, useDispatch} from "react-redux";
import { API } from 'aws-amplify';
import { useApolloClient, useQuery, useMutation } from '@apollo/react-hooks';
import LCGoogleAuth from "./LCGoogleAuth";
import Calendar from './Calendar';
import { updateUser } from '../../reducers/user';
import { UPDATE_USER } from '../../graphql/Home';

const LcSchedule = () => {
    const [saving, setSaving] = useState(false);
    const client = useApolloClient();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const onAuthSuccess = ({ code }) => {
        setSaving(true);
        API.post('api', '/google/auth', { body: { code }}).then(
          resp => {
              const { returning } = resp.update_users;
              const updatedUser = returning[0];
              dispatch(updateUser({
                  googleAuth: updatedUser.user_google_auth
              }))
            setSaving(false);
          }
        ).catch(error => {
            console.log(error.response);
          setSaving(false);
        });
    };

    const onDisconnect = () => {
        client.mutate({
            mutation: UPDATE_USER,
            variables: {
                sub: user.sub,
                data: {
                    user_google_auth: null
                }
            }
        }).then(
          ({ data }) => {
              dispatch(updateUser({
                  googleAuth: null
              }))
          }
        )
    };

    return (
        <div>
            { user.googleAuth ? (
                <React.Fragment>
                  <Button disabled={saving} onClick={onDisconnect} variant="contained" color="secondary">Disconnect Calendar</Button>
                  <div style={{ marginTop: 20 }}>
                    <Calendar sub={user.sub} />
                  </div>
                </React.Fragment>
            ) : (
                <LCGoogleAuth onSuccess={onAuthSuccess} />
              )
            }
        </div>
    );
};

export default LcSchedule;

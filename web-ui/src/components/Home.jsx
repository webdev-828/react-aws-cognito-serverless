import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { ApolloProvider } from 'react-apollo';
import Cookie from 'universal-cookie';
import { useSelector } from 'react-redux';
import RegisterLogIn from './auth/RegisterLogIn';
import Admin from './Admin';
import Lc from './Lc';
import Hc from './Hc';
import Student from './Student';
import { GET_USER, GET_WORKSHEETS } from '../graphql/Home';
import { setUser, updateUser } from '../reducers/user';
import { setWorksheet } from '../reducers/worksheet';
import { AdminSidebar, LcSidebar, HcSidebar, StudentSidebar } from '../constant';
import client from '../graphql/client';

const mapStateToProps = state => {
    return {
      user: state.user.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetUser: userinfo => dispatch(setUser(userinfo)),
        onSetWorksheets: worksheets => dispatch(setWorksheet(worksheets)),
        updateUser: user => dispatch(updateUser(user))
    };
};

const userMediator = props => {
    if (props.userType === 'student') {
        return (
            <Student {...props} content = {StudentSidebar} />
        );
    } else if (props.userType === 'lead_coach') {
        return (
            <Lc {...props} content = {LcSidebar} />
        );
    } else if (props.userType === 'admin') {
        return (
            <Admin {...props} content = {AdminSidebar} />
        );
    } else if (props.userType === 'head_coach') {
        return (
            <Hc {...props} content = {HcSidebar} />
        );
    }else {
        return null;
    }
};

const Home = (props) => {
    const cookies = new Cookie();
    const jwtToken = cookies.get('token');
    const sub = cookies.get('sub');
    const user = useSelector(state => state.user.user);
    const userType = user.type;
    useEffect(() => {
        if (jwtToken) {
            client.query({query: GET_USER, variables: {sub: sub}}).then(res => {
                const user = res.data.user[0];
                props.onSetUser(user);
                props.updateUser({
                    googleAuth: res.data.user[0].user_google_auth,
                });
            });
            client.query({query: GET_WORKSHEETS}).then(res => {
                props.onSetWorksheets(res.data.worksheets);
            });
        }
    }, []);

    if (jwtToken) {
        props = {...props, userType, sub};

        return (
            <ApolloProvider client={client} >
                {userMediator(props)}
            </ApolloProvider>
        )
    } else {
        return (
            <div style={{ overflow: 'auto', height: '100%' }}>
                <RegisterLogIn />
            </div>
        )
    }
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (Home);

import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Universities from './Universities';
import Navigation from './../../ui/navigation';
import Modal from './../../ui/modal';
import Loading from './../../ui/loading';
import { fetchUniversities, addUniversity } from './../../../reducers/university';
import { GET_UNIVERSITY, INSERT_UNIVERSITY } from './../../../graphql/student/essays';
import AddUniversatyModal from './add-uni';

const RoundButton = styled(Button)({
    borderRadius: 22,
    paddingLeft: '10%',
    paddingRight: '10%',
});

const Footer = styled('div')({
    marginTop: 60
});

const Essays = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const results = useSelector((state) => state.university);
    const [showUniModal, setUniModal] = useState(false);
    const {loading, result: universities} = results;

    React.useEffect(() => {
        dispatch(fetchUniversities([props.client, GET_UNIVERSITY, user.sub]));
    }, [dispatch,])

    const onAdd = (event) => {
        const obj = {
            usersub: user.sub,
            value: JSON.stringify({
                university_name: event[0],
                date: event[1],
                doc: []
            })
        }
        dispatch(addUniversity([props.client, INSERT_UNIVERSITY, obj]));
    };

    const onClickProfile = (event) => {
        console.log(event);
    }

    const onClickChat = (event) => {
        console.log(event);
    }

    if (loading) {
        return (
            <div className="center" style={{marginTop: 50}}>
                <Loading />
            </div>
        )
    }

    return (
        <React.Fragment>
            <div>
                <Navigation pageName="Essays" onClickChat={onClickChat} onClickProfile={onClickProfile}/>
                <Universities universities = {universities}/>
            </div>
            <Footer className="text_center">
                <RoundButton onClick={setUniModal} size="large" variant="outlined" color="primary">Add University</RoundButton>
            </Footer>
            { showUniModal && (
              <AddUniversatyModal onClose={() => setUniModal(false)}  />
            )}
        </React.Fragment>
    );
};

export default withApollo(Essays);

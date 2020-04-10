import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useApolloClient } from 'react-apollo';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import { EWrapper } from './CardStyle';
import Essays from './../cell';
import Selector from './../../../ui/selector';
import { editUniversity } from './../../../../reducers/university';
import { INSERT_UNIVERSITY } from './../../../../graphql/student/essays';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      boxShadow: '0px 10px 20px rgba(180, 186, 200, 0.3)',
    },
  }),
);

const UniCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const popupState = usePopupState({ variant: 'popover', popupId: 'menu' });

  const university = JSON.parse(props.data.value);

  const onAddDocu = (event) => {
    const obj = {
      id: props.data.id,
      usersub: user.sub,
      value: JSON.stringify({
        university_name: university.university_name,
        date: university.date,
        doc: [
          ...university.doc,
          {
            essays_name: event,
            status: 0,
          },
        ],
      }),
    };

    dispatch(editUniversity([props.client, INSERT_UNIVERSITY, obj]));
  };

  const onEditUniversityName = (event) => {
    if (!event) {
      return;
    }

    const obj = {
      id: props.data.id,
      usersub: user.sub,
      value: JSON.stringify({
        university_name: event,
        date: university.date,
        doc: [...university.doc],
      }),
    };

    dispatch(editUniversity([props.client, INSERT_UNIVERSITY, obj]));
  };

  const onEditUniversityDate = (event) => {
    if (!event) {
      return;
    }

    const obj = {
      id: props.data.id,
      usersub: user.sub,
      value: JSON.stringify({
        university_name: university.university_name,
        date: event,
        doc: [...university.doc],
      }),
    };

    dispatch(editUniversity([props.client, INSERT_UNIVERSITY, obj]));
  };

  const onChangeStatus = (event) => {
    const doc = university.doc.filter((d, i) => i === event.id)[0];
    if (!doc) {
      return Promise.reject(Error('no document'));
    }
    doc.status = parseInt(event.status);

    const obj = {
      id: props.data.id,
      usersub: user.sub,
      value: JSON.stringify({
        university_name: university.university_name,
        date: university.date,
        doc: [...university.doc],
      }),
    };

    dispatch(editUniversity([props.client, INSERT_UNIVERSITY, obj]));
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton {...bindTrigger(popupState)}>
            <MoreVertIcon color="disabled" />
          </IconButton>
        }
        title={university.university_name}
        titleTypographyProps={{
          variant: 'subtitle1',
        }}
        subheader={`Due ${university.date}`}
        subheaderTypographyProps={{
          variant: 'body2',
        }}
      />
      <CardContent>
        {university.doc.map((doc, index) => (
          <EWrapper key={index}>
            <div>
              <Essays title={`Essay # ${index + 1} ${doc.essays_name}`} />
            </div>
            <Selector
              id={index}
              value={doc.status}
              onChangeStatus={onChangeStatus}
            />
          </EWrapper>
        ))}
      </CardContent>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={onAddDocu}>Add Document</MenuItem>
        <MenuItem onClick={onAddDocu}>Edit</MenuItem>
      </Menu>
    </Card>
  );
};

export default UniCard;

// require('dotenv').config({ path: '.env.prod'})
const fetch = require('node-fetch');

const hgeAdminSecret = process.env.ADMIN_SECRET;
const hgeEndpoint = process.env.HGE_ENDPOINT;

const query = `
mutation insertUser (
  $sub: uuid!,
  $userName: String!,
  $email: String!,
  $phone: String!,
  $userType: String!,
  $firstName: String!,
  $lastName: String,
  
){
  insert_users(objects: [{
    user_cognito_sub: $sub,
    user_cognito_username: $userName,
    user_first_name: $firstName,
    user_last_name: $lastName,
    user_email: $email,
    user_phone: $phone,
    user_type: $userType
  }]) {
    returning {
      user_id
      user_email
      user_type
      user_cognito_sub
      user_status
      user_first_name
      user_last_name
    }
  }
}
`;

const profileQuery = `
  mutation insertProfileId (
    $userId: Int! 
  ){
    insert_student_profile(objects: {user_id: $userId}) {
      returning {
        user_id
      }
    }
  }
`;

exports.handler = async (event, context, callback) => {
  try {
    const user = event.request.userAttributes;
    const qv = {
      sub: user.sub,
      userName: event.userName,
      email: user.email,
      phone: user.phone_number,
      firstName: user['custom:firstName'] || '',
      lastName: user['custom:lastName'],
      userType: user['custom:usertype']
    };

    const body = JSON.stringify({ query: query, variables: qv });

    const result = await fetch(hgeEndpoint, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': hgeAdminSecret
      }
    });

    const { errors, data } = await result.json();

    console.log(errors)
    console.log(data);

    if (errors) {
      console.log(JSON.stringify(errors));
      throw new Error(errors);
    } else {
      console.log(data);
    }

    const insertedUserId = data.insert_users.returning[0].user_id;
    const profileBody = JSON.stringify({
      query: profileQuery,
      variables: { userId: insertedUserId }
    });

    if (user['custom:usertype'] === 'student') {
      await fetch(hgeEndpoint, {
        method: 'POST',
        body: profileBody,
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': hgeAdminSecret
        }
      });
      // console.log('profileResult', JSON.stringify(profileResult));
    }
    callback(null, event);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

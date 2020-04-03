exports.handler = (event, context, callback) => {
  // Add id & role of the user
  event.response = {
    claimsOverrideDetails: {
      claimsToAddOrOverride: {
        'https://hasura.io/jwt/claims': JSON.stringify({
          'x-hasura-allowed-roles': ['anonymous', 'user', 'admin', 'student'],
          'x-hasura-default-role': 'anonymous',
          'x-hasura-user-id': event.request.userAttributes.sub,
          'x-hasura-user-role': event.request.userAttributes['custom:usertype']
        })
      }
    }
  };
  callback(null, event);
};

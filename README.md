# Securing Microservices on AWS with Cognito, API Gateway and Lambda

Handling auth is painful. But most applications need to authenticate users and control what resources they can access. Microservices, though growing in popularity, can add complexity. You need to secure both the user’s actions and the interactions between services.

Read the rest on [Medium](https://medium.freecodecamp.org/how-to-secure-microservices-on-aws-with-cognito-api-gateway-and-lambda-4bfaa7a6583c)

For details on the AWS setup outlined in the article, please refer to [aws-setup.md](./docs/aws-setup.md)

Signup/Login Flow:
1. User signups by providing all essential information
2. Confirmation emails goes out
3. User is registered with AWS Cognito upon confirmation
4. User can now login
5. Upon login, user will get a token with hasura claims embedded in the token
6. User can now either query the GraphQL with the token above in the header
7. Hasura decodes the token by talking to aws lambda, from the token, hasura knows the usertype
5. Each table on Postgres has user permissions enforced, hasura query will be successfull/unsuccessful accordingly

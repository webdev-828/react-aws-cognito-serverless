const middy = require('middy');
const {
  cors,
  urlEncodeBodyParser,
  httpEventNormalizer,
  validator,
  httpHeaderNormalizer,
  doNotWaitForEmptyEventLoop,
  jsonBodyParser,
  httpSecurityHeaders,
} = require('middy/middlewares');

const stringifyBodyResponse = require('../middlewares/stringify');
const reqNormalizer = require('../middlewares/reqNormalizer');
const httpErrorHandler = require('../middlewares/error');
const authenticate = require('../middlewares/authenticate');

module.exports = (handlerFunc, { inputSchema } = {}, middlewares = []) => {
  const handler = middy(handlerFunc);
  handler
    .use(cors())
    // .use(
    //   doNotWaitForEmptyEventLoop({
    //     runOnBefore: true,
    //   }),
    // )
    .use(httpHeaderNormalizer())
    .use(httpEventNormalizer())
    .use(reqNormalizer())
    .use(jsonBodyParser())
    .use(urlEncodeBodyParser({ extended: true }))
    .use(stringifyBodyResponse());
    // .use(httpSecurityHeaders());

  if (inputSchema) {
    handler.use(validator({ inputSchema }));
  }

  handler.use(
    httpErrorHandler({
      logger: (e) => {
        console.log('\n************EEERRRRROOOOORRRRRRRR***********');
        console.error('\n', e);
        console.log('\n************EEERRRRROOOOORRRRRRRR***********');
      },
    }),
  );

  return handler;
};

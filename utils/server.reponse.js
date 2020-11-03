const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const NOT_IMPLEMENTED = 501;
const BAD_GATEWAY = 502;
const CONFLICT = 409;

/* Function to return response data */
function response(code) {
  // eslint-disable-next-line func-names
  return function (res, data) {
    let json = data;
    if (typeof data === 'string') json = {message: data};
    return res.status(code).json(json);
  };
}

module.exports = {
  ok: response(OK),
  created: response(CREATED),
  badRequest: response(BAD_REQUEST),
  unauthorized: response(UNAUTHORIZED),
  forbidden: response(FORBIDDEN),
  notFound: response(NOT_FOUND),
  serverError: response(SERVER_ERROR),
  notImplemented: response(NOT_IMPLEMENTED),
  badGateway: response(BAD_GATEWAY),
  conflict: response(CONFLICT),
};

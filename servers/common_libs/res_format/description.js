let getDescription = function (status) {
  switch (status) {
    case 200:
      return 'Ok';
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 500:
      return 'Internal Server Error';
    default:
      return 'No description';
  }
};

module.exports = getDescription;

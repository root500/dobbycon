exports.handler = function(event, context, callback) {


  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png'
    },
    body: data,
  });
};

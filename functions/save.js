const fs = require('fs');

function makeID(length) {
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result           = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

exports.handler = async function(event, context, callback) {
  const base64Data = event.data.replace(/^data:image\/png;base64,/, '');
  const id = makeID(16);

  await fs.writeFile(`${makeID()}.png`, base64Data, 'base64');

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      result: true,
      id,
    })
  });
};

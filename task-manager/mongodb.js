const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionURL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  // db.collection('users')
  //   .deleteMany({ age: 23 })
  //   .then(result => console.log(result))
  //   .catch(err => console.log(err));
  client.close();
});

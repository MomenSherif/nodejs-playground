const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionURL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);
});

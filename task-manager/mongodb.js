const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

const id = new ObjectID();
console.log(id);

MongoClient.connect(connectionURL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  // db.collection('users').insertOne(
  //   {
  //     name: `Mo'men`,
  //     age: 23
  //   },
  //   (err, result) => {
  //     assert.equal(err, null);

  //     console.log(result.ops);
  //   }
  // );

  // db.collection('users').insertMany(
  //   [
  //     {
  //       name: 'Amr',
  //       age: 23
  //     },
  //     {
  //       name: 'Menna',
  //       age: 22
  //     }
  //   ],
  //   (err, result) => {
  //     assert.equal(err, null);

  //     console.log(result.ops);
  //   }
  // );

  // db.collection('tasks').insertMany(
  //   [
  //     {
  //       description: 'Task 1',
  //       completed: false
  //     },
  //     {
  //       description: 'Task 2',
  //       completed: true
  //     },
  //     {
  //       description: 'Task 3',
  //       completed: false
  //     }
  //   ],
  //   (err, result) => {
  //     assert.equal(err, null);

  //     console.log(result.ops);
  //   }
  // );
});

const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionURL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  db.collection('users').findOne({ name: `Mo'men` }, (err, user) => {
    if (err) return console.log('Unable to fetch');

    console.log(user);
  });

  db.collection('users')
    .find({ age: 23 })
    .toArray((err, users) => {
      if (err) return console.log('Unable to fetch');

      console.log(users);
    });

  // db.collection('tasks').findOne(
  //   {
  //     _id: new ObjectID('5e7365b463a24a45e48c308f')
  //   },
  //   (err, task) => {
  //     if (err) return console.log('Unable to fetch');

  //     console.log(task);
  //   }
  // );

  // db.collection('tasks')
  //   .find({ completed: false })
  //   .toArray((err, tasks) => {
  //     if (err) return console.log('Unable to fetch');

  //     console.log(tasks);
  //   });
  client.close();
});

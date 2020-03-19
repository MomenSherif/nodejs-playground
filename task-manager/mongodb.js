const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');

const connectionURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

MongoClient.connect(connectionURL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  // db.collection('users')
  //   .updateOne(
  //     {
  //       _id: new ObjectID('5e735d22a3c39c0df47dbdbf')
  //     },
  //     {
  //       $set: {
  //         name: 'Hamada'
  //       }
  //     }
  //   )
  //   .then(result => console.log(result))
  //   .catch(err => console.log(err));

  db.collection('tasks')
    .updateMany(
      { completed: false },
      {
        $set: {
          completed: true
        }
      }
    )
    .then(result => console.log(result))
    .catch(err => console.log(err));
  client.close();
});

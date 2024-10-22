const db = require('../config/db');
const { User, Item } = require('../models');
const userSeeds = require('./userSeeds.json');
const itemSeeds = require('./itemSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Item', 'items');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < itemSeeds.length; i++) {
      const { _id, item} = await Item(itemSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: itemUser },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

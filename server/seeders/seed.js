// server/seeders/seed.js
const db = require('../config/db'); // Importing Mongoose connection
const { User, Item } = require('../models');
const userSeeds = require('./userSeeds.json');
const itemSeeds = require('./itemSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        // Clean 'Item' collection
        await cleanDB('Item', 'items');

        // Clean 'User' collection
        await cleanDB('User', 'users');

        // Create users from seed data
        await User.create(userSeeds);

        // Create items from seed data and associate with users
        for (let i = 0; i < itemSeeds.length; i++) {
            const item = await Item.create(itemSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: item.itemUser },
                { $addToSet: { items: item._id } }
            );
        }
        console.log('All done!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});

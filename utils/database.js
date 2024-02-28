const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        const connectionString = process.env.CONN_URL || 'mongodb://localhost:27017/crawler';
        await mongoose.connect(connectionString);
    } catch (error) {
        console.error(error.message);
        throw new Error('DB_ERROR');
    }
};

module.exports = connectToDatabase;

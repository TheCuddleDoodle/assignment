const mongoose = require('mongoose');
const config = require('config');

const db = 'mongodb+srv://admin:f1restorm19091@vms-cluster.vdgmq.mongodb.net/vms?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB successfully connected');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

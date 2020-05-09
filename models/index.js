const mongoose = require('mongoose');
const dbUrl = process.env.MONGO_URI;

//Connect to DB
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(`MongoDB connection error: ${err}`))

module.export = {
    User: require('./User'),
    Dispensary: require('./Dispensary')
}
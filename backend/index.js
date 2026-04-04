require('dotenv').config();
const { connectDB } = require('./src/config/db');
const app = require('./src/app.js')


connectDB(process.env.MONGODB_URL);



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
const express = require('express');

const cors = require('cors');
const authRoutes=require('./routes/auth');
require('dotenv').config();
const connectDB = require('./db.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);



app.get('/',(req,res)=>{
  res.send("api is running...")

});
const PORT = process.env.PORT || 5000;

// app.listen(PORT,()=>{
//   console.log(`server is running on port ${PORT}`)
// });

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to DB:', err);
    process.exit(1);
  
  }
};



startServer();

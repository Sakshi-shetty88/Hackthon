require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_ORIGIN || '*',
    methods: ['GET','POST','PATCH']
  }
});

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true }));
app.use(express.json());
app.use(rateLimit({ windowMs: 10*1000, max: 20 })); // basic rate limit

// Import and use incident routes
const incidentRoutes = require('./routes/incidentRoutes');
app.use(incidentRoutes);

// ADD YOUR OTHER ROUTES HERE IF YOU HAVE THEM
// For example:
// const authRoutes = require('./routes/authRoutes'); 
// app.use('/api/auth', authRoutes);

app.locals.io = io; // make io accessible in routes

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log('✅ MongoDB Connected');
}).catch(err => console.error('❌ MongoDB Error:', err));

// socket handling
io.on('connection', (socket) => {
  console.log('🔌 Socket connected:', socket.id);
  
  socket.on('identify', (payload) => {
    try {
      const jwt = require('jsonwebtoken');
      if (payload && payload.token) {
        const p = jwt.verify(payload.token, process.env.JWT_SECRET);
        if (p && p.role === 'admin') {
          socket.join('admins');
          console.log('👤 User joined admins:', socket.id);
        }
        if (p && p.id) socket.join(String(p.id));
      }
    } catch (err) {
      // ignore
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
  console.log(`📍 http://localhost:${port}`);
});

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const produkRoutes = require('./routes/produkroutes');
const userRoutes = require('./routes/userroutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// FUNGSI SAKTI: Memastikan koneksi database awan aman sebelum rute dibuka
const sambungDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  const urlDatabase = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/belajar_backend';
  try {
    await mongoose.connect(urlDatabase, {
      serverSelectionTimeoutMS: 5000 // Membatasi waktu tunggu agar tidak timeout
    });
    console.log('✅ Terhubung ke database MongoDB Atlas!');
  } catch (err) {
    console.error('❌ Gagal koneksi database:', err);
  }
};

// Pasang fungsi database sebagai middleware agar Vercel mendeteksinya setiap saat
app.use(async (req, res, next) => {
  await sambungDatabase();
  next();
});

app.use('/produk', produkRoutes);
app.use('/auth', userRoutes);

// Rute cadangan agar halaman beranda utama tidak memunculkan error 404
app.get('/', (req, res) => {
  res.send('🚀 Server Backend Utama Aktif!');
});

app.listen(port, () => {
    console.log(`🚀 Server jalan di port ${port}`);
});

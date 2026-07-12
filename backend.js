require('dotenv').config(); //memanggil file .env agar bisa digunakan di file backend.js

const express = require('express');      //kode standar untuk menyalakan server express
const mongoose = require('mongoose');   //kode untuk menghubungkan ke database MongoDB
const produkRoutes = require('./routes/produkroutes'); // Semua permintaan yang diawali dengan alamat /produk (misal: /produk, /produk/:id) akan dilempar dan diurus oleh file produkroutes.js.
const userroutes =require('./routes/userroutes'); 

//Fungsi Express dijalankan dan hasilnya dimasukkan ke dalam variabel app. 
const app = express();
// memanggil middleware express.json() agar server bisa membaca data JSON yang dikirim dari client (misal: Thunder Client, Postman, atau aplikasi frontend). Tanpa ini, server tidak akan bisa membaca data JSON yang dikirim lewat body request.
const port = process.env.PORT || 3000;

app.use(express.json());        


// mengubah url database MongoDB dari file .env menjadi variabel MONGO_URI
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Berhasil terhubung ke database MongoDB!'))
  .catch(err => console.error('❌ Gagal konek ke database:', err));

// Semua permintaan yang diawali dengan alamat /produk (misal: /produk, /produk/:id) akan dilempar dan diurus oleh file produkroutes.js.
app.use('/produk', produkRoutes);
app.use('/auth', userroutes);  

// menjalankan server di port 3000
    
app.listen(port, () => {
    console.log(`🚀 Server jalan di http://localhost:${port}`);
});

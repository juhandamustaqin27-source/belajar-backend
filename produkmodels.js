//membuat aturan main data(schemua) sebelum dimasukkan ke database
const mongoose = require('mongoose'); // memanggil databases mongodb

const produkSchema = new mongoose.Schema({  //Perintah untuk membuat kertas blueprint atau cetakan baru bernama produkSchema. Di dalam kurung kurawal, kita sebutkan kolom-kolom apa saja yang wajib dimiliki oleh sebuah "Produk".
    nama: { type: String, required: true }, // Mengunci tipe data. Kolom nama wajib diisi berupa Teks/Karakter (String). Jika Thunder Client mengirim angka tanpa kutip, Mongoose akan otomatis menegurnya.required: true: Ini adalah status Wajib Isi. Jika pelanggan mencoba mengirim data produk baru lewat rute POST tapi tab Body-nya kosong atau lupa menulis kata "nama", database akan langsung menolak mentah-mentah transaksi tersebut karena dianggap tidak lengkap.
    harga: { type: Number, required: true } 
});

module.exports = mongoose.model('Produk', produkSchema);//mengekspor objek Mongoose Model

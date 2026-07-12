// Kita memanggil kembali Express, tetapi kali ini kita tidak membuat aplikasi baru (express()), melainkan hanya meminjam fitur percabangan jalurnya saja.
const express = require('express'); //melakukan require() terhadap file controller untuk mengambil fungsi-fungsi tersebut, memasukkannya ke dalam jalur HTTP Express (router.post / router.get), lalu mengekspor objek router tersebut.
const router = express.Router();  // express.Router(): Ini adalah mini-aplikasi terisolasi khusus untuk mengurus URL. Ibaratnya, jika backend.js adalah gedung pusat mall, maka router ini adalah sekat-sekat toko khusus (dalam hal ini, toko khusus bagian Produk).
const produkController = require('../controllers/produkcontrollers');   //artinya kita memerintahkan Node.js untuk mundur satu folder (keluar dari folder routes), lalu masuk ke folder controllers, dan mengambil file produkcontrollers.js.

// Artinya, semua kode rute di file ini otomatis sudah diawali dengan kata /produk. Oleh karena itu, di dalam file ini kita cukup menulis tanda garis miring / saja sebagai ujung jalurnya.
router.post('/', produkController.tambahProduk); //Kalau ada orang nembak URL produk dengan aksi MINTA DATA (GET), Pelayan langsung lari ke dapur manggil Koki buat nyari dan nampilin semua barang dari gudang database."
router.get('/', produkController.ambilSemuaProduk); //Saat Anda mengetik data nama baju dan harga di tab Body (JSON) Thunder Client lalu menekan Send. Anda sedang menyetor barang baru untuk disimpan permanen ke database.

module.exports = router; // 

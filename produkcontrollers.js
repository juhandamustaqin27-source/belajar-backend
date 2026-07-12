const Produk = require('../models/produkmodels'); //mengambil apa pun nilai yang telah diekspor oleh file tersebut melalui module.exports.

// fungsi untuk menyimpan data (POST)
exports.tambahProduk = async (req, res) => {
    try {
        const produkBaru = new Produk({ nama: req.body.nama, harga: req.body.harga });
        await produkBaru.save();
        res.status(201).json({ pesan: "Data produk berhasil disimpan!", data: produkBaru });
    } catch (error) {
        res.status(500).json({ pesan: "Terjadi kesalahan", error: error.message });
    }
};

// fungsi untuk mengambil semua data (GET)
exports.ambilSemuaProduk = async (req, res) => {
    try {
        const semuaProduk = await Produk.find();
        res.status(200).json({ pesan: "Semua data produk berhasil diambil!", data: semuaProduk });
    } catch (error) {
        res.status(500).json({ pesan: "Gagal mengambil data", error: error.message });
    }
};

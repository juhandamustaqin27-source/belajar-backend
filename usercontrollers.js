const User = require('../models/usermodels'); // Jalur pas ke file model user baru
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Cek apakah username sudah ada di database
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ pesan: "Username sudah terdaftar!" });
        }

        // 2. Acak password agar aman
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        // 3. Simpan data user baru
        const userBaru = new User({ username, password: hashedPassword });
        await userBaru.save();

        res.status(201).json({ pesan: "Registrasi user berhasil!" });
    } catch (error) {
        res.status(500).json({ pesan: "Gagal registrasi", error: error.message });
    }
};

// Fungsi Login Akun
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Cari user di database berdasarkan username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ pesan: "Username tidak ditemukan!" });
        }

        // 2. Bandingkan password asli kiriman user dengan password acak di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ pesan: "Password salah!" });
        }

        // Jika cocok semua, kirim respon sukses
        res.status(200).json({ 
            pesan: "Login berhasil! Selamat datang kembali.",
            user: { id: user._id, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ pesan: "Gagal login", error: error.message });
    }
};

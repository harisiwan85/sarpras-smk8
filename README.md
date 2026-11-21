# SarprasHub SMKN 6 Tebo — Sistem Manajemen Peminjaman Sarana & Prasarana

**SarprasHub** adalah aplikasi web manajemen peminjaman sarana, prasarana, dan inventaris resmi **SMK Negeri 6 Tebo** (Jl. Garuda RT. 15 / RW. 07, Desa Sapta Mulia, Kec. Rimbo Bujang, Kab. Tebo, Jambi 37553 · NPSN `10508365`) berbasis **React 19**, **Vite**, **Tailwind CSS v4**, dan **Firebase Cloud Firestore** (`sarprashub-79e88`).

Menu **Pengaturan Pengguna** dan tombol unduh paket ZIP disembunyikan bagi pengunjung umum dan hanya tampil setelah login sebagai **Admin**.

Paket kode ini sudah disusun lengkap agar siap diunggah ke **GitHub** melalui browser tanpa perintah CMD/PowerShell, lalu ditayangkan **online 24 jam** di **Vercel** maupun **Firebase Hosting**.

---

## Fitur Utama

- **Dasbor Ketersediaan Real-Time**: Ringkasan jumlah aset, ruangan, statistik peminjaman, dan tren sirkulasi.
- **Katalog Peminjaman Publik**: Pengunjung dapat mencari aset, melihat stok tersedia, dan mengajukan peminjaman secara daring.
- **Sirkulasi & Verifikasi Admin**: Persetujuan/penolakan pinjaman, serah terima aset, pengembalian, serta cetak **Kartu Peminjaman PDF** resmi otomatis.
- **Inventaris & Label Barcode (Khusus Admin)**: Tambah/edit/hapus barang & ruangan serta cetak label stiker barcode aset.
- **Sinkronisasi Firebase (`sarprashub-79e88`) + Mode Lokal Aman**: Terhubung otomatis ke Cloud Firestore dan tetap menyimpan cadangan di `localStorage` browser bila aturan cloud belum dibuka.

---

## Cara Upload ke GitHub & Tayang Online 24 Jam (Tanpa CMD / Terminal)

### Langkah 1: Ekstrak File ZIP
1. Ekstrak seluruh isi berkas `sarprashub-project.zip` ke sebuah folder di komputer Anda (misalnya folder `sarprashub`).
2. Pastikan file `package.json`, `vercel.json`, `firebase.json`, `firebase-applet-config.json`, `firestore.rules`, dan folder `src/` terlihat langsung di dalam folder tersebut.

### Langkah 2: Unggah ke GitHub Lewat Browser
1. Buka [github.com](https://github.com) dan login ke akun GitHub Anda.
2. Klik ikon `+` di kanan atas ➔ **New repository**.
3. Isi nama repositori (misalnya `sarprashub-web`).
4. **Disarankan pilih `Private`** karena paket ini sudah menyertakan konfigurasi proyek Firebase `sarprashub-79e88`.
5. Klik **Create repository** (biarkan tanpa mencentang README atau `.gitignore`).
6. Pada halaman repositori baru, klik tautan **uploading an existing file**.
7. Seret (*drag and drop*) **semua isi di dalam folder** hasil ekstrak tadi (bukan folder induknya) ke area upload GitHub, tunggu hingga seluruh berkas selesai diunggah, lalu klik **Commit changes**.

### Langkah 3: Publikasi Online 24 Jam di Vercel
1. Buka [vercel.com](https://vercel.com) dan masuk menggunakan akun GitHub Anda.
2. Klik **Add New...** ➔ **Project**.
3. Pilih repositori `sarprashub-web` yang baru saja diunggah, lalu klik **Import**.
4. Pengaturan build otomatis terdeteksi dari `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **Deploy**. Dalam ~1 menit, situs Anda langsung online 24 jam di URL `.vercel.app` (setiap pembaruan di GitHub otomatis memperbarui situs).

### Langkah 4: Aktifkan Rules & Domain di Firebase Console (`sarprashub-79e88`)
Agar semua pengunjung yang membuka web 24 jam bisa membaca & menyimpan data ke Cloud Firestore serta login Google dengan lancar:
1. Buka [Firebase Console](https://console.firebase.google.com/project/sarprashub-79e88/firestore/rules).
2. Salin seluruh isi file `firestore.rules` (atau gunakan tombol **Salin Aturan Firestore Rules** di menu **Pengaturan Pengguna** dalam aplikasi).
3. Tempel ke editor Rules lalu klik **Publish**.
4. Buka **Authentication ➔ Settings ➔ Authorized domains**, lalu tambahkan domain situs Vercel Anda (contoh: `sarprashub-web.vercel.app`).

---

## Opsi Alternatif: Deploy ke Firebase Hosting (`sarprashub-79e88`)

Proyek sudah menyertakan `firebase.json` dan `.firebaserc` yang terhubung ke `sarprashub-79e88`. Jika suatu saat ingin mempublikasikan langsung ke CDN Firebase Hosting (`.web.app`):

```bash
npm install
npm run build
npx firebase-tools login
npx firebase-tools deploy --only hosting,firestore:rules
```

---

## Skrip Pengembang & Struktur Paket

```text
sarprashub/
├── .firebaserc                   # Target proyek Firebase: sarprashub-79e88
├── .github/workflows/deploy.yml  # Cek lint & build otomatis di GitHub Actions
├── DEPLOYMENT.md                 # Panduan lengkap deploy Vercel & Firebase
├── firebase-applet-config.json   # Kredensial Firebase Web SDK (sarprashub-79e88)
├── firebase-blueprint.json       # Skema koleksi Firestore
├── firebase.json                 # Konfigurasi Firebase Hosting & Firestore Rules
├── firestore.rules               # Aturan akses database Firestore
├── index.html                    # Entry point HTML & Google Fonts
├── package.json                  # Daftar dependensi & skrip build
├── public/assets/                # Aset gambar statis
├── scripts/create-zip.mjs        # Skrip pembuat paket ZIP bersih
├── src/                          # Source code aplikasi React + TypeScript
├── tsconfig.json                 # Konfigurasi TypeScript
├── vercel.json                   # Konfigurasi build & SPA routing Vercel
└── vite.config.ts                # Konfigurasi bundler Vite
```

- `npm run dev` — Menjalankan server pengembangan lokal pada port `3000`
- `npm run lint` — Memeriksa tipe TypeScript (`tsc --noEmit`)
- `npm run build` — Membangun berkas produksi ke folder `dist/`
- `npm run package:zip` — Mengemas ulang kode proyek menjadi `public/sarprashub-project.zip`

## Kredensial Admin Bawaan

- **Username**: `admin`
- **Password**: `admin123`

Segera ubah password admin melalui menu **Pengaturan Pengguna ➔ Ubah Password Admin** setelah aplikasi aktif online.

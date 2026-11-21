# Panduan Lengkap Publikasi SarprasHub ke GitHub, Vercel & Firebase (`sarprashub-79e88`)

Panduan lengkap untuk mengunggah paket ZIP **SarprasHub** ke **GitHub** melalui browser dan menayangkannya secara **online 24 jam** di **Vercel** atau **Firebase Hosting**.

---

## Ringkasan File Konfigurasi yang Tersedia

1. `vercel.json` ➔ Konfigurasi build Vite (`dist`) dan *Single Page Application (SPA)* routing untuk **Vercel**.
2. `firebase.json` & `.firebaserc` ➔ Sudah diarahkan langsung ke proyek **`sarprashub-79e88`** untuk **Firebase Hosting** dan **Firestore Rules**.
3. `firebase-applet-config.json` ➔ Kredensial aktif proyek **`sarprashub-79e88`** agar langsung terhubung tanpa edit ulang.
4. `firestore.rules` ➔ Aturan akses koleksi `sarpras_items`, `sarpras_loans`, dan `sarpras_notifications`.
5. `.github/workflows/deploy.yml` ➔ Pemeriksaan tipe TypeScript (`npm run lint`) dan build otomatis di **GitHub Actions**.

---

## BAGIAN 1: Upload ke GitHub Lewat Browser (Tanpa CMD / PowerShell)

### Langkah 1: Ekstrak Paket ZIP
1. Unduh `sarprashub-project.zip` dari tombol **Unduh ZIP** di aplikasi.
2. Klik kanan file ZIP lalu pilih **Extract All** (Windows) atau klik ganda (macOS) hingga muncul folder proyek lengkap.

### Langkah 2: Buat Repositori Baru di GitHub
1. Buka [github.com](https://github.com) dan login ke akun Anda.
2. Klik ikon `+` di kanan atas lalu pilih **New repository**.
3. Beri nama repositori, misalnya `sarprashub-web`.
4. **Pilih visibilitas `Private`** (direkomendasikan agar konfigurasi Firebase Anda tetap terlindungi).
5. Jangan centang opsi *"Add a README file"* maupun *".gitignore"* karena keduanya sudah ada di dalam paket ZIP.
6. Klik **Create repository**.

### Langkah 3: Drag & Drop File Lewat Browser
1. Di halaman repositori baru, klik tautan **uploading an existing file**.
2. Buka folder hasil ekstrak di komputer Anda, pilih **semua file dan subfolder di dalamnya** (`Ctrl+A` / `Cmd+A`), lalu seret ke halaman upload browser GitHub.
3. Tunggu hingga daftar file selesai diunggah, isi pesan commit (misalnya `Initial upload SarprasHub`), lalu klik **Commit changes**.

*(Catatan: Untuk pengguna yang nyaman memakai terminal, perintah standar `git init && git add . && git commit -m "init" && git push -u origin main` juga tetap didukung penuh.)*

---

## BAGIAN 2: Tayangkan Online 24 Jam di Vercel (Via Browser)

Vercel menayangkan website Anda secara aktif 24/7 melalui CDN global dan otomatis melakukan *deploy* ulang setiap kali repositori GitHub diperbarui.

1. Buka [vercel.com](https://vercel.com) dan login dengan akun **GitHub** Anda.
2. Di Dashboard Vercel, klik **Add New...** ➔ **Project**.
3. Klik **Import** pada repositori `sarprashub-web`.
4. Pastikan pengaturan berikut sesuai (biasanya terisi otomatis dari `vercel.json`):
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **Deploy** dan tunggu sekitar 30–60 detik hingga URL publik `.vercel.app` aktif.

---

## BAGIAN 3: Sinkronisasi Akhir Firebase (`sarprashub-79e88`)

Agar database cloud tetap tersinkronisasi 24 jam saat ada pengunjung baru:

1. **Publikasikan Firestore Rules**:
   - Buka [Firebase Console ➔ Firestore Database ➔ Rules](https://console.firebase.google.com/project/sarprashub-79e88/firestore/rules).
   - Salin isi berkas `firestore.rules` (atau klik tombol **Salin Aturan Firestore Rules** di menu **Pengaturan Pengguna** dalam aplikasi), tempel ke editor, lalu klik **Publish**.
2. **Daftarkan Domain Hosting di Google Auth**:
   - Buka [Firebase Console ➔ Authentication ➔ Settings ➔ Authorized domains](https://console.firebase.google.com/project/sarprashub-79e88/authentication/settings).
   - Klik **Add domain**, lalu masukkan domain `.vercel.app` (atau domain custom) Anda agar tombol **Masuk dengan Akun Google** berjalan normal.

---

## BAGIAN 4: Opsi Deploy ke Firebase Hosting (`sarprashub-79e88`)

File `.firebaserc` dan `firebase.json` sudah dikonfigurasi untuk proyek `sarprashub-79e88`. Jika Anda ingin menayangkan aplikasi di domain `.web.app` milik Google Firebase:

```bash
npm install
npm run build
npm install -g firebase-tools
firebase login
firebase deploy --only hosting,firestore:rules
```

Setelah selesai, aplikasi akan langsung aktif 24 jam pada:
`https://sarprashub-79e88.web.app`

---

## Kredensial Admin Bawaan

- **Akses Pengunjung**: Bebas melihat katalog aset, mengajukan peminjaman, dan mencetak kartu bukti PDF setelah disetujui.
- **Login Petugas/Admin**:
  - **Username**: `admin`
  - **Password**: `admin123`
- Password admin dapat diubah kapan saja di menu **Pengaturan Pengguna**.

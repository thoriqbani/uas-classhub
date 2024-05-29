-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 27, 2024 at 11:54 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uas-classhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `id` int NOT NULL,
  `hari` enum('senin','selasa','rabu','kamis','jumat','sabtu') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `jam_awal` time NOT NULL,
  `jam_akhir` time NOT NULL,
  `user_id` int NOT NULL,
  `mapel_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`id`, `hari`, `jam_awal`, `jam_akhir`, `user_id`, `mapel_id`) VALUES
(1, 'senin', '07:40:00', '09:00:00', 2, 2),
(5, 'senin', '09:30:00', '10:10:00', 2, 15),
(6, 'senin', '10:10:00', '11:30:00', 2, 16),
(7, 'senin', '12:00:00', '13:20:00', 2, 17),
(8, 'selasa', '06:50:00', '08:20:00', 2, 18),
(10, 'selasa', '10:10:00', '11:30:00', 6, 20),
(12, 'rabu', '06:50:00', '07:40:00', 2, 22),
(13, 'rabu', '07:40:00', '09:00:00', 2, 23),
(14, 'rabu', '09:30:00', '10:50:00', 2, 24),
(16, 'kamis', '06:50:00', '07:40:00', 4, 26),
(17, 'kamis', '07:40:00', '09:00:00', 6, 2),
(18, 'kamis', '09:30:00', '10:50:00', 2, 28),
(21, 'jumat', '07:40:00', '08:50:00', 2, 31);

-- --------------------------------------------------------

--
-- Table structure for table `materi`
--

CREATE TABLE `materi` (
  `id` int NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `file_materi` varchar(255) NOT NULL,
  `status` enum('complete','uncomplete') NOT NULL,
  `user_id` int NOT NULL,
  `mapel_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `materi`
--

INSERT INTO `materi` (`id`, `judul`, `deskripsi`, `file_materi`, `status`, `user_id`, `mapel_id`) VALUES
(1, 'Catatan Harian', 'Tolong liat tugas catatan harian', '1716785736728.docx', 'complete', 6, 20),
(2, 'DNS Server', 'Tolong baca dengan benar DNS Server nya !!', '1716788686974.docx', 'complete', 6, 20),
(3, 'Catatan Harian', 'Tolong buatkan tugas catatan harian', '1716789253504.docx', 'complete', 6, 20),
(4, 'Catatan Harian', 'Tolong buatkan tugas catatan harian', '1716789418895.docx', 'complete', 6, 20);

-- --------------------------------------------------------

--
-- Table structure for table `pelajaran`
--

CREATE TABLE `pelajaran` (
  `id` int NOT NULL,
  `nama_mapel` varchar(100) NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pelajaran`
--

INSERT INTO `pelajaran` (`id`, `nama_mapel`, `user_id`) VALUES
(1, 'Matematika', 2),
(2, 'Bahasa Indonesia', 2),
(15, 'Prakarya', 2),
(16, 'Ilmu Pengetahuan Alam', 2),
(17, 'Ilmu Pengetahuan Sosial', 2),
(18, 'Pendidikan Pancasila dan Kewarganegaraan', 2),
(20, 'Seni Budaya', 4),
(22, 'Bahasa Inggris', 2),
(23, 'Pendidikan Jasmani Olahraga dan Kesehatan', 2),
(24, 'Pendidikan Agama Islam\r\n', 2),
(26, 'Bahasa Madura', 4),
(28, 'Baca Tulis Al-Qur\'an', 2),
(31, 'Informatika', 2);

-- --------------------------------------------------------

--
-- Table structure for table `pengumpulan`
--

CREATE TABLE `pengumpulan` (
  `id` int NOT NULL,
  `file_tugas` varchar(255) NOT NULL,
  `status` enum('complete','uncomplete') NOT NULL,
  `tanggal_pengumpulan` date NOT NULL,
  `waktu_pengumpulan` time NOT NULL,
  `tugas_id` int NOT NULL,
  `user_id` int NOT NULL,
  `mapel_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `presensi`
--

CREATE TABLE `presensi` (
  `id` int NOT NULL,
  `tanggal_presensi` date NOT NULL,
  `jam_presensi` time NOT NULL,
  `status` enum('Sudah','Belum') NOT NULL,
  `user_id` int NOT NULL,
  `mapel_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `presensi`
--

INSERT INTO `presensi` (`id`, `tanggal_presensi`, `jam_presensi`, `status`, `user_id`, `mapel_id`) VALUES
(1, '2024-05-09', '17:19:00', 'Sudah', 1, 1),
(2, '2024-05-22', '10:36:00', 'Sudah', 1, 24),
(3, '2024-05-27', '10:28:00', 'Sudah', 1, 16);

-- --------------------------------------------------------

--
-- Table structure for table `tugas`
--

CREATE TABLE `tugas` (
  `id` int NOT NULL,
  `judul` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `file_tugas` varchar(255) NOT NULL,
  `tanggal_deadline` date NOT NULL,
  `waktu_deadline` time NOT NULL,
  `user_id` int NOT NULL,
  `mapel_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tugas`
--

INSERT INTO `tugas` (`id`, `judul`, `deskripsi`, `file_tugas`, `tanggal_deadline`, `waktu_deadline`, `user_id`, `mapel_id`) VALUES
(1, 'Catatan Harian', 'Tolong buatkan tugas catatan harian', 'connect c.docx', '2024-05-22', '06:11:00', 6, 20),
(2, 'Web Server', 'Tolong kerjakan dengan baik', 'tugas 3.docx', '2024-05-27', '13:05:00', 6, 20),
(3, 'Proxy Server', 'Tolong kerjakan dengan baik', 'tugas 6.docx', '2024-05-27', '13:27:00', 6, 20);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis_kelamin` enum('laki-laki','perempuan') NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `photos` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level_user` enum('siswa','guru') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `jenis_kelamin`, `tanggal_lahir`, `no_hp`, `photos`, `email`, `password`, `level_user`) VALUES
(1, 'M. Thoriq B. Q.', 'laki-laki', '2004-02-20', '088991239424', '1715880946016.jpg', 'tjrsgamers@gmail.com', '$2b$10$PE14i0nO4yyPIpCyZX.6K.uzvXkgfWACSmzo1whTK5ILzfpo5oWBW', 'siswa'),
(2, 'Fahrul Fadilah', 'laki-laki', '2004-02-20', '089515637099', '1714617324004.jpg', 'tawishi@gmail.com', '$2b$10$K/a7rA3ljb6.tRg7fEJJtumVQUnXtNXBPzsHtI/8XC6rFpp36zrym', 'guru'),
(3, 'Yae', 'perempuan', '2024-05-02', '089515637099', '1714636941519.png', 'user@gmail.com', '$2b$10$RyBeVkquxg8eTtaHMqjuIuVtp0Y1cKiK2HyzLDrdzNRRXmmQzSVTi', 'siswa'),
(4, 'Vrayoga Loreansa', 'laki-laki', '2003-10-12', '089531367437', '1715091923985.jpg', 'yoga@gmail.com', '$2b$10$wHV4MdTTAyBD31QTqYIVDudJaMxwTZaiT2I.b8uXPdzlMPn4SfUES', 'siswa'),
(5, 'Mohammad Thoriq Bani Qintoro', 'laki-laki', '2000-02-10', '088991239424', '1715244506213.jpeg', 'dedeksumenep@yahoo.com', '$2b$10$Mv3HR1Be7SQ/8v8c3Wzps.xsRoC1izuvFSgqjnJrfxmeWcMjSWgam', 'siswa'),
(6, 'Kadir Sumanto', 'laki-laki', '1990-01-10', '088991239424', '1716369370075.jpg', 'kadir@gmail.com', '$2b$10$jzF8cLC3uLtQ5cBvtNkrcOIoQCoYyg011d0QpOe54tUSmRP13zdN6', 'guru'),
(7, 'Tolak ivandi yudistiawan', 'laki-laki', '2003-05-16', '087867536462', '1715833459400.png', 'tolakivandi90@gmail.com', '$2b$10$STNLjls1MaksmotuVNJTDOzbPuVhFXGou.u06JXyqjCqZbcZij5J6', 'guru'),
(8, 'navi', 'laki-laki', '2005-12-07', '08787878398', '1715864910113.png', 'navi@gmail.com', '$2b$10$hZNVby5Apl3Y9l4h0AjJReGI9CVNlNLqa5zBDw8fP7NcBkGXaXWde', 'guru'),
(9, 'yudis', 'perempuan', '0007-12-08', '087846806757', '1715864974987.png', 'yudis@gmail.com', '$2b$10$iFZM5jNRjmB2796tXSpg.uruowdCjtB.YChBQTIx.HrJxNL/JP312', 'guru'),
(10, 'ivan', 'laki-laki', '2006-12-07', '089778675678', '1715865651861.png', 'ivan@gmail.com', '$2b$10$4s1LEh6cENRtFZcIz4SqLuGIlDzKozDuk5O.xJaJ8pFaku4aVD.T.', 'guru'),
(11, 'rizky', 'laki-laki', '2008-04-20', '087876797967', '1715865750865.png', 'rizky@gmail.com', '$2b$10$m5NLc4FXHHZFpPR40VpxyevD.5d.xEp70K1Vd/CzvKZP.olS7Tngu', 'guru'),
(12, 'dani', 'laki-laki', '2009-04-23', '087867536462', '1715866013359.png', 'dani@gmail.com', '$2b$10$Tb6EUqjl65YWoRmcRHIEIOd3Mzt4QfzdXue2xXL/LcSltUCODQcGC', 'guru'),
(13, 'alex', 'laki-laki', '2016-08-08', '087647876372', '1715866135232.png', 'alex@gmail.com', '$2b$10$7hT.aoygHV.ZitZ0i8pwTe30eGWymQxtMvUYV0zsxe5gRYFvO.lCS', 'guru'),
(14, 'Mohammad Thoriq Bani Qintoro', 'laki-laki', '2003-01-20', '088991239424', '1716010346833.jpg', 'tjrsgamer@gmail.com', '$2b$10$SAKqEenq6LXsLScUCUg/IeE.Pki67F3WXqU.sLUqUpGy9GhGW.cs2', 'guru');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `mapel_id` (`mapel_id`);

--
-- Indexes for table `materi`
--
ALTER TABLE `materi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `mapel_id` (`mapel_id`);

--
-- Indexes for table `pelajaran`
--
ALTER TABLE `pelajaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `pengumpulan`
--
ALTER TABLE `pengumpulan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tugas_id` (`tugas_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `mapel_id` (`mapel_id`);

--
-- Indexes for table `presensi`
--
ALTER TABLE `presensi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `mapel_id` (`mapel_id`);

--
-- Indexes for table `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `mapel_id` (`mapel_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `materi`
--
ALTER TABLE `materi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pelajaran`
--
ALTER TABLE `pelajaran`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `pengumpulan`
--
ALTER TABLE `pengumpulan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `presensi`
--
ALTER TABLE `presensi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD CONSTRAINT `jadwal_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `jadwal_ibfk_2` FOREIGN KEY (`mapel_id`) REFERENCES `pelajaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `materi`
--
ALTER TABLE `materi`
  ADD CONSTRAINT `materi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `materi_ibfk_2` FOREIGN KEY (`mapel_id`) REFERENCES `pelajaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pelajaran`
--
ALTER TABLE `pelajaran`
  ADD CONSTRAINT `pelajaran_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengumpulan`
--
ALTER TABLE `pengumpulan`
  ADD CONSTRAINT `pengumpulan_ibfk_1` FOREIGN KEY (`tugas_id`) REFERENCES `tugas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengumpulan_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pengumpulan_ibfk_3` FOREIGN KEY (`mapel_id`) REFERENCES `pelajaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `presensi`
--
ALTER TABLE `presensi`
  ADD CONSTRAINT `presensi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `presensi_ibfk_2` FOREIGN KEY (`mapel_id`) REFERENCES `pelajaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tugas`
--
ALTER TABLE `tugas`
  ADD CONSTRAINT `tugas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tugas_ibfk_2` FOREIGN KEY (`mapel_id`) REFERENCES `pelajaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

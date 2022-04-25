-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2022 at 05:56 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Product_name` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Price` int(50) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Product_name`, `Description`, `Price`, `Image`, `id`) VALUES
('Laptop', 'A product by ACER', 80000, 'Acer-Swift-1_SF114-33_Gold_modelmain.png', 6),
('Laptop', 'A product by Lenovo', 60000, '157226-laptops-review-microsoft-surface-laptop-4-review-image1-shvxgffygd.jpg', 12),
('Watch', 'A product by Realme', 18000, 'watch_realme.png', 14),
('Watch', 'A product by apple', 70000, '2_a25aff7a-b5c4-4565-a111-6e1ce2d5b5f0.png', 15),
('Watch', 'A product by apple', 18000, 'watch_realme.png', 16),
('Laptop', 'A product by ACER', 70000, 'hp-spectre-x360-14-press-1.jpg', 17),
('Laptop', 'A product by hp', 18000, '157226-laptops-review-microsoft-surface-laptop-4-review-image1-shvxgffygd.jpg', 18),
('Watch', 'A product by apple', 30000, 'watch_realme.png', 19),
('Laptop', 'A product by Del', 70000, '157226-laptops-review-microsoft-surface-laptop-4-review-image1-shvxgffygd.jpg', 20),
('Watch', 'A product by apple', 35000, '61WixzlVuXL._UL1280_.jpg', 21),
('Laptop', 'A product by ACER', 80000, 'Acer-Swift-1_SF114-33_Gold_modelmain.png', 22),
('Watch', 'A product by Realme', 18000, 'watch_realme.png', 23);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2022 at 08:31 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ebook`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `Id` int(255) NOT NULL,
  `userMail` varchar(255) NOT NULL,
  `Product_id` int(255) NOT NULL,
  `qnty` int(50) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`Id`, `userMail`, `Product_id`, `qnty`) VALUES
(10, 'anazksunil46@gmail.com', 1, 2),
(11, 'anazksunil46@gmail.com', 3, 1),
(12, 'anazksunil46@gmail.com', 6, 3),
(13, 'anazksunil46@gmail.com', 7, 1),
(14, 'anchu@gmail.com', 16, 1),
(15, 'anchu@gmail.com', 12, 1),
(16, 'anazksunil46@gmail.com', 12, 2),
(17, 'anazksunil46@gmail.com', 14, 1),
(18, 'anazksunil46@gmail.com', 15, 1),
(19, 'anazksunil46@gmail.com', 16, 1),
(20, 'anazksunil46@gmail.com', 17, 1),
(21, 'manu@gmail.com', 24, 2),
(22, 'manu@gmail.com', 27, 1);

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `userID` int(100) NOT NULL,
  `userName` varchar(100) NOT NULL,
  `userMail` varchar(100) NOT NULL,
  `authorId` varchar(100) NOT NULL,
  `authorName` varchar(100) NOT NULL,
  `id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`userID`, `userName`, `userMail`, `authorId`, `authorName`, `id`) VALUES
(1, 'anchu', 'anchu@gmail.com', '1', 'anchu@gmail.com', 7),
(1, 'anchu', 'anchu@gmail.com', '5', 'manu@gmail.com', 8),
(1, 'anchu', 'anchu@gmail.com', '6', 'cinu@gmail.com', 10),
(10, 'AnazKsunil', 'anazksunil46@gmail.com', '5', 'manu@gmail.com', 11),
(5, 'manu', 'manu@gmail.com', '10', 'anazksunil46@gmail.com', 17);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(100) NOT NULL,
  `autherID` int(100) NOT NULL,
  `pay` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `autherID`, `pay`, `name`) VALUES
(2, 5, '2000', 'anaz');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Product_name` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Price` varchar(50) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `id` int(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `userId` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Product_name`, `Description`, `Price`, `Image`, `id`, `username`, `userId`) VALUES
('Python', 'You Will Learn Python 3! Zed Shaw has perfected the world’s best system for learning Python 3. Follow it and you will succeed—just like the millions of beginners Zed has taught to date! You bring the discipline, commitment, and persistence; the author sup', 'dcBooks', 'python.jfif', 24, 'anchu', '1'),
('nodejs', 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.', 'dcBooks', 'Fundamentals-of-Node.png', 25, 'manu', '5'),
('php', 'PHP is a general-purpose scripting language geared toward web development. It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1994. The PHP reference implementation is now produced by The PHP Group.', 'dcBooks', 'php.png', 26, 'anchu', '1'),
('matLab', 'MATLAB is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interf', '3000dcBooks', 'matlab.jfif', 27, 'manu', '5'),
('AI', 'Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans.', 'dcBooks', 'ai.jpeg', 28, 'manu', '5'),
('ml', 'Machine learning is the study of computer algorithms that can improve automatically through experience and by the use of data. It is seen as a part of artificial intelligence', 'dcBooks', 'ml.jfif', 29, 'manu', '5'),
('knn', 'The objective of this chapter is to present a MapReduce solution using Spark for the kNN join algorithm. The kNN algorithm has been discussed extensively in many machine learning books, such as Machine Learning for Hackers[8] and Machine Learning in Actio', 'dcBooks', 'knn.jpg', 30, 'manu', '5'),
('knn', 'The objective of this chapter is to present a MapReduce solution using Spark for the kNN join algorithm. The kNN algorithm has been discussed extensively in many machine learning books, such as Machine Learning for Hackers[8] and Machine Learning in Actio', 'dcBooks', 'knn.jpg', 31, 'manu', '5'),
('HTML', 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.', 'dcBooks', 'html.png', 32, 'manu', '5'),
('html', 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.', 'dcBooks', 'html.png', 33, 'manu', '5'),
('node ', 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.', 'dc books', 'ml.jfif', 34, 'manu', '5');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mobile` int(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_name`, `email`, `mobile`, `pass`, `id`) VALUES
('manu', 'manu@gmail.com', 8854367, '222', 5),
('cinu', 'cinu@gmail.com', 7854367, '333', 6),
('AnazKsunil', 'anazksunil46@gmail.com', 98957858, '999', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `Id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

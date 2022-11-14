-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: LMS
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `book_id` int NOT NULL,
  `title` varchar(500) NOT NULL,
  `released_date` varchar(255) DEFAULT NULL,
  `edition` varchar(50) DEFAULT NULL,
  `author` varchar(100) NOT NULL,
  `cost` int DEFAULT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Help`
--

DROP TABLE IF EXISTS `Help`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Help` (
  `query_no` int NOT NULL,
  `student_id` int NOT NULL,
  `resolved_by` int NOT NULL,
  `query` varchar(2000) NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`query_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Help`
--

LOCK TABLES `Help` WRITE;
/*!40000 ALTER TABLE `Help` DISABLE KEYS */;
/*!40000 ALTER TABLE `Help` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Issued_Books`
--

DROP TABLE IF EXISTS `Issued_Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Issued_Books` (
  `book_id` int NOT NULL,
  `student_id` int NOT NULL,
  `issued_by` int NOT NULL,
  `due_date` varchar(20) NOT NULL,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`book_id`,`student_id`),
  KEY `student_id` (`student_id`),
  KEY `issued_by` (`issued_by`),
  CONSTRAINT `Issued_Books_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`),
  CONSTRAINT `Issued_Books_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Students` (`student_id`),
  CONSTRAINT `Issued_Books_ibfk_3` FOREIGN KEY (`issued_by`) REFERENCES `Staff` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Issued_Books`
--

LOCK TABLES `Issued_Books` WRITE;
/*!40000 ALTER TABLE `Issued_Books` DISABLE KEYS */;
/*!40000 ALTER TABLE `Issued_Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Requested_Books`
--

DROP TABLE IF EXISTS `Requested_Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Requested_Books` (
  `book_title` varchar(255) NOT NULL,
  `requested_by` int NOT NULL,
  `author` varchar(100) NOT NULL,
  `edition` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `approval` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`book_title`,`requested_by`),
  KEY `requested_by` (`requested_by`),
  CONSTRAINT `Requested_Books_ibfk_1` FOREIGN KEY (`requested_by`) REFERENCES `Students` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Requested_Books`
--

LOCK TABLES `Requested_Books` WRITE;
/*!40000 ALTER TABLE `Requested_Books` DISABLE KEYS */;
/*!40000 ALTER TABLE `Requested_Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Returned_Books`
--

DROP TABLE IF EXISTS `Returned_Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Returned_Books` (
  `book_id` int NOT NULL,
  `student_id` int NOT NULL,
  `issued_by` int NOT NULL,
  `due_date` varchar(100) NOT NULL,
  `returned_date` varchar(100) NOT NULL,
  `fine` int DEFAULT NULL,
  PRIMARY KEY (`book_id`,`student_id`),
  KEY `student_id` (`student_id`),
  KEY `issued_by` (`issued_by`),
  CONSTRAINT `Returned_Books_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `Books` (`book_id`),
  CONSTRAINT `Returned_Books_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `Students` (`student_id`),
  CONSTRAINT `Returned_Books_ibfk_3` FOREIGN KEY (`issued_by`) REFERENCES `Staff` (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Returned_Books`
--

LOCK TABLES `Returned_Books` WRITE;
/*!40000 ALTER TABLE `Returned_Books` DISABLE KEYS */;
/*!40000 ALTER TABLE `Returned_Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Staff`
--

DROP TABLE IF EXISTS `Staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Staff` (
  `staff_id` int NOT NULL,
  `name` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  PRIMARY KEY (`staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Staff`
--

LOCK TABLES `Staff` WRITE;
/*!40000 ALTER TABLE `Staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `Staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Students`
--

DROP TABLE IF EXISTS `Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Students` (
  `student_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `campus_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact_number` varchar(100) NOT NULL,
  `total_fine_due` int DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Students`
--

LOCK TABLES `Students` WRITE;
/*!40000 ALTER TABLE `Students` DISABLE KEYS */;
/*!40000 ALTER TABLE `Students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-12 20:38:43

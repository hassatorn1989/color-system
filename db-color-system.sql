/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.2-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: db-color-system
-- ------------------------------------------------------
-- Server version	11.8.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `id` char(36) NOT NULL,
  `group_color_id` char(36) NOT NULL,
  `priority` int(11) NOT NULL DEFAULT 11,
  `color` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `color` VALUES
('25e02872-f8e4-4ff6-a07c-29d8cb919682','b9f6d008-659e-4d60-9907-2df09682aeb8',8,'#2f9852',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('4cb751f2-bf17-4f15-9cd7-e3b4e024fbc0','b9f6d008-659e-4d60-9907-2df09682aeb8',1,'#0689cb',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('59ea76d4-d693-4ed7-99fa-0807b8cdcf93','b9f6d008-659e-4d60-9907-2df09682aeb8',11,'#2eb2aa',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('6195c209-18c4-469c-bc26-410135015ecc','f367b1d5-e565-44b2-a27d-d640b2215576',2,'#FFA07A',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('6866f62c-abab-4309-939f-e7f11ad2867f','f367b1d5-e565-44b2-a27d-d640b2215576',9,'#F08080',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('6f112bc6-74d0-40bc-94ea-03e240722934','f367b1d5-e565-44b2-a27d-d640b2215576',10,'#E9967A',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('79825d45-21eb-4d84-a9d1-4fe6a88b5d6d','b9f6d008-659e-4d60-9907-2df09682aeb8',3,'#c48282',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('79df7e50-7b27-41e4-b0e6-e79a9efc357d','b9f6d008-659e-4d60-9907-2df09682aeb8',6,'#873b3b',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('7a2a489f-e3d7-47fd-b046-3e8ae64896ac','f367b1d5-e565-44b2-a27d-d640b2215576',12,'#FF7F50',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('89d8982c-3184-4990-89a3-b1da84708d64','f367b1d5-e565-44b2-a27d-d640b2215576',5,'#8B0000',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('8a639b93-8f1e-4398-bf4d-527650a8f5bf','f367b1d5-e565-44b2-a27d-d640b2215576',11,'#FA8072',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('9f8a86b1-d476-4187-90d2-e4b7e39f03f7','f367b1d5-e565-44b2-a27d-d640b2215576',8,'#CD5C5C',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('a8bc8650-81e9-4c5d-a189-3f9377008dc5','f367b1d5-e565-44b2-a27d-d640b2215576',3,'#DC143C',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('b0a22a39-9351-4246-b417-40e77a144079','b9f6d008-659e-4d60-9907-2df09682aeb8',7,'#c36060',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('b419fffa-e83f-4dd8-a7fe-35c3f7828bad','b9f6d008-659e-4d60-9907-2df09682aeb8',2,'#5984c9',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('b426e078-3b6e-4276-8658-f4f0dd944fb5','b9f6d008-659e-4d60-9907-2df09682aeb8',5,'#caa0a0',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('cae9fdf4-ed13-43ec-9e39-1423685b4246','f367b1d5-e565-44b2-a27d-d640b2215576',7,'#FF4500',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('d6a82cfd-43e2-4a38-9682-5eaa97615bd0','b9f6d008-659e-4d60-9907-2df09682aeb8',10,'#2f6115',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('dbbafd78-4da3-4b44-8468-b9c7913197db','b9f6d008-659e-4d60-9907-2df09682aeb8',9,'#229147',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('e268d154-a11b-4e62-8985-b59907b48a85','f367b1d5-e565-44b2-a27d-d640b2215576',6,'#FF6347',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('e6ae654a-2c06-43e6-ac47-f282158fed7d','b9f6d008-659e-4d60-9907-2df09682aeb8',4,'#d28e8e',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('eda91b8a-faaa-43f1-b81a-7643b48891ef','b9f6d008-659e-4d60-9907-2df09682aeb8',12,'#4fc030',1,'admin','admin','2025-10-02 08:21:45','2025-10-02 08:21:45',NULL),
('f064f104-9af8-4049-8c3f-6592f6dc66d3','f367b1d5-e565-44b2-a27d-d640b2215576',1,'#FF0000',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL),
('f7ea06f0-696d-4da9-b36e-5117f3744910','f367b1d5-e565-44b2-a27d-d640b2215576',4,'#B22222',1,'System','System','2025-10-02 06:48:40','2025-10-02 06:48:40',NULL);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `group_color`
--

DROP TABLE IF EXISTS `group_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_color` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_color`
--

LOCK TABLES `group_color` WRITE;
/*!40000 ALTER TABLE `group_color` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `group_color` VALUES
('b9f6d008-659e-4d60-9907-2df09682aeb8','blue',1,'2025-10-02 08:21:42','2025-10-02 08:21:42',NULL),
('f367b1d5-e565-44b2-a27d-d640b2215576','Red',1,'2025-10-02 06:48:40','2025-10-02 06:48:40',NULL);
/*!40000 ALTER TABLE `group_color` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `migrations` VALUES
(1,'0001_01_01_000000_create_users_table',1),
(2,'0001_01_01_000001_create_cache_table',1),
(3,'0001_01_01_000002_create_jobs_table',1),
(4,'2025_09_18_180217_create_group_colors_table',1),
(5,'2025_09_19_091405_create_colors_table',1),
(6,'2025_09_20_102458_create_patterns_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `pattern`
--

DROP TABLE IF EXISTS `pattern`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pattern` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pattern`
--

LOCK TABLES `pattern` WRITE;
/*!40000 ALTER TABLE `pattern` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `pattern` VALUES
('c8efdc54-7ac2-40d6-bc9b-c46170a7d33f','aa','activity.svg','uploads/wJYYHSjWfks1ggkCEs8Ot8KbqkKN8ZcKGuMX1w8P.svg','admin','admin','2025-09-22 07:55:21','2025-09-22 07:55:21',NULL),
('d6d88704-f707-4026-87bd-caba756e6ab1','bb','donuts-cake-svgrepo-com.svg','uploads/rw7kyFiaXBOllkNLQMyMMTGFTDLCVMsJmpv8ZBMQ.svg','admin','admin','2025-09-23 01:59:02','2025-09-23 01:59:02',NULL);
/*!40000 ALTER TABLE `pattern` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
('d8f05fbf-9fa1-4154-8a86-b6b5f86ff497','admin','Administrator','$2y$12$VdtVyLrf2o2QFAwZ.9J1muALncnA123QMFjhvgdXQ2hSs/ZuHp7p6','admin',1,'2025-10-02 06:48:40','2025-10-02 06:48:40',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-12-08 23:31:32

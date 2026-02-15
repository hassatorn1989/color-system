-- MariaDB dump 10.19-11.4.0-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db_color
-- ------------------------------------------------------
-- Server version	11.4.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color` (
  `id` uuid NOT NULL,
  `group_color_id` uuid NOT NULL,
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
INSERT INTO `color` VALUES
('79e1e1f7-f168-4337-8358-0209f037b436','ae332de5-1c32-4498-8ee9-34dacbeb8232',1,'#705c5c',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('37dac06f-acf2-4f68-b93c-3521ae7dfe26','ae332de5-1c32-4498-8ee9-34dacbeb8232',8,'#c12525',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('c1f521a2-7021-44ef-ad34-3b23a992a864','ae332de5-1c32-4498-8ee9-34dacbeb8232',11,'#c44545',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('5f4f9f11-935a-4d6e-ad16-43efa4e6239d','0ced9ea8-0855-456e-b1f9-673efaad6fdd',4,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('9d769629-2dea-4f72-8868-4d223070d946','0ced9ea8-0855-456e-b1f9-673efaad6fdd',7,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('6dbd948a-1426-44da-a337-604b556c275a','ae332de5-1c32-4498-8ee9-34dacbeb8232',5,'#9f2d2d',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('7e60e6c9-e83b-4c98-8f14-64251f685c3b','0ced9ea8-0855-456e-b1f9-673efaad6fdd',2,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('4618c25b-5aea-40e6-ac3e-649818230f2e','0ced9ea8-0855-456e-b1f9-673efaad6fdd',9,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('42267ea4-157f-43ff-accf-7addc8ca01fe','ae332de5-1c32-4498-8ee9-34dacbeb8232',9,'#804747',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('3ad66bb3-44cd-4071-822b-86ffb837ceaa','0ced9ea8-0855-456e-b1f9-673efaad6fdd',5,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('f58b8b94-316f-499d-8cd2-8d68c76b6fb4','0ced9ea8-0855-456e-b1f9-673efaad6fdd',8,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('31c6c4d9-4eac-4b39-8afe-92b3264abb51','ae332de5-1c32-4498-8ee9-34dacbeb8232',7,'#9f5b5b',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('870ee6ce-5dc0-4f58-8dd4-96fe6b59818f','0ced9ea8-0855-456e-b1f9-673efaad6fdd',12,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('ecb90410-4740-455e-ae51-99c253d8620b','0ced9ea8-0855-456e-b1f9-673efaad6fdd',1,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('c0fd3a4d-3ab4-4bb4-acdc-a501f76f58a7','ae332de5-1c32-4498-8ee9-34dacbeb8232',4,'#943d3d',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('46303abf-102c-4ed5-af10-a5204879c3db','0ced9ea8-0855-456e-b1f9-673efaad6fdd',6,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('f6923b5c-ba51-4fcf-8638-c16ecfb67f7f','0ced9ea8-0855-456e-b1f9-673efaad6fdd',10,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('fb0f5e72-7451-4e91-9aaf-d05276c0ad54','0ced9ea8-0855-456e-b1f9-673efaad6fdd',11,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('1c71a0f4-a00e-467b-9fab-d16df7f07420','ae332de5-1c32-4498-8ee9-34dacbeb8232',2,'#04d212',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('255eada7-9921-43df-b451-d7cf8d0f4487','ae332de5-1c32-4498-8ee9-34dacbeb8232',3,'#7c18cd',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('ba891a99-b161-4280-a8a0-e38584a6a5e1','ae332de5-1c32-4498-8ee9-34dacbeb8232',12,'#a22525',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('07ca8caf-3880-4714-81f1-e54f02643dcf','0ced9ea8-0855-456e-b1f9-673efaad6fdd',3,'#000000',1,'admin','admin','2026-01-05 04:47:10','2026-01-05 04:47:10',NULL),
('a8b3cae9-4537-44df-ae94-f681b0e09b4c','ae332de5-1c32-4498-8ee9-34dacbeb8232',10,'#dd5f5f',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('c0fe12f5-3a97-4d49-8813-ff457db9fbcd','ae332de5-1c32-4498-8ee9-34dacbeb8232',6,'#000000',1,'admin','admin','2025-11-02 03:38:59','2025-11-02 03:38:59',NULL);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fabric_colors`
--

DROP TABLE IF EXISTS `fabric_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fabric_colors` (
  `id` uuid NOT NULL,
  `sub_fabric_color_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hex_code` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabric_colors`
--

LOCK TABLES `fabric_colors` WRITE;
/*!40000 ALTER TABLE `fabric_colors` DISABLE KEYS */;
INSERT INTO `fabric_colors` VALUES
('019c604c-dccf-713f-8a49-0d2831674e95','019c604c-dccb-7305-bf93-4909ce238042','22','#378190',1,'2026-02-15 00:56:15','2026-02-15 00:56:15',NULL),
('019c604c-dcd0-7132-80f7-f147559e15d6','019c604c-dccb-7305-bf93-4909ce238042','233','#941919',1,'2026-02-15 00:56:15','2026-02-15 00:56:15',NULL),
('019c604c-dcd0-7132-80f7-f14756826451','019c604c-dccb-7305-bf93-4909ce238042','33','#c21414',1,'2026-02-15 00:56:15','2026-02-15 00:56:15',NULL),
('019c604c-dcd1-7040-a2d4-c824cfcd933c','019c604c-dccb-7305-bf93-4909ce238042','33','#927c7c',1,'2026-02-15 00:56:15','2026-02-15 00:56:15',NULL),
('019c604d-0ac6-71d7-ac2e-d693fbda5946','019c604d-0abe-710e-ba9b-b760c60c4cbd','12344','#992929',1,'2026-02-15 00:56:27','2026-02-15 00:56:27',NULL),
('019c604d-0ac7-7097-bb48-dd9146af13aa','019c604d-0abe-710e-ba9b-b760c60c4cbd','22','#000000',1,'2026-02-15 00:56:27','2026-02-15 00:56:27',NULL),
('019c604d-0ac7-7097-bb48-dd9147550665','019c604d-0abe-710e-ba9b-b760c60c4cbd','22','#000000',1,'2026-02-15 00:56:27','2026-02-15 00:56:27',NULL),
('019c604d-0ac8-70fb-b7a2-62342f218aa4','019c604d-0abe-710e-ba9b-b760c60c4cbd','22','#000000',1,'2026-02-15 00:56:27','2026-02-15 00:56:27',NULL),
('019c604d-554c-72f4-b7d9-8a4b14a423bd','019c604d-5547-71e0-8ffb-116fdf898999','12344','#000000',1,'2026-02-15 00:56:46','2026-02-15 00:56:46',NULL),
('019c604d-554c-72f4-b7d9-8a4b14aeb45a','019c604d-5547-71e0-8ffb-116fdf898999','222','#000000',1,'2026-02-15 00:56:46','2026-02-15 00:56:46',NULL),
('019c604d-554d-72de-95c0-3d52997384df','019c604d-5547-71e0-8ffb-116fdf898999','22','#000000',1,'2026-02-15 00:56:46','2026-02-15 00:56:46',NULL),
('ae332de5-1c32-4498-8ee9-34dacbeb8232','','wewewewe','',1,'2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('0ced9ea8-0855-456e-b1f9-673efaad6fdd','','2323','',1,'2025-11-02 03:38:18','2026-01-05 04:47:10',NULL);
/*!40000 ALTER TABLE `fabric_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_color`
--

DROP TABLE IF EXISTS `group_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_color` (
  `id` uuid NOT NULL,
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
INSERT INTO `group_color` VALUES
('ae332de5-1c32-4498-8ee9-34dacbeb8232','wewewewe',1,'2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('0ced9ea8-0855-456e-b1f9-673efaad6fdd','2323',1,'2025-11-02 03:38:18','2026-01-05 04:47:10',NULL);
/*!40000 ALTER TABLE `group_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_fabric_colors`
--

DROP TABLE IF EXISTS `group_fabric_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_fabric_colors` (
  `id` uuid NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_fabric_colors`
--

LOCK TABLES `group_fabric_colors` WRITE;
/*!40000 ALTER TABLE `group_fabric_colors` DISABLE KEYS */;
INSERT INTO `group_fabric_colors` VALUES
('ae332de5-1c32-4498-8ee9-34dacbeb8232','wewewewe',1,'2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('0ced9ea8-0855-456e-b1f9-673efaad6fdd','2323',1,'2025-11-02 03:38:18','2026-01-05 04:47:10',NULL);
/*!40000 ALTER TABLE `group_fabric_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
INSERT INTO `migrations` VALUES
(1,'0001_01_01_000000_create_users_table',1),
(2,'0001_01_01_000001_create_cache_table',1),
(3,'0001_01_01_000002_create_jobs_table',1),
(4,'2025_09_18_180217_create_group_colors_table',1),
(5,'2025_09_19_091405_create_colors_table',1),
(6,'2025_09_20_102458_create_patterns_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pattern`
--

DROP TABLE IF EXISTS `pattern`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pattern` (
  `id` uuid NOT NULL,
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
INSERT INTO `pattern` VALUES
('6a705b59-aa53-4b93-9f8a-0bddb391d0cf','2323','2-square-fill.svg','uploads/RqrejjSy55Xh4FsLaOFBvIeKgpBafxfT0CrmyWsu.svg','admin','admin','2025-11-02 03:41:02','2025-11-02 03:41:02',NULL),
('34ed11fe-8c89-4384-a198-fe68b47172b3','ลายผ้าไทย','alien-svgrepo-com.svg','uploads/hopPY3pCKa2yR9AVgSMPESLU3RHcBm2pUhgwk30W.svg','admin','admin','2025-09-21 03:52:26','2025-09-21 08:44:13',NULL);
/*!40000 ALTER TABLE `pattern` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
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
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_fabric_colors`
--

DROP TABLE IF EXISTS `sub_fabric_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_fabric_colors` (
  `id` uuid NOT NULL,
  `group_fabric_color_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_fabric_colors`
--

LOCK TABLES `sub_fabric_colors` WRITE;
/*!40000 ALTER TABLE `sub_fabric_colors` DISABLE KEYS */;
INSERT INTO `sub_fabric_colors` VALUES
('019c604c-dccb-7305-bf93-4909ce238042','ae332de5-1c32-4498-8ee9-34dacbeb8232','test',1,'2026-02-15 00:56:15','2026-02-15 00:56:15',NULL),
('019c604d-0abe-710e-ba9b-b760c60c4cbd','ae332de5-1c32-4498-8ee9-34dacbeb8232','22',1,'2026-02-15 00:56:27','2026-02-15 00:56:27',NULL),
('019c604d-5547-71e0-8ffb-116fdf898999','0ced9ea8-0855-456e-b1f9-673efaad6fdd','222',1,'2026-02-15 00:56:46','2026-02-15 00:56:46',NULL),
('ae332de5-1c32-4498-8ee9-34dacbeb8232','','wewewewe',1,'2025-11-02 03:38:59','2025-11-02 03:38:59',NULL),
('0ced9ea8-0855-456e-b1f9-673efaad6fdd','','2323',1,'2025-11-02 03:38:18','2026-01-05 04:47:10',NULL);
/*!40000 ALTER TABLE `sub_fabric_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` uuid NOT NULL,
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
INSERT INTO `users` VALUES
('ab74ee6e-3414-4d9d-81ad-79627fc1591b','admin','Administrator','$2y$12$aFj0I2GczBrcmZXJWiNC9.UWswaZ1e4keSu3..QbUVVY0fr8elueK','admin',0,'2025-09-20 08:08:33','2025-11-02 03:38:03',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-15 16:18:34

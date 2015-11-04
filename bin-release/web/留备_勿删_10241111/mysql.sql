/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.27 : Database - dpx
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

/*Table structure for table `rarus_user` */

DROP TABLE IF EXISTS `rarus_user`;

CREATE TABLE `rarus_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userName` varchar(30) NOT NULL,
  `companyName` varchar(30) NOT NULL,
  `companyNature` varchar(30) NOT NULL,
  `industry` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `allowEmail` int(11) NOT NULL,
  `score` int(30) NOT NULL,
  `add_time` datetime NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `USERNAME` (`userName`),
  UNIQUE KEY `PHONE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dodo_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dodo_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dodo_db` DEFAULT CHARACTER SET utf8mb4 ;
USE `dodo_db` ;

-- -----------------------------------------------------
-- Table `dodo_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`users` (
  `seq` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(30) NULL,
  `profile_image` VARCHAR(255) NOT NULL,
  `auth_provider` VARCHAR(10) NOT NULL,
  `last_login_at` DATETIME NULL,
  `refresh_token` VARCHAR(255) NULL,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  PRIMARY KEY (`seq`),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`bucketlists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`bucketlists` (
  `seq` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `is_public` TINYINT NOT NULL DEFAULT 0,
  `type` VARCHAR(10) NOT NULL DEFAULT 'SINGLE' COMMENT 'SINGLE, GROUP',
  `is_default` TINYINT NULL DEFAULT 0,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `share_token` VARCHAR(10) NULL,
  `created_at` DATETIME NULL DEFAULT now(),
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  PRIMARY KEY (`seq`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`categories` (
  `seq` BIGINT NOT NULL AUTO_INCREMENT,
  `item` VARCHAR(50) NOT NULL,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  PRIMARY KEY (`seq`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`public_buckets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`public_buckets` (
  `seq` BIGINT NOT NULL AUTO_INCREMENT,
  `category_seq` BIGINT NULL,
  `emoji` VARCHAR(100) NULL,
  `title` VARCHAR(255) NOT NULL,
  `is_public` TINYINT NOT NULL DEFAULT 0,
  `added_count` BIGINT NOT NULL DEFAULT 1,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_by` BIGINT NULL,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  PRIMARY KEY (`seq`),
  INDEX `fk_public_buckets_categoires1_idx` (`category_seq` ASC) VISIBLE,
  CONSTRAINT `fk_public_buckets_categoires1`
    FOREIGN KEY (`category_seq`)
    REFERENCES `dodo_db`.`categories` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`added_buckets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`added_buckets` (
  `seq` BIGINT NOT NULL AUTO_INCREMENT,
  `bucket_seq` BIGINT NOT NULL,
  `bucketlist_seq` BIGINT NOT NULL,
  `is_complete` TINYINT NOT NULL,
  `emoji` VARCHAR(100) NULL,
  `d_day` VARCHAR(100) NULL,
  `location` VARCHAR(255) NULL,
  `desc` TEXT NULL,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  PRIMARY KEY (`seq`),
  INDEX `fk_added_buckets_public_buckets1_idx` (`bucket_seq` ASC) VISIBLE,
  INDEX `fk_added_buckets_bucketlists1_idx` (`bucketlist_seq` ASC) VISIBLE,
  CONSTRAINT `fk_added_buckets_public_buckets1`
    FOREIGN KEY (`bucket_seq`)
    REFERENCES `dodo_db`.`public_buckets` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_added_buckets_bucketlists1`
    FOREIGN KEY (`bucketlist_seq`)
    REFERENCES `dodo_db`.`bucketlists` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`exp_diaries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`exp_diaries` (
  `seq` BIGINT NOT NULL AUTO_INCREMENT,
  `bucket_seq` BIGINT NOT NULL,
  `content` TEXT NOT NULL,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  PRIMARY KEY (`seq`),
  INDEX `fk_exp_diaries_added_buckets1_idx` (`bucket_seq` ASC) VISIBLE,
  CONSTRAINT `fk_exp_diaries_added_buckets1`
    FOREIGN KEY (`bucket_seq`)
    REFERENCES `dodo_db`.`added_buckets` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`diary_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`diary_images` (
  `seq` BIGINT NOT NULL AUTO_INCREMENT,
  `diary_seq` BIGINT NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  PRIMARY KEY (`seq`),
  INDEX `fk_diary_images_exp_diaries1_idx` (`diary_seq` ASC) VISIBLE,
  CONSTRAINT `fk_diary_images_exp_diaries1`
    FOREIGN KEY (`diary_seq`)
    REFERENCES `dodo_db`.`exp_diaries` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`bookmarks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`bookmarks` (
  `user_seq` BIGINT NOT NULL,
  `bucketlist_seq` BIGINT NOT NULL,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  INDEX `fk_bookmarks_users_idx` (`user_seq` ASC) VISIBLE,
  INDEX `fk_bookmarks_bucketlists1_idx` (`bucketlist_seq` ASC) VISIBLE,
  PRIMARY KEY (`user_seq`, `bucketlist_seq`),
  CONSTRAINT `fk_bookmarks_users`
    FOREIGN KEY (`user_seq`)
    REFERENCES `dodo_db`.`users` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bookmarks_bucketlists1`
    FOREIGN KEY (`bucketlist_seq`)
    REFERENCES `dodo_db`.`bucketlists` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`bucketlist_members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`bucketlist_members` (
  `user_seq` BIGINT NOT NULL,
  `bucketlist_seq` BIGINT NOT NULL,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT now(),
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  INDEX `fk_bucketlist_members_users1_idx` (`user_seq` ASC) VISIBLE,
  INDEX `fk_bucketlist_members_bucketlists1_idx` (`bucketlist_seq` ASC) VISIBLE,
  PRIMARY KEY (`user_seq`, `bucketlist_seq`),
  CONSTRAINT `fk_bucketlist_members_users1`
    FOREIGN KEY (`user_seq`)
    REFERENCES `dodo_db`.`users` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_bucketlist_members_bucketlists1`
    FOREIGN KEY (`bucketlist_seq`)
    REFERENCES `dodo_db`.`bucketlists` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dodo_db`.`preferences`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dodo_db`.`preferences` (
  `seq` BIGINT NOT NULL AUTO_INCREMENT,
  `user_seq` BIGINT NOT NULL,
  `bucket_seq` BIGINT NOT NULL,
  `is_delete` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME NULL,
  `created_by` BIGINT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` BIGINT NULL,
  PRIMARY KEY (`seq`),
  INDEX `fk_preferences_users1_idx` (`user_seq` ASC) VISIBLE,
  INDEX `fk_preferences_public_buckets1_idx` (`bucket_seq` ASC) VISIBLE,
  CONSTRAINT `fk_preferences_users1`
    FOREIGN KEY (`user_seq`)
    REFERENCES `dodo_db`.`users` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_preferences_public_buckets1`
    FOREIGN KEY (`bucket_seq`)
    REFERENCES `dodo_db`.`public_buckets` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

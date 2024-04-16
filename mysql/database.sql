-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2024 at 12:00 PM
-- Server version: 8.0.23
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Database: `dbWebTaxiApi`
USE taxiWebApp;

-- Drop tables if they exist to ensure clean environment
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS driver;
DROP TABLE IF EXISTS user;

-- Table structure for table `driver`
CREATE TABLE driver (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    firstName     VARCHAR(255) NOT NULL,
    lastName      VARCHAR(255) NOT NULL,
    vehicleMake   VARCHAR(255) NOT NULL,
    vehicleModel  VARCHAR(255) NOT NULL,
    vehicleColour VARCHAR(50)  NOT NULL,
    vehiclePlate  VARCHAR(20)  NOT NULL,
    taxiNumber    VARCHAR(50)  NOT NULL,
    CONSTRAINT taxi_number UNIQUE (taxiNumber),
    CONSTRAINT vehicle_plate UNIQUE (vehiclePlate)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Table structure for table `user`
CREATE TABLE user (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName  VARCHAR(255) NOT NULL,
    email     VARCHAR(255) NOT NULL,
    phone     VARCHAR(255) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    deletedAt TIMESTAMP NULL,
    CONSTRAINT UQ_8e1f623798118e629b46a9e6299 UNIQUE (phone),
    CONSTRAINT UQ_e12875dfb3b1d92d7d7c5377e22 UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Table structure for table `trip`
CREATE TABLE trip (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    driverId            INT NULL,
    userId              INT NOT NULL,
    pickupLocation      TEXT NOT NULL,
    destinationLocation TEXT NOT NULL,
    createdAt           TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status              TINYINT NOT NULL,
    CONSTRAINT trip_ibfk_1 FOREIGN KEY (driverId) REFERENCES driver (id),
    CONSTRAINT trip_ibfk_2 FOREIGN KEY (userId) REFERENCES user (id),
    CONSTRAINT chk_status CHECK (status IN (1, 2, 3, 4, 5))
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE INDEX driverId ON trip (driverId);
CREATE INDEX userId ON trip (userId);


-- Insert driver data
INSERT INTO driver (
    firstName, 
    lastName, 
    vehicleMake, 
    vehicleModel, 
    vehicleColour, 
    vehiclePlate, 
    taxiNumber) VALUES
        ('João', 'Silva', 'Toyota', 'Corolla', 'Preto', 'ABC1234', 'TX123'),
        ('Maria', 'Costa', 'Honda', 'Civic', 'Branco', 'DEF5678', 'TX456');
CREATE DATABASE SistemaTicket;

USE SistemaTicket;

CREATE TABLE Categorias
(

	ID INT NOT NULL auto_increment PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL

);

CREATE TABLE Personal
(

	ID INT NOT NULL auto_increment PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(80) NOT NULL,
    Telefono varchar(10) NULL,
    Direccion VARCHAR(150) NULL

);

CREATE TABLE Tickets
(

	ID INT NOT NULL auto_increment PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(100) NULL,
    Prioridad INT NOT NULL,
    Personal INT NOT NULL,
    Categoria INT NOT NULL,
    Estatus CHAR(3) NOT NULL,
    FOREIGN KEY(Personal) REFERENCES Personal(ID),
    FOREIGN KEY(Categoria) REFERENCES Categorias(ID)

);
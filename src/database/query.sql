create database wallnotode;

use wallnotode;


CREATE TABLE bp_clientes (
    codigo INT AUTO_INCREMENT PRIMARY KEY,  
    nombre VARCHAR(100) NOT NULL,            
    password VARCHAR(255) NOT NULL           
);

CREATE TABLE bp_productos (
    codigo INT AUTO_INCREMENT PRIMARY KEY,  
    descripcion VARCHAR(255) NOT NULL,      
    precio_venta DECIMAL(10, 2) NOT NULL,   
    precio_oferta DECIMAL(10, 2),           
    oferta varchar(1) CHECK(principal IN ('S','N')),       
);



select * from bp_clientes;
select *from bp_productos;
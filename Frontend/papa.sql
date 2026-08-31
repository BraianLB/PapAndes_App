-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2026 a las 01:06:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `papa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `Fecha` date DEFAULT NULL,
  `ID` int(11) DEFAULT NULL,
  `Producto` varchar(100) DEFAULT NULL,
  `Tipo` varchar(100) DEFAULT NULL,
  `Descripsion` varchar(512) DEFAULT NULL,
  `Medida` varchar(100) DEFAULT NULL,
  `Cantidad` double DEFAULT NULL,
  `Precio_U` int(11) DEFAULT NULL,
  `Total` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`Fecha`, `ID`, `Producto`, `Tipo`, `Descripsion`, `Medida`, `Cantidad`, `Precio_U`, `Total`) VALUES
('2025-02-25', 4, 'Manguera', 'MO', 'Jalador de manguera', 'Dia', 1, 70000, 70000),
('2025-02-25', 5, 'Fumigador', 'MO', 'Fumigador', 'Dia', 1, 75000, 75000),
('2025-02-25', 6, 'Aporcada', 'MO', 'Aporcada', 'Metro', 10300, 97, 1000000),
('2025-02-24', 7, 'Manzate', 'MP', 'Preventivo para la pica', 'Bolsa', 3, 23000, 69000),
('2025-02-24', 8, 'Lufenurol', 'MP', 'Insecticida para el cogollero', 'Litro', 1, 32500, 32500),
('2025-02-24', 9, 'Amicsur', 'MP', 'Fertilizante para segunda etapa', 'Litro', 1, 61500, 61500),
('2025-02-24', 10, 'Zafiro', 'MP', 'Curativo para la pica', 'Litro', 1, 69000, 69000),
('2025-02-24', 11, 'Indonil', 'MP', 'Curativo para la pica', 'Bolsa', 3, 14200, 42600),
('2025-02-24', 12, 'Potenzol', 'MP', 'Pegante', 'Litro', 4, 23500, 94000),
('2025-02-20', 13, 'Raiza a 1000', 'MP', 'Fertilizante para enrraizar', 'Litro', 1, 41000, 41000),
('2025-02-20', 14, 'Actyl', 'MP', 'Fertilizante con potacio soluble', 'Kilo', 1, 34000, 34000),
('2025-02-20', 15, 'Sideral', 'MP', 'Curativo para la pica', 'Litro', 1, 61000, 61000),
('2025-02-20', 16, 'Amicsur', 'MP', 'Fertilizante para segunda etapa', 'Litro', 1, 61500, 61500),
('2025-02-20', 17, 'Indonil', 'MP', 'Curativo para la pica', 'Bolsa', 5, 14200, 71000),
('2025-02-20', 18, 'Malathion', 'MP', 'Insecticida breve', 'Litro', 1, 35500, 35500),
('2025-02-20', 19, 'Malathion', 'MP', 'Insecticida breve', 'Litro', 1, 35500, 35500),
('2025-02-20', 20, 'Orthene', 'MP', 'Insecticida para polilla', 'Bolsa', 5, 18000, 90000),
('2025-02-20', 21, 'Manzate', 'MP', 'Preventivo para la pica', 'Bolsa', 2, 23000, 46000),
('2025-02-17', 22, 'flete', 'CIF', 'Transporte de insumos', 'Viaje', 1, 45000, 45000),
('2025-02-17', 23, 'Manguera', 'MO', 'Jalador de manguera', 'Dia', 1, 70000, 70000),
('2025-02-17', 24, 'Gasolina', 'GASTO', 'Combustible', 'Litro', 3, 4000, 12000),
('2025-02-17', 25, 'Nitrabor', 'MP', 'Abono para retapa y aporque', 'Bulto', 3, 78000, 234000),
('2025-02-17', 26, 'Abono (10-20-20)', 'MP', 'Abono para aporque', 'Bulto', 18, 172500, 3105000),
('2025-02-17', 27, 'Actyl', 'MP', 'Fertilizante con potacio soluble', 'Kilo', 3, 34000, 102000),
('2025-02-17', 28, 'Hydrocomplex', 'MP', 'Abono para retapa y aporque', 'Bulto', 3, 228500, 685500),
('2025-02-17', 29, 'Gruya', 'MP', 'Insecticida para gusano blanco', 'Litro', 1, 62500, 62500),
('2025-02-17', 30, 'Raiza a 1000', 'MP', 'Fertilizante para enrraizar', 'Litro', 2, 41000, 82000),
('2025-02-17', 31, 'Timorex', 'MP', 'Fungicida para tratar la espora', 'Litro', 3, 135000, 405000),
('2025-02-15', 32, 'Administracion', 'MO', 'Sueldo administrador', 'Quincena', 1, 250000, 250000),
('2025-02-13', 33, 'Manguera', 'MO', 'Jalador de manguera', 'Dia', 1, 70000, 70000),
('2025-02-13', 34, 'Fumigador', 'MO', 'Fumigador', 'Dia', 1, 70000, 70000),
('2025-02-13', 35, 'Melasa', 'MP', 'Fertilizante con aminoacidos', 'Kilo', 4, 2000, 8000),
('2025-02-11', 36, 'Arpon', 'MP', 'Pegante Siliconado', 'Litro', 1, 102000, 102000),
('2025-02-11', 37, 'Buril', 'MP', 'Insecticida para el cogollero', 'Bolsa', 2, 10500, 21000),
('2025-02-11', 38, 'Triple hojas', 'MP', 'Fertilizante alto en nitrojeno', 'Litro', 1, 19500, 19500),
('2025-02-11', 39, 'Sideral', 'MP', 'Curativo para la pica', 'Litro', 1, 61000, 61000),
('2025-02-11', 40, 'Indonil', 'MP', 'Curativo para la pica', 'Bolsa', 3, 14200, 42600),
('2025-02-11', 41, 'Fasta', 'MP', 'Insecticida para polilla', 'Litro', 1, 65000, 65000),
('2025-02-05', 42, 'Trabajador 2', 'MO', 'Jalador de manguera', 'Dia', 1, 70000, 70000),
('2025-02-05', 43, 'Trabajador 1', 'MO', 'Fumigador', 'Dia', 1, 70000, 70000),
('2025-02-04', 44, 'Indonil', 'MP', 'Curativo para la pica', 'Bolsa', 3, 16000, 48000),
('2025-02-04', 45, 'Malathion', 'MP', 'Insecticida breve', 'Litro', 2, 35500, 71000),
('2025-02-04', 46, 'Tottem', 'MP', 'Insecticida para la polilla', 'Bolsa', 3, 25500, 76500),
('2025-02-04', 47, 'Buril', 'MP', 'Insecticida para el cogollero', 'Bolsa', 3, 10500, 31500),
('2025-02-04', 48, 'Manzate', 'MP', 'Preventivo para la pica', 'Bolsa', 9, 20500, 184500),
('2025-02-04', 49, 'Cuñada', 'MO', 'Cuñada', 'Metro', 10300, 87, 896100),
('2025-01-31', 50, 'Administracion', 'MO', 'Sueldo administrador', 'Quincena', 1, 250000, 250000),
('2025-01-28', 51, 'flete', 'CIF', 'Transporte de insumos', 'Viaje', 1, 40000, 40000),
('2025-01-28', 52, 'Arriendo', 'CIF', 'Arriendo', 'Mes', 2, 400000, 800000),
('2025-01-28', 53, 'Gasolina', 'CIF', 'Combustible', 'Litro', 3.5, 4000, 14000),
('2025-01-28', 54, 'Select', 'MP', 'Hervicida para cucuy', 'Litro', 2, 59500, 119000),
('2025-01-28', 55, 'Hydrocomplex', 'MP', 'Abono para retapa y aporque', 'Bulto', 4, 219000, 876000),
('2025-01-28', 56, 'Abono (10-27-13)', 'MP', 'Abono para retapa', 'Bulto', 12, 143700, 1724400),
('2025-01-28', 57, 'Nitrabor', 'MP', 'Abono para retapa y aporque', 'Bulto', 4, 78000, 312000),
('2025-01-28', 58, 'Trabajador 1', 'MO', 'Trabajador al dia', 'Dia', 2, 70000, 140000),
('2025-01-27', 59, 'Brigada', 'MP', 'Insecticida para polilla', 'Litro', 5, 85000, 425000),
('2025-01-27', 60, 'Trabajador 1', 'MO', 'Trabajador al dia', 'Dia', 1, 70000, 70000),
('2025-01-27', 61, 'Indonil', 'MP', 'Curativo para la pica', 'Bolsa', 3, 16000, 48000),
('2025-01-27', 62, 'Sikon Raices', 'MP', 'Fertilizante para enrraizar', 'Litro', 1, 63500, 63500),
('2025-01-27', 63, 'Magestic', 'MP', 'Insecticida para la polilla', 'Bolsa', 2, 15800, 31600),
('2025-01-27', 64, 'Potenzol', 'MP', 'Pegante', 'Litro', 1, 23500, 23500),
('2025-01-27', 65, 'Manzate', 'MP', 'Preventivo para la pica', 'Bolsa', 2, 20500, 41000),
('2025-01-13', 66, 'Trabajador 1', 'MO', 'Regada de gallinaza', 'Bulto', 110, 3000, 330000),
('2025-01-13', 67, 'Trabajador 1', 'MO', '2da tierra despues de chuponiar', 'Metro', 10300, 62, 638600),
('2025-01-13', 68, 'flete', 'CIF', 'Transporte de insumos', 'Viaje', 1, 30000, 30000),
('2025-01-13', 69, 'Gallinaza', 'MP', 'Abono en la siembra', 'Bulto', 20, 20000, 400000),
('2025-01-05', 70, 'Trabajador 1', 'MO', 'Trabajador al dia', 'Dia', 1, 70000, 70000),
('2025-01-05', 71, 'flete', 'CIF', 'Transporte de insumos', 'Viaje', 1, 80000, 80000),
('2025-01-05', 72, 'Micorrizas', 'CIF', 'Hogos para controlar otros hongos malos', 'Bulto', 1, 67000, 67000),
('2025-01-01', 73, 'Caye', 'MP', 'Insecticida para la polilla', 'Litro', 5, 130000, 650000),
('2024-12-30', 74, 'Micorrizas', 'CIF', 'Hogos para controlar otros hongos malos', 'Bulto', 5, 67000, 335000),
('2024-12-30', 75, 'Cal', 'MP', 'Preparar terreno', 'Bulto', 28, 16500, 462000),
('2024-12-29', 76, 'Fasta', 'MP', 'Insecticida para polilla', 'Litro', 1, 61000, 61000),
('2024-12-29', 77, 'Carguero', 'MO', 'Cargue para gallinaza', 'Viaje', 1, 50000, 50000),
('2024-12-29', 78, 'Raiza a 1000', 'MP', 'Fertilizante para primera etapa', 'Litro', 1, 41000, 41000),
('2024-12-29', 79, 'Furtivo', 'MP', 'Fungicida para alternaria', 'Litro', 1, 104000, 104000),
('2024-12-29', 80, 'MisilK', 'MP', 'Fungicida para espora', 'Litro', 1, 49000, 49000),
('2024-12-29', 81, 'Potenzol', 'MP', 'Pegante', 'Litro', 1, 23500, 23500),
('2024-12-29', 82, 'Magestic', 'MP', 'Insecticida para la polilla', 'Bolsa', 2, 16800, 33600),
('2024-12-29', 83, 'Agrodyne', 'MP', 'Yodo Preventivo para hongos  ', 'Litro', 1, 61000, 61000),
('2024-12-28', 84, 'Trabajador 1', 'MO', 'Trabajador al dia', 'Dia', 1, 100000, 100000),
('2024-12-28', 85, 'Gallinaza', 'MP', 'Abono en la siembra', 'Bulto', 90, 20000, 1800000),
('2024-12-28', 86, 'Insentivo', 'GASTO', 'Pastel - Gaseosa', 'Unidad', 1, 10000, 10000),
('2024-12-28', 87, 'Siembra', 'MO', 'Riego semilla, Chuponiada', 'Metro', 10345, 60, 620700),
('2024-12-28', 88, 'Rayada', 'MO', 'Otros', 'Metro', 10345, 65, 672425),
('2024-12-23', 89, 'Semilla', 'MP', 'Semilla', 'Bulto', 35, 165000, 5775000),
('2024-12-23', 90, 'Harado', 'CIF', 'Preparar terreno', 'Hora', 13.5, 70000, 945000),
('2024-12-23', 91, 'Rotabito', 'CIF', 'Preparar terreno', 'Hora', 24, 70000, 1680000),
('2024-12-17', 92, 'Trabajador 1', 'MO', 'Trabajador al dia', 'Dia', 1, 80000, 80000),
('2024-12-17', 93, 'Agrodyne', 'MP', 'Yodo Preventivo para hongos  ', 'Litro', 1, 61000, 61000),
('2024-12-17', 94, 'Cloro', 'MP', 'Fungicida para espora', 'Litro', 2, 4000, 8000),
('2024-12-17', 95, 'Panzer', 'MP', 'Quemador para maleza', 'Litro', 3, 17500, 52500),
('2024-12-17', 96, 'Gasolina', 'CIF', 'Combustible para estacionaria', 'Litro', 1.5, 7000, 7000),
('2024-12-16', 97, 'Trabajador 2', 'MO', 'Trabajador al dia', 'Dia', 4, 60000, 240000),
('2024-12-13', 98, 'Arriendo', 'CIF', 'Arriendo', 'Mes', 2, 400000, 800000),
('2024-12-13', 99, 'Insentivo', 'GASTO', 'Pastel - Gaseosa', 'Unidad', 1, 10000, 10000),
('2025-02-28', 14, 'Manzate', 'MP', 'Preventivo para la pica', 'Bolsa', 12, 21900, 262800),
('2025-02-28', 13, 'Tottem', 'MP', 'Insecticida para la polilla', 'Bolsa', 4, 25500, 102000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cronograma`
--

CREATE TABLE `cronograma` (
  `semana` int(11) NOT NULL,
  `insumo` varchar(25) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `cantidad` float NOT NULL,
  `num_canecas` float NOT NULL,
  `total_uso` float NOT NULL,
  `precio_unitario` float NOT NULL,
  `total` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cronograma`
--

INSERT INTO `cronograma` (`semana`, `insumo`, `tipo`, `descripcion`, `cantidad`, `num_canecas`, `total_uso`, `precio_unitario`, `total`) VALUES
(1, 'Tottem', 'Insecticida', 'Insecticida para la polilla', 1, 0.5, 0.5, 25500, 12750),
(1, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para primera etapa', 350, 0.5, 175, 41, 7175),
(1, 'Bazuca', 'Insecticida', 'Baño insecticida para suelo', 400, 0.5, 200, 26, 5200),
(2, 'Nada', 'Nada', 'Nada', 0, 0, 0, 0, 0),
(3, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para primera etapa', 350, 0.5, 175, 41, 7175),
(3, 'Malathion', 'Insecticida', 'Insecticida breve', 350, 0.5, 175, 38, 6650),
(3, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 0.5, 0.5, 20500, 10250),
(3, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 0.5, 0.5, 14500, 7250),
(3, 'Potenzol', 'Coayudante', 'Pegante', 150, 0.5, 75, 22.4, 1680),
(3, 'Wappo', 'Insecticida', 'Insecticida para el cogollero', 1, 0.5, 0.5, 23200, 11600),
(3, 'Tottem', 'Insecticida', 'Insecticida para la polilla', 1, 0.5, 0.5, 25500, 12750),
(4, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 0.5, 0.5, 20500, 10250),
(4, 'Athrin', 'Insecticida', 'Insecticada para le minador', 50, 0.5, 25, 132.8, 3320),
(4, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 0.5, 0.5, 14500, 7250),
(4, 'Nitrojas', 'Fertilizante', 'Fertilizante para primera etapa', 300, 0.5, 150, 27, 4050),
(4, 'Potenzol', 'Coayudante', 'Pegante', 150, 0.5, 75, 22.4, 1680),
(4, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para primera etapa', 350, 0.5, 175, 41, 7175),
(4, 'Select', 'Herbicida', 'Hervicida para cucuy', 200, 0.5, 100, 59.5, 5950),
(5, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 0.5, 0.5, 20500, 10250),
(5, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 0.5, 0.5, 14500, 7250),
(5, 'Potenzol', 'Coayudante', 'Pegante', 150, 0.5, 75, 22.4, 1680),
(5, 'Malathion', 'Insecticida', 'Insecticida breve', 350, 0.5, 175, 38, 6650),
(5, 'Nitrojas', 'Fertilizante', 'Fertilizante para primera etapa', 300, 0.5, 150, 27, 4050),
(5, 'Magestic', 'Insecticida', 'Insecticida para la polilla', 1, 0.5, 0.5, 16800, 8400),
(5, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para primera etapa', 350, 0.5, 175, 41, 7175),
(5, 'Lufenurol', 'Insecticida', 'Insecticida para el cogollero', 150, 0.5, 75, 31, 2325),
(6, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para primera etapa', 350, 0.8, 280, 41, 11480),
(6, 'Brigada', 'Insecticida', 'Insecticida para polilla', 250, 0.8, 200, 97.2, 19440),
(6, 'Amicsur', 'Fertilizante', 'Fertilizante para segunda etapa', 300, 0.8, 240, 61.5, 14760),
(6, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 0.8, 0.8, 20500, 16400),
(6, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 0.8, 0.8, 14500, 11600),
(6, 'Potenzol', 'Coayudante', 'Pegante', 150, 0.8, 120, 22.4, 2688),
(6, 'Zafiro', 'Curativo', 'Curativo para la pica', 300, 0.8, 240, 74.8, 17952),
(7, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 0.8, 0.8, 20500, 16400),
(7, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 0.8, 0.8, 14500, 11600),
(7, 'Malathion', 'Insecticida', 'Insecticida breve', 350, 0.8, 280, 38, 10640),
(7, 'Amicsur', 'Fertilizante', 'Fertilizante para segunda etapa', 300, 0.8, 240, 61.5, 14760),
(7, 'Potenzol', 'Coayudante', 'Pegante', 150, 0.8, 120, 22.4, 2688),
(7, 'Magestic', 'Insecticida', 'Insecticida para la polilla', 1, 0.8, 0.8, 16800, 13440),
(8, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 1, 1, 20500, 20500),
(8, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1, 1, 14500, 14500),
(8, 'Potenzol', 'Coayudante', 'Pegante', 150, 1, 150, 22.4, 3360),
(8, 'Momentum', 'Fertilizante', 'Calcio-Boro para primera etapa', 350, 1, 350, 34, 11900),
(8, 'Athrin', 'Insecticida', 'Insecticada para le minador', 50, 1, 50, 132.8, 6640),
(8, 'Amicsur', 'Fertilizante', 'Fertilizante para segunda etapa', 300, 1, 300, 61.5, 18450),
(8, 'Lufenurol', 'Insecticida', 'Insecticida para el cogollero', 150, 1, 150, 31, 4650),
(9, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 1, 1, 20500, 20500),
(9, 'Tottem', 'Insecticida', 'Insecticida para la polilla', 1, 1, 1, 25500, 25500),
(9, 'Amicsur', 'Fertilizante', 'Fertilizante para segunda etapa', 300, 1, 300, 61.5, 18450),
(9, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1, 1, 14500, 14500),
(9, 'Momentum', 'Fertilizante', 'Calcio-Boro para primera etapa', 350, 1, 350, 34, 11900),
(9, 'Potenzol', 'Coayudante', 'Pegante', 150, 1, 150, 22.4, 3360),
(9, 'Malathion', 'Insecticida', 'Insecticida breve', 350, 1, 350, 38, 13300),
(10, 'Brigada', 'Insecticida', 'Insecticida para polilla', 250, 1, 250, 97.2, 24300),
(10, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 1, 1, 20500, 20500),
(10, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1, 1, 14500, 14500),
(10, 'Sideral', 'Curativo', 'Curativo para la pica', 300, 1, 300, 61, 18300),
(10, 'Momentum', 'Fertilizante', 'Calcio-Boro para primera etapa', 350, 1, 350, 34, 11900),
(10, 'Potenzol', 'Coayudante', 'Pegante', 150, 1, 150, 22.4, 3360),
(11, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 1, 1, 20500, 20500),
(11, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1, 1, 14500, 14500),
(11, 'Brigada', 'Insecticida', 'Insecticida para polilla', 250, 1, 250, 97.2, 24300),
(11, 'Potenzol', 'Coayudante', 'Pegante', 150, 1, 150, 22.4, 3360),
(11, 'Momentum', 'Fertilizante', 'Calcio-Boro para primera etapa', 350, 1, 350, 34, 11900),
(11, 'Lufenurol', 'Insecticida', 'Insecticida para el cogollero', 150, 1, 150, 31, 4650),
(12, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 1.5, 1.5, 20500, 30750),
(12, 'Wappo', 'Insecticida', 'Insecticida para el cogollero', 1, 1.5, 1.5, 23200, 34800),
(12, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1.5, 1.5, 14500, 21750),
(12, 'Cobre Zinc', 'Fertilizante', 'Fertilizante con Azufre', 350, 1.5, 525, 43.5, 22838),
(12, 'Zafiro', 'Curativo', 'Curativo para la pica', 300, 1.5, 450, 74.8, 33660),
(12, 'Malathion', 'Insecticida', 'Insecticida breve', 350, 1.5, 525, 38, 19950),
(12, 'Potenzol', 'Coayudante', 'Pegante', 150, 1.5, 225, 22.4, 5040),
(12, 'B-Zucar', 'Fertilizante', 'Boro-Foforo-Potacio para sacar y engrosar', 300, 1.5, 450, 47, 21150),
(12, 'Athrin', 'Insecticida', 'Insecticada para le minador', 50, 1.5, 75, 132.8, 9960),
(13, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 1.5, 1.5, 20500, 30750),
(13, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1.5, 1.5, 14500, 21750),
(13, 'Malathion', 'Insecticida', 'Insecticida breve', 350, 1.5, 525, 38, 19950),
(13, 'Potenzol', 'Coayudante', 'Pegante', 150, 1.5, 225, 22.4, 5040),
(13, 'B-Zucar', 'Fertilizante', 'Boro-Foforo-Potacio para sacar y engrosar', 300, 1.5, 450, 47, 21150),
(13, 'Cobre Zinc', 'Fertilizante', 'Fertilizante con Azufre', 350, 1.5, 525, 43.5, 22838),
(13, 'Tottem', 'Insecticida', 'Insecticida para la polilla', 1, 1.5, 1.5, 25500, 38250),
(14, 'Sideral', 'Curativo', 'Curativo para la pica', 300, 1.5, 450, 61, 27450),
(14, 'Brigada', 'Insecticida', 'Insecticida para polilla', 250, 1.5, 375, 97.2, 36450),
(14, 'B-Zucar', 'Fertilizante', 'Boro-Foforo-Potacio para sacar y engrosar', 300, 1.5, 450, 47, 21150),
(14, 'Sulfato Potacio', 'Fertilizante', 'Engrosador para la raiz', 1, 1.5, 1.5, 4400, 6600),
(14, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1.5, 1.5, 14500, 21750),
(14, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 1.5, 1.5, 20500, 30750),
(15, 'Manzate', 'Preventivo', 'Preventivo para la pica', 1, 1.5, 1.5, 20500, 30750),
(15, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1.5, 1.5, 14500, 21750),
(15, 'Potenzol', 'Coayudante', 'Pegante', 150, 1.5, 225, 22.4, 5040),
(15, 'Cobre Zinc', 'Fertilizante', 'Fertilizante con Azufre', 350, 1.5, 525, 43.5, 22838),
(15, 'Malathion', 'Insecticida', 'Insecticida breve', 350, 1.5, 525, 38, 19950),
(15, 'Magestic', 'Insecticida', 'Insecticida para la polilla', 1, 1.5, 1.5, 16800, 25200),
(15, 'Terramil', 'Fertilizante', 'Engrosador al 300', 400, 1.5, 600, 40, 24000),
(16, 'M-45', 'Preventivo', 'Preventivo para la pica papa 4ta etapa', 1, 1.5, 1.5, 19600, 29400),
(16, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1.5, 1.5, 14500, 21750),
(16, 'Potenzol', 'Coayudante', 'Pegante', 150, 1.5, 225, 22.4, 5040),
(16, 'Zafiro', 'Curativo', 'Curativo para la pica', 300, 1.5, 450, 74.8, 33660),
(16, 'Brigada', 'Insecticida', 'Insecticida para polilla', 250, 1.5, 375, 97.2, 36450),
(16, 'Terramil', 'Fertilizante', 'Engrosador al 300', 400, 1.5, 600, 40, 24000),
(16, 'Wappo', 'Insecticida', 'Insecticida para el cogollero', 1, 1.5, 1.5, 23200, 34800),
(17, 'M-45', 'Preventivo', 'Preventivo para la pica papa 4ta etapa', 1, 1.2, 1.2, 19600, 23520),
(17, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1.2, 1.2, 14500, 17400),
(17, 'Potenzol', 'Coayudante', 'Pegante', 150, 1.2, 180, 22.4, 4032),
(17, 'Athrin', 'Insecticida', 'Insecticada para le minador', 50, 1.2, 60, 132.8, 7968),
(17, 'Tottem', 'Insecticida', 'Insecticida para la polilla', 1, 1.2, 1.2, 25500, 30600),
(17, 'K-600', 'Fertilizante', 'Fertilizante con Potacio', 500, 1.2, 600, 45, 27000),
(18, 'Veterina', 'Repelente', 'Repelente de insectos', 150, 1.2, 180, 27, 4860),
(18, 'Caye', 'Insecticida', 'Insecticida para la polilla', 250, 1.2, 300, 176, 52800),
(18, 'Sulfato Potacio', 'Fertilizante', 'Engrosador para la raiz', 1, 1.2, 1.2, 4400, 5280),
(18, 'Estocada', 'Insecticida', 'Baño insecticida para suelo', 1, 1.2, 1.2, 13800, 16560),
(19, 'M-45', 'Preventivo', 'Preventivo para la pica papa 4ta etapa', 1, 1.2, 1.2, 19600, 23520),
(19, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1.2, 1.2, 14500, 17400),
(19, 'Potenzol', 'Coayudante', 'Pegante', 150, 1.2, 180, 22.4, 4032),
(19, 'Brigada', 'Insecticida', 'Insecticida para polilla', 250, 1.2, 300, 97.2, 29160),
(19, 'K-600', 'Fertilizante', 'Fertilizante con Potacio', 500, 1.2, 600, 45, 27000),
(20, 'M-45', 'Preventivo', 'Preventivo para la pica papa 4ta etapa', 1, 1, 1, 19600, 19600),
(20, 'Brigada', 'Insecticida', 'Insecticida para polilla', 250, 1, 250, 97.2, 24300),
(20, 'Curzate', 'Curativo', 'Curativo para la pica', 1, 1, 1, 14500, 14500),
(20, 'Potenzol', 'Coayudante', 'Pegante', 150, 1, 150, 22.4, 3360),
(20, 'K-600', 'Fertilizante', 'Fertilizante con Potacio', 500, 1, 500, 45, 22500),
(20, 'Magestic', 'Insecticida', 'Insecticida para la polilla', 1, 1, 1, 16800, 16800),
(21, 'Veterina', 'Repelente', 'Repelente de insectos', 150, 1, 150, 27, 4050),
(21, 'Caye', 'Insecticida', 'Insecticida para la polilla', 250, 1, 250, 176, 44000),
(21, 'Sulfato Potacio', 'Fertilizante', 'Engrosador para la raiz', 1, 1, 1, 4400, 4400),
(21, 'Estocada', 'Insecticida', 'Baño insecticida para suelo', 1, 1, 1, 13800, 13800),
(22, 'Veterina', 'Repelente', 'Repelente de insectos', 150, 1, 150, 27, 4050),
(22, 'Malathion', 'Insecticida', 'Insecticida breve', 350, 1, 350, 38, 13300),
(22, 'Sulfato Potacio', 'Fertilizante', 'Engrosador para la raiz', 1, 1, 1, 4400, 4400),
(22, 'Tottem', 'Insecticida', 'Insecticida para la polilla', 1, 1, 1, 25500, 25500),
(23, 'Caye', 'Insecticida', 'Insecticida para la polilla', 250, 1, 250, 176, 44000),
(23, 'Sulfato Potacio', 'Fertilizante', 'Engrosador para la raiz', 1, 1, 1, 4400, 4400),
(23, 'Estocada', 'Insecticida', 'Baño insecticida para suelo', 1, 1, 1, 13800, 13800),
(23, 'Veterina', 'Repelente', 'Repelente de insectos', 150, 1, 150, 27, 4050),
(24, 'Calliquat', 'Herbicida', 'Quemador', 200, 1, 200, 18.5, 3700);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historico_precios`
--

CREATE TABLE `historico_precios` (
  `fecha` date NOT NULL,
  `precio_capira` int(11) NOT NULL,
  `precio_criolla` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historico_ventas`
--

CREATE TABLE `historico_ventas` (
  `fecha` date NOT NULL,
  `lote` varchar(20) NOT NULL,
  `Socio_Prpal` varchar(50) NOT NULL,
  `monas` int(11) NOT NULL,
  `lavadora` varchar(20) NOT NULL,
  `para_lavar` int(11) NOT NULL,
  `entregados` int(11) NOT NULL,
  `buenas` int(11) NOT NULL,
  `tronco` int(11) NOT NULL,
  `rechazo` int(11) NOT NULL,
  `medio_pollo` int(11) NOT NULL,
  `otras` int(11) NOT NULL,
  `total_kilos` int(11) NOT NULL,
  `precio_buena` int(11) NOT NULL,
  `precio_tronco` int(11) NOT NULL,
  `precio_rechazo` int(11) NOT NULL,
  `precio_medioPollo` int(11) NOT NULL,
  `precio_promOtras` bigint(20) NOT NULL,
  `precio_promKilos` bigint(20) NOT NULL,
  `flete` int(11) NOT NULL,
  `costo_lavada` int(11) NOT NULL,
  `costo_Total` bigint(20) NOT NULL,
  `total` bigint(20) NOT NULL,
  `id_Cosecha` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historico_ventas`
--

INSERT INTO `historico_ventas` (`fecha`, `lote`, `Socio_Prpal`, `monas`, `lavadora`, `para_lavar`, `entregados`, `buenas`, `tronco`, `rechazo`, `medio_pollo`, `otras`, `total_kilos`, `precio_buena`, `precio_tronco`, `precio_rechazo`, `precio_medioPollo`, `precio_promOtras`, `precio_promKilos`, `flete`, `costo_lavada`, `costo_Total`, `total`, `id_Cosecha`) VALUES
('2024-09-05', 'Lote1', 'Hector', 180, 'Ademar', 171, 140, 39, 0, 31, 23, 47, 7000, 170000, 0, 100000, 100000, 80000, 2250, 800000, 550000, 6500000, 13200000, 1),
('2024-05-24', 'Lote2', 'Hector', 98, 'Ademar', 84, 79, 38, 2, 20, 10, 9, 4200, 150000, 160000, 100000, 80000, 65000, 2200, 650000, 500000, 8500000, 9000000, 2),
('2024-03-30', 'Lote1', 'Hector', 184, 'Alex', 179, 140, 80, 0, 40, 10, 10, 7000, 130000, 0, 90000, 65000, 65000, 2200, 650000, 650000, 6500000, 14000000, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `Producto` varchar(100) DEFAULT NULL,
  `Tipo` varchar(100) DEFAULT NULL,
  `Medida` varchar(50) DEFAULT NULL,
  `Precio` bigint(20) DEFAULT NULL,
  `P_Unitario` double DEFAULT NULL,
  `Q_Caneca` float DEFAULT NULL,
  `Descripcion` varchar(512) DEFAULT NULL,
  `ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`Producto`, `Tipo`, `Medida`, `Precio`, `P_Unitario`, `Q_Caneca`, `Descripcion`, `ID`) VALUES
('Actyl', 'Fertilizante', ' Kilo ', 34000, 34000, 1, 'Fertilizante con potacio soluble', 2),
('Gruya', 'Insecticida', ' Litro ', 62500, 62.5, 120, 'Insecticida para gusano blanco', 3),
('Triple hojas', 'Fertilizante', ' Litro ', 19500, 19.5, 1, 'Fertilizante alto en nitrojeno', 4),
('Harado', 'Tractor', ' Hora ', 70000, 70000, 0, 'Preparar terreno', 5),
('Cal', 'Abono', ' Bulto ', 14900, 14900, 0, 'Preparar terreno', 6),
('Rotabito', 'Tractor', ' Hora ', 70000, 70000, 0, 'Preparar terreno', 7),
('Gallinaza', 'Abono', ' Bulto ', 20000, 20000, 0, 'Abono en la siembra', 8),
('Estocada', 'Insecticida', ' Bolsa ', 13800, 13800, 1, 'Baño insecticida para suelo', 9),
('Bazuca', 'Insecticida', ' Litro ', 26000, 26, 400, 'Baño insecticida para suelo', 10),
('Semilla', 'Semilla', ' Bulto ', 165000, 165000, 0, 'Semilla', 11),
('Abono (10-20-20)', 'Abono', ' Bulto ', 172, 172500, 0, 'Abono para aporque', 12),
('Raiza a 1000', 'Fertilizante', ' Litro ', 41000, 41, 350, 'Fertilizante para enrraizar', 13),
('flete', 'Flete', ' Viaje ', 80000, 80000, 0, 'Transporte de insumos', 14),
('Trabajador', 'Empleado', ' Dia ', 70000, 70000, 0, 'Trabajador al dia', 15),
('Fumigador', 'Empleado', ' Dia ', 70000, 70000, 0, 'Fumigador', 16),
('Manguera', 'Empleado', ' Dia ', 70000, 70000, 0, 'Jalador de manguera', 17),
('Cuñada', 'Empleado', ' Metro ', 85, 85, 0, 'Cuñada', 18),
('Aporcada', 'Empleado', ' Metro ', 80, 80, 0, 'Aporcada', 19),
('Rayada', 'Empleado', ' Metro ', 65, 65, 0, 'Otros', 20),
('Arriendo', 'Arriendo', ' Mes ', 400000, 400000, 0, 'Arriendo', 21),
('Manzate', 'Preventivo', ' Bolsa ', 20500, 20500, 1, 'Preventivo para la pica', 22),
('Curzate', 'Curativo', ' Bolsa ', 14500, 14500, 1, 'Curativo para la pica', 23),
('Brigada', 'Insecticida', ' Litro ', 97200, 97.2, 250, 'Insecticida para polilla', 24),
('Sulfato magnecio', 'Fertilizante', ' Bulto ', 38500, 1540, 2, 'Fertilizante para la raiz', 25),
('Select', 'Hervicida', ' Litro ', 59500, 59.5, 200, 'Hervicida para cucuy', 26),
('Malathion', 'Insecticida', ' Litro ', 35500, 35.5, 350, 'Insecticida breve', 27),
('Lufenurol', 'Insecticida', ' Litro ', 32, 32.5, 150, 'Insecticida para el cogollero', 28),
('DKP', 'Fertilizante', ' Litro ', 48000, 48, 350, 'Engrosador', 29),
('Potenzol', 'Pegante', ' Litro ', 23500, 23.5, 150, 'Pegante', 30),
('Terramil', 'Fertilizante', ' Litro ', 40000, 40, 400, 'Engrosador al 300', 31),
('Wappo', 'Insecticida', ' Bolsa ', 23200, 23200, 1, 'Insecticida para el cogollero', 32),
('Athrin', 'Insecticida', ' Cuarto ', 33200, 132.8, 50, 'Insecticada para le minador', 33),
('Kasumin', 'Curativo', ' Litro ', 33000, 33, 500, 'Curante', 34),
('Oxitetraciclina (Vacas)', 'Curativo', ' Unidad ', 45000, 45000, 500, 'Curante', 35),
('Caye', 'Insecticida', ' Litro ', 176000, 176, 250, 'Insecticida para la polilla', 36),
('Veterina', 'Repelente', ' Unidad ', 13500, 27, 150, 'Repelente de insectos', 37),
('Sulfato Potacio', 'Fertilizante', ' Bulto ', 110000, 4400, 1, 'Engrosador para la raiz', 38),
('Terrasorb', 'Fertilizante', ' Litro ', 33000, 33, 400, 'Fertilizante para primera etapa', 39),
('Tottem', 'Insecticida', ' Bolsa ', 25500, 25500, 1, 'Insecticida para la polilla', 40),
('Buril', 'Insecticida', ' Bolsa ', 10500, 10500, 1, 'Insecticida para el cogollero', 41),
('Calliquat', 'Hervicida', ' Litro ', 18500, 18.5, 200, 'Quemador', 42),
('Momentum', 'Fertilizante', ' Litro ', 34000, 34, 350, 'Calcio-Boro para primera etapa', 43),
('Aminofer', 'Fertilizante', ' Litro ', 47500, 47.5, 350, 'Calcio-Boro para primera etapa', 44),
('Agrotin', 'Insecticida', ' Litro ', 20000, 20, 300, 'Insecticida para el minador', 45),
('Evisect', 'Evisect', ' Bolsa ', 44000, 44000, 1, 'Evisect', 46),
('Mixel', 'Pegante', ' Litro ', 15000, 15, 350, 'Pegante con Alcohol', 47),
('Sideral', 'Curativo', ' Litro ', 61000, 61, 300, 'Curativo para la pica', 48),
('Zafiro', 'Curativo', ' Litro ', 69, 69, 300, 'Curativo para la pica', 49),
('Abono(3x15)', 'Abono', ' Bulto ', 129500, 129500, 0, 'Abono para la cuñada', 50),
('M-45', 'Preventivo', ' Bolsa ', 19600, 19600, 1, 'Preventivo para la pica papa 4ta etapa', 51),
('Magestic', 'Insecticida', ' Bolsa ', 15800, 15800, 1, 'Insecticida para la polilla', 52),
('Cosmo Madurador', 'Fertilizante', ' Bolsa ', 39500, 39500, 0.25, 'Madurador de plantas', 53),
('B-Zucar', 'Fertilizante', ' Litro ', 47000, 47, 300, 'Boro-Foforo-Potacio para sacar y engrosar', 54),
('Amicsur', 'Fertilizante', ' Litro ', 61500, 61.5, 300, 'Fertilizante para segunda etapa', 55),
('Abono (13-23-6)', 'Abono', ' Bulto ', 167000, 167000, 0, 'Abono para la siembra', 56),
('Nitrojas', 'Fertilizante', ' Litro ', 27000, 27, 300, 'Fertilizante para primera etapa', 57),
('Patrulla', 'Curativo', ' Litro ', 99000, 99, 250, 'Curativo para la alternaria', 58),
('Cobre Zinc', 'Fertilizante', ' Litro ', 43500, 43.5, 350, 'Fertilizante con Azufre', 59),
('k-600', 'Fertilizante', ' Litro ', 45000, 45, 500, 'Fertilizante con Potacio', 60),
('Insentivo', 'Insentivo', ' Unidad ', 10000, 10000, 0, 'Pastel - Gaseosa', 61),
('Panzer', 'Hervicida', ' Litro ', 17500, 17.5, 1000, 'Quemador para maleza', 62),
('Agrodyne', 'Fungicida', ' Litro ', 61000, 61, 330, 'Yodo Preventivo para hongos  ', 63),
('Cloro', 'Fungicida', ' Litro ', 4000, 4, 500, 'Fungicida para hongos', 64),
('Siembra', 'Empleado', ' Metro ', 60, 60, 0, 'Riego semilla, Chuponiada', 65),
('MisilK', 'Fungicida', ' Litro ', 49000, 49, 330, 'Fungicida para espora', 66),
('Furtivo', 'Fungicida', ' Litro ', 104000, 104, 250, 'Fungicida para alternaria', 67),
('Ronda', 'Hervicida', ' Litro ', 18000, 18, 1000, 'Quemador para maleza', 68),
('Fasta', 'Insecticida', ' Litro ', 65, 65, 200, 'Insecticida para polilla', 69),
('Micorrizas', 'Fertilizante', ' Bulto ', 67000, 67000, 0, 'Hogos para controlar otros hongos malos', 70),
('Sikon Raices', 'Fertilizante', ' Litro ', 63500, 63.5, 330, 'Fertilizante para enrraizar', 71),
('Indonil', 'Curativo', ' Bolsa ', 14, 14200, 1, 'Curativo para la pica', 72),
('Abono (10-27-13)', 'Abono', ' Bulto ', 143700, 143700, 0, 'Abono para retapa', 73),
('Hydrocomplex', 'Abono', ' Bulto ', 228, 228500, 0, 'Abono para retapa y aporque', 74),
('Nitrabor', 'Abono', ' Bulto ', 78000, 78000, 0, 'Abono para retapa y aporque', 75),
('Gasolina', 'Combustible', ' Litro ', 4000, 4, 0, 'Combustible', 76),
('Administracion', 'Empleado', ' Quincena ', 250000, 250000, 0, 'Sueldo administrador', 77),
('Arpon', 'Pegante', ' Litro ', 102000, 102, 33, 'Pegante Siliconado', 78),
('Melasa', 'Fertilizante', ' Kilo ', 2000, 2000, 1, 'Fertilizante con aminoacidos', 79),
('Timorex', 'Fungicida', ' Litro ', 135000, 135, 500, 'Fungicida para tratar la espora', 80),
('Orthene', 'Insecticida', ' Bolsa ', 18000, 18000, 1, 'Insecticida para polilla', 81);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `riegos`
--

CREATE TABLE `riegos` (
  `Semana` int(11) DEFAULT NULL,
  `Insumo` varchar(100) DEFAULT NULL,
  `Tipo` varchar(100) DEFAULT NULL,
  `Descripcion` varchar(512) DEFAULT NULL,
  `Precio_U` float DEFAULT NULL,
  `Cantidad` double DEFAULT NULL,
  `Num_Canecas` double DEFAULT NULL,
  `Total_Uso` double DEFAULT NULL,
  `Vlr_TOTAL` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `riegos`
--

INSERT INTO `riegos` (`Semana`, `Insumo`, `Tipo`, `Descripcion`, `Precio_U`, `Cantidad`, `Num_Canecas`, `Total_Uso`, `Vlr_TOTAL`) VALUES
(8, 'Amicsur', 'Fertilizante', 'Fertilizante para segunda etapa', 61.5, 400, 3.5, 1400, 86100),
(8, 'Potenzol', 'Pegante', 'Pegante', 23.5, 200, 3.5, 700, 16450),
(8, 'Sideral', 'Curativo', 'Curativo para la pica', 61, 100, 3.5, 350, 21350),
(8, 'Zafiro', 'Curativo', 'Curativo para la pica', 69, 250, 3.5, 875, 60375),
(8, 'Lufenurol', 'Insecticida', 'Insecticida para el cogollero', 32.5, 150, 3.5, 525, 17063),
(8, 'Brigada', 'Insecticida', 'Insecticida para polilla', 97.2, 250, 3.5, 875, 85050),
(8, 'Indonil', 'Curativo', 'Curativo para la pica', 14200, 1, 3.5, 3.5, 49700),
(8, 'Manzate', 'Preventivo', 'Preventivo para la pica', 20500, 1, 3.5, 3.5, 71750),
(7, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para enrraizar', 41, 50, 3, 150, 6150),
(7, 'Amicsur', 'Fertilizante', 'Fertilizante para segunda etapa', 61.5, 220, 3, 660, 40590),
(7, 'Sideral', 'Curativo', 'Curativo para la pica', 61, 250, 3, 750, 45750),
(7, 'Orthene', 'Insecticida', 'Insecticida para polilla', 18000, 1, 3, 3, 54000),
(7, 'Indonil', 'Curativo', 'Curativo para la pica', 14200, 1, 3, 3, 42600),
(7, 'Arpon', 'Pegante', 'Pegante Siliconado', 102, 33, 3, 99, 10098),
(7, 'Manzate', 'Preventivo', 'Preventivo para la pica', 20500, 1, 3, 3, 61500),
(7, 'Gruya', 'Insecticida', 'Insecticida para gusano blanco', 62.5, 120, 7, 840, 52500),
(7, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para enrraizar', 41, 300, 7, 2100, 86100),
(7, 'Sulfato magnecio', 'Fertilizante', 'Fertilizante para la raiz', 1540, 1, 7, 7, 10780),
(7, 'Actyl', 'Fertilizante', 'Fertilizante con potacio soluble', 34000, 0.5, 7, 3.5, 119000),
(7, 'Arpon', 'Pegante', 'Pegante Siliconado', 102, 35, 7, 245, 24990),
(7, 'Timorex', 'Fungicida', 'Fungicida para tratar la espora', 135, 480, 7, 3360, 453600),
(6, 'Sideral', 'Curativo', 'Curativo para la pica', 61, 200, 3.8, 760, 46360),
(6, 'Buril', 'Insecticida', 'Insecticida para el cogollero', 10500, 1, 3.8, 3.8, 39900),
(6, 'Indonil', 'Curativo', 'Curativo para la pica', 14200, 1, 3.8, 3.8, 53960),
(6, 'Manzate', 'Preventivo', 'Preventivo para la pica', 20500, 1, 3.8, 3.8, 77900),
(6, 'Arpon', 'Pegante', 'Pegante Siliconado', 102, 33, 3.8, 125.4, 12791),
(6, 'Melasa', 'Fertilizante', 'Fertilizante con aminoacidos', 2000, 1, 3.8, 3.8, 7600),
(6, 'Triple hojas', 'Fertilizante', 'Fertilizante alto en nitrojeno', 19.5, 264, 3.8, 1003.2, 19562),
(6, 'Fasta', 'Insecticida', 'Insecticida para polilla', 65, 150, 3.8, 570, 37050),
(5, 'Nitrojas', 'Fertilizante', 'Fertilizante para primera etapa', 27, 200, 3, 600, 16200),
(5, 'Sikon Raices', 'Fertilizante', 'Fertilizante para enrraizar', 63.5, 130, 3, 390, 24765),
(5, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para enrraizar', 41, 130, 3, 390, 15990),
(5, 'Manzate', 'Preventivo', 'Preventivo para la pica', 20500, 1, 3, 3, 61500),
(5, 'Indonil', 'Curativo', 'Curativo para la pica', 14200, 1, 3, 3, 42600),
(5, 'Buril', 'Insecticida', 'Insecticida para el cogollero', 10500, 3, 3, 3, 31500),
(5, 'Tottem', 'Insecticida', 'Insecticida para la polilla', 25500, 1, 3, 3, 76500),
(5, 'Malathion', 'Insecticida', 'Insecticida breve', 35.5, 330, 3, 990, 35145),
(5, 'Potenzol', 'Pegante', 'Pegante', 23.5, 250, 3, 750, 17625),
(4, 'Sikon Raices', 'Fertilizante', 'Fertilizante para enrraizar', 63.5, 200, 2.5, 500, 31750),
(4, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para enrraizar', 41, 150, 2.5, 375, 15375),
(4, 'Magestic', 'Insecticida', 'Insecticida para la polilla', 15800, 1, 2.5, 2.5, 39500),
(4, 'Indonil', 'Curativo', 'Curativo para la pica', 14200, 1, 2.5, 2.5, 35500),
(4, 'Potenzol', 'Pegante', 'Pegante', 23.5, 250, 2.5, 625, 14688),
(4, 'Manzate', 'Preventivo', 'Preventivo para la pica', 20500, 1, 2.5, 2.5, 51250),
(4, 'Brigada', 'Insecticida', 'Insecticida para polilla', 97.2, 250, 2.5, 625, 60750),
(0, 'Fasta', 'Insecticida', 'Insecticida para polilla', 65, 250, 2, 500, 32500),
(0, 'Magestic', 'Insecticida', 'Insecticida para la polilla', 15800, 1, 2, 2, 31600),
(0, 'Furtivo', 'Fungicida', 'Fungicida para alternaria', 104, 250, 2, 500, 52000),
(0, 'Potenzol', 'Pegante', 'Pegante', 23.5, 200, 2, 400, 9400),
(0, 'MisilK', 'Fungicida', 'Fungicida para espora', 49, 330, 2, 660, 32340),
(0, 'Raiza a 1000', 'Fertilizante', 'Fertilizante para enrraizar', 41, 330, 2, 660, 27060),
(0, 'Agrodyne', 'Fungicida', 'Yodo Preventivo para hongos  ', 61, 330, 2, 660, 40260),
(0, 'Panzer', 'Hervicida', 'Quemador para maleza', 17.5, 1000, 4, 4000, 70000),
(0, 'Cloro', 'Fungicida', 'Fungicida para hongos', 4, 500, 4, 2000, 8000),
(0, 'Agrodyne', 'Fungicida', 'Yodo Preventivo para hongos  ', 61, 330, 4, 1320, 80520);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `inversion` bigint(20) NOT NULL,
  `lote` varchar(50) NOT NULL,
  `porcentaje` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(20) NOT NULL COMMENT ' 	AUTO_INCREMENT',
  `nombre_completo` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `contrasena` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_completo`, `correo`, `usuario`, `contrasena`) VALUES
(0, 'Braian', 'braian@gmail.com', 'braianlb', '1234'),
(0, 'Juanito', 'pepito@gmail.com', 'pepe', '1234'),
(0, 'Juancho', 'juancho@mail.com', 'juan', '1234'),
(0, 'Ander Gay', 'Gay@mail.com', 'Gay23', '1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `historico_ventas`
--
ALTER TABLE `historico_ventas`
  ADD PRIMARY KEY (`id_Cosecha`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historico_ventas`
--
ALTER TABLE `historico_ventas`
  MODIFY `id_Cosecha` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

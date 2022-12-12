CREATE DATABASE IF NOT EXISTS saah; 
use saah;
-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2022 a las 17:30:54
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aulas`
--

CREATE TABLE `aulas` (
  `id` int(11) NOT NULL,
  `numero_aula` varchar(4) NOT NULL,
  `bloque` enum('K','L','M','N','O','P') NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `aulas`
--

INSERT INTO `aulas` (`id`, `numero_aula`, `bloque`, `descripcion`) VALUES
(1, '101', 'K', 'Salon de Redes LAN'),
(2, '102', 'K', 'Salon de Redes LAN 2'),
(3, '203', 'L', 'Aula convencional'),
(4, '501', 'M', 'Aula convencional'),
(5, '101', 'M', 'Aula de ingles'),
(6, '101', 'O', 'Salón de informática');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `id` int(11) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `docentes`
--

INSERT INTO `docentes` (`id`, `documento`, `nombres`, `apellidos`, `correo`, `telefono`) VALUES
(1, '32343252', 'Juan Pablo', 'Gutierrez Mesa', 'juanmesa@gmail.com', '3124525562'),
(2, '221452543', 'Ana Maria', 'Perez', 'anaperez@gmail.com', '3145679890'),
(3, '10452523454', 'Felipe ', 'Villa Villa', 'felipevilla@gmail.com', '3103456543'),
(4, '1242145623', 'Rocio', 'Ruiz Melendez', 'rocioruiz@gmail.com', '3112347658');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `duracion` double NOT NULL,
  `objetivo` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `codigo`, `duracion`, `objetivo`) VALUES
(1, 'e10001', 4, 'Promoción de la programación en la actualidad'),
(2, 'e10002', 18, 'Curso intensivo de ingles'),
(3, 'e10003', 8, 'Curso de bases de datos'),
(4, '42542352', 4, 'evento editar ana ingles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento_grupo`
--

CREATE TABLE `evento_grupo` (
  `evento_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `evento_grupo`
--

INSERT INTO `evento_grupo` (`evento_id`, `grupo_id`) VALUES
(1, 1),
(1, 6),
(1, 7),
(2, 4),
(3, 1),
(3, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `id` int(11) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `numero_grupo` varchar(4) NOT NULL,
  `cantidad_estudiantes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`id`, `codigo`, `numero_grupo`, `cantidad_estudiantes`) VALUES
(1, 'DESARR-SOFT', '101', 38),
(2, 'INGLES-I', '101', 27),
(3, 'ALG-LIN', '203', 21),
(4, 'INGLES-II', '403', 25),
(5, 'ANA-COSTO', '321', 14),
(6, 'ROBOT', '312', 13),
(7, 'BD', '102', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `aula_id` int(11) NOT NULL,
  `docente_id` int(11) NOT NULL,
  `materia_id` int(11) NOT NULL,
  `grupo_id` int(11) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id`, `aula_id`, `docente_id`, `materia_id`, `grupo_id`, `hora_inicio`, `hora_fin`) VALUES
(1, 1, 1, 2, 1, '08:00:00', '10:00:00'),
(2, 3, 4, 7, 2, '10:00:00', '00:00:00'),
(3, 6, 3, 4, 7, '14:00:00', '16:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `id` int(11) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `duracion_horas` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `materias`
--

INSERT INTO `materias` (`id`, `codigo`, `nombre`, `duracion_horas`) VALUES
(1, 'm10001', 'Álgebra Lineal', 4),
(2, 'm10002', 'Redes LAN', 6),
(3, 'm10003', 'Aplicaciones y Servicios Web', 3),
(4, 'm10004', 'Fundamentos y Diseño de Bases de Datos', 4),
(5, 'm10005', 'Definición y Análisis de Requisitos', 4),
(6, 'm10006', 'Fundamentación Ambiental', 2),
(7, 'm10007', 'Inglés I', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aulas`
--
ALTER TABLE `aulas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `evento_grupo`
--
ALTER TABLE `evento_grupo`
  ADD KEY `fk_evento_grupo_evento1` (`evento_id`),
  ADD KEY `fk_evento_grupo_grupo1` (`grupo_id`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_horarios_aulas1_idx` (`aula_id`),
  ADD KEY `fk_horarios_materias1_idx` (`materia_id`),
  ADD KEY `fk_horarios_grupos1_idx` (`grupo_id`),
  ADD KEY `fk_horarios_docentes1_idx` (`docente_id`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `aulas`
--
ALTER TABLE `aulas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `docentes`
--
ALTER TABLE `docentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `grupos`
--
ALTER TABLE `grupos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `materias`
--
ALTER TABLE `materias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evento_grupo`
--
ALTER TABLE `evento_grupo`
  ADD CONSTRAINT `fk_evento_grupo_evento1` FOREIGN KEY (`evento_id`) REFERENCES `eventos` (`id`),
  ADD CONSTRAINT `fk_evento_grupo_grupo1` FOREIGN KEY (`grupo_id`) REFERENCES `grupos` (`id`);

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `fk_horarios_aulas1` FOREIGN KEY (`aula_id`) REFERENCES `aulas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_horarios_docentes1` FOREIGN KEY (`docente_id`) REFERENCES `docentes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_horarios_grupos1` FOREIGN KEY (`grupo_id`) REFERENCES `grupos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_horarios_materias1` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

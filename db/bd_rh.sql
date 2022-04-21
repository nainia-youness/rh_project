-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Genere le : jeu. 31 mars 2022 à 12:23
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de donnees : `bd_rh`
--

-- --------------------------------------------------------

--
-- Structure de la table `affectation`
--

CREATE TABLE `affectation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dechargement des donnees de la table `affectation`
--

INSERT INTO `affectation` (`designation`, `description`) VALUES
('AGENCE MARRAKECH', 'AGENCE MARRAKECH ');

-- --------------------------------------------------------

--
-- Structure de la table `centre_cout`
--

CREATE TABLE `centre_cout` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dechargement des donnees de la table `centre_cout`
--

INSERT INTO `centre_cout` (`designation`, `description`, `derniere_operation`,`user_id`) VALUES
('Logistique ', 'Logistique ', 'Ajouter',1);

-- --------------------------------------------------------

--
-- Structure de la table `contrat`
--

CREATE TABLE `contrat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dechargement des donnees de la table `contrat`
--

INSERT INTO `contrat` (`designation`, `description`, `derniere_operation`,`user_id`) VALUES
('CDI', 'Contrat a duree indeterminee', 'Modifier',1);

-- --------------------------------------------------------

--
-- Structure de la table `direction`
--

CREATE TABLE `direction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dechargement des donnees de la table `direction`
--

INSERT INTO `direction` (`designation`, `description`, `derniere_operation`,`user_id`) VALUES
('DIRECTION LOGISTIQUE ET DEVELOPPEMENT ', 'DIRECTION LOGISTIQUE ET DEVELOPPEMENT ', 'Ajouter',1);

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE `employe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `matricule` int(11) NOT NULL,
  `nom` varchar(255) CHARACTER SET utf8 NOT NULL,
  `prenom` varchar(255) CHARACTER SET utf8 NOT NULL,
  `date_naissance` date NOT NULL,
  `sexe` ENUM('M','F') NOT NULL,
  `cin` varchar(255) CHARACTER SET utf8 NOT NULL,
  `date_entree` date NOT NULL,
  `situation_familiale` ENUM('Marié(e)','Célibataire') NOT NULL,
  `nombre_enfant` int(11) NOT NULL,
  `charge_familiale` int(11) NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8 NOT NULL,
  `nationalite` text CHARACTER SET utf8 NOT NULL,
  `cnss` varchar(255) CHARACTER SET utf8 NOT NULL,
  `salaire` float NOT NULL,
  `numero_compte` int(11) NOT NULL,
  `participation` varchar(255) NOT NULL,
  `date_sortie` date NOT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `fonction_id` int(11) NOT NULL,
  `centre_cout_id` int(11) NOT NULL,
  `direction_id` int(11) NOT NULL,
  `ville_id` int(11) NOT NULL,
  `contrat_id` int(11) NOT NULL,
  `affectation_id` int(11) NOT NULL,
  `entite_id` int(11) NOT NULL,
  `delegue_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dechargement des donnees de la table `employe`
--

INSERT INTO `employe` (`matricule`, `nom`, `prenom`, `date_naissance`, `sexe`, `cin`, `date_entree`, `situation_familiale`, `nombre_enfant`, `charge_familiale`, `adresse`, `nationalite`, `cnss`, `salaire`, `numero_compte`, `participation`, `user_id`, `derniere_operation`,  `date_sortie`, `fonction_id`, `centre_cout_id`, `direction_id`, `ville_id`, `contrat_id`, `affectation_id`, `entite_id`, `delegue_id`) VALUES
(484, 'Chakir', 'Mohamed', '1994-01-01', 'M', 'BK179415', '2017-03-01', 'Marié(e)', 2, 2, 'RES El mehdi IMM B N°13 Sidi Maarouf ', 'MAR', '112166634', 8000, 1907802000, '5665mm', 4346, 'Modifier', '2022-03-18', 1, 1, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `employe_rubrique`
--

CREATE TABLE `employe_rubrique` (
  `id` int(11) NOT NULL,
  `employe_id` int(11) NOT NULL,
  `rubrique_id` int(11) NOT NULL,
  `montant` float NOT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `entite`
--

CREATE TABLE `entite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dechargement des donnees de la table `entite`
--

INSERT INTO `entite` (`designation`, `description`, `derniere_operation`,`user_id`) VALUES
('SAPRESS', 'SAPRESS', 'Ajouter',1);

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

CREATE TABLE `fonction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dechargement des donnees de la table `fonction`
--

INSERT INTO `fonction` (`designation`, `description`, `derniere_operation`,`user_id`) VALUES
('Achat', 'Achat', 'Ajouter',1);

-- --------------------------------------------------------

--
-- Structure de la table `parametre`
--

CREATE TABLE `parametre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) CHARACTER SET utf8 NOT NULL,
  `valeur` float NOT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `rubrique`
--

CREATE TABLE `rubrique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `designation` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

CREATE TABLE `ville` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8 NOT NULL,
  `derniere_operation` text CHARACTER SET utf8 NOT NULL,
  `date_derniere_operation` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dechargement des donnees de la table `ville`
--

INSERT INTO `ville` (`nom`, `derniere_operation`,`user_id`) VALUES
('Marrakech', 'Ajouter',1);

--
-- Index pour les tables dechargees
--

ALTER TABLE  `employe` ADD UNIQUE (`matricule`, `entite_id`);

ALTER TABLE `employe_rubrique`ADD UNIQUE (`employe_id`,`rubrique_id`);


--
-- Contraintes pour la table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `employe_ibfk_1` FOREIGN KEY (`entite_id`) REFERENCES `entite` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employe_ibfk_2` FOREIGN KEY (`affectation_id`) REFERENCES `affectation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employe_ibfk_3` FOREIGN KEY (`centre_cout_id`) REFERENCES `centre_cout` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employe_ibfk_4` FOREIGN KEY (`contrat_id`) REFERENCES `contrat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employe_ibfk_5` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employe_ibfk_6` FOREIGN KEY (`fonction_id`) REFERENCES `fonction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employe_ibfk_7` FOREIGN KEY (`ville_id`) REFERENCES `ville` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employe_ibfk_8` FOREIGN KEY (`delegue_id`) REFERENCES `employe` (`id`);

  
--
-- Contraintes pour la table `employe_rubrique`
--
ALTER TABLE `employe_rubrique`
  ADD CONSTRAINT `employe_rubrique_ibfk_1` FOREIGN KEY (`rubrique_id`) REFERENCES `rubrique` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employe_rubrique_ibfk_2` FOREIGN KEY (`employe_id`) REFERENCES `employe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

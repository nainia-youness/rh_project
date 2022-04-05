-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 31 mars 2022 à 12:23
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
-- Base de données : `user`
--

-- --------------------------------------------------------

--
-- Structure de la table `programme`
--

CREATE TABLE `programme` (
  `programme_id` int(11) NOT NULL,
  `programme_designation` varchar(255) CHARACTER SET utf8 NOT NULL,
  `programme_description` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `Role_id` int(11) NOT NULL,
  `role_designation` varchar(255) NOT NULL,
  `role_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `role_programme`
--

CREATE TABLE `role_programme` (
  `Role_id` int(11) NOT NULL,
  `programme_id` int(11) NOT NULL,
  `permission` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_nom` varchar(255) NOT NULL,
  `user_prenom` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_mdp` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user_mdp`
--

CREATE TABLE `user_mdp` (
  `user_mdp_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `mdp` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user_programme`
--

CREATE TABLE `user_programme` (
  `user_id` int(11) NOT NULL,
  `programme_id` int(11) NOT NULL,
  `permission` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user_role`
--

CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `programme`
--
ALTER TABLE `programme`
  ADD PRIMARY KEY (`programme_id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Role_id`);

--
-- Index pour la table `role_programme`
--
ALTER TABLE `role_programme`
  ADD KEY `programme_id` (`programme_id`),
  ADD KEY `Role_id` (`Role_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `user_mdp`
--
ALTER TABLE `user_mdp`
  ADD PRIMARY KEY (`user_mdp_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `user_programme`
--
ALTER TABLE `user_programme`
  ADD KEY `programme_id` (`programme_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `user_role`
--
ALTER TABLE `user_role`
  ADD KEY `role_id` (`role_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `programme`
--
ALTER TABLE `programme`
  MODIFY `programme_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `Role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user_mdp`
--
ALTER TABLE `user_mdp`
  MODIFY `user_mdp_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `role_programme`
--
ALTER TABLE `role_programme`
  ADD CONSTRAINT `role_programme_ibfk_1` FOREIGN KEY (`programme_id`) REFERENCES `programme` (`programme_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_programme_ibfk_2` FOREIGN KEY (`Role_id`) REFERENCES `role` (`Role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_mdp`
--
ALTER TABLE `user_mdp`
  ADD CONSTRAINT `user_mdp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_programme`
--
ALTER TABLE `user_programme`
  ADD CONSTRAINT `user_programme_ibfk_1` FOREIGN KEY (`programme_id`) REFERENCES `programme` (`programme_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_programme_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`Role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
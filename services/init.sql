-- Neue Tabelle anlegen
CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL auto_increment,
  `type` varchar(100) default NULL,
  `code` varchar(100) default NULL,
  `value` float(4,2) NOT NULL,
  `name` varchar(100) default NULL,
  `valid` boolean default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Demodaten in neue Tabelle füllen
INSERT INTO `vouchers` (`type`,`code`,`value`,`name`,`valid`) VALUES ('money','QRCode1','10','Max Muster',1);
INSERT INTO `vouchers` (`type`,`code`,`value`,`name`,`valid`) VALUES ('money','QRCode2','20','Max Muster 2',1);

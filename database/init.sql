CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL auto_increment,
  `type` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `value` float(4,2) NOT NULL,
  `name` varchar(100) NOT NULL,
  `valid` int(11) NOT NULL default 1,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


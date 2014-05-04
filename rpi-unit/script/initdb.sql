/* User */
drop table if exists users;
create table users (
	id integer primary key autoincrement,
	username string not null,
	password string not null,
	fullname string not null,
	isadmin bool not null default 0 
);

/* DeviceType */
drop table if exists device_types;
create table device_types (
	id integer primary key autoincrement,
	name string not null	
);

/* Programs */
drop table if exists programs;
create table programs (
	id integer primary key autoincrement,
	name string not null,
	id_device_type integer,
	FOREIGN KEY(id_device_type) REFERENCES device_types(id)
);

/* 
Parameters
Type:
	1-String
	2-Number
	3-Date
Scope:
	1-DeviceType
	2-Program
*/
drop table if exists parameters;
create table parameters (
	id integer primary key autoincrement,
	name string not null,
	value string not null,
	type integer not null,	
	scope integer not null,
	builtin bool not null default 0
);

/* Programs View #01 */
drop view if exists programs_v01;
create view programs_v01 as
	select programs.*, device_types.name as name_device_type
	from programs
	inner join device_types on programs.id_device_type = device_types.id;

/* Data */
insert into users values (1, "admin", "879f4a8ffee8be46f02a9fa2f845a1c0", "Amministratore Sistema", 1);
insert into users values (2, "unit", "a7fccf7189106bab56a2565bb404fd54", "Utilizzatore", 0);

insert into device_types values (1, "Arduino UNO rev.3");
insert into device_types values (2, "ATTiny85");

insert into programs values (1, "Arduino Test Program", 1);
insert into programs values (2, "ATTiny85 Test Program", 2);

insert into parameters values (1, "Dummy System Parameter", "sys", 1, 2, 1);
insert into parameters values (2, "Dummy Custom Parameter", "custom", 1, 2, 0); 
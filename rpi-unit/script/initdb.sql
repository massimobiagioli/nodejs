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
	id_device_type integer not null,
	FOREIGN KEY(id_device_type) REFERENCES device_types(id)
);

/* Programs View #01 */
drop view if exists programs_v01;
create view programs_v01 as
	select programs.*, device_types.name as name_device_type
	from programs
	inner join device_types on programs.id_device_type = device_types.id;

/* Parameters */
drop table if exists program_parameters;
create table program_parameters (
	id integer primary key autoincrement,
	id_program integer not null,
	name string not null,
	value string not null
);

/* 
Statuses 
Phase:
	1-Setup
	2-Loop
*/
drop table if exists statuses;
create table statuses (
	id integer primary key autoincrement,
	name string not null,
	id_program integer not null,
	phase integer not null,
	FOREIGN KEY(id_program) REFERENCES programs(id)
);

/* Statuses View #01 */
drop view if exists statuses_v01;
create view statuses_v01 as
	select statuses.*, programs.name as name_program
	from statuses
	inner join programs on statuses.id_program = programs.id;

/* Data */
insert into users values (1, "admin", "879f4a8ffee8be46f02a9fa2f845a1c0", "Amministratore Sistema", 1);
insert into users values (2, "unit", "a7fccf7189106bab56a2565bb404fd54", "Utilizzatore", 0);

insert into device_types values (1, "Arduino UNO rev.3");
insert into device_types values (2, "ATTiny85");

insert into programs values (1, "Arduino Test Program", 1);
insert into programs values (2, "ATTiny85 Test Program", 2);

insert into program_parameters values (1, 1, "PROG1_PAR1", "dummy");
insert into program_parameters values (2, 1, "PROG1_PAR2", "123");

insert into statuses values (1, "Setup", 1, 1);
insert into statuses values (2, "Loop", 1, 2);

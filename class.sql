
create table Users(
    id int not null auto_increment,
    name varchar(25),
    type enum('teacher', 'student'),
    Primary KEY (id)
);

create table classes(
    id int auto_increment,
    name varchar(25),
    classCode varchar(10) Unique,
    description varchar(1000) default null,
    createdBy int default null,
    active tinyint default 1,
    Primary KEY (id)
);

create table student_classes(
    studentId int not null,
    classCode varchar(12) not null,
    active tinyint default 1,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default null on update current_timestamp,
    Primary KEY (studentId, classCode),
	foreign key (studentId) references users(id),
    foreign key (classCode) references classes(classCode)
);

create table files(
    id int auto_increment,
    name varchar(25),
    description varchar(200),
    classCode varchar(12),
    file varchar(100),
    fileType enum('audio', 'video', 'image', 'url'),
    uploadedBy int,
    uploadedAt timestamp default CURRENT_TIMESTAMP,
    Primary KEY (name, classCode, fileType),
    foreign key (classCode) references classes(classCode)
)
create table class{
    id int autoincrement
    name varchar(25)
    classCode varchar(10) pk
    description varchar(200)
    createdBy int
    active tinyint default 1
    -- Primary KEY
}

create table user{
    id int autoincrement
    name varchar(25)
    type enum('teacher', 'student')
}

create table files{
    id int autoincrement
    name varchar(25)
    description varchar(200)
    classCode varchar(12)
    file varchar(100)
    fileType enum('audio', 'video', 'image', 'url')
    uploadedBy int
    uploadedAt datetime default currenttimestamp
    Primary KEY name
}

create table student_classes{
    studentId int not null
    classCode varchar(12) not null
    active tinyint default 1
    Primary KEY(studentId, classCode)
}
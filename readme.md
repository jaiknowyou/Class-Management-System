# Class Management System

Basic Architecture is divided into index.js (main file), routes, Authentication Middlewares, Controllers, Models/Class Instances, Common Service Files and config files for connecting to database.

class.sql has defined table which are created and in which data is stored.

The APIs can be performed or called by two type of users:
1. Tutor
2. Student

Without the User identification through id, APIs call cannot be completed.

Tutor API Calls
1. Add Class
2. Add Student to Class
3. Add File to Class
4. View Classes
5. View Files
6. Remove Class
7. Remove Student

Student API Calls
1. View Classes
2. View Files

Common API Calls
1. Add User
2. Get User by Type

Step 1: NodeJS Architecture = Day 1
Step 2: MySQL Table Creation
Step 3: Corrections and Debugging
Step 4: PostMan API Collections = Day 2
Step 5: Commenting if Required 
Step 6: s3 bucket setup and Hosting (Later/Optional) = Day 3
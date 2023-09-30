const { Router } = require("express")
const AuthController = require('../Middleware/Auth')
const TutorController = require("../Controllers/TutorController")
const StudentController= require("../Controllers/StudentController")

// require('../Config/db')


let router = Router()
// Middleware later ----> Auth.verify()

router.post('/:userId/tutor/addClass', AuthController.verify, AuthController.user('teacher'), TutorController.addClass)
router.post('/:userId/tutor/addStudents', AuthController.verify, AuthController.user('teacher'), TutorController.addStudents)
router.post('/:userId/tutor/addFile', AuthController.verify, AuthController.user('teacher'), TutorController.addFile)
router.get('/:userId/tutor/viewClasses', AuthController.verify, AuthController.user('teacher'), TutorController.viewClasses)
router.get('/:userId/tutor/viewFiles', AuthController.verify, AuthController.user('teacher'), TutorController.viewFiles)
router.put('/:userId/tutor/removeStudent', AuthController.verify, AuthController.user('teacher'), TutorController.removeStudent)
router.put('/:userId/tutor/removeClass', AuthController.verify, AuthController.user('teacher'), TutorController.removeClass)

router.get('/:userId/viewClasses', AuthController.verify, AuthController.user('student'), StudentController.viewClasses)
router.get('/:userId/viewFiles', AuthController.verify, AuthController.user('student'), StudentController.viewFiles)

module.exports = router
const express = require('express');
const controller = require('./../Controller/teacherController');
const router=express.Router();
const { bodyValidate, paramValidate,changePasswordValidate } = require("../middlewares/Validation/teacherValidation");
const validator = require("../middlewares/Validation/validator");
const{isAdmin}=require("../middlewares/Validation/authorizationMW")


router.route("/teachers")
    .all(isAdmin)
    .get(controller.getAllTeachers)
    .patch(bodyValidate, validator,controller.updateTeacher)
    .delete(controller.deleteTeacher)

router.get("/teachers/supervisors",isAdmin,controller.getSupervisors)

router.put("/teachers/changePassword",changePasswordValidate, validator, controller.changePassword)

router.get("/teachers/:id",isAdmin,paramValidate, validator,controller.getTeacherById)





/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags:
 *       - Teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *   patch:
 *     summary: Update a teacher
 *     tags:
 *       - Teachers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete a teacher
 *     tags:
 *       - Teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Get supervisors
 *     tags:
 *       - Teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /teachers/changePassword:
 *   put:
 *     summary: Change teacher's password
 *     tags:
 *       - Teachers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     tags:
 *       - Teachers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */

module.exports = router;


module.exports=router;
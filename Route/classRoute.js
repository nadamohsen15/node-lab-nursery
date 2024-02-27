const express = require('express');
const controller=require('./../Controller/classController')
const router=express.Router();
const {bodyValidate, paramValidate} = require("../middlewares/Validation/classValidator");
const validator = require("../middlewares/Validation/validator");
const{isAdmin}=require("../middlewares/Validation/authorizationMW")

router.route("/class")
        .get(controller.getAllClasses)
        .post(isAdmin,bodyValidate, validator,controller.insertClass)
        .delete(isAdmin,controller.deleteClass)
        .patch(isAdmin,bodyValidate, validator,controller.updateClass)

router.get("/class/child/:id",paramValidate, validator,controller.classChildren)
router.get("/class/teacher/:id",paramValidate, validator,controller.classSupervisor)
router.get("/class/:id",paramValidate, validator,controller.getClassById)

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Get all classes
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Insert a new class
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: OK
 *   delete:
 *     summary: Delete a class
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *   patch:
 *     summary: Update a class
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get children in a class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get supervisor of a class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Get a class by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */

module.exports = router;





module.exports=router;
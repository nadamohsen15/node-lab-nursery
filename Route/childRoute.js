const express = require('express');
const Controller = require('./../Controller/child.controller');
const router=express.Router();
const {bodyValidate, paramValidate} = require("../middlewares/Validation/childValidator");
const validator = require("../middlewares/Validation/validator");
const{isAdmin}=require("../middlewares/Validation/authorizationMW")




module.exports=router
/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Insert a new child
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: Success
 *   patch:
 *     summary: Update a child
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete a child
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.route("/child")
        .get(Controller.getAllChilren)
        .post(isAdmin, bodyValidate, validator,Controller.insertChild)
        .patch(isAdmin,bodyValidate, validator,Controller.updateChild)
        .delete(isAdmin,Controller.deleteChild)

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get a child by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/child/:id",paramValidate, validator,Controller.getChildById)

module.exports=router

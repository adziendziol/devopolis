import express from "express";
import companyController from "../company/company.controller";
const router = express.Router();

router.get("/", companyController.getCompanies);
router.post("/", companyController.createCompany);

export default router;

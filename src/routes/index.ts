import express from "express";
import companyRoutes from "./companyRoutes";
const router = express.Router();

router.use("/api/v1/company", companyRoutes);

export default router;

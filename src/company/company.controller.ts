import { Request, Response, NextFunction } from "express";
import * as CompanyService from "./company.service";

async function getCompanies(req: Request, res: Response) {
  res.json(await CompanyService.getCompanies(req.params.companyId));
}

async function createCompany(req: Request, res: Response) {
  res.send(await CompanyService.createCompany(req));
}

export default { getCompanies, createCompany };

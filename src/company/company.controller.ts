import { Request, Response, NextFunction } from "express";
import * as CompanyService from "./company.service";

async function getCompanies(req: Request, res: Response): Promise<any> {
  res.status(200).send(CompanyService.getCompanies());
}

function createCompany(req: Request, res: Response) {
  res.send(CompanyService.createCompany(req));
}

export default { getCompanies, createCompany };

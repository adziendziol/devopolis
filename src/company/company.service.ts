import { Request } from "express";
import { Company } from "./company";

export async function createCompany(request: Request) {
  const { name, tloc, locPerDay } = request.body;
  const companyEntry = Company.build({ name, tloc, locPerDay });
  await companyEntry.save();
  console.log(companyEntry);
  return companyEntry;
}

export async function getCompanies() {
  const returnedCompanies = await Company.find({});
  console.log(returnedCompanies);
  return returnedCompanies;
}

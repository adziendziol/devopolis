import { throws } from "assert";
import { ObjectID } from "bson";
import { Request } from "express";
import "dotenv/config";
import { now } from "mongoose";
import { StringDecoder } from "string_decoder";
import { Company, CompanyDoc} from "./company";
import { env } from "process";
import { debug } from "console";
import { debuglog } from "util";

export async function createCompany(request: Request) {
  const { name, tloc, locPerDay, lastUpdatedLoc } = request.body;
  const companyEntry = Company.build({
    name,
    tloc,
    locPerDay,
    lastUpdatedLoc,
  });
  await companyEntry.save();
  console.log(companyEntry);
  return companyEntry;
}

export async function getCompanies(
  id?: String
): Promise<CompanyDoc | CompanyDoc[] | null> {
  let returnedCompanies: CompanyDoc | null | CompanyDoc[];
  if (id != null) {
    returnedCompanies = await Company.findById(id);
  } else {
    returnedCompanies = await Company.find({});
  }
  if (returnedCompanies != null) {
    returnedCompanies = updatetlocs(returnedCompanies);
    return returnedCompanies;
  } else {
    throw new Error("Keine Company gefunden");
  }
}

function updatetlocs(company: CompanyDoc | CompanyDoc[]): CompanyDoc | CompanyDoc[] {
  if (Array.isArray(company)) {
    company.forEach(async (singleCompany) => {
      calculateLocDifference(singleCompany);
    });
  } else {
    calculateLocDifference(company);
  }

  return company;
}

async function calculateLocDifference(company: CompanyDoc): Promise<CompanyDoc> {
  let currentMillisecounds: number = new Date().getTime();

  let difference: number =
    currentMillisecounds - company.lastUpdatedLoc.getTime();
  debug("Difference " + difference);


  difference = Math.floor(difference / Number(process.env.LOCUPDATEINTERVALL));
  debug("Quotient " + difference);
  if (difference.valueOf() >= 1) {
    company.tloc += (difference * company.locPerDay);
   debug("Result " + company.tloc);
   debug("Result " + company._id);
  company.lastUpdatedLoc = new Date();
  await Company.build(company).save();
  }

  return company;
}

import mongoose, { now } from "mongoose";

interface ICompany {
  name: string;
  tloc: number;
  locPerDay: number;
  lastUpdatedLoc: Date;
}

interface companyModelInterface extends mongoose.Model<CompanyDoc> {
  build(attr: ICompany): CompanyDoc;
}

interface CompanyDoc extends mongoose.Document {

  name: string;
  tloc: number;
  locPerDay: number;
  lastUpdatedLoc: Date;
}

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tloc: {
    type: Number,
    required: true,
  },
  locPerDay: {
    type: Number,
    required: true,
  },
  lastUpdatedLoc: {
    type: Date,
    required: true,
  },
});

companySchema.statics.build = (attr: ICompany) => {
  return new Company(attr);
};

const Company = mongoose.model<CompanyDoc, companyModelInterface>(
  "Company",
  companySchema
);

export { Company, CompanyDoc};

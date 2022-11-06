import mongoose from "mongoose";

interface ICompany {
  name: String;
  tloc: Number;
  locPerDay: Number;
}

interface companyModelInterface extends mongoose.Model<CompanyDoc> {
  build(attr: ICompany): CompanyDoc;
}

interface CompanyDoc extends mongoose.Document {
  name: String;
  tloc: Number;
  locPerDay: Number;
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
});

companySchema.statics.build = (attr: ICompany) => {
  return new Company(attr);
};

const Company = mongoose.model<CompanyDoc, companyModelInterface>(
  "Company",
  companySchema
);

Company.build({
  name: "some title",
  tloc: 0,
  locPerDay: 100,
});

export { Company };

export interface PersonalDataCheckWarning {
  type: string;
  value: string;
}

export interface PersonalDataCheckOptions {
  regional: string
}

export interface PersonalDataCheckRegional {
  regs: { type: string, reg: RegExp }[];
  names: string[];
}
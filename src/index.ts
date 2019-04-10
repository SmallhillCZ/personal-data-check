import { PersonalDataCheckOptions, PersonalDataCheckWarning, PersonalDataCheckRegional } from "./schema";

export * from "./schema";

export class PersonalDataCheck {

  namesReg: RegExp;
  regionalRegs: { type: string, reg: RegExp }[];

  dateReg: RegExp = /\d{1,2}\. ?\d{1,2}\. ?(\d{2}|')?\d{2}|\d{4}\-\d{2}\-\d{2}|\d{1,2}\/\d{1,2}\/\d{2}?\d{2}/g;

  constructor(regional?: PersonalDataCheckRegional) {

    if (regional) {
      this.namesReg = new RegExp("(^|[ \\.,])(" + regional.names.join("|") + ")($|[ \\.,])", "iug");
      this.regionalRegs = regional.regs;
    }
  }

  check(data: string): PersonalDataCheckWarning[] {

    const today = new Date();

    const warnings: PersonalDataCheckWarning[] = [];

    /* NAMES */
    if (this.namesReg) {
      let result;
      while (result = this.namesReg.exec(data)) {
        if (result) warnings.push({ type: "name", value: result[2] });
      }
    }

    /* DATES */
    {
      let result;
      while (result = this.dateReg.exec(data)) {
        const date = new Date(result[0]);
        if (date && date.getTime() <= today.getTime()) warnings.push({ type: "birthday", value: result[0] });
        else warnings.push({ type: "date", value: result[0] });
      }
    }

    /* REGIONAL */
    if (this.regionalRegs) {
      this.regionalRegs.forEach(search => {

        if (search.reg.global) {
          let result;
          while (result = search.reg.exec(data)) {
            if (result) warnings.push({ type: search.type, value: result[0] });
          }
        }

        else {
          let result = search.reg.exec(data)
          if (result) warnings.push({ type: search.type, value: result[0] });
        }
      })
    }

    return warnings;
  }
}
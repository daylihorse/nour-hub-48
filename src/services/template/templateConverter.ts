
import { Template } from "@/types/template";

export class TemplateConverter {
  static convertTemplateParametersToFormValues(template: Template) {
    return template.parameters.map(param => ({
      parameter: param.nameEn,
      value: "",
      unit: param.unit,
      reference: `${param.normalRangeMin}-${param.normalRangeMax}`,
      status: "normal" as const
    }));
  }
}

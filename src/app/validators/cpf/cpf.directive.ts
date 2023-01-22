import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { cpfValidator } from "./cpf.validator";

@Directive({
  selector: '[validCpf]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CpfDirective,
    multi: true
  }]
})

export class CpfDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return cpfValidator()(control)
  }
}

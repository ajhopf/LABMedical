import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createDoBValidator } from "./date-of-birth.validator";

@Directive({
  selector: '[appValidDob]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidDobDirective,
    multi: true
  }]
})

export class ValidDobDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return createDoBValidator()(control)
  }
}

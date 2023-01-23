import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function cpfValidator():  ValidatorFn {
	return (control: AbstractControl) : ValidationErrors | null => {
		const cpfInputValue = control.value

		const regEx = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
		const regExNumbers = /^\d{11}$/

		if(!control.value) {
			return null
		}

		if (cpfInputValue.match(regEx) || cpfInputValue.match(regExNumbers)) {
			return null
		} else {
			return {
				invalidCpf: true
			}
		}
	}
}
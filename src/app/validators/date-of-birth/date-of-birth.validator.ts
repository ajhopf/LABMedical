import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createDoBValidator():  ValidatorFn {
	return (control: AbstractControl) : ValidationErrors | null => {

		const inputValue = control.value?.substring(0,10)
		const today = new Date().toISOString().substring(0,10)

		if (!inputValue) {
			return null
		}

		const isBeforeToday = inputValue < today

		return !isBeforeToday ? { invalidDob: true } : null
	}
}
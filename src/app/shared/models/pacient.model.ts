export interface Pacient {
	identification: {
		pacientName: string;
		pacientGender: string;
		dob: string;
		cpf: string;
		rg: {
			number: string;
			dispatcher: string;
		},
		civilState: string;
		phoneNumber: string;
		email: string;
		cityOfBirth: string;
		emergencyContact: string;
		alergies?: string;
		specialCare?: string;
		},
		healthInsurance?: {
			insurance: string;
			insuranceNumber: string;
			insuranceValidity: string;
		},
		address: {
			cep: string;
			city: string;
			state: string;
			street: string;
			number: string;
			complement: string;
			district: string;
			reference: string;
		}
		id?: number;
}
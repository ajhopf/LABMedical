export interface Appointment {
	pacientId: number;
	reason: string;
	date: string;
	time: string;
	description: string;
	medication?: string;
	dosageAndPrecautions: string;
	id?: number
}
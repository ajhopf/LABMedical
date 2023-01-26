export interface Exam {
	pacientId: number;
	examName: string;
	date: string;
	time: string;
	examType: string;
	examLab: string;
	examUrl?: string;
	examResult: string;
	id?: number
}
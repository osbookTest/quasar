export type QA = {
  qa_id: number;
  qa_question: string;
  qa_answer: string;
  office_id: number;
  office_name: string; //不確定
  user_id: string;
  qa_asktime: Date;
  qa_checktime: Date | null;
  qa_check: boolean;
};

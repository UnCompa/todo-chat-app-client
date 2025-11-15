
import { ApiClient } from "../api/api-client";

export class HelperService extends ApiClient {
  seedFeedback = async (question: string, answer: string): Promise<{ success: boolean }> => {
    try {
      const res = await this.postFull("/api/helper/add-answer-result", {
        question,
        answer,
      });
      return { success: res.status == 201 };
    } catch (error) {
      console.error("Error al enviar feedback:", error.response?.data || error.message);
      throw error;
    }
  };
}

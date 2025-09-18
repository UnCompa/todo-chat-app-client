
import type { ProjectDetailData } from "../../features/dashboard/types/project-detail-interface";
import { ApiClient } from "../api/api-client";

export class ProjectService extends ApiClient {
  getAll = async (): Promise<{ data: any }> => {
    try {
      const res = await this.getData("/api/projects");
      return res;
    } catch (error: any) {
      console.error("Error al enviar feedback:", error.response?.data || error.message);
      throw error;
    }
  };
  
  getDetails = async (projectId: string): Promise<ProjectDetailData> => {
    try {
      const res = await this.getData<ProjectDetailData>(`/api/projects/details/${projectId}`);
      console.info("Project Service - Details", res)
      return res;
    } catch (error: any) {
      console.error("Error al enviar feedback:", error.response?.data || error.message);
      throw error;
    }

  };

  create = async (name: string, description: string) => {
    try {
      const body = { name, description }
      const res = await this.postData("/api/projects/add", body);
      return { res };
    } catch (error: any) {
      console.error("Error al enviar feedback:", error.response?.data || error.message);
      throw error;
    }
  }
}

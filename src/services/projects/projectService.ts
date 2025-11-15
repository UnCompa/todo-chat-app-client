
import type { Project } from "@/store/dashboard/projectStore";
import type { ProjectDetailData } from "../../features/dashboard/types/project-detail-interface";
import { ApiClient } from "../api/api-client";

export class ProjectService extends ApiClient {
  getAll = async (orgId?: string): Promise<{ data: Project[] }> => {
    try {
      let url = ""
      if (orgId) {
        url = `/api/projects/${orgId}`
      } else {
        url = `/api/projects`
      }
      const res = await this.getData<{ data: Project[] }>(url);
      return {
        data: res.data
      };
    } catch (error) {
      console.error("Error al enviar feedback:", (error as Error).message);
      throw error;
    }
  };

  getDetails = async (projectId: string): Promise<ProjectDetailData> => {
    try {
      const res = await this.getData<ProjectDetailData>(`/api/projects/details/${projectId}`);
      console.info("Project Service - Details", res)
      return res;
    } catch (error) {
      console.error("Error al enviar feedback:", (error as Error).message);
      throw error;
    }

  };

  create = async (name: string, description: string) => {
    try {
      const body = { name, description }
      const res = await this.postData("/api/projects/add", body);
      return { res };
    } catch (error) {
      console.error("Error al crear el proyecto", (error as Error).message);
      throw error;
    }
  }

  delete = async (projectId: string) => {
    try {
      const res = await this.deleteFull(`/api/projects/${projectId}`);
      return { success: res.status == 204 };
    } catch (error) {
      console.error("Error al eliminar el proyecto:", (error as Error).message);
      throw error;
    }
  }
  undo = async (projectId: string) => {
    try {
      const res = await this.postFull(`/api/projects/undo/${projectId}`);
      return { success: res.status == 200 };
    } catch (error) {
      console.error("Error al eliminar el proyecto:", (error as Error).message);
      throw error;
    }
  }
}

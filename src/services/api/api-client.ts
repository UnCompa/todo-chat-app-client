
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { Env } from "../../config/env";

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(version?: string) {
    this.axiosInstance = axios.create({
      baseURL: version ? `${Env.ApiUrl}/${version}` : Env.ApiUrl,
      withCredentials: true, // habilita cookies
    });
  }

  // ----------------- GET -----------------
  protected async getData<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, config);
    return response.data;
  }

  protected async getFull<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(endpoint, config);
  }

  // ----------------- POST -----------------
  protected async postData<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(endpoint, data, config);
    return response.data;
  }

  protected async postFull<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(endpoint, data, config);
  }

  // ----------------- PUT -----------------
  protected async putData<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(endpoint, data, config);
    return response.data;
  }

  protected async putFull<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(endpoint, data, config);
  }

  // ----------------- PATCH -----------------
  protected async patchData<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(endpoint, data, config);
    return response.data;
  }

  protected async patchFull<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(endpoint, data, config);
  }

  // ----------------- DELETE -----------------
  protected async deleteData<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(endpoint, config);
    return response.data;
  }

  protected async deleteFull<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(endpoint, config);
  }
}

// store/useProjectStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Project = {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
};

type ProjectState = {
  selectedProject: Project | null;
  setProject: (project: Project) => void;
  clearProject: () => void;
};

export const useProjectStore = create<ProjectState>()(
  devtools(
    persist(
      (set) => ({
        selectedProject: null,
        setProject: (project) => set({ selectedProject: project }),
        clearProject: () => set({ selectedProject: null }),
      }),
      {
        name: "project-storage", // clave en localStorage
      }
    )
  )
);

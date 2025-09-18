import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import { authClient } from "../../../lib/authClient";
import { useAuthStore } from "../../../store/auth/authStore";
import { useOnboardingStore } from "../../../store/onboarding/onboardingStore";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function CreateWorkSpace() {
  const user = useAuthStore((s) => s.user);
  const { organization, setOrganization } = useOnboardingStore();
  const [checkingSlug, setCheckingSlug] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      workspaceName:
        organization.name || (user?.name ? `${user.name} - Workspace` : ""),
      workspaceSlug:
        organization.slug ||
        (user?.name ? generateSlug(`${user.name} - Workspace`) : ""),
    },
    validate: async (values) => {
      const errors: Record<string, string> = {};
      if (!values.workspaceName) {
        errors.workspaceName = "El nombre es obligatorio";
      }
      if (!values.workspaceSlug) {
        errors.workspaceSlug = "El slug es obligatorio";
      } else {
        setCheckingSlug(true);
        const { data, error } = await authClient.organization.checkSlug({
          slug: values.workspaceSlug,
        });
        setCheckingSlug(false);

        if (error || !data?.status) {
          errors.workspaceSlug = "Este slug ya está ocupado";
        }
      }
      return errors;
    },
    onSubmit: (values) => {
      setOrganization({
        name: values.workspaceName,
        slug: values.workspaceSlug,
        userId: user?.id || "",
      });
    },
  });

  // inicializar con el nombre del usuario si no existe
  useEffect(() => {
    if (user?.name && !organization.name) {
      const value = `${user.name} - Workspace`;
      const slug = generateSlug(value);
      formik.setFieldValue("workspaceName", value);
      formik.setFieldValue("workspaceSlug", slug);
      setOrganization({
        name: value,
        slug,
        userId: user.id,
      });
    }
  }, [user]);

  return (
    <form onSubmit={formik.handleSubmit} className="text-center space-y-4">
      <h1 className="font-Outfit font-bold text-3xl">
        Crea tu espacio de trabajo
      </h1>
      <p className="text-[color:var(--color-muted)] font-WorkSans">
        Dale un nombre a tu espacio para comenzar.
      </p>

      {/* Nombre del workspace */}
      <Input
        name="workspaceName"
        onChange={(e) => {
          formik.handleChange(e);
          const slug = generateSlug(e.target.value);
          formik.setFieldValue("workspaceSlug", slug);
          setOrganization({ name: e.target.value, slug });
        }}
        value={formik.values.workspaceName}
        type="text"
        placeholder="Ej. Mi Empresa"
        className="mt-4 w-full border rounded-lg px-4 py-2"
        errorMessage={formik.errors.workspaceName}
      />

      {/* Slug editable */}
      <Input
        name="workspaceSlug"
        onChange={(e) => {
          formik.handleChange(e);
          setOrganization({ slug: e.target.value });
        }}
        value={formik.values.workspaceSlug}
        type="text"
        placeholder="ej. mi-empresa"
        className="mt-2 w-full border rounded-lg px-4 py-2"
        errorMessage={
          checkingSlug ? "Verificando disponibilidad..." : formik.errors.workspaceSlug
        }
      />
    </form>
  );
}

export default CreateWorkSpace;

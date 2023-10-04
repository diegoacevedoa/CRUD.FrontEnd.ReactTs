CRUD Front End en ReactJs.

PASOS PARA DESARROLLARLO

1- Crear proyecto con Vite: npm create vite@latest project-name, seleccionamos reactjs y javascript.

2- Nos ubicamos en la carpeta del proyecto: cd project-name

3- Instalamos librerías de nodejs: npm install

4- Ejecutamos proyecto para ver que todo funcione OK: npm run dev

5- Eliminamos los archivos index.css, app.css, react.svg y los linkeos a esos archivos.

6- Limpiamos componente App y verificamos funcionamiento OK con npm run dev

7- Instalar Sass para estilos, es mejor que css, es scss: npm install sass

8- Instalamos sweetalert2 para los mensajes: npm i sweetalert2

9-Creamos carpetas: api, components, helpers y hooks en carpeta src.

10-Creamos carpetas: modules y ui en carpeta components.

11-Incluimos componentes en la carpeta ui: button, field, label, loading, modal, pagination y table.

12-Inlcuimos el hook useForm en la carpeta hooks para para capturar datos de entrada y sus validaciones.

13-Incluimos el archivo fetch.ts en la carpeta helpers para llamar el api del backend.

14-Creamos la carpeta persona en modules y creamos los componentes en esta con rafc: Persona.tsx, PersonaList.tsx, PersonaForm.tsx y el archivo index.ts para exportar el componente principal Persona.tsx, e invocamos el componente Persona.tsx desde el componente App.tsx.

15-Creamos el archivo constants.ts en la carpeta helpers con las rutas del api del backend:

export const API = {
  PERSONA_GET_ALL: "persona",
  PERSONA_CREATE: "persona",
  PERSONA_UPDATE: "persona/{id}",
  PERSONA_DELETE: "persona/{id}",
};

16- Creamos el archivo helpers.ts en la carpeta helpers:

export const mapper = (str: string, type: string) => {
  if (type === "date") {
    if (str) {
      return new Date(str).toLocaleString();
    }
  }

  return str;
};

17-Creamos la carpeta persona en api y creamos el archivo persona.ts para los métodos de llamado del api del back end:

import { API } from "../../helpers/constants";
import { fetchSinToken } from "../../helpers/fetch";

export const getAllPersonas = async () => {
  try {
    const response = await fetchSinToken(API.PERSONA_GET_ALL, {}, "GET");
    const body = await response.json();

    if (response.status === 200) {
      return {
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return {
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error: any) {
    console.log(error);

    return {
      apiCode: "401",
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const createPersona = async (item: CreatePersona) => {
  try {
    const response = await fetchSinToken(
      API.PERSONA_CREATE,
      {
        noDocumento: item.noDocumento,
        nombres: item.nombres,
        apellidos: item.apellidos,
      },
      "POST"
    );
    const body = await response.json();

    if (response.status === 200) {
      return {
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return {
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error: any) {
    console.log(error);

    return {
      apiCode: "401",
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const updatePersona = async (item: UpdatePersona) => {
  try {
    const response = await fetchSinToken(
      API.PERSONA_UPDATE.replace("{id}", item.idPersona),
      {
        idPersona: item.idPersona,
        noDocumento: item.noDocumento,
        nombres: item.nombres,
        apellidos: item.apellidos,
      },
      "PUT"
    );
    const body = await response.json();

    if (response.status === 200) {
      return {
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return {
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error: any) {
    console.log(error);

    return {
      apiCode: "401",
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

export const deletePersona = async (id: string) => {
  try {
    const response = await fetchSinToken(
      API.PERSONA_DELETE.replace("{id}", id),
      {},
      "DELETE"
    );
    const body = await response.json();

    if (response.status === 200) {
      return {
        apiCode: response.status,
        apiData: body,
        apiError: false,
        apiErrors: "",
        apiMessage: body.msg,
      };
    } else {
      return {
        apiCode: response.status,
        apiData: null,
        apiError: true,
        apiErrors: JSON.parse(
          JSON.stringify(
            body.message.includes("Forbidden")
              ? "Usted no posee permisos para realizar esta acción. "
              : body.message
          )
        ).toString(),
        apiMessage: "",
      };
    }
  } catch (error: any) {
    console.log(error);

    return {
      apiCode: "401",
      apiData: null,
      apiError: true,
      apiErrors:
        error != null && error.toString() === "TypeError: Failed to fetch"
          ? "El sitio no está disponible. "
          : error.toString(),
      apiMessage: "",
    };
  }
};

18-Creamos el archivo map.ts en la careta api/persona para mapear las columnas de las grids y el archivo index.ts para exportar los métodos de la carpeta api/persona:

import { mapper } from "../../helpers/helpers";

export const mapHeadPersona = {
  columns: [
    { label: "Acciones", name: "acciones", format: mapper, type: "text", editable: false  },
    { label: "NoDocumento", name: "noDocumento", format: mapper, type: "text", editable: false },
    { label: "Nombres", name: "nombres", format: mapper, type: "text", editable: false },
    { label: "Apellidos", name: "apellidos", format: mapper, type: "text", editable: false  },
  ],
};

19-Crear variables de entorno en src .env.development y .env.production: VITE_APP_API_URL=http://localhost:3000/api

20-Modificar componente PersonaList.tsx





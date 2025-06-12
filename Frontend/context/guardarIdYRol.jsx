//hacer zustand que tome el id del usuario para controlar el rol y que no pueda meterse a ninguna pagina sin permiso
//ejemplo si soy alumno no poder ingresar a la pagina de docentes, etc

import { create } from "zustand";

//zustand que guarda el id y el rol del usuario.
export const useUserStore = create((set) => ({
    // Estado inicial
    id: null,
    rol: "",
    nombre: "",


    setUsuario: (usuario) => {
        set({
            id: usuario.idUsuario,
            nombre:usuario.Usuario,
            rol:usuario.Rol 
        })

       
    },

    // Función para limpiar usuario (ej: logout)
    limpiarUsuario: () => {
        set({
            id: null,
            nombre: "",
            rol: ""
        })
    },
}));

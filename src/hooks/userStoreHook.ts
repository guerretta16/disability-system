import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserHook } from "../interfaces/types";
import { loginService } from "../services/AuthService";

const useUserStore = create<UserHook>()(
  persist(
    (set, get) => ({
      userInfo: null,
      loading: false,
      error: "",
      login: (username, password) => {
        set({userInfo: get().userInfo, loading: true, error: ""});
        loginService(username, password)
          .then((data) => {
            if(data.length > 0){
              set({
                userInfo: {
                  username: data[0].username,
                  rol: data[0].rol,
                  employeeId: data[0].employeeId.sys.id,
                  employeeName: data[0].employee.fullName,
                },
                error: "",
              })
            }
            else{
              set({ userInfo: null, error: "Username or password incorrect!" })
              setTimeout(() => {
                set({error: ""})
              }, 3500)
            }
            set({userInfo: get().userInfo, loading: false});
          })
          .catch((error) => console.error(error));
      },
      logout: () => set({userInfo: null})
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useUserStore;

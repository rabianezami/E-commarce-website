import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useModal } from "./useModal.js";
import LogoutModal from "../components/LogoutModal.jsx";

export function useLogoutModal() {
  const { logout } = useContext(AuthContext);
  const modal = useModal();

  const confirmLogout = () => modal.open();

  const LogoutModalWrapper = () => (
    <LogoutModal
      show={modal.isOpen}
      onConfirm={() => {
        logout();
        modal.close();
      }}
      onCancel={() => modal.close()} // ✅ اصلاح شد
    />
  );

  return { confirmLogout, LogoutModalWrapper };
}

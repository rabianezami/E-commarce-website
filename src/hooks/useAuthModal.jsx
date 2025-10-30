import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "./useModal";
import LoginModal from "../components/LoginModal"; // اطمینان از مسیر و وجود این فایل

export function useAuthModal() {
  const { user } = useContext(AuthContext);
  const modal = useModal();

  const requireAuth = (callback) => {
    if (!user) {
      modal.open();
      return;
    }
    if (typeof callback === "function") callback();
  };

  const AuthModal = () => (
    <LoginModal show={modal.isOpen} onClose={modal.close} />
  );

  return { requireAuth, AuthModal };
}

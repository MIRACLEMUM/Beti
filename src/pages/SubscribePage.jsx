import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function SubscribePage() {
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      user.subscribed = true; // match with HomePage check
      localStorage.setItem("user", JSON.stringify(user));
      setToastMessage("🎉 You are now subscribed to premium!");

      setTimeout(() => {
        navigate("/");
      }, 2000); // show toast for 2 seconds before redirect
    } else {
      setToastMessage("⚠️ You must be logged in to subscribe.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center text-xl font-semibold text-gray-700">
        Processing subscription...
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}

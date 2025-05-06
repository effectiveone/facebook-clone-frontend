import "./style.scss";
import LoginForm from "./LoginForm";
import Footer from "./Footer";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login" data-testid="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}

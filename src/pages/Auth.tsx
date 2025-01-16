import { useState } from "react";
import { Card, CardHeader, CardFooter, Button, CardBody, Input, Spacer, useDisclosure, Spinner } from "@nextui-org/react";
import { loginUser, sendForgetPasswordEmail } from "../../apis/routes/auth/auth.routes";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Logo from "/src/assets/no-title/logo-no-background.png";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router";
import CustomModal from "../components/base/Modal";

export default function Auth() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false); 
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { isOpen, onOpenChange } = useDisclosure();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await loginUser(dispatch, loginForm.email, loginForm.password);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setLoginForm({ email: "", password: "" });
    }
  };

  const handlePassReset = async () => {
    if (loginForm.email === "") {
      onOpenChange(); 
    }
	else {
		setIsResetting(true); 
		try {
		  await sendForgetPasswordEmail(loginForm.email);
		} catch (e) {
		  console.log(e);
		} finally {
		  setIsResetting(false); 
		}
	  }
  };

}

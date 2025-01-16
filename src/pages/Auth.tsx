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

  return (
    <>
      <CustomModal
        header="Email is Empty!"
        body="Please enter your email, and try again"
        isOpen={isOpen}
        onOpenChange={onOpenChange}

      />
      <div className="flex min-h-screen items-center justify-center bg-light-bg dark:bg-dark-bg">
        <Card className="w-full max-w-md flex flex-col gap-10">
          <CardHeader className="flex flex-col items-center pb-0 gap-10">
            <img src={Logo} alt="Logo" width={100} />
            <div className="self-start flex flex-col gap-3">
              <h1 className=" text-4xl font-semibold  text-light-gray">Login</h1>
              <h1 className=" text-md font-medium text-light-gray">Welcome Back! Please login to your account.</h1>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col ">
            <Input
              radius="lg"
              size="lg"
              type="email"
              placeholder="Enter your email"
              labelPlacement="inside"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              required
            />
            <Spacer y={5} />

            <Input
              size="lg"
              radius="lg"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOffIcon className="text-2xl text-dark-gray pointer-events-none" />
                  ) : (
                    <EyeIcon className="text-2xl text-dark-gray pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              required
              className="max-w-full"
            />

            <Spacer y={5} />
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full rounded-2xl bg-primary dark:bg-dark-primary dark:hover:bg-primary hover:bg-dark-primary text-white-font font-semibold uppercase"
              isLoading={loading}
              disabled={loginForm.email === "" && loginForm.password === ""}
              onPress={handleSubmit}
            >
              login
            </Button>
            <CardFooter className="flex  justify-center">
              <p className="mt-4 text-center text-sm text-dark-gray dark:text-light-gray">
                Forgot your password?
                <a
                  href="#"
                  className="text-primary hover:underline"
                  onClick={handlePassReset}
                >
                  {isResetting ? <Spinner color="white" size="sm" /> : " Reset it here"}
                </a>
              </p>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

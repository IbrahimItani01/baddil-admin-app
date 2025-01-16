import { useState } from "react";
import { Card, CardHeader, CardFooter, Button, CardBody, Input, Spacer, useDisclosure, Spinner } from "@nextui-org/react";
import { loginUser, sendForgetPasswordEmail } from "../../apis/routes/auth/auth.routes";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Logo from "/src/assets/no-title/logo-no-background.png";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router";
import CustomModal from "../components/base/Modal";

export default function Auth() {
}

import CheckMarkIcon from "./../../../../public/check-mark.svg?react";
import WarnIcon from "./../../../../public/warn.svg?react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useToast } from "../model/useToast";
import { DEFAULT_TOAST_DURATION, TOAST_ANIM_DURATION } from "../constants";

export const Toast = ({
  type,
  content,
  duration = DEFAULT_TOAST_DURATION,
  id,
  index,
}) => {
  const { closeToast } = useToast();
  const [isDisappearing, setIsDisappearing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisappearing(true);
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isDisappearing) return;

    const timer = setTimeout(() => {
      closeToast(id);
    }, TOAST_ANIM_DURATION);

    return () => clearTimeout(timer);
  }, [isDisappearing]);

  return (
    <ToastLayout $index={index} $type={type} $disappearing={isDisappearing}>
      <div className="icon-cont">
        {type === "error" ? <WarnIcon /> : <CheckMarkIcon />}
      </div>
      {content}
    </ToastLayout>
  );
};
const ToastLayout = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  color: white;
  background-color: ${({ $type }) => ($type === "error" ? "#ed1245" : "black")};
  transition: 0.5s;
  height: min-content;
  font-size: 16px;
  padding: 5px 12px;
  border-radius: 20px;
  width: max-content;
  align-items: center;
  gap: 5px;
  animation: 0.5s forwards;
  animation-name: ${({ $disappearing }) =>
    $disappearing ? "slideOut" : "slideIn"};
  transition: 0.5;
  left: 50%;
  bottom: ${({ $index }) => $index * 40 + 20 + "px"};
  transform: translateX(-50%) translateY(50px);
  position: absolute;
  @keyframes slideIn {
    from {
      transform: translateX(-50%) translateY(50px);
    }
    to {
      transform: translateX(-50%) translateY(0px);
    }
  }
  @keyframes slideOut {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(calc(-50% + 100px));
      opacity: 0;
    }
  }

  .icon-cont {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    img,
    svg {
      width: 22px;
      height: 22px;

      circle {
        fill: white;
      }

      path {
        stroke: white;
      }
    }
  }
`;

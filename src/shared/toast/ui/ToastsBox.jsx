import React, { PropsWithChildren } from "react"
import styled from "styled-components"


export const ToastBox = ({ children }) => {
  return <ToastBoxLayout>{children}</ToastBoxLayout>
}

const ToastBoxLayout = styled.div`
  pointer-events: none;
  position: fixed;
  z-index: 110;
  bottom: 0;
  width: 100%;
  left: 50%;
  gap: 5px;
  overflow-y: hidden;
  padding-bottom: 10px;
  transform: translateX(-50%);
  height: 300px;
`

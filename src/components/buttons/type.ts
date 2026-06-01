import React from 'react';

export type ButtonVariant =
  | 'primary-filled' //배경 있는 파란 버튼 (생성하기)
  | 'primary-outline' //테두리만 있는 파란 버튼 (생성하기)
  | 'secondary-filled' //배경 있는 파란 버튼 (완료 취소하기)
  | 'secondary-whiteFilled' //배경있는 하얀 버튼 (완료 취소하기)
  | 'danger-filled' // 빨간색 버튼 (생성하기)
  | 'icon-circle' // +, 하트 원형 버튼 (아이콘)
  | 'icon-circle-white' // 흰색 원형 버튼 (아이콘)
  | 'input-btn'; // 할 일 버튼(할 일)

export type ButtonState = 'default' | 'hover' | 'active' | 'disabled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  buttonState?: ButtonState;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

import React from 'react';

export interface FormInputI extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  inputRef?: React.Ref<any>;
  error?: string;
  name: string;
}

export interface FormPlacesI {
  name: string;
  placeholder?: string;
  label?: string;
  className?: string;
  inputRef?: React.Ref<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormTextareaI extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

export interface FormRadioI {
  label?: string;
  name: string;
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
}

export interface FormSelectI {
  label?: string;
  name: string;
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
  emptyOptionText?: string;
}

export interface FormDropdownI {
  label?: string;
  name: string;
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
  emptyOptionText?: string;
}

export interface FormCheckboxI extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
}

export interface FormCheckboxGroupI {
  label?: string;
  name: string;
  data: any[];
  optionValue: string;
  optionLabel: string;
  className?: string;
}

export interface FormFileI extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label?: string;
  className?: string;
  value: FileList | null;
  error?: string;
}

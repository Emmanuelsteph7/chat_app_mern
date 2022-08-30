// import { ErrorMessage, Field, FieldProps } from "formik";
import { ErrorMsg } from '../../components';
import { FormCheckboxI } from '../../types/formTypes';
import cs from 'classnames';
import { v4 } from 'uuid';

const FormCheckbox: React.FC<FormCheckboxI> = ({ label, className, error, ...props }) => {
  const classes = cs('formCheckbox', { [`${className}`]: className });
  const id = v4();

  return (
    <>
      <div className={classes}>
        <div className="formCheckbox__container">
          <input className="formCheckbox__input" type="checkbox" id={id} {...props} />
          <label className="formCheckbox__label" htmlFor={id}>
            {label}
          </label>
        </div>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </div>
    </>
  );
};

export default FormCheckbox;

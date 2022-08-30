import { LabelText } from '../../components';
import { FormTextareaI } from '../../types/formTypes';
import cs from 'classnames';
import { v4 } from 'uuid';

const FormTextarea: React.FC<FormTextareaI> = ({ label, className, ...props }) => {
  const classes = cs('formTextarea', {
    [`${className}`]: className
  });

  const id = v4();
  return (
    <div className={classes}>
      {label && <LabelText id={id}>{label}</LabelText>}
      <textarea name="" className="formTextarea__input" id={id} {...props}></textarea>
      {/* <ErrorMessage name={name} component={ErrorMsg} /> */}
    </div>
  );
};

export default FormTextarea;

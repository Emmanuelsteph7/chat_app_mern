import { useId, useState } from 'react';
import { LabelText, ErrorMsg } from '../../components';
import { FormInputI } from '../../types/formTypes';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import cs from 'classnames';

const FormInput: React.FC<FormInputI> = ({
  label,
  className,
  // inputRef,
  error,
  inputClassName,
  type = 'text',
  ...props
}) => {
  const [showPasswordText, setShowPasswordText] = useState(false);

  const classes = cs('flex flex-col mb-5', {
    [`${className}`]: className
  });

  const inputClasses = cs(
    'w-full bg-slate-200 focus:bg-white duration-150 px-3 py-2 rounded shadow outline-none',
    {
      [`${inputClassName}`]: inputClassName
    }
  );

  const id = useId();

  const handlePasswordShow = () => setShowPasswordText((prev) => !prev);
  const inputType = () => {
    if (type === 'password') {
      if (showPasswordText) {
        return 'text';
      } else {
        return 'password';
      }
    } else {
      return type;
    }
  };

  return (
    <div className={classes}>
      {label && <LabelText id={id}>{label}</LabelText>}
      <div className="relative">
        <input type={inputType()} id={id} className={inputClasses} {...props} />
        {type === 'password' && (
          <button
            type="button"
            onClick={handlePasswordShow}
            className="absolute top-2/4 px-4 right-0 transform -translate-y-2/4">
            {showPasswordText ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
          </button>
        )}
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
};

export default FormInput;

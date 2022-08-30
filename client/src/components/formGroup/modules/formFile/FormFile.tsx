import { useState } from 'react';
import { ErrorMsg, LabelText } from '../../components';
import cs from 'classnames';
import { FormFileI } from '../../types/formTypes';
import { v4 } from 'uuid';

const FormFile: React.FC<FormFileI> = ({ label, className, value, error, ...props }) => {
  const classes = cs('formFile', {
    [`${className}`]: className
  });

  const fileType = value && value[0]?.type;

  const id = v4();
  return (
    <div className={classes}>
      {label && <LabelText id={id}>{label}</LabelText>}
      <div className="formFile__body">
        {value && fileType?.startsWith('image') && <Preview file={value[0]} />}
        <input className="formFile__input" type="file" id={id} {...props} />
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
};

export default FormFile;

interface PreviewI {
  file: File;
}

const Preview: React.FC<PreviewI> = ({ file }) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div className="filePreview">
      <img className="filePreview__img" src={preview ? (preview as string) : undefined} alt="" />
    </div>
  );
};

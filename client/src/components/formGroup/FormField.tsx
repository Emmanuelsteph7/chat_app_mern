import { FormInput, FormTextarea, FormCheckbox, FormFile } from './modules';
import { FormCheckboxI, FormFileI, FormInputI, FormTextareaI } from './types/formTypes';

// this is the formfield component. It has embedded types
const formField = (props: FormInputI) => <FormInput {...props} />;
formField.Textarea = (props: FormTextareaI) => <FormTextarea {...props} />;
formField.Checkbox = (props: FormCheckboxI) => <FormCheckbox {...props} />;
formField.File = (props: FormFileI) => <FormFile {...props} />;

export default formField;

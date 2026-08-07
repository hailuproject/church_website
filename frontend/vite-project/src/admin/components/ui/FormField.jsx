export const FormField = ({ form, name, component: Component, ...props }) => {
  const { register, formState } = form;
  const error = formState.errors?.[name];
  return <Component {...register(name)} error={error?.message} {...props} />;
};

export const getFieldError = (formState, name) => formState.errors?.[name]?.message;

export default FormField;

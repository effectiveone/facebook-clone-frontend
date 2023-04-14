import "./style.scss";
import { useField, ErrorMessage } from "formik";
import useMedia from "../../../../hooks/useMedia";

export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props);

  const isView1 = useMedia("(min-width: 539px)");
  const isView2 = useMedia("(min-width: 850px)");
  const isView3 = useMedia("(min-width: 1170px)");

  const isTest1 = isView3 && field.name === "first_name";
  const isTest2 = isView3 && field.name === "last_name";

  const getWidth = () => {
    if (
      isView1 &&
      (field.name === "first_name" || field.name === "last_name")
    ) {
      return "100%";
    } else if (
      isView1 &&
      (field.name === "email" || field.name === "password")
    ) {
      return "370px";
    } else {
      return "300px";
    }
  };

  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        style={{ width: getWidth() }}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={
            isView3 ? "input_error input_error_desktop" : "input_error"
          }
          style={{
            transform: "translateY(2px)",
            left: `${isTest1 ? "-107%" : isTest2 ? "107%" : ""}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                isView3 && field.name !== "last_name"
                  ? "error_arrow_left"
                  : isView3 && field.name === "last_name"
                  ? "error_arrow_right"
                  : !isView3 && "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}

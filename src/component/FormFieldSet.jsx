import React from "react";
import { useNavigate } from "react-router-dom";

export default function FormFieldset({
  title,
  fields,
  form,
  setForm,
  onSubmit,
  buttonLabel,
  footerText,
  footerLink // { label, href }
}) {
  const navigate = useNavigate();

  return (
    <form className="w-xs" onSubmit={onSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend">{title}</legend>

        {fields.map(field => (
          <React.Fragment key={field.name}>
            <label htmlFor={field.name} className="label">
              {field.label}
            </label>

            <input
              id={field.name}
              type={field.type || "text"}
              className="input"
              placeholder={field.placeholder || ""}
              value={form[field.name] || ""}
              onChange={e =>
                setForm({ ...form, [field.name]: e.target.value })
              }
            />
          </React.Fragment>
        ))}

        {footerText && footerLink && (
          <p className="label mt-2 text-sm opacity-70">
            {footerText}{" "}
            <button
              type="button"
              onClick={() => navigate(footerLink.href)}
              className="link link-primary ml-1"
            >
              {footerLink.label}
            </button>
          </p>
        )}
      </fieldset>

      <button type="submit" className="btn btn-primary w-full mt-4">
        {buttonLabel}
      </button>
    </form>
  );
}

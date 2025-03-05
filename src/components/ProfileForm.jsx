import { useState, useEffect } from "react";

const ProfileForm = ({
  initialData,
  isEditing,
  onSave,
  onCancel,
  loading,
  error,
}) => {
  const [formData, setFormData] = useState(initialData);

  const fieldConfig = [
    { name: "phoneNumber", label: "Teléfono", type: "tel" },
    { name: "dateOfBirth", label: "Fecha de Nacimiento", type: "date" },
    { name: "country", label: "País", type: "text" },
    { name: "city", label: "Ciudad", type: "text" },
    { name: "address", label: "Dirección", type: "text" },
    { name: "postalCode", label: "Código Postal", type: "text" },
  ];

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} >
      {error && <div>{error}</div>}

      {fieldConfig.map(({ name, label, type }) => (
        <div key={name} >
          <label>
            {label}
            <input
              type={type}
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              disabled={!isEditing || loading}
              
            />
          </label>
        </div>
      ))}

      <div >
        {isEditing ? (
          <>
            <button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => onCancel()}
          >
            Editar Perfil
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;

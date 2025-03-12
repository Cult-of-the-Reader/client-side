import './ProfileForm.css';

const ProfileForm = ({ userData, handleChange, handleSubmit, isEditing, setIsEditing }) => {

  return (
    <div className="profile-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2 className="profile-title">Hi, {userData.user}</h2>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="form-group">
          <label>Birthday:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={userData.country}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div className="form-group">
          <label>CP:</label>
          <input
            type="text"
            name="postalCode"
            value={userData.postalCode}
            onChange={handleChange}
            disabled={!isEditing}
            className="profile-input"
          />
        </div>
        <div>
          {isEditing ? (
            <button type="submit" className="profile-button">Save changes</button>
          ) : (
            <button
              type="button"
              className="profile-button"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
            >
              Edit profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm; 
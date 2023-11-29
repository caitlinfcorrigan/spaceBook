import "./ProfileEditPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { update, deleteProfile } from "../../utilities/profiles-api";
import sendRequest from "../../utilities/send-request";
import { logOut } from "../../utilities/users-service";
import "./ProfileEditPage.css";
//if profile is already populated them show that as value
export default function ProfileEditPage({ myProfile, setMyProfile, setUser }) {
  const navigate = useNavigate();
  //const [formData, setFormData] = useState(myProfile);
  const [formData, setFormData] = useState({
    user: myProfile.user,
    avatar: myProfile.avatar,
    username: myProfile.username,
    species: myProfile.species ? myProfile.species : "",
    favPlanet: myProfile.favPlanet ? myProfile.favPlanet : "mercury",
    bio: myProfile.bio ? myProfile.bio : "",
  });
  function handleChange(evt) {
    const newFormData = { ...formData, [evt.target.name]: evt.target.value };
    setFormData(newFormData);
  }
  
  async function handleSubmit(evt) {
    evt.preventDefault();

    // Assuming your form has an input type="file" with name="avatar"
    const formData = new FormData(evt.target);

    try {
      const submitRes = await sendRequest(
        `/api/profiles/${myProfile.user}`,
        "PUT",
        formData
      );
     
      await setMyProfile(submitRes);
      return navigate("/profiles/" + myProfile.user);
    } catch (error) {
      console.error("Error during form submission", error);
    }
  }
  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this?")) {
      // delete it!
      const d = await deleteProfile(myProfile.user);
      navigate("/");
      logOut();
      setUser(null);
    } else {
      // Do nothing!
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} method="put" enctype="multipart/form-data">
        <div id="photo-container-edit-page">
          Upload Profile Photo <input type="file" name="avatar" />
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="species">Species:</label>
          <input
            type="text"
            id="species"
            name="species"
            autoComplete="off"
            value={formData.species}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="favPlanet">Favorite Planet:</label>
          <select
            id="favPlanet"
            name="favPlanet"
            value={formData.favPlanet}
            onChange={handleChange}
          >
            <option value="Mercury">Mercury</option>
            <option value="Venus">Venus</option>
            <option value="Earth">Earth</option>
            <option value="Mars">Mars</option>
            <option value="Jupiter">Jupiter</option>
            <option value="Saturn">Saturn</option>
            <option value="Uranus">Uranus</option>
            <option value="Neptune">Neptune</option>
            <option value="Pluto">Pluto</option>
          </select>
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        <button id="deleteProfile" onClick={handleDelete}>
          Delete Profile
        </button>
      </div>
    </>
  );
}

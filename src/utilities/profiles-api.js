// Use sendRequest to handle fetch
import sendRequest from "./send-request";

const BASE_URL = "/api/profiles";

// Retrieve user's profile (controller accesses user via req)
export function getMyProfile(user) {
  return sendRequest(`${BASE_URL}/${user.profile}`);
}

// Get another user's profile using their profile._id
export function getProfile(profileId) {
  return sendRequest(`${BASE_URL}/${profileId}`, 'GET', profileId);
}

export function update(formData) {
    return sendRequest(`${BASE_URL}/${formData._id}`, 'PUT', formData)
}

export function deleteProfile(user) {
  return sendRequest(`${BASE_URL}/${user._id}`, "DELETE");
}

export function getAll() {
  return sendRequest(BASE_URL);
}

export function createProfile(user) {
  return sendRequest(`${BASE_URL}/${user._id}`, "POST");
}


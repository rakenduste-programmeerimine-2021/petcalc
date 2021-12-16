export const USER_LOGIN = "USER_LOGIN"
export const USER_LOGOUT = "USER_LOGOUT"
export const PET_ADD = "PET_ADD"
export const PETS_UPDATE = "PETS_UPDATE"
export const PET_REMOVE = "PET_REMOVE"

export const addPet = pet => ({
  type: PET_ADD,
  payload: pet
})

export const removePet = id => ({
  type: PET_REMOVE,
  payload: id
})

export const updatePets = array => ({
  type: PETS_UPDATE,
  payload: array
})

export const loginUser = data => ({
  type: USER_LOGIN,
  payload: data
})

export const logoutUser = () => ({
  type: USER_LOGOUT
})

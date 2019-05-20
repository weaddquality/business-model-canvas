import { API } from 'aws-amplify'

export const getItems = team => {
  const teamNameWithoutDash = team
  return API.get('bmc-items', `/bmc-items/list?Team=${teamNameWithoutDash}`)
}

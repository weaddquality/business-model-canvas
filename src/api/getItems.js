import { API } from 'aws-amplify'

export const getItems = team => {
  const teamNameWithoutDash = team.replace('-', ' ')
  return API.get('bmc-items', `/bmc-items/listv2?Team=${teamNameWithoutDash}`)
}

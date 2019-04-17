import { API } from 'aws-amplify'

export const getItems = team => {
  const fixedTeam = team.replace('-', ' ')
  return API.get('bmc-items', `/bmc-items/list?Team=${fixedTeam}`)
}

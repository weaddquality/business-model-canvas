import { API } from 'aws-amplify'

export const getItems = team => {
  return API.get('bmc-items', `/bmc-items/list?Team=${team}`)
}

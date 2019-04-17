import { API } from 'aws-amplify'

export const getItems = () => {
  return API.get('bmc-items', '/bmc-items/list?Team=Team Continuous')
}

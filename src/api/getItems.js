import { API } from 'aws-amplify'

export const getItems = () => {
  return API.get('bmc-items', '/bmc-items/listv2?Team=Team Continuous')
}

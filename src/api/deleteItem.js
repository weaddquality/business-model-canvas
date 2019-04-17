import { API } from 'aws-amplify'

export const deleteItem = blockUuid => {
  return API.del('bmc-items', '/bmc-items/delete?Team=Team Continuous', {
    body: {
      TableName: 'BusinessModelCanvas',
    },
    queryStringParameters: {
      Team: 'Team Continuous',
      BlockUuid: blockUuid,
    },
  })
}

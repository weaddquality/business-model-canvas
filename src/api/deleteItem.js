import { API } from 'aws-amplify'

export const deleteItem = input => {
  return API.del('bmc-items', '/bmc-items/delete', {
    body: {
      TableName: 'BusinessModelCanvas',
    },
    queryStringParameters: {
      Team: input.team,
      BlockUuid: input.blockUuid,
    },
  })
}

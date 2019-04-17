import { API } from 'aws-amplify'

export const updateItem = card => {
  return API.put('bmc-items', '/bmc-items/update?Team=Team Continuous', {
    body: {
      TableName: 'BusinessModelCanvas',
      ItemHeader: card.header,
      ItemText: card.text,
    },
    queryStringParameters: {
      Team: 'Team Continuous',
      BlockUuid: card.blockUuid,
    },
  })
}

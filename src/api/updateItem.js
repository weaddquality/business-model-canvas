import { API } from 'aws-amplify'

export const updateItem = card => {
  return API.put('bmc-items', '/bmc-items/update', {
    body: {
      TableName: 'BusinessModelCanvas',
      ItemHeader: card.header,
      ItemText: card.text,
    },
    queryStringParameters: {
      Team: card.team,
      BlockUuid: card.blockUuid,
    },
  })
}

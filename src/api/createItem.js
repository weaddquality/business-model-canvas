import { API } from 'aws-amplify'

export const createItem = input => {
  const item = {
    TableName: 'BusinessModelCanvas',
    Team: 'Team Continuous',
    Block: 'Value Propositions',
    BlockDescription: 'What value do we deliver to the customer',
    ItemHeader: input.header,
    ItemText: input.text,
  }

  return API.post('bmc-items', '/bmc-items/create', {
    body: {
      TableName: item.TableName,
      Item: {
        Team: item.Team,
        Block: item.Block,
        BlockDescription: item.BlockDescription,
        ItemHeader: item.ItemHeader,
        ItemText: item.ItemText,
      },
    },
  })
}

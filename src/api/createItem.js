import { API } from 'aws-amplify'

export const createItem = input => {
  console.log({ createItemInput: input })
  const item = {
    TableName: 'BusinessModelCanvas',
    Team: input.team,
    Block: input.block,
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

const assetDataDefaultState = []

export default (state = assetDataDefaultState, action) => {
  switch (action.type) {
    case 'SAVE_STOCK_INFO':
      return {
        ...state,
        stocks: {
          ...action.stockInfo.data.map((stock) => {
            return {
              name: stock.name,
              ticker: stock.ticker,
            }
          }),
        },
      }
    default:
      return state
  }
}

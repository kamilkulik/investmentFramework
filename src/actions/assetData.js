// SAVE STOCK INFO RECEIVED FROM THE BE API

export const saveStockInfo = (stockInfo) => ({
  type: 'SAVE_STOCK_INFO',
  stockInfo,
})

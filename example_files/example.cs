/// <summary>
/// Initial Create method for Purchase from api/Purchase
/// </summary>
/// <param name="purchase"></param>
/// <returns>Enum result if it got saved or alredy exists</returns>
Task<CreatePurchaseResult> CreatePurchase(PurchaseResult purchase);

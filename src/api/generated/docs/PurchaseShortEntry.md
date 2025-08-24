# PurchaseShortEntry


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**cost** | **number** |  | [default to undefined]
**amount** | **number** |  | [default to undefined]
**isPartial** | **boolean** |  | [default to undefined]
**isComplete** | **boolean** |  | [default to undefined]
**purchaseTags** | [**Array&lt;PurchaseTagShortEntry&gt;**](PurchaseTagShortEntry.md) |  | [optional] [default to undefined]
**unitType** | [**UnitTypeShortEntry**](UnitTypeShortEntry.md) |  | [optional] [default to undefined]

## Example

```typescript
import { PurchaseShortEntry } from './api';

const instance: PurchaseShortEntry = {
    id,
    name,
    cost,
    amount,
    isPartial,
    isComplete,
    purchaseTags,
    unitType,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

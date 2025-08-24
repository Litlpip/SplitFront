# GetPurchaseEntry


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**cost** | **number** |  | [default to undefined]
**amount** | **number** |  | [default to undefined]
**isPartial** | **boolean** |  | [default to undefined]
**isComplete** | **boolean** |  | [default to undefined]
**event** | [**EventShortEntry**](EventShortEntry.md) |  | [default to undefined]
**purchaseTags** | [**Array&lt;PurchaseTagShortEntry&gt;**](PurchaseTagShortEntry.md) |  | [optional] [default to undefined]
**unitType** | [**UnitTypeShortEntry**](UnitTypeShortEntry.md) |  | [default to undefined]
**purchaseUsages** | [**Array&lt;PurchaseUsageShortEntry&gt;**](PurchaseUsageShortEntry.md) |  | [optional] [default to undefined]
**participant** | [**ParticipantShortEntry**](ParticipantShortEntry.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetPurchaseEntry } from './api';

const instance: GetPurchaseEntry = {
    id,
    name,
    cost,
    amount,
    isPartial,
    isComplete,
    event,
    purchaseTags,
    unitType,
    purchaseUsages,
    participant,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

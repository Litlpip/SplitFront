# GetParticipantEntry


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**user** | [**GetUserEntry**](GetUserEntry.md) |  | [default to undefined]
**event** | [**EventShortEntry**](EventShortEntry.md) |  | [default to undefined]
**purchases** | [**Array&lt;PurchaseShortEntry&gt;**](PurchaseShortEntry.md) |  | [optional] [default to undefined]
**purchaseUsages** | [**Array&lt;PurchaseUsageShortEntry&gt;**](PurchaseUsageShortEntry.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetParticipantEntry } from './api';

const instance: GetParticipantEntry = {
    id,
    user,
    event,
    purchases,
    purchaseUsages,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

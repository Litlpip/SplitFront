# GetDebtEntry


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**amount** | **number** |  | [optional] [default to undefined]
**isSent** | **boolean** |  | [optional] [default to undefined]
**isComfirmed** | **boolean** |  | [optional] [default to undefined]
**event** | [**EventShortEntry**](EventShortEntry.md) |  | [optional] [default to undefined]
**lender** | [**UserShortEntry**](UserShortEntry.md) |  | [optional] [default to undefined]
**debtor** | [**UserShortEntry**](UserShortEntry.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetDebtEntry } from './api';

const instance: GetDebtEntry = {
    id,
    amount,
    isSent,
    isComfirmed,
    event,
    lender,
    debtor,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

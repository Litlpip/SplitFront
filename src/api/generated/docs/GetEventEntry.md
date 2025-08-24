# GetEventEntry


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**createdDate** | **string** |  | [default to undefined]
**eventDateStart** | **string** |  | [default to undefined]
**eventDateEnd** | **string** |  | [optional] [default to undefined]
**isCompleted** | **boolean** |  | [default to undefined]
**mediaUri** | **string** |  | [optional] [default to undefined]
**user** | [**UserShortEntry**](UserShortEntry.md) |  | [default to undefined]
**participants** | [**Array&lt;ParticipantShortEntry&gt;**](ParticipantShortEntry.md) |  | [optional] [default to undefined]
**purchases** | [**Array&lt;PurchaseShortEntry&gt;**](PurchaseShortEntry.md) |  | [optional] [default to undefined]
**medias** | [**Array&lt;MediaShortEntry&gt;**](MediaShortEntry.md) |  | [optional] [default to undefined]

## Example

```typescript
import { GetEventEntry } from './api';

const instance: GetEventEntry = {
    id,
    name,
    description,
    createdDate,
    eventDateStart,
    eventDateEnd,
    isCompleted,
    mediaUri,
    user,
    participants,
    purchases,
    medias,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

# ParticipantApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1ParticipantsGet**](#apiv1participantsget) | **GET** /api/v1/participants | |
|[**apiV1ParticipantsParticipantIdDelete**](#apiv1participantsparticipantiddelete) | **DELETE** /api/v1/participants/{participantId} | |
|[**apiV1ParticipantsParticipantIdGet**](#apiv1participantsparticipantidget) | **GET** /api/v1/participants/{participantId} | |
|[**apiV1ParticipantsPost**](#apiv1participantspost) | **POST** /api/v1/participants | |

# **apiV1ParticipantsGet**
> ParticipantShortEntryResponse apiV1ParticipantsGet()


### Example

```typescript
import {
    ParticipantApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ParticipantApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)
let eventId: string; // (optional) (default to undefined)
let userId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1ParticipantsGet(
    offset,
    limit,
    eventId,
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|
| **eventId** | [**string**] |  | (optional) defaults to undefined|
| **userId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ParticipantShortEntryResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ParticipantsParticipantIdDelete**
> apiV1ParticipantsParticipantIdDelete()


### Example

```typescript
import {
    ParticipantApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ParticipantApi(configuration);

let participantId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1ParticipantsParticipantIdDelete(
    participantId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **participantId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ParticipantsParticipantIdGet**
> GetParticipantEntry apiV1ParticipantsParticipantIdGet()


### Example

```typescript
import {
    ParticipantApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ParticipantApi(configuration);

let participantId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1ParticipantsParticipantIdGet(
    participantId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **participantId** | [**string**] |  | defaults to undefined|


### Return type

**GetParticipantEntry**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1ParticipantsPost**
> ParticipantShortEntry apiV1ParticipantsPost()


### Example

```typescript
import {
    ParticipantApi,
    Configuration,
    UpsertParticipantEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new ParticipantApi(configuration);

let upsertParticipantEntry: UpsertParticipantEntry; // (optional)

const { status, data } = await apiInstance.apiV1ParticipantsPost(
    upsertParticipantEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertParticipantEntry** | **UpsertParticipantEntry**|  | |


### Return type

**ParticipantShortEntry**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/*+json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


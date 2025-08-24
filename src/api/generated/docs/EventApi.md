# EventApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1EventsEventIdCheckoutPost**](#apiv1eventseventidcheckoutpost) | **POST** /api/v1/events/{eventId}/checkout | |
|[**apiV1EventsEventIdCompletePost**](#apiv1eventseventidcompletepost) | **POST** /api/v1/events/{eventId}/complete | |
|[**apiV1EventsEventIdDelete**](#apiv1eventseventiddelete) | **DELETE** /api/v1/events/{eventId} | |
|[**apiV1EventsEventIdGet**](#apiv1eventseventidget) | **GET** /api/v1/events/{eventId} | |
|[**apiV1EventsEventIdPatch**](#apiv1eventseventidpatch) | **PATCH** /api/v1/events/{eventId} | |
|[**apiV1EventsEventIdPhotoDelete**](#apiv1eventseventidphotodelete) | **DELETE** /api/v1/events/{eventId}/photo | |
|[**apiV1EventsEventIdPhotoPatch**](#apiv1eventseventidphotopatch) | **PATCH** /api/v1/events/{eventId}/photo | |
|[**apiV1EventsEventIdReopenPost**](#apiv1eventseventidreopenpost) | **POST** /api/v1/events/{eventId}/reopen | |
|[**apiV1EventsGet**](#apiv1eventsget) | **GET** /api/v1/events | |
|[**apiV1EventsPost**](#apiv1eventspost) | **POST** /api/v1/events | |

# **apiV1EventsEventIdCheckoutPost**
> apiV1EventsEventIdCheckoutPost()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let eventId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EventsEventIdCheckoutPost(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1EventsEventIdCompletePost**
> EventShortEntry apiV1EventsEventIdCompletePost()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let eventId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EventsEventIdCompletePost(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**string**] |  | defaults to undefined|


### Return type

**EventShortEntry**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1EventsEventIdDelete**
> apiV1EventsEventIdDelete()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let eventId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EventsEventIdDelete(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**string**] |  | defaults to undefined|


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

# **apiV1EventsEventIdGet**
> GetEventEntry apiV1EventsEventIdGet()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let eventId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EventsEventIdGet(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**string**] |  | defaults to undefined|


### Return type

**GetEventEntry**

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

# **apiV1EventsEventIdPatch**
> EventShortEntry apiV1EventsEventIdPatch()


### Example

```typescript
import {
    EventApi,
    Configuration,
    UpdateEventEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let eventId: string; // (default to undefined)
let updateEventEntry: UpdateEventEntry; // (optional)

const { status, data } = await apiInstance.apiV1EventsEventIdPatch(
    eventId,
    updateEventEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateEventEntry** | **UpdateEventEntry**|  | |
| **eventId** | [**string**] |  | defaults to undefined|


### Return type

**EventShortEntry**

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

# **apiV1EventsEventIdPhotoDelete**
> apiV1EventsEventIdPhotoDelete()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let eventId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EventsEventIdPhotoDelete(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1EventsEventIdPhotoPatch**
> EventShortEntry apiV1EventsEventIdPhotoPatch()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let eventId: string; // (default to undefined)
let file: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1EventsEventIdPhotoPatch(
    eventId,
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**string**] |  | defaults to undefined|
| **file** | [**File**] |  | (optional) defaults to undefined|


### Return type

**EventShortEntry**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1EventsEventIdReopenPost**
> EventShortEntry apiV1EventsEventIdReopenPost()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let eventId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1EventsEventIdReopenPost(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**string**] |  | defaults to undefined|


### Return type

**EventShortEntry**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1EventsGet**
> EventShortEntryResponse apiV1EventsGet()


### Example

```typescript
import {
    EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)
let name: string; // (optional) (default to undefined)
let description: string; // (optional) (default to undefined)
let createdDateStart: string; // (optional) (default to undefined)
let createdDateEnd: string; // (optional) (default to undefined)
let eventDateStartMin: string; // (optional) (default to undefined)
let eventDateStartMax: string; // (optional) (default to undefined)
let eventDateEndMin: string; // (optional) (default to undefined)
let eventDateEndMax: string; // (optional) (default to undefined)
let userId: string; // (optional) (default to undefined)
let isCompleted: boolean; // (optional) (default to undefined)
let isActive: boolean; // (optional) (default to undefined)
let participantId: string; // (optional) (default to undefined)
let purchaseId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1EventsGet(
    offset,
    limit,
    name,
    description,
    createdDateStart,
    createdDateEnd,
    eventDateStartMin,
    eventDateStartMax,
    eventDateEndMin,
    eventDateEndMax,
    userId,
    isCompleted,
    isActive,
    participantId,
    purchaseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|
| **name** | [**string**] |  | (optional) defaults to undefined|
| **description** | [**string**] |  | (optional) defaults to undefined|
| **createdDateStart** | [**string**] |  | (optional) defaults to undefined|
| **createdDateEnd** | [**string**] |  | (optional) defaults to undefined|
| **eventDateStartMin** | [**string**] |  | (optional) defaults to undefined|
| **eventDateStartMax** | [**string**] |  | (optional) defaults to undefined|
| **eventDateEndMin** | [**string**] |  | (optional) defaults to undefined|
| **eventDateEndMax** | [**string**] |  | (optional) defaults to undefined|
| **userId** | [**string**] |  | (optional) defaults to undefined|
| **isCompleted** | [**boolean**] |  | (optional) defaults to undefined|
| **isActive** | [**boolean**] |  | (optional) defaults to undefined|
| **participantId** | [**string**] |  | (optional) defaults to undefined|
| **purchaseId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**EventShortEntryResponse**

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

# **apiV1EventsPost**
> EventShortEntry apiV1EventsPost()


### Example

```typescript
import {
    EventApi,
    Configuration,
    AddEventEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new EventApi(configuration);

let addEventEntry: AddEventEntry; // (optional)

const { status, data } = await apiInstance.apiV1EventsPost(
    addEventEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addEventEntry** | **AddEventEntry**|  | |


### Return type

**EventShortEntry**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


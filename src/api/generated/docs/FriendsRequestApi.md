# FriendsRequestApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1RequestsIncomingGet**](#apiv1requestsincomingget) | **GET** /api/v1/requests/incoming | |
|[**apiV1RequestsPost**](#apiv1requestspost) | **POST** /api/v1/requests | |
|[**apiV1RequestsRequestIdAcceptPost**](#apiv1requestsrequestidacceptpost) | **POST** /api/v1/requests/{requestId}/accept | |
|[**apiV1RequestsRequestIdDelete**](#apiv1requestsrequestiddelete) | **DELETE** /api/v1/requests/{requestId} | |
|[**apiV1RequestsRequestIdGet**](#apiv1requestsrequestidget) | **GET** /api/v1/requests/{requestId} | |
|[**apiV1RequestsSendedGet**](#apiv1requestssendedget) | **GET** /api/v1/requests/sended | |

# **apiV1RequestsIncomingGet**
> Array<FriendsRequestShort> apiV1RequestsIncomingGet()


### Example

```typescript
import {
    FriendsRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendsRequestApi(configuration);

const { status, data } = await apiInstance.apiV1RequestsIncomingGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<FriendsRequestShort>**

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

# **apiV1RequestsPost**
> FriendsRequestShort apiV1RequestsPost()


### Example

```typescript
import {
    FriendsRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendsRequestApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1RequestsPost(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**FriendsRequestShort**

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

# **apiV1RequestsRequestIdAcceptPost**
> apiV1RequestsRequestIdAcceptPost()


### Example

```typescript
import {
    FriendsRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendsRequestApi(configuration);

let requestId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1RequestsRequestIdAcceptPost(
    requestId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestId** | [**string**] |  | defaults to undefined|


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

# **apiV1RequestsRequestIdDelete**
> apiV1RequestsRequestIdDelete()


### Example

```typescript
import {
    FriendsRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendsRequestApi(configuration);

let requestId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1RequestsRequestIdDelete(
    requestId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestId** | [**string**] |  | defaults to undefined|


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

# **apiV1RequestsRequestIdGet**
> FriendsRequestShort apiV1RequestsRequestIdGet()


### Example

```typescript
import {
    FriendsRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendsRequestApi(configuration);

let requestId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1RequestsRequestIdGet(
    requestId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **requestId** | [**string**] |  | defaults to undefined|


### Return type

**FriendsRequestShort**

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

# **apiV1RequestsSendedGet**
> Array<FriendsRequestShort> apiV1RequestsSendedGet()


### Example

```typescript
import {
    FriendsRequestApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendsRequestApi(configuration);

const { status, data } = await apiInstance.apiV1RequestsSendedGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<FriendsRequestShort>**

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


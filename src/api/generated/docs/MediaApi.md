# MediaApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1MediaFormFilePost**](#apiv1mediaformfilepost) | **POST** /api/v1/media/form-file | |
|[**apiV1MediaMediaIdDelete**](#apiv1mediamediaiddelete) | **DELETE** /api/v1/media/{mediaId} | |
|[**apiV1MediaMediaIdFormFileGet**](#apiv1mediamediaidformfileget) | **GET** /api/v1/media/{mediaId}/form-file | |
|[**apiV1MediaMediaIdMetadataGet**](#apiv1mediamediaidmetadataget) | **GET** /api/v1/media/{mediaId}/metadata | |
|[**apiV1MediaMetadataGet**](#apiv1mediametadataget) | **GET** /api/v1/media/metadata | |

# **apiV1MediaFormFilePost**
> MediaShortEntry apiV1MediaFormFilePost()


### Example

```typescript
import {
    MediaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaApi(configuration);

let eventId: string; // (default to undefined)
let mediaType: MediaType; // (default to undefined)
let file: File; // (optional) (default to undefined)
let link: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1MediaFormFilePost(
    eventId,
    mediaType,
    file,
    link
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**string**] |  | defaults to undefined|
| **mediaType** | **MediaType** |  | defaults to undefined|
| **file** | [**File**] |  | (optional) defaults to undefined|
| **link** | [**string**] |  | (optional) defaults to undefined|


### Return type

**MediaShortEntry**

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
|**415** | Client Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1MediaMediaIdDelete**
> apiV1MediaMediaIdDelete()


### Example

```typescript
import {
    MediaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaApi(configuration);

let mediaId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1MediaMediaIdDelete(
    mediaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaId** | [**string**] |  | defaults to undefined|


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

# **apiV1MediaMediaIdFormFileGet**
> apiV1MediaMediaIdFormFileGet()


### Example

```typescript
import {
    MediaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaApi(configuration);

let mediaId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1MediaMediaIdFormFileGet(
    mediaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: multipart/form-data


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**404** | Not Found |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1MediaMediaIdMetadataGet**
> GetMediaEntry apiV1MediaMediaIdMetadataGet()


### Example

```typescript
import {
    MediaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaApi(configuration);

let mediaId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1MediaMediaIdMetadataGet(
    mediaId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mediaId** | [**string**] |  | defaults to undefined|


### Return type

**GetMediaEntry**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**404** | Not Found |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1MediaMetadataGet**
> Array<MediaShortEntry> apiV1MediaMetadataGet()


### Example

```typescript
import {
    MediaApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new MediaApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)
let eventId: string; // (optional) (default to undefined)
let createdDateStart: string; // (optional) (default to undefined)
let createdDateEnd: string; // (optional) (default to undefined)
let mediaType: MediaType; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1MediaMetadataGet(
    offset,
    limit,
    eventId,
    createdDateStart,
    createdDateEnd,
    mediaType
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|
| **eventId** | [**string**] |  | (optional) defaults to undefined|
| **createdDateStart** | [**string**] |  | (optional) defaults to undefined|
| **createdDateEnd** | [**string**] |  | (optional) defaults to undefined|
| **mediaType** | **MediaType** |  | (optional) defaults to undefined|


### Return type

**Array<MediaShortEntry>**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**404** | Not Found |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


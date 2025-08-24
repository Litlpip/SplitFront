# PurchaseUsageApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1PurchaseUsagesGet**](#apiv1purchaseusagesget) | **GET** /api/v1/purchase-usages | |
|[**apiV1PurchaseUsagesPost**](#apiv1purchaseusagespost) | **POST** /api/v1/purchase-usages | |
|[**apiV1PurchaseUsagesPurchaseUsageIdDelete**](#apiv1purchaseusagespurchaseusageiddelete) | **DELETE** /api/v1/purchase-usages/{purchaseUsageId} | |
|[**apiV1PurchaseUsagesPurchaseUsageIdGet**](#apiv1purchaseusagespurchaseusageidget) | **GET** /api/v1/purchase-usages/{purchaseUsageId} | |
|[**apiV1PurchaseUsagesPurchaseUsageIdPatch**](#apiv1purchaseusagespurchaseusageidpatch) | **PATCH** /api/v1/purchase-usages/{purchaseUsageId} | |

# **apiV1PurchaseUsagesGet**
> PurchaseUsageShortEntryResponse apiV1PurchaseUsagesGet()


### Example

```typescript
import {
    PurchaseUsageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseUsageApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)
let eventId: string; // (optional) (default to undefined)
let participantId: string; // (optional) (default to undefined)
let purchaseId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1PurchaseUsagesGet(
    offset,
    limit,
    eventId,
    participantId,
    purchaseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|
| **eventId** | [**string**] |  | (optional) defaults to undefined|
| **participantId** | [**string**] |  | (optional) defaults to undefined|
| **purchaseId** | [**string**] |  | (optional) defaults to undefined|


### Return type

**PurchaseUsageShortEntryResponse**

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

# **apiV1PurchaseUsagesPost**
> PurchaseUsageShortEntry apiV1PurchaseUsagesPost()


### Example

```typescript
import {
    PurchaseUsageApi,
    Configuration,
    UpsertPurchaseUsageEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseUsageApi(configuration);

let upsertPurchaseUsageEntry: UpsertPurchaseUsageEntry; // (optional)

const { status, data } = await apiInstance.apiV1PurchaseUsagesPost(
    upsertPurchaseUsageEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertPurchaseUsageEntry** | **UpsertPurchaseUsageEntry**|  | |


### Return type

**PurchaseUsageShortEntry**

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

# **apiV1PurchaseUsagesPurchaseUsageIdDelete**
> apiV1PurchaseUsagesPurchaseUsageIdDelete()


### Example

```typescript
import {
    PurchaseUsageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseUsageApi(configuration);

let purchaseUsageId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1PurchaseUsagesPurchaseUsageIdDelete(
    purchaseUsageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **purchaseUsageId** | [**string**] |  | defaults to undefined|


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

# **apiV1PurchaseUsagesPurchaseUsageIdGet**
> GetPurchaseUsageEntry apiV1PurchaseUsagesPurchaseUsageIdGet()


### Example

```typescript
import {
    PurchaseUsageApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseUsageApi(configuration);

let purchaseUsageId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1PurchaseUsagesPurchaseUsageIdGet(
    purchaseUsageId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **purchaseUsageId** | [**string**] |  | defaults to undefined|


### Return type

**GetPurchaseUsageEntry**

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

# **apiV1PurchaseUsagesPurchaseUsageIdPatch**
> PurchaseUsageShortEntry apiV1PurchaseUsagesPurchaseUsageIdPatch()


### Example

```typescript
import {
    PurchaseUsageApi,
    Configuration,
    UpsertPurchaseUsageEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseUsageApi(configuration);

let purchaseUsageId: string; // (default to undefined)
let upsertPurchaseUsageEntry: UpsertPurchaseUsageEntry; // (optional)

const { status, data } = await apiInstance.apiV1PurchaseUsagesPurchaseUsageIdPatch(
    purchaseUsageId,
    upsertPurchaseUsageEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertPurchaseUsageEntry** | **UpsertPurchaseUsageEntry**|  | |
| **purchaseUsageId** | [**string**] |  | defaults to undefined|


### Return type

**PurchaseUsageShortEntry**

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


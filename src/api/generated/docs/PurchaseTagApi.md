# PurchaseTagApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1PurchaseTagsGet**](#apiv1purchasetagsget) | **GET** /api/v1/purchase-tags | |
|[**apiV1PurchaseTagsPost**](#apiv1purchasetagspost) | **POST** /api/v1/purchase-tags | |
|[**apiV1PurchaseTagsPurchaseTagIdDelete**](#apiv1purchasetagspurchasetagiddelete) | **DELETE** /api/v1/purchase-tags/{purchaseTagId} | |
|[**apiV1PurchaseTagsPurchaseTagIdGet**](#apiv1purchasetagspurchasetagidget) | **GET** /api/v1/purchase-tags/{purchaseTagId} | |
|[**apiV1PurchaseTagsPurchaseTagIdPatch**](#apiv1purchasetagspurchasetagidpatch) | **PATCH** /api/v1/purchase-tags/{purchaseTagId} | |

# **apiV1PurchaseTagsGet**
> PurchaseTagShortEntryResponse apiV1PurchaseTagsGet()


### Example

```typescript
import {
    PurchaseTagApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseTagApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)
let name: string; // (optional) (default to undefined)
let purchaseId: string; // (optional) (default to undefined)
let isActive: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1PurchaseTagsGet(
    offset,
    limit,
    name,
    purchaseId,
    isActive
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|
| **name** | [**string**] |  | (optional) defaults to undefined|
| **purchaseId** | [**string**] |  | (optional) defaults to undefined|
| **isActive** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**PurchaseTagShortEntryResponse**

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

# **apiV1PurchaseTagsPost**
> PurchaseTagShortEntry apiV1PurchaseTagsPost()


### Example

```typescript
import {
    PurchaseTagApi,
    Configuration,
    UpsertPurchaseTagEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseTagApi(configuration);

let upsertPurchaseTagEntry: UpsertPurchaseTagEntry; // (optional)

const { status, data } = await apiInstance.apiV1PurchaseTagsPost(
    upsertPurchaseTagEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertPurchaseTagEntry** | **UpsertPurchaseTagEntry**|  | |


### Return type

**PurchaseTagShortEntry**

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

# **apiV1PurchaseTagsPurchaseTagIdDelete**
> apiV1PurchaseTagsPurchaseTagIdDelete()


### Example

```typescript
import {
    PurchaseTagApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseTagApi(configuration);

let purchaseTagId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1PurchaseTagsPurchaseTagIdDelete(
    purchaseTagId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **purchaseTagId** | [**string**] |  | defaults to undefined|


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

# **apiV1PurchaseTagsPurchaseTagIdGet**
> GetPurchaseTagEntry apiV1PurchaseTagsPurchaseTagIdGet()


### Example

```typescript
import {
    PurchaseTagApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseTagApi(configuration);

let purchaseTagId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1PurchaseTagsPurchaseTagIdGet(
    purchaseTagId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **purchaseTagId** | [**string**] |  | defaults to undefined|


### Return type

**GetPurchaseTagEntry**

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

# **apiV1PurchaseTagsPurchaseTagIdPatch**
> PurchaseTagShortEntry apiV1PurchaseTagsPurchaseTagIdPatch()


### Example

```typescript
import {
    PurchaseTagApi,
    Configuration,
    UpsertPurchaseTagEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseTagApi(configuration);

let purchaseTagId: string; // (default to undefined)
let upsertPurchaseTagEntry: UpsertPurchaseTagEntry; // (optional)

const { status, data } = await apiInstance.apiV1PurchaseTagsPurchaseTagIdPatch(
    purchaseTagId,
    upsertPurchaseTagEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertPurchaseTagEntry** | **UpsertPurchaseTagEntry**|  | |
| **purchaseTagId** | [**string**] |  | defaults to undefined|


### Return type

**PurchaseTagShortEntry**

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


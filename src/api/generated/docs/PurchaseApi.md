# PurchaseApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1PurchasesGet**](#apiv1purchasesget) | **GET** /api/v1/purchases | |
|[**apiV1PurchasesPost**](#apiv1purchasespost) | **POST** /api/v1/purchases | |
|[**apiV1PurchasesPurchaseIdDelete**](#apiv1purchasespurchaseiddelete) | **DELETE** /api/v1/purchases/{purchaseId} | |
|[**apiV1PurchasesPurchaseIdGet**](#apiv1purchasespurchaseidget) | **GET** /api/v1/purchases/{purchaseId} | |
|[**apiV1PurchasesPurchaseIdPatch**](#apiv1purchasespurchaseidpatch) | **PATCH** /api/v1/purchases/{purchaseId} | |

# **apiV1PurchasesGet**
> GetPurchaseEntryResponse apiV1PurchasesGet()


### Example

```typescript
import {
    PurchaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)
let name: string; // (optional) (default to undefined)
let costMin: number; // (optional) (default to undefined)
let costMax: number; // (optional) (default to undefined)
let eventId: string; // (optional) (default to undefined)
let purchaseTags: Array<string>; // (optional) (default to undefined)
let unitTypeId: string; // (optional) (default to undefined)
let isComplete: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1PurchasesGet(
    offset,
    limit,
    name,
    costMin,
    costMax,
    eventId,
    purchaseTags,
    unitTypeId,
    isComplete
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|
| **name** | [**string**] |  | (optional) defaults to undefined|
| **costMin** | [**number**] |  | (optional) defaults to undefined|
| **costMax** | [**number**] |  | (optional) defaults to undefined|
| **eventId** | [**string**] |  | (optional) defaults to undefined|
| **purchaseTags** | **Array&lt;string&gt;** |  | (optional) defaults to undefined|
| **unitTypeId** | [**string**] |  | (optional) defaults to undefined|
| **isComplete** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**GetPurchaseEntryResponse**

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

# **apiV1PurchasesPost**
> PurchaseShortEntry apiV1PurchasesPost()


### Example

```typescript
import {
    PurchaseApi,
    Configuration,
    AddPurchaseEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseApi(configuration);

let addPurchaseEntry: AddPurchaseEntry; // (optional)

const { status, data } = await apiInstance.apiV1PurchasesPost(
    addPurchaseEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addPurchaseEntry** | **AddPurchaseEntry**|  | |


### Return type

**PurchaseShortEntry**

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

# **apiV1PurchasesPurchaseIdDelete**
> apiV1PurchasesPurchaseIdDelete()


### Example

```typescript
import {
    PurchaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseApi(configuration);

let purchaseId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1PurchasesPurchaseIdDelete(
    purchaseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **purchaseId** | [**string**] |  | defaults to undefined|


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

# **apiV1PurchasesPurchaseIdGet**
> GetPurchaseEntry apiV1PurchasesPurchaseIdGet()


### Example

```typescript
import {
    PurchaseApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseApi(configuration);

let purchaseId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1PurchasesPurchaseIdGet(
    purchaseId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **purchaseId** | [**string**] |  | defaults to undefined|


### Return type

**GetPurchaseEntry**

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

# **apiV1PurchasesPurchaseIdPatch**
> PurchaseShortEntry apiV1PurchasesPurchaseIdPatch()


### Example

```typescript
import {
    PurchaseApi,
    Configuration,
    UpdatePurchaseEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new PurchaseApi(configuration);

let purchaseId: string; // (default to undefined)
let updatePurchaseEntry: UpdatePurchaseEntry; // (optional)

const { status, data } = await apiInstance.apiV1PurchasesPurchaseIdPatch(
    purchaseId,
    updatePurchaseEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePurchaseEntry** | **UpdatePurchaseEntry**|  | |
| **purchaseId** | [**string**] |  | defaults to undefined|


### Return type

**PurchaseShortEntry**

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


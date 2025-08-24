# UnitTypeApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1UnitTypesGet**](#apiv1unittypesget) | **GET** /api/v1/unit-types | |
|[**apiV1UnitTypesPost**](#apiv1unittypespost) | **POST** /api/v1/unit-types | |
|[**apiV1UnitTypesUnitTypeIdDelete**](#apiv1unittypesunittypeiddelete) | **DELETE** /api/v1/unit-types/{unitTypeId} | |
|[**apiV1UnitTypesUnitTypeIdGet**](#apiv1unittypesunittypeidget) | **GET** /api/v1/unit-types/{unitTypeId} | |
|[**apiV1UnitTypesUnitTypeIdPatch**](#apiv1unittypesunittypeidpatch) | **PATCH** /api/v1/unit-types/{unitTypeId} | |

# **apiV1UnitTypesGet**
> UnitTypeShortEntryResponse apiV1UnitTypesGet()


### Example

```typescript
import {
    UnitTypeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UnitTypeApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)
let name: string; // (optional) (default to undefined)
let purchaseId: string; // (optional) (default to undefined)
let isActive: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1UnitTypesGet(
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

**UnitTypeShortEntryResponse**

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

# **apiV1UnitTypesPost**
> UnitTypeShortEntry apiV1UnitTypesPost()


### Example

```typescript
import {
    UnitTypeApi,
    Configuration,
    UpsertUnitTypeEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new UnitTypeApi(configuration);

let upsertUnitTypeEntry: UpsertUnitTypeEntry; // (optional)

const { status, data } = await apiInstance.apiV1UnitTypesPost(
    upsertUnitTypeEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertUnitTypeEntry** | **UpsertUnitTypeEntry**|  | |


### Return type

**UnitTypeShortEntry**

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

# **apiV1UnitTypesUnitTypeIdDelete**
> apiV1UnitTypesUnitTypeIdDelete()


### Example

```typescript
import {
    UnitTypeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UnitTypeApi(configuration);

let unitTypeId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1UnitTypesUnitTypeIdDelete(
    unitTypeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **unitTypeId** | [**string**] |  | defaults to undefined|


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

# **apiV1UnitTypesUnitTypeIdGet**
> GetUnitTypeEntry apiV1UnitTypesUnitTypeIdGet()


### Example

```typescript
import {
    UnitTypeApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UnitTypeApi(configuration);

let unitTypeId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1UnitTypesUnitTypeIdGet(
    unitTypeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **unitTypeId** | [**string**] |  | defaults to undefined|


### Return type

**GetUnitTypeEntry**

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

# **apiV1UnitTypesUnitTypeIdPatch**
> UnitTypeShortEntry apiV1UnitTypesUnitTypeIdPatch()


### Example

```typescript
import {
    UnitTypeApi,
    Configuration,
    UpsertUnitTypeEntry
} from './api';

const configuration = new Configuration();
const apiInstance = new UnitTypeApi(configuration);

let unitTypeId: string; // (default to undefined)
let upsertUnitTypeEntry: UpsertUnitTypeEntry; // (optional)

const { status, data } = await apiInstance.apiV1UnitTypesUnitTypeIdPatch(
    unitTypeId,
    upsertUnitTypeEntry
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **upsertUnitTypeEntry** | **UpsertUnitTypeEntry**|  | |
| **unitTypeId** | [**string**] |  | defaults to undefined|


### Return type

**UnitTypeShortEntry**

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


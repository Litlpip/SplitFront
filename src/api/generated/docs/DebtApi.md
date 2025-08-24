# DebtApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1DebtsDebtIdConfirmPost**](#apiv1debtsdebtidconfirmpost) | **POST** /api/v1/debts/{debtId}/confirm | |
|[**apiV1DebtsDebtIdGet**](#apiv1debtsdebtidget) | **GET** /api/v1/debts/{debtId} | |
|[**apiV1DebtsDebtIdSendPost**](#apiv1debtsdebtidsendpost) | **POST** /api/v1/debts/{debtId}/send | |
|[**apiV1DebtsGet**](#apiv1debtsget) | **GET** /api/v1/debts | |

# **apiV1DebtsDebtIdConfirmPost**
> apiV1DebtsDebtIdConfirmPost()


### Example

```typescript
import {
    DebtApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtApi(configuration);

let debtId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1DebtsDebtIdConfirmPost(
    debtId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **debtId** | [**string**] |  | defaults to undefined|


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
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1DebtsDebtIdGet**
> GetDebtEntry apiV1DebtsDebtIdGet()


### Example

```typescript
import {
    DebtApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtApi(configuration);

let debtId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1DebtsDebtIdGet(
    debtId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **debtId** | [**string**] |  | defaults to undefined|


### Return type

**GetDebtEntry**

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

# **apiV1DebtsDebtIdSendPost**
> apiV1DebtsDebtIdSendPost()


### Example

```typescript
import {
    DebtApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtApi(configuration);

let debtId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1DebtsDebtIdSendPost(
    debtId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **debtId** | [**string**] |  | defaults to undefined|


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
|**403** | Forbidden |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1DebtsGet**
> GetDebtEntryResponse apiV1DebtsGet()


### Example

```typescript
import {
    DebtApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DebtApi(configuration);

let offset: number; // (optional) (default to 0)
let limit: number; // (optional) (default to 10)

const { status, data } = await apiInstance.apiV1DebtsGet(
    offset,
    limit
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **offset** | [**number**] |  | (optional) defaults to 0|
| **limit** | [**number**] |  | (optional) defaults to 10|


### Return type

**GetDebtEntryResponse**

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


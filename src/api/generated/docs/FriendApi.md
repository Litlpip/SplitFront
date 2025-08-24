# FriendApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1FriendsGet**](#apiv1friendsget) | **GET** /api/v1/friends | |

# **apiV1FriendsGet**
> UserShortEntryResponse apiV1FriendsGet()


### Example

```typescript
import {
    FriendApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendApi(configuration);

let limit: number; // (optional) (default to 20)
let offset: number; // (optional) (default to 0)

const { status, data } = await apiInstance.apiV1FriendsGet(
    limit,
    offset
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **limit** | [**number**] |  | (optional) defaults to 20|
| **offset** | [**number**] |  | (optional) defaults to 0|


### Return type

**UserShortEntryResponse**

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


# AuthorizationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiV1AuthAccountGet**](#apiv1authaccountget) | **GET** /api/v1/auth/account | |
|[**apiV1AuthAvatarDelete**](#apiv1authavatardelete) | **DELETE** /api/v1/auth/avatar | |
|[**apiV1AuthAvatarPost**](#apiv1authavatarpost) | **POST** /api/v1/auth/avatar | |
|[**apiV1AuthEditPatch**](#apiv1autheditpatch) | **PATCH** /api/v1/auth/edit | |
|[**apiV1AuthEmailConfirmGet**](#apiv1authemailconfirmget) | **GET** /api/v1/auth/email-confirm | |
|[**apiV1AuthIsAdminGet**](#apiv1authisadminget) | **GET** /api/v1/auth/is-admin | |
|[**apiV1AuthLoginPost**](#apiv1authloginpost) | **POST** /api/v1/auth/login | |
|[**apiV1AuthRegisterPost**](#apiv1authregisterpost) | **POST** /api/v1/auth/register | |
|[**apiV1AuthResetPasswordConfirmGet**](#apiv1authresetpasswordconfirmget) | **GET** /api/v1/auth/reset-password-confirm | |
|[**apiV1AuthResetPasswordConfirmPost**](#apiv1authresetpasswordconfirmpost) | **POST** /api/v1/auth/reset-password-confirm | |
|[**apiV1AuthResetPasswordPost**](#apiv1authresetpasswordpost) | **POST** /api/v1/auth/reset-password | |
|[**apiV1AuthRolesGet**](#apiv1authrolesget) | **GET** /api/v1/auth/roles | |
|[**apiV1AuthUsersGet**](#apiv1authusersget) | **GET** /api/v1/auth/users | |
|[**apiV1AuthUsersUserIdGet**](#apiv1authusersuseridget) | **GET** /api/v1/auth/users/{userId} | |

# **apiV1AuthAccountGet**
> GetUserEntry apiV1AuthAccountGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

const { status, data } = await apiInstance.apiV1AuthAccountGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**GetUserEntry**

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

# **apiV1AuthAvatarDelete**
> apiV1AuthAvatarDelete()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

const { status, data } = await apiInstance.apiV1AuthAvatarDelete();
```

### Parameters
This endpoint does not have any parameters.


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
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthAvatarPost**
> apiV1AuthAvatarPost()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let file: File; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1AuthAvatarPost(
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthEditPatch**
> GetUserEntry apiV1AuthEditPatch()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration,
    UpdateModel
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let updateModel: UpdateModel; // (optional)

const { status, data } = await apiInstance.apiV1AuthEditPatch(
    updateModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateModel** | **UpdateModel**|  | |


### Return type

**GetUserEntry**

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

# **apiV1AuthEmailConfirmGet**
> apiV1AuthEmailConfirmGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let login: string; // (optional) (default to undefined)
let code: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1AuthEmailConfirmGet(
    login,
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **login** | [**string**] |  | (optional) defaults to undefined|
| **code** | [**string**] |  | (optional) defaults to undefined|


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
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthIsAdminGet**
> boolean apiV1AuthIsAdminGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

const { status, data } = await apiInstance.apiV1AuthIsAdminGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**boolean**

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

# **apiV1AuthLoginPost**
> GetUserEntry apiV1AuthLoginPost()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration,
    LoginModel
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let loginModel: LoginModel; // (optional)

const { status, data } = await apiInstance.apiV1AuthLoginPost(
    loginModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginModel** | **LoginModel**|  | |


### Return type

**GetUserEntry**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |
|**401** | Unauthorized |  -  |
|**400** | Bad Request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthRegisterPost**
> string apiV1AuthRegisterPost()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration,
    RegisterModel
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let registerModel: RegisterModel; // (optional)

const { status, data } = await apiInstance.apiV1AuthRegisterPost(
    registerModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **registerModel** | **RegisterModel**|  | |


### Return type

**string**

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

# **apiV1AuthResetPasswordConfirmGet**
> ResetPasswordResult apiV1AuthResetPasswordConfirmGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let email: string; // (optional) (default to undefined)
let code: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1AuthResetPasswordConfirmGet(
    email,
    code
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | (optional) defaults to undefined|
| **code** | [**string**] |  | (optional) defaults to undefined|


### Return type

**ResetPasswordResult**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthResetPasswordConfirmPost**
> string apiV1AuthResetPasswordConfirmPost()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration,
    ResetPasswordModel
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let resetPasswordModel: ResetPasswordModel; // (optional)

const { status, data } = await apiInstance.apiV1AuthResetPasswordConfirmPost(
    resetPasswordModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **resetPasswordModel** | **ResetPasswordModel**|  | |


### Return type

**string**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthResetPasswordPost**
> string apiV1AuthResetPasswordPost()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration,
    ForgotPasswordModel
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let forgotPasswordModel: ForgotPasswordModel; // (optional)

const { status, data } = await apiInstance.apiV1AuthResetPasswordPost(
    forgotPasswordModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **forgotPasswordModel** | **ForgotPasswordModel**|  | |


### Return type

**string**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json-patch+json, application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Success |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthRolesGet**
> IdentityRole apiV1AuthRolesGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

const { status, data } = await apiInstance.apiV1AuthRolesGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**IdentityRole**

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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiV1AuthUsersGet**
> Array<UserShortEntry> apiV1AuthUsersGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let userName: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiV1AuthUsersGet(
    userName
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userName** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Array<UserShortEntry>**

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

# **apiV1AuthUsersUserIdGet**
> GetUserEntry apiV1AuthUsersUserIdGet()


### Example

```typescript
import {
    AuthorizationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthorizationApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.apiV1AuthUsersUserIdGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**GetUserEntry**

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


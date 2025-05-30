/* tslint:disable */
/* eslint-disable */
/**
 * Halo
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.21.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import { JsonPatchInner } from '../models';
// @ts-ignore
import { User } from '../models';
// @ts-ignore
import { UserList } from '../models';
/**
 * UserV1alpha1Api - axios parameter creator
 * @export
 */
export const UserV1alpha1ApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create User
         * @param {User} [user] Fresh user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser: async (user?: User, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1alpha1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete User
         * @param {string} name Name of user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser: async (name: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            assertParamExists('deleteUser', 'name', name)
            const localVarPath = `/api/v1alpha1/users/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get User
         * @param {string} name Name of user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (name: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            assertParamExists('getUser', 'name', name)
            const localVarPath = `/api/v1alpha1/users/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * List User
         * @param {number} [page] Page number. Default is 0.
         * @param {number} [size] Size number. Default is 0.
         * @param {Array<string>} [labelSelector] Label selector. e.g.: hidden!&#x3D;true
         * @param {Array<string>} [fieldSelector] Field selector. e.g.: metadata.name&#x3D;&#x3D;halo
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUser: async (page?: number, size?: number, labelSelector?: Array<string>, fieldSelector?: Array<string>, sort?: Array<string>, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v1alpha1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }

            if (labelSelector) {
                localVarQueryParameter['labelSelector'] = labelSelector;
            }

            if (fieldSelector) {
                localVarQueryParameter['fieldSelector'] = fieldSelector;
            }

            if (sort) {
                localVarQueryParameter['sort'] = sort;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Patch User
         * @param {string} name Name of user
         * @param {Array<JsonPatchInner>} [jsonPatchInner] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        patchUser: async (name: string, jsonPatchInner?: Array<JsonPatchInner>, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            assertParamExists('patchUser', 'name', name)
            const localVarPath = `/api/v1alpha1/users/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(jsonPatchInner, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update User
         * @param {string} name Name of user
         * @param {User} [user] Updated user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser: async (name: string, user?: User, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'name' is not null or undefined
            assertParamExists('updateUser', 'name', name)
            const localVarPath = `/api/v1alpha1/users/{name}`
                .replace(`{${"name"}}`, encodeURIComponent(String(name)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            // authentication bearerAuth required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(user, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserV1alpha1Api - functional programming interface
 * @export
 */
export const UserV1alpha1ApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserV1alpha1ApiAxiosParamCreator(configuration)
    return {
        /**
         * Create User
         * @param {User} [user] Fresh user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUser(user?: User, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(user, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserV1alpha1Api.createUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Delete User
         * @param {string} name Name of user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUser(name: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUser(name, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserV1alpha1Api.deleteUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Get User
         * @param {string} name Name of user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(name: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(name, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserV1alpha1Api.getUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * List User
         * @param {number} [page] Page number. Default is 0.
         * @param {number} [size] Size number. Default is 0.
         * @param {Array<string>} [labelSelector] Label selector. e.g.: hidden!&#x3D;true
         * @param {Array<string>} [fieldSelector] Field selector. e.g.: metadata.name&#x3D;&#x3D;halo
         * @param {Array<string>} [sort] Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUser(page?: number, size?: number, labelSelector?: Array<string>, fieldSelector?: Array<string>, sort?: Array<string>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserList>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listUser(page, size, labelSelector, fieldSelector, sort, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserV1alpha1Api.listUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Patch User
         * @param {string} name Name of user
         * @param {Array<JsonPatchInner>} [jsonPatchInner] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async patchUser(name: string, jsonPatchInner?: Array<JsonPatchInner>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.patchUser(name, jsonPatchInner, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserV1alpha1Api.patchUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * Update User
         * @param {string} name Name of user
         * @param {User} [user] Updated user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUser(name: string, user?: User, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUser(name, user, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserV1alpha1Api.updateUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * UserV1alpha1Api - factory interface
 * @export
 */
export const UserV1alpha1ApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserV1alpha1ApiFp(configuration)
    return {
        /**
         * Create User
         * @param {UserV1alpha1ApiCreateUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser(requestParameters: UserV1alpha1ApiCreateUserRequest = {}, options?: RawAxiosRequestConfig): AxiosPromise<User> {
            return localVarFp.createUser(requestParameters.user, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete User
         * @param {UserV1alpha1ApiDeleteUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser(requestParameters: UserV1alpha1ApiDeleteUserRequest, options?: RawAxiosRequestConfig): AxiosPromise<void> {
            return localVarFp.deleteUser(requestParameters.name, options).then((request) => request(axios, basePath));
        },
        /**
         * Get User
         * @param {UserV1alpha1ApiGetUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(requestParameters: UserV1alpha1ApiGetUserRequest, options?: RawAxiosRequestConfig): AxiosPromise<User> {
            return localVarFp.getUser(requestParameters.name, options).then((request) => request(axios, basePath));
        },
        /**
         * List User
         * @param {UserV1alpha1ApiListUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUser(requestParameters: UserV1alpha1ApiListUserRequest = {}, options?: RawAxiosRequestConfig): AxiosPromise<UserList> {
            return localVarFp.listUser(requestParameters.page, requestParameters.size, requestParameters.labelSelector, requestParameters.fieldSelector, requestParameters.sort, options).then((request) => request(axios, basePath));
        },
        /**
         * Patch User
         * @param {UserV1alpha1ApiPatchUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        patchUser(requestParameters: UserV1alpha1ApiPatchUserRequest, options?: RawAxiosRequestConfig): AxiosPromise<User> {
            return localVarFp.patchUser(requestParameters.name, requestParameters.jsonPatchInner, options).then((request) => request(axios, basePath));
        },
        /**
         * Update User
         * @param {UserV1alpha1ApiUpdateUserRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser(requestParameters: UserV1alpha1ApiUpdateUserRequest, options?: RawAxiosRequestConfig): AxiosPromise<User> {
            return localVarFp.updateUser(requestParameters.name, requestParameters.user, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createUser operation in UserV1alpha1Api.
 * @export
 * @interface UserV1alpha1ApiCreateUserRequest
 */
export interface UserV1alpha1ApiCreateUserRequest {
    /**
     * Fresh user
     * @type {User}
     * @memberof UserV1alpha1ApiCreateUser
     */
    readonly user?: User
}

/**
 * Request parameters for deleteUser operation in UserV1alpha1Api.
 * @export
 * @interface UserV1alpha1ApiDeleteUserRequest
 */
export interface UserV1alpha1ApiDeleteUserRequest {
    /**
     * Name of user
     * @type {string}
     * @memberof UserV1alpha1ApiDeleteUser
     */
    readonly name: string
}

/**
 * Request parameters for getUser operation in UserV1alpha1Api.
 * @export
 * @interface UserV1alpha1ApiGetUserRequest
 */
export interface UserV1alpha1ApiGetUserRequest {
    /**
     * Name of user
     * @type {string}
     * @memberof UserV1alpha1ApiGetUser
     */
    readonly name: string
}

/**
 * Request parameters for listUser operation in UserV1alpha1Api.
 * @export
 * @interface UserV1alpha1ApiListUserRequest
 */
export interface UserV1alpha1ApiListUserRequest {
    /**
     * Page number. Default is 0.
     * @type {number}
     * @memberof UserV1alpha1ApiListUser
     */
    readonly page?: number

    /**
     * Size number. Default is 0.
     * @type {number}
     * @memberof UserV1alpha1ApiListUser
     */
    readonly size?: number

    /**
     * Label selector. e.g.: hidden!&#x3D;true
     * @type {Array<string>}
     * @memberof UserV1alpha1ApiListUser
     */
    readonly labelSelector?: Array<string>

    /**
     * Field selector. e.g.: metadata.name&#x3D;&#x3D;halo
     * @type {Array<string>}
     * @memberof UserV1alpha1ApiListUser
     */
    readonly fieldSelector?: Array<string>

    /**
     * Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @type {Array<string>}
     * @memberof UserV1alpha1ApiListUser
     */
    readonly sort?: Array<string>
}

/**
 * Request parameters for patchUser operation in UserV1alpha1Api.
 * @export
 * @interface UserV1alpha1ApiPatchUserRequest
 */
export interface UserV1alpha1ApiPatchUserRequest {
    /**
     * Name of user
     * @type {string}
     * @memberof UserV1alpha1ApiPatchUser
     */
    readonly name: string

    /**
     * 
     * @type {Array<JsonPatchInner>}
     * @memberof UserV1alpha1ApiPatchUser
     */
    readonly jsonPatchInner?: Array<JsonPatchInner>
}

/**
 * Request parameters for updateUser operation in UserV1alpha1Api.
 * @export
 * @interface UserV1alpha1ApiUpdateUserRequest
 */
export interface UserV1alpha1ApiUpdateUserRequest {
    /**
     * Name of user
     * @type {string}
     * @memberof UserV1alpha1ApiUpdateUser
     */
    readonly name: string

    /**
     * Updated user
     * @type {User}
     * @memberof UserV1alpha1ApiUpdateUser
     */
    readonly user?: User
}

/**
 * UserV1alpha1Api - object-oriented interface
 * @export
 * @class UserV1alpha1Api
 * @extends {BaseAPI}
 */
export class UserV1alpha1Api extends BaseAPI {
    /**
     * Create User
     * @param {UserV1alpha1ApiCreateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserV1alpha1Api
     */
    public createUser(requestParameters: UserV1alpha1ApiCreateUserRequest = {}, options?: RawAxiosRequestConfig) {
        return UserV1alpha1ApiFp(this.configuration).createUser(requestParameters.user, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete User
     * @param {UserV1alpha1ApiDeleteUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserV1alpha1Api
     */
    public deleteUser(requestParameters: UserV1alpha1ApiDeleteUserRequest, options?: RawAxiosRequestConfig) {
        return UserV1alpha1ApiFp(this.configuration).deleteUser(requestParameters.name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get User
     * @param {UserV1alpha1ApiGetUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserV1alpha1Api
     */
    public getUser(requestParameters: UserV1alpha1ApiGetUserRequest, options?: RawAxiosRequestConfig) {
        return UserV1alpha1ApiFp(this.configuration).getUser(requestParameters.name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List User
     * @param {UserV1alpha1ApiListUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserV1alpha1Api
     */
    public listUser(requestParameters: UserV1alpha1ApiListUserRequest = {}, options?: RawAxiosRequestConfig) {
        return UserV1alpha1ApiFp(this.configuration).listUser(requestParameters.page, requestParameters.size, requestParameters.labelSelector, requestParameters.fieldSelector, requestParameters.sort, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Patch User
     * @param {UserV1alpha1ApiPatchUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserV1alpha1Api
     */
    public patchUser(requestParameters: UserV1alpha1ApiPatchUserRequest, options?: RawAxiosRequestConfig) {
        return UserV1alpha1ApiFp(this.configuration).patchUser(requestParameters.name, requestParameters.jsonPatchInner, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update User
     * @param {UserV1alpha1ApiUpdateUserRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserV1alpha1Api
     */
    public updateUser(requestParameters: UserV1alpha1ApiUpdateUserRequest, options?: RawAxiosRequestConfig) {
        return UserV1alpha1ApiFp(this.configuration).updateUser(requestParameters.name, requestParameters.user, options).then((request) => request(this.axios, this.basePath));
    }
}


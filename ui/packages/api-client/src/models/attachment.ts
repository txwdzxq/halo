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


// May contain unused imports in some cases
// @ts-ignore
import { AttachmentSpec } from './attachment-spec';
// May contain unused imports in some cases
// @ts-ignore
import { AttachmentStatus } from './attachment-status';
// May contain unused imports in some cases
// @ts-ignore
import { Metadata } from './metadata';

/**
 * 
 * @export
 * @interface Attachment
 */
export interface Attachment {
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    'apiVersion': string;
    /**
     * 
     * @type {string}
     * @memberof Attachment
     */
    'kind': string;
    /**
     * 
     * @type {Metadata}
     * @memberof Attachment
     */
    'metadata': Metadata;
    /**
     * 
     * @type {AttachmentSpec}
     * @memberof Attachment
     */
    'spec': AttachmentSpec;
    /**
     * 
     * @type {AttachmentStatus}
     * @memberof Attachment
     */
    'status'?: AttachmentStatus;
}


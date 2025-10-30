/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompilationService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static compilationList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/compilation/',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static compilationDeleteDelete(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/compilation/delete/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static compilationCreate(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/compilation/{id}/',
            path: {
                'id': id,
            },
        });
    }
}

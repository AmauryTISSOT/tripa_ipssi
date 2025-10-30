/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ServicesPublicsService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static servicesPublicsTopList(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services-publics/top',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static servicesPublicsRead(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/services-publics/{id}/',
            path: {
                'id': id,
            },
        });
    }
}

import { Designation } from './designation.model';
export interface Employee {
    _id: string;
    firstName: string;
    lastName?: string;
    designations: any[];
    contactDetails?: EmployeeContactDetails;
    organisationId?: string;
    active?: boolean;
    identityCodes?: EmployeeIdentityCode[];
    title?: string;
    idNumber?: string;
    dateofbirth?: string;
    systemuser?: string;
    customerLink?: string;
    lastUpdated?: number;
    images?: any;
    securityCode: number;
    selectedNodeKeys?: any[];
    employeeNumber?: string;
    nextKinContact?: string;
    nextKinName?: string;
    nextKinRelationship?: string;
}
export interface EmployeeModel extends Employee {
    designations: Designation[];
    name: string;
}
export interface EmployeeContactDetails {
    contactNumber?: string;
    altContactNumber?: string;
    email?: string;
}
export interface EmployeeIdentityCode {
    code?: string;
}

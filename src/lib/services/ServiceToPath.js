import { EngineModelService } from './EngineModelService';
import { EngineFamilyService } from './EngineFamilyService';
import { EngineLocationService } from './EngineLocationService';
import { PreservationService } from './PreservationService';
import { EngineAvailabilityService } from './EngineAvailabilityService';
import { EngineService } from './EngineService';
import { CustomerService } from './CustomerService';
import { UserService } from './UserService';
import { LoginService } from './LoginService';

export default {
	customer: [CustomerService, UserService],
	profile: [UserService],
	login: [LoginService],
	'engine-family': [EngineFamilyService, UserService],
	'engine-model': [EngineModelService, EngineFamilyService, UserService],
	'engine-list': [EngineService, EngineModelService, EngineLocationService, EngineAvailabilityService, CustomerService, UserService],
	'engine-preservation': [PreservationService, EngineService, UserService]
};

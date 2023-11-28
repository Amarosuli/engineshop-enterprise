/**
 * Validation Data with zod
 * Usage with Superforms
 */

import { z } from 'zod';

export const LoginSchema = z.object({
	username: z.string().trim().min(6, { message: 'Employee Id cannot be empty, minimum 6 number' }), // username is employee id
	password: z.string().trim().min(8, { message: 'Password cannot be empty, minimum 8 character' })
});

export const EngineFamilySchema = z.object({
	name: z.string().min(1, { message: 'Family Name cannot be empty' }),
	description: z.string().optional()
});

export const EngineModelSchema = z.object({
	name: z.string().min(1, { message: 'Model Name cannot be empty' }),
	description: z.string().optional(),
	family_id: z.string()
});
export const CustomerSchema = z.object({
	name: z.string().min(1, { message: 'Customer Name cannot be empty' }),
	description: z.string().optional(),
	// logo: z.any().optional(), // still need for populating update form
	code_IATA: z.string().optional(),
	code_ICAO: z.string().optional()
});

export const EngineListSchema = z.object({
	esn: z.string().min(1, { message: 'Engine Serial Number cannot be empty' }),
	config: z.string().optional(),
	model_id: z.string().min(1, { message: 'Model cannot be empty' }),
	customer_id: z.string().min(1, { message: 'Customer cannot be empty' }),
	isServiceable: z.boolean().default(false),
	isPreservable: z.boolean().default(true),
	notes: z.string().optional()
});

export const EngineAvailabilitySchema = z.object({
	engine_id: z.string().min(1, { message: 'Engine Id cannot be empty' }),
	date_in: z.date(),
	date_out: z.date().optional(),
	isInShop: z.boolean().default(true)
});

export const EnginePreservationSchema = z.object({
	engine_id: z.string().min(1, { message: 'Engine Id cannot be empty' }),
	duration: z.string().min(1, { message: 'Duration cannot be empty' }),
	date_performed: z.date().default(new Date()),
	tag: z.any().optional(),
	material: z.string().optional()
});

export const pdfTemplateSchema = z.object({
	name: z.string().min(1, { message: 'Template Name cannot be empty' }),
	alias: z.string().optional(),
	description: z.string().optional(),
	base64: z.string().min(1, { message: 'Base64 cannot be empty' }),
	// pdf: z.any().optional(), // still need for populating update form
	schema: z.string()
});

export const createPdfTemplateSchema = z.object({
	id: z.string().min(1, { message: 'Template Name cannot be empty' }),
	// name: z.string().min(1, { message: 'Template Name cannot be empty' }),
	// alias: z.string().optional(),
	// description: z.string().optional(),
	base64: z.string().optional(),
	// pdf: z.any().optional(), // still need for populating update form
	schema: z.string()
});

export const createSPSchema = z.object({
	template_id: z.string().min(1, { message: 'Template Name cannot be empty' }),
	shipment_date: z.date().default(new Date()),
	shipper_name: z.string().min(1, { message: 'Template Name cannot be empty' }),
	shipper_id: z.string().min(1, { message: 'Template Name cannot be empty' }),
	shipper_unit: z.string().min(1, { message: 'Template Name cannot be empty' }),
	recipient_name: z.string().min(1, { message: 'Template Name cannot be empty' }),
	recipient_id: z.string().min(1, { message: 'Template Name cannot be empty' }),
	recipient_unit: z.string().min(1, { message: 'Template Name cannot be empty' }),
	data: z.string()
});

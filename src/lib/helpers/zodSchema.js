import { z } from 'zod'

export const LoginSchema = z.object({
   username: z.string().trim().min(6, { message: 'Employee Id cannot be empty, minimum 6 number' }), // username is employee id
   password: z.string().trim().min(8, { message: 'Password cannot be empty, minimum 8 character' })
})

export const engineFamilySchema = z.object({
   name: z.string().min(1, { message: 'Family Name cannot be empty' }),
   description: z.string().optional(),
})

export const engineModelSchema = z.object({
   name: z.string().min(1, { message: 'Model Name cannot be empty' }),
   description: z.string().optional(),
   family_id: z.string()
})

const MAX_LOGO_SIZE = 200000
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const customerSchema = z.object({
   name: z.string().min(1, { message: 'Customer Name cannot be empty' }),
   description: z.string().optional(),
   // logo input file not handle by superform
   // logo: z.instanceof(File).optional(),
   code_IATA: z.string().optional(),
   code_ICAO: z.string().optional(),
})

export const engineListSchema = z.object({
   esn: z.string().min(1, { message: 'Engine Serial Number cannot be empty' }),
   config: z.string().optional(),
   model_id: z.string().min(1, { message: 'Model cannot be empty' }),
   customer_id: z.string().min(1, { message: 'Customer cannot be empty' }),
   isAvailable: z.boolean().default(true),
   isServiceable: z.boolean().default(false),
   isPreservable: z.boolean().default(true),
   notes: z.string().optional()
})

export const engineAvailabilitySchema = z.object({
   date_in: z.date(),
   date_out: z.date().optional(),
   isInShop: z.boolean().default(true)
})
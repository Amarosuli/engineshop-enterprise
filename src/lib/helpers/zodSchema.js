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
   name: z.string().min(1, { message: 'Family Name cannot be empty' }),
   description: z.string().optional(),
   family_id: z.string()
})

export const customerSchema = z.object({
   name: z.string().min(1, { message: 'Family Name cannot be empty' }),
   description: z.string().optional(),
   // logo input file
   code_IATA: z.string().optional(),
   code_ICAO: z.string().optional(),
})
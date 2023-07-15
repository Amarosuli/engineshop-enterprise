import { z } from 'zod'

export const LoginSchema = z.object({
   username: z.string().trim().min(6, { message: 'Employee Id cannot be empty, minimum 6 number' }), // username is employee id
   password: z.string().trim().min(8, { message: 'Password cannot be empty, minimum 8 character' })
})
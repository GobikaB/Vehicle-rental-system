import {z} from "zod";
export const CreateVehicleSchema = z.object( {
  brand: z.string(),
  model: z.string(),
  type: z.string(),
  rentPerDay: z.number()
});


export type CreateVehicleDto=z.infer<typeof CreateVehicleSchema>;
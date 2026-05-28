import { Module } from "@nestjs/common";
import { VehicleModule } from "./vehicles/vehicle.module";

@Module({

  imports: [VehicleModule],

})
export class AppModule {}
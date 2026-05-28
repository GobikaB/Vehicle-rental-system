import {Controller,Get,Post,Req,} from "@nestjs/common";

import { Request } from "express";

import { VehicleService } from "./vehicle.service";

@Controller("vehicles")
export class VehicleController {

  constructor(
    private readonly vehicleService: VehicleService
  ) {}

  // Add Vehicle
  @Post()
  addVehicle(@Req() req: Request) {

    return this.vehicleService.addVehicle(req.body);

  }

  // Get Vehicles
  @Get()
  getVehicles() {

    return this.vehicleService.getVehicles();

  }

  // Rent Vehicle
  @Post("rent")
  rentVehicle(@Req() req: Request) {

    return this.vehicleService.rentVehicle(req.body);

  }

  // Return Vehicle
  @Post("return")
  returnVehicle(@Req() req: Request) {

    return this.vehicleService.returnVehicle(req.body);

  }
}
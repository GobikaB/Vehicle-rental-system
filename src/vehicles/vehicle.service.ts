import { Injectable ,NotFoundException,BadRequestException} from "@nestjs/common";

import { Vehicle } from "./interfaces/vehicle-interface";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { RentVehicleDto } from "./dto/rent-vehicle.dto";
import { ReturnVehicleDto } from "./dto/return-vehicle.dto";

@Injectable()
export class VehicleService {

  private vehicles: Vehicle[] = [];

  // Add Vehicle
  addVehicle(data: CreateVehicleDto) {

    const vehicle: Vehicle = {

      id: this.vehicles.length + 1,
      brand: data.brand,
      model: data.model,
      type: data.type,
      rentPerDay: data.rentPerDay,
      availability: true,

    };

    this.vehicles.push(vehicle);

    return vehicle;
  }

  // Get Vehicles
  getVehicles() {

    return this.vehicles;

  }

  // Rent Vehicle
  rentVehicle(data: RentVehicleDto) {

    const vehicle = this.vehicles.find(
      (v) => v.id == data.vehicleId
    );

    if (!vehicle) {

      throw new NotFoundException( "Vehicle Not Found");

    }

    if (!vehicle.availability) {
      throw new BadRequestException('Vehicle already rented',);
    }
    const rentTime = new Date();

    const returnTime = new Date(rentTime.getTime() +data.hours * 60 * 60 * 1000);

    vehicle.phone = data.phone;
    vehicle.rentedAt = rentTime;
    vehicle.returnedAt = returnTime;
    // Remainder
    const reminderTime = new Date(returnTime.getTime() -60 * 60 * 1000);
    const delay =reminderTime.getTime() - Date.now();
    setTimeout(() => {
        console.log(`Reminder SMS sent to ${data.phone}`);
    }, delay);

    vehicle.availability = false;
    vehicle.rentedBy = data.customerName;

    return {
      message: "Vehicle rented successfully",
      vehicle,
    };
  }

  // Return Vehicle
  returnVehicle(data: ReturnVehicleDto) {

    const vehicle = this.vehicles.find(
      (v) => v.id == data.vehicleId
    );

    if (!vehicle) {
      throw new NotFoundException('Vehicle not returned');
    }

    vehicle.availability = true;
    vehicle.rentedBy = undefined;

    return {
      message: "Vehicle returned successfully",
      vehicle,
    };
  }
}
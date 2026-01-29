import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { TenantsModule } from "./tenants/tenants.module";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { VehiclesModule } from "./vehicles/vehicles.module";
import { DriversModule } from "./drivers/drivers.module";
import { MaintenanceModule } from "./maintenance/maintenance.module";
import { FaultsModule } from "./faults/faults.module";
import { AlertsModule } from "./alerts/alerts.module";
import { DocumentsModule } from "./documents/documents.module";
import { EnergyFuelModule } from "./energy-fuel/energy-fuel.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get<string>("DATABASE_HOST"),
        port: config.get<number>("DATABASE_PORT", 5432),
        username: config.get<string>("DATABASE_USER"),
        password: config.get<string>("DATABASE_PASSWORD"),
        database: config.get<string>("DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: false,
        logging: false
      })
    }),
    AuthModule,
    TenantsModule,
    UsersModule,
    RolesModule,
    VehiclesModule,
    DriversModule,
    MaintenanceModule,
    FaultsModule,
    AlertsModule,
    DocumentsModule,
    EnergyFuelModule
  ]
})
export class AppModule {}

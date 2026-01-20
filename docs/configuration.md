# Configuration Documentation

This document outlines the configuration options for the Mini-ERP system, including database settings and environment variables.

## Database Configuration

The Mini-ERP system uses MongoDB as its primary database. The following environment variables control the database connection:

- `DB_HOST`: Host address of the MongoDB instance (default: localhost)
- `DB_PORT`: Port number of the MongoDB instance (default: 27017)
- `DB_NAME`: Name of the database to connect to (default: mini_erp)
- `DB_USER`: Username for database authentication (optional)
- `DB_PASS`: Password for database authentication (optional)

## Environment Variables

The application supports the following environment variables:

- `PORT`: Port number for the HTTP server (default: 3000)
- `NODE_ENV`: Environment mode (development, production, test)
- `JWT_SECRET`: Secret key for JWT token generation

## Configuration File

The system also supports a configuration file located at `config/config.json`. This file contains additional settings that can be used to customize the application behavior.

Example configuration file:
```json
{
  "database": {
    "host": "localhost",
    "port": 27017,
    "name": "mini_erp"
  },
  "server": {
    "port": 3000,
    "env": "development"
  }
}
```
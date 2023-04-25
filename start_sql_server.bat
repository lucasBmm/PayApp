@echo off

REM Start SQL Server container
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<Admin123>" -p 1433:1433 --name sql_server_demo -d mcr.microsoft.com/mssql/server:2019-latest

REM Wait for SQL Server to start
echo Waiting for SQL Server to start...
timeout /t 30

REM Execute the SQL script
docker exec -i sql_server_demo /opt/mssql-tools/bin/sqlcmd -U sa -P "Admin123" -i init.sql

REM Done
echo SQL Server is ready for Spring application.
PAUSE
CREATE DATABASE SpringDemoDB;
GO
USE master;
GO
CREATE LOGIN SpringDemoLogin WITH PASSWORD = '<YourStrong!Passw0rd>';
GO
USE SpringDemoDB;
GO
CREATE USER SpringDemoUser FOR LOGIN SpringDemoLogin;
GO
ALTER ROLE db_owner ADD MEMBER SpringDemoUser;
GO
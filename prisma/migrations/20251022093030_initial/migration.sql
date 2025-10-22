BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Departments] (
    [DepartmentId] NVARCHAR(1000) NOT NULL,
    [DepartmentName] NVARCHAR(1000) NOT NULL,
    [DepartmentLocation] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Departments_pkey] PRIMARY KEY CLUSTERED ([DepartmentId]),
    CONSTRAINT [Departments_DepartmentName_key] UNIQUE NONCLUSTERED ([DepartmentName])
);

-- CreateTable
CREATE TABLE [dbo].[Employees] (
    [EmployeeId] NVARCHAR(1000) NOT NULL,
    [FirstName] NVARCHAR(1000) NOT NULL,
    [LastName] NVARCHAR(1000) NOT NULL,
    [EmailAddress] NVARCHAR(1000) NOT NULL,
    [EmployeeSalary] DECIMAL(32,16) NOT NULL,
    [DepartmentId] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Employees_pkey] PRIMARY KEY CLUSTERED ([EmployeeId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Employees] ADD CONSTRAINT [Employees_DepartmentId_fkey] FOREIGN KEY ([DepartmentId]) REFERENCES [dbo].[Departments]([DepartmentId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

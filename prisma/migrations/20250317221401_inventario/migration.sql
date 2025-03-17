BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [quantity] INT NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [image] NVARCHAR(1000),
    [creationDate] DATETIME2 NOT NULL CONSTRAINT [Product_creationDate_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

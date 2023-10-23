-- Criar um trigger para validar o CPF antes da inserção na tabela locbus.Usuario
CREATE TRIGGER ValidarCPFUsuario
ON locbus.Usuario
AFTER INSERT
AS
BEGIN
    DECLARE @InsertedCPF VARCHAR(11);
    SELECT @InsertedCPF = i.cpf
    FROM inserted i;

    IF LEN(@InsertedCPF) != 11 OR @InsertedCPF NOT LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]' 
    BEGIN
        RAISERROR('CPF inválido: deve conter 11 dígitos numéricos.', 16, 1);
        ROLLBACK TRANSACTION;
    END;
END;

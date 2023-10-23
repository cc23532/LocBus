CREATE PROCEDURE InserirNovoUsuario
    @nome VARCHAR(20),
    @sobrenome VARCHAR(30),
    @cpf VARCHAR(11),
    @email VARCHAR(60),
    @senha VARCHAR(30)
    AS
BEGIN
    DECLARE @NextID INT;

    SELECT @NextID = ISNULL(IDENT_CURRENT('locbus.Usuario'), 0) + 1;

    INSERT INTO locbus.Usuario (idUser, nome, sobrenome, cpf, email, senha)
    VALUES (@NextID, @nome, @sobrenome, @cpf, @email, @senha);
END;

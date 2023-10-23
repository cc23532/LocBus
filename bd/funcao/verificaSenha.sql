CREATE FUNCTION locbus.VerificarSenha
(
    @senha VARCHAR(30)
)
RETURNS BIT
AS
BEGIN
    IF LEN(@senha) >= 8
        RETURN 1; -- Senha válida (tem pelo menos 8 caracteres)
    ELSE
        RETURN 0; -- Senha inválida (tem menos de 8 caracteres)
END;

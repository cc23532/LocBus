CREATE TRIGGER ValidarCPFUsuario
AFTER INSERT ON lb_Usuario
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.cpf) != 11 OR NEW.cpf NOT REGEXP '^[0-9]{11}$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CPF inválido: deve conter 11 dígitos numéricos.';
    END IF;
END
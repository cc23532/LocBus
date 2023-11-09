CREATE PROCEDURE lb_create_vPontoHr()
BEGIN
    DECLARE v_point INT;
    SET v_point = 1;

    WHILE v_point <= 199 DO
        SET @view_name = CONCAT('v_Ponto', v_point);
        SET @query = CONCAT('
        CREATE VIEW lb_', @view_name, ' AS
        SELECT
            l.idLinha,
            CASE
                WHEN i.sentido = ''Ida'' THEN l.nomeIda
                WHEN i.sentido = ''Volta'' THEN l.nomeVolta
                ELSE NULL
            END AS sentidoLinha,
            h.horario AS horarioTabela
        FROM
            lb_Linhas l
        INNER JOIN
            lb_Itinerario i ON l.idLinha = i.idLinha
        INNER JOIN
            lb_Horarios_Partida h ON l.idLinha = h.idLinha AND i.sentido = h.sentido
        WHERE
            i.idPonto = ', v_point, '
            AND h.dia = ''Dia Útil''
            AND h.horario = (SELECT h2.horario
                            FROM lb_Horarios_Partida h2
                            WHERE h2.idLinha = h.idLinha
                                AND h2.sentido = h.sentido
                                AND h2.dia = ''Dia Útil''
                                AND h2.horario > CURTIME()
                            ORDER BY h2.horario LIMIT 1)
        ');

        SET @stmt = @query;
        PREPARE stmt FROM @stmt;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;

        SET v_point = v_point + 1;
    END WHILE;
END
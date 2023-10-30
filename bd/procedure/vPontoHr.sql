CREATE PROCEDURE create_vPontoHr
AS
BEGIN
    DECLARE @point INT;
    SET @point = 1;

    WHILE @point <= 199
    BEGIN
        DECLARE @view_name NVARCHAR(50) = 'v_Ponto' + CAST(@point AS NVARCHAR);
        DECLARE @query NVARCHAR(MAX);

        SET @query = N'
        CREATE VIEW locbus.' + @view_name + N' AS
        SELECT
            l.idLinha,
            CASE
                WHEN i.sentido = ''Ida'' THEN l.nomeIda
                WHEN i.sentido = ''Volta'' THEN l.nomeVolta
                ELSE NULL
            END AS sentidoLinha,
            h.horario AS horarioTabela
        FROM
            locbus.Linhas l
        INNER JOIN
            locbus.Itinerario i ON l.idLinha = i.idLinha
        INNER JOIN
            locbus.Horarios_Partida h ON l.idLinha = h.idLinha AND i.sentido = h.sentido
        WHERE
            i.idPonto = ' + CAST(@point AS NVARCHAR) + N'
            AND h.dia = ''Dia Útil''
            AND h.horario = (SELECT TOP 1 h2.horario
                            FROM locbus.Horarios_Partida h2
                            WHERE h2.idLinha = h.idLinha
                                AND h2.sentido = h.sentido
                                AND h2.dia = ''Dia Útil''
                                AND h2.horario > CONVERT(TIME, GETDATE())
                            ORDER BY h2.horario)
        ';

        PRINT @query;

        EXEC sp_executesql @query;

        SET @point = @point + 1;
    END
END;

CREATE PROCEDURE CreatePointViews
AS
BEGIN
    DECLARE @point INT;
    SET @point = 1;

    WHILE @point <= 199
    BEGIN
        DECLARE @view_name NVARCHAR(50) = 'v_Ponto' + CAST(@point AS NVARCHAR) + '_Onibus';
        DECLARE @query NVARCHAR(MAX);

        SET @query = N'
        CREATE VIEW locbus.' + @view_name + N' AS
        SELECT DISTINCT
            l.idLinha,
            MAX(CASE WHEN i.sentido = ''Ida'' THEN l.nomeIda END) AS nomeIda,
            MAX(CASE WHEN i.sentido = ''Volta'' THEN l.nomeVolta END) AS nomeVolta
        FROM
            locbus.Linhas l
        INNER JOIN
            locbus.Itinerario i ON l.idLinha = i.idLinha
        WHERE
            i.idPonto = ' + CAST(@point AS NVARCHAR) + N'
        GROUP BY
            l.idLinha;
        ';

        PRINT @query;

        EXEC sp_executesql @query;

        SET @point = @point + 1;
    END
END;

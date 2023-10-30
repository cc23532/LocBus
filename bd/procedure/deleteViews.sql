DECLARE @point INT;
SET @point = 1;

WHILE @point <= 199
BEGIN
    DECLARE @view_name NVARCHAR(50) = 'v_Ponto' + CAST(@point AS NVARCHAR);
    DECLARE @query NVARCHAR(MAX);

    SET @query = N'
    DROP VIEW locbus.' + @view_name + ';
    ';

    PRINT @query;

    EXEC sp_executesql @query;

    SET @point = @point + 1;
END

SELECT * FROM  locbus.v_Ponto2
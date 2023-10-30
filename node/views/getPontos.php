<?php
$serverName = 'regulus.cotuca.unicamp.br'; // Substitua pelo nome do servidor SQL Server
$connectionOptions = array(
    "Database" => 'BD23532', // Substitua pelo nome do banco de dados
    "Uid" => 'BD23532', // Substitua pelo nome de usuário
    "PWD" => 'BD23532' // Substitua pela senha
);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if (!$conn) {
    die("Erro na conexão com o banco de dados: " . sqlsrv_errors());
}

$result = sqlsrv_query($conn, "SELECT idPonto, logradouro, lat, long FROM Pontos");

$data = array();
while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
    $data[] = $row;
}

sqlsrv_free_stmt($result);
sqlsrv_close($conn);

echo json_encode($data);
?>

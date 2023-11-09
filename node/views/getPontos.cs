using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;

public List<Ponto> GetPontosDoBancoDeDados()
{
    string connectionString = "Server=regulus.cotuca.unicamp.br;Database=BD23532;Uid=BD23532;Pwd=BD23532;";

    List<Ponto> pontos = new List<Ponto>();

    using (MySqlConnection connection = new MySqlConnection(connectionString))
    {
        connection.Open();

        string sql = "SELECT idPonto, logradouro, lat, lon FROM lb_Pontos";

        using (MySqlCommand command = new MySqlCommand(sql, connection))
        {
            using (MySqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    Ponto ponto = new Ponto
                    {
                        IdPonto = reader.GetInt32(0),
                        Logradouro = reader.GetString(1),
                        Latitude = reader.GetString(2),
                        Longitude = reader.GetString(3)
                    };

                    pontos.Add(ponto);
                }
            }
        }
    }

    return pontos;
}

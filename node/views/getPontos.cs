using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

public List<Ponto> GetPontosDoBancoDeDados()
{
    string connectionString = "Server=regulus.cotuca.unicamp.br;Database=BD23532;User Id=BD23532;Password=BD23532;";

    List<Ponto> pontos = new List<Ponto>();

    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();

        string sql = "SELECT idPonto, logradouro, lat, long FROM locbus.Pontos";

        using (SqlCommand command = new SqlCommand(sql, connection))
        {
            using (SqlDataReader reader = command.ExecuteReader())
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

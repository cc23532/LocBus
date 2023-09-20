/*
 * def conectar() -> bool: # informará se conseguiu (True) ou não (False) conectar
    global conexao
    os.system('cls') or None
    # conectar este programa ao servidor de banco de dados
    senha = gp.getpass("Digite a senha do seu banco de dados:") # pede a senha
    try:
        conexao = bd.connect(driver="{SQL Server}",
            server="regulus.cotuca.unicamp.br",
            database="BD23532",
            uid="BD23532",
            pwd=f"{senha}")
        return True
    except:
        print("Não foi possível conectar ao banco de dados")
        return False
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Scanner;

public class jdbc {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Digite o nome de usuário:");
        String username = scanner.nextLine();

        System.out.println("Digite a senha:");
        String password = scanner.nextLine();

        // Realize a conexão com o SQL Server aqui
        Connection connection = null;

        try {
            // Substitua a URL de conexão pelo seu servidor SQL Server
            String url = "jdbc:sqlserver://localhost:1433;databaseName=SeuBancoDeDados;";
            connection = DriverManager.getConnection(url, username, password);
            System.out.println("Conexão bem-sucedida!");
            
            // Execute suas consultas SQL ou outras operações aqui

            // Não se esqueça de fechar a conexão quando terminar
            connection.close();
        } catch (SQLException e) {
            System.err.println("Erro ao conectar ao SQL Server: " + e.getMessage());
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    System.err.println("Erro ao fechar a conexão: " + e.getMessage());
                }
            }
        }

        scanner.close();
    }
}

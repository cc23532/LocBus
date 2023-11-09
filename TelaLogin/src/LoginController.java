import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class LoginController {

    @FXML 
    private TextField campoUsuario;

    @FXML
    private TextField campoSenha;

    @FXML
    private Button btnEntrar;

    @FXML
    void fazerLogin(ActionEvent event) {

            String usuario = campoUsuario.getText();
            String senha = campoSenha.getText();
        
            Connection conexao = null;
            try {
                conexao = DriverManager.getConnection("regulus.unicamp.cotuca.br", usuario, senha);
                ResultSet rsPontos = conexao.createStatement().executeQuery("SELECT * FROM Linhas");
                System.out.println(rsPontos);
            }catch (SQLException ex){
                System.out.println("Erro ao acessar o banco" + ex.getMessage());
            }
    }
}


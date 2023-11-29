/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package projeto.pratica.locbus;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.swing.JOptionPane;

/**
 *
 * @author davip
 */
public class LinhaDao {
    
    public void create(Linha l) throws SQLException{
        
        Connection con = (Connection) Conexao.getConnection();
        PreparedStatement stmt = null;
        
        try {
            stmt = con.prepareStatement("INSERT INTO lb_Linhas(idLinha, nomeIda, nomeVolta) VALUES (?, ?, ?)");
            stmt.setInt(1, l.getId());
            stmt.setString(2, l.getNomeIda());
            stmt.setString(3, l.getNomeVolta());
            
            stmt.executeUpdate();
            
            JOptionPane.showMessageDialog(null, "Salvo com sucesso!");
        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, "Erro em salvar!" + ex);
        }finally{
            Conexao.closeConnection(con, stmt);
        }
        
    }
}

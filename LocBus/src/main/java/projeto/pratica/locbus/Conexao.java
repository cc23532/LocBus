/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package projeto.pratica.locbus;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;




/**
 *
 * @author davip
 */
public class Conexao {
    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String URL = "jdbc:mysql://regulus.cotuca.unicamp.br/BD23532";
    private static final String USER = "BD23532";
    private static final String PASS = "BD23532";
    
    public static Connection getConnection() throws SQLException{
        try {
            Class.forName(DRIVER);
            return DriverManager.getConnection(URL, USER, PASS);
        } catch (ClassNotFoundException ex) {
            throw new RuntimeException("Erro na conexão", ex);
        }
    }
    
    public static void closeConnection(Connection con){
        try {
            if (con != null){
            con.close();
            }
        } catch (SQLException ex) {
            Logger.getLogger(Conexao.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void closeConnection(Connection con, PreparedStatement stmt){
        
        closeConnection(con);
        
        try {
            if (stmt != null){
                stmt.close();
            }
         
        } catch (SQLException ex) {
            Logger.getLogger(Conexao.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public static void closeConnection(Connection con, PreparedStatement stmt, ResultSet rs){
        
        closeConnection(con, stmt);
        
        try {
            if (rs != null){
                rs.close();
            }
         
        } catch (SQLException ex) {
            Logger.getLogger(Conexao.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
   
}
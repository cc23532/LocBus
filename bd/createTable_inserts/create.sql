
CREATE TABLE lb_Linhas(
	idLinha INT NOT NULL,
	nomeIda VARCHAR(50) NOT NULL,
	nomeVolta VARCHAR(50) NOT NULL,
	PRIMARY KEY (idLinha)
);


CREATE TABLE lb_Usuario(
	idUser INT AUTO_INCREMENT,
	nome VARCHAR(20) NOT NULL,
	sobrenome VARCHAR(30) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
	email VARCHAR(60) NOT NULL,
	senha VARCHAR(30) NOT NULL,
	linhaPreferida INT NULL,
	PRIMARY KEY (idUser),
	FOREIGN KEY (linhaPreferida) REFERENCES lb_Linhas(idLinha),
	UNIQUE (cpf),
	UNIQUE (email)
);

CREATE TABLE lb_Pontos(
	idPonto INT NOT NULL,
	logradouro VARCHAR(100) NOT NULL,
	lat VARCHAR(50) NOT NULL,
	lon VARCHAR(50) NOT NULL,
	PRIMARY KEY (idPonto)
);

CREATE TABLE lb_Itinerario(
	idLinha INT NOT NULL,
	sentido VARCHAR(5) NOT NULL,
	idPonto INT NOT NULL,
	logradouro VARCHAR(100) NOT NULL,
	sequencia INT NOT NULL,
	FOREIGN KEY (idLinha) REFERENCES lb_Linhas(idLinha),
	FOREIGN KEY (idPonto) REFERENCES lb_Pontos(idPonto)
);

CREATE TABLE lb_Horarios_Partida(
	idLinha INT NOT NULL, 
	sentido VARCHAR(5) NOT NULL,
	dia VARCHAR(50) NOT NULL,
	horario TIME NOT NULL,
	FOREIGN KEY (idLinha) REFERENCES lb_Linhas(idLinha)
);

select * from lb_linhas
select * from lb_pontos
select * from lb_Itinerario
SELECT * from lb_Horarios_Partida
select * from lb_Usuario

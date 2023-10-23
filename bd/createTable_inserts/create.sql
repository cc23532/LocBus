create table locbus.Usuario(
	idUser int not null, --pk
	nome varchar(20) not null,
	sobrenome varchar(30) not NULL,
	cpf varchar(11) not null unique,
	email varchar(60) not null unique,
	senha varchar(30) not null,
	linhaPreferida int null,
	primary key (idUser),
	foreign key (linhaPreferida) REFERENCES locbus.Linhas(idLinha)
)

create table locbus.Linhas(
	idLinha int not null, --PK
	nomeIda varchar(50) not null,
	nomeVolta varchar(50) not null,
	primary key (idLinha)
)

create table locbus.Pontos(
	idPonto int not null, --PK
	logradouro varchar(100) not null,
	lat varchar(50) not null,
	long varchar(50) not null,
	primary key (idPonto)
)

create table locbus.Itinerario(
	idLinha int not null, --FK(linhas)
	sentido varchar(5) not null,
	idPonto int not null, --FK(pontos)
	logradouro varchar(100) not null,
	sequencia int not null,
	foreign key (idLinha)
		references locbus.Linhas(idLinha),
	foreign key (idPonto)
		references locbus.Pontos(idPonto)
)

create table locbus.Horarios_Partida(
	idLinha int not null, --FK(linhas)
	sentido varchar(5) not null,
	dia varchar(50) not null,
	horario time not null,
	foreign key (idLinha)
		references locbus.Linhas(idLinha)
)

select * from locbus.linhas
select * from locbus.pontos
select * from locbus.Itinerario
SELECT * from locbus.Horarios_Partida
select * from locbus.Usuario

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


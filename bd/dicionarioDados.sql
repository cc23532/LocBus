create schema locbus

create table locbus.Linhas_Onibus{
	idLinha int not null, --PK
	nomeIda varchar(50) not null,
	nomeVolta varchar(50) not null,

}

create table locbus.Pontos{
	idPonto int not null, --PK
	logradouro varchar(100) not null,
	lat varchar(50) not null,
	long varchar(50) not null
}

create table locbus.Itinerário{
	idLinha int not null, --FK(linhas_Onibus)
	sentido varchar(5) not null,
	idPonto int not null, --FK(pontos)
	sequencia int not null
}

create table locbus.Horarios_Partida{
	idLinha int not null, --FK(linhas_Onibus)
	sentido varchar(5) not null,
	dia varchar(50) not null,
	horario time not null
}
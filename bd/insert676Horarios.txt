insert into locbus.Horários_Partida
    (idLinha, sentido, horario)
values

--dias uteis
    (676, 'Ida', 'Dia Útil', '05:00'),
    (676, 'Ida', 'Dia Útil', '06:40'),
    (676, 'Ida', 'Dia Útil', '15:20'),
    (676, 'Ida', 'Dia Útil', '17:00'),

--não opera de sabado e domingo
    (676, 'Ida', 'Sábados', '00:00'),
    (676, 'Ida', 'Domingos e Feriados', '00:00')



             
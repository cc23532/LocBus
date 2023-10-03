insert into locbus.Horários_Partida
    (idLinha, sentido, horario)
values

--ida
--dias uteis
    (678, 'Ida', 'Dia Útil', '06:00'),
    (678, 'Ida', 'Dia Útil', '07:00'),
    (678, 'Ida', 'Dia Útil', '15:00'),
    (678, 'Ida', 'Dia Útil', '16:10'),
    (678, 'Ida', 'Dia Útil', '17:20'),

--não opera de sabado e domingo
    (678, 'Ida', 'Sábados', '00:00'),
    (678, 'Ida', 'Domingos e Feriados', '00:00'),

--Volta
--dias uteis
    (678, 'Volta', 'Dia Útil', '06:10'),
    (678, 'Volta', 'Dia Útil', '07:00'),
    (678, 'Volta', 'Dia Útil', '08:10'),
    (678, 'Volta', 'Dia Útil', '16:10'),
    (678, 'Volta', 'Dia Útil', '17:20'),
    (678, 'Volta', 'Dia Útil', '18:30'),


--não opera de sabado e domingo
    (678, 'Volta', 'Sábados', '00:00'),
    (678, 'Volta', 'Domingos e Feriados', '00:00')


    
            
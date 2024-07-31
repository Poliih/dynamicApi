type GroupedData = {
    Data: Date;
    _avg: {
      PrecipitacaoTotalHorario: number | null;
      PressaoAtmosfericaAoNivelDaEstacaoHoraria: number | null;
      RadiacaoGlobal: number | null;  // Atualizado
      TemperaturaDoArBulboSeco: number | null;
      TemperaturaDoPontoDeOrvalho: number | null;
      TemperaturaMaximaNaHoraAnt: number | null;
      TemperaturaMinimaNaHoraAnt: number | null;
      TemperaturaOrvalhoMaxNaHoraAnt: number | null;
      TemperaturaOrvalhoMinNaHoraAnt: number | null;
      UmidadeRelMaxNaHoraAnt: number | null;
      UmidadeRelMinNaHoraAnt: number | null;
      UmidadeRelativaDoAr: number | null;
      VentoDirecaoHoraria: number | null;
      VentoRajadaMaxima: number | null;
      VentoVelocidadeHoraria: number | null;
    };
  };
  
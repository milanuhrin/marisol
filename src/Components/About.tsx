import React from 'react';
import { TitleText } from './export';


const About = () => {
  return (
    <div id="about" className="text-center py-8">
    <div className="py-8">
    <TitleText>O apartmáne Marisol</TitleText>
    </div>

    <div className={`$ text-justify text-base font-medium leading-6 text-gray-500 px-48`}>
        Nachádza sa v meste Torrevieja, 35 minút autom od letiska Alicante v Španielsku. Apartmán má
        kapacitu max 5 hostí. Má 2 spálne, 1 kúpeľňu, obývačku spojenú s kuchyňou a slnečnú
        priestrannú terasu. Z terasy a jednej izby je bočný výhľad na more. V komplexe, v ktorom sa
        nachádza, je aj spoločný bazén. Vzdialenosť od najbližšej pláže je 6 min peši a od obľúbenej
        pláže s promenádou La Mata 12 peši (2 min autom). Hneď vedľa komplexu je príjemný park Torre
        del Moro, ktorý je známym výhliadkovým bodom v Torrevieje. Apartmán sa nachádza v jednej z
        najobľúbenejších lokalít v meste Torrevieja - v blízkosti (4 min pešo) je cca 7 reštaurácií a
        tiež 24/7 potraviny. Supermarket a lekáreň sú vzdialené asi 10 minút pešo. Centrum mesta je 10
        minút autom/autobusom/kolobežkou. Autobusová zastávka je priamo vedľa komplexu.
    </div>
    </div>
  );
};


export default About;
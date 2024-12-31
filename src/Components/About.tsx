import React from 'react';
import { TitleText } from './export';


const About = () => {
  return (
    <div id="about" className="text-center py-8">
    <div className="py-8">
    <TitleText>O apartmáne Marisol</TitleText>
    </div>
    <div className={`$ text-justify text-base font-medium leading-6 text-gray-500 px-48`}>
    Krásny východ slnka nad morom, príjemná dovolenková atmosféra či voňavá káva na terase - to všetko môžete zažiť u nás, v apartmáne Marisol. 
    Nachádza sa v jednej z najobľúbenejších lokalít mesta Torrevieja, blízko známeho mesta Alicante v Španielsku.
    Vedľa parku a tiež historického bodu mesta Torre del Moro. 
    Mimo ruchu centra mesta a zároveň na krok od reštaurácií, supermarketu, lekárne, autobusovej zastávky, no najmä dlhej piesočnej pláže La Mata, ktorá je každoročne ocenená modrou vlajkou. 
    Nezameniteľná liečivá mikroklíma, športové vyžitie i večerná zábava sú predpokladom pre prežitie nezabudnuteľnej dovolenky, či už pre páry, alebo rodiny.
    </div>
    </div>
  );
};


export default About;
import matinka from "../resources/images/baranec/matinka.jpg";
import kamen from "../resources/images/baranec/kamen.jpg";
import mana from "../resources/images/baranec/mana.jpg";


import hrad from "../resources/images/zaruby/hrad.jpg";
import tabula1 from "../resources/images/zaruby/tabula1.jpg";
import tabula2 from "../resources/images/zaruby/tabula2.jpg";

import vyhladSitno from "../resources/images/sitno/vyhlad.jpg";
import chata from "../resources/images/sitno/chata.jpg";
import chata_vyhlad from "../resources/images/sitno/chata_vyhlad.jpg";

import vyhladSalatin from "../resources/images/salatin/vyhlad.jpg";
import kiss from "../resources/images/salatin/kiss.jpg";

export const visited = [
         {
             id: 0,
             name: "Sitno",
             lat: 48.402543576540275,
             lng: 18.877049945323773,
             altitude: 1009,
             images: [
                 vyhladSitno,
                 chata,
                 chata_vyhlad,
             ]
         },
         {
             id: 1,
             name: "Salatin",
             lat: 49.21354394510231,
             lng: 19.68621609293984,
             altitude: 2047,
             images: [
                 vyhladSalatin,
                 kiss
             ]
         },
         {
             id: 2,
             name: "Zaruby",
             lat: 48.52358157633058,
             lng: 17.39166116080486,
             altitude: 768,
             images: [
                 hrad,
                 tabula1,
                 tabula2
             ]
         },
         {
             id: 3,
             name: "Baranec",
             lat: 49.17382677567287,
             lng: 19.742156530646067,
             altitude: 2185,
             images: [
                 matinka,
                 kamen,
                 mana
             ]
         },
];

export const slovakiaCenter = {
    lat: 48.6670441,
    lng: 19.7785865
};

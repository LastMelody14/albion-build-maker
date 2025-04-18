
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Button } from "@/components/ui/button";

const ITEM_SLOTS = ["mainhand", "head", "armor", "shoes", "cape", "potion", "food"];

const defaultBuilds = [
  {
    title: "Fulgurante",
    mainhand: "T8_2H_INFERNOSTAFF_MORGANA",
    head: "T8_HEAD_LEATHER_SET3",
    armor: "T8_ARMOR_CLOTH_ROYAL",
    shoes: "T8_SHOES_CLOTH_ROYAL",
    cape: "T8_CAPEITEM_FW_LYMHURST",
    potion: "T4_POTION_ENERGY",
    food: "T8_MEAL_STEW",
    swap: [
      "T8_MAIN_FIRESTAFF_KEEPER",
      "T8_OFF_LAMP_UNDEAD",
      "T8_CAPEITEM_MORGANA",
      "T8_HEAD_CLOTH_ROYAL",
    ],
  },
  {
    title: "Sagrado",
    mainhand: "T8_MAIN_HOLYSTAFF_AVALON",
    head: "T8_HEAD_CLOTH_KEEPER",
    armor: "T8_ARMOR_CLOTH_KEEPER",
    shoes: "T8_SHOES_CLOTH_KEEPER",
    cape: "T8_CAPEITEM_FW_MARTLOCK",
    potion: "T8_POTION_COOLDOWN",
    food: "T8_MEAL_SALAD",
    swap: [
      "T8_MAIN_HOLYSTAFF_UNDEAD",
      "T8_OFF_TOTEM_KEEPER",
      "T8_CAPEITEM_FEY",
    ],
  },
];

function AlbionItem({ id }) {
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    setIconUrl(`https://render.albiononline.com/v1/item/${id}.png`);
  }, [id]);

  return (
    <div className="flex flex-col items-center text-center text-xs">
      <img src={iconUrl} alt={id} className="w-12 h-12 rounded" />
      <span className="truncate max-w-[72px]">{id.replace("T", "T ").replaceAll("_", " ")}</span>
    </div>
  );
}

function BuildView({ build, id }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 shadow-xl w-full max-w-md text-white" id={`build-${id}`}>
      <h2 className="text-xl font-bold mb-4 text-center">{build.title}</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {ITEM_SLOTS.map((slot) => (
          <AlbionItem key={slot} id={build[slot]} />
        ))}
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2">Swap:</h3>
        <div className="flex flex-wrap gap-2">
          {build.swap.map((item, i) => (
            <AlbionItem key={i} id={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [builds] = useState(defaultBuilds);

  const exportAsImage = async () => {
    for (let i = 0; i < builds.length; i++) {
      const element = document.getElementById(`build-${i}`);
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = data;
      link.download = `${builds[i].title}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-8 flex flex-col items-center">
      <div className="grid gap-8">
        {builds.map((build, index) => (
          <BuildView key={index} build={build} id={index} />
        ))}
      </div>
      <Button onClick={exportAsImage} className="mt-6">Exportar todas como imagem</Button>
      <footer className="mt-10 text-zinc-500 text-sm">Designed with 💜 by lastmelody</footer>
    </div>
  );
}

export default App;

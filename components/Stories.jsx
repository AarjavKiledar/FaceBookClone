import React from "react";
import StoryCard from "./StoryCard";
const stories = [
  {
    name: "Sonny Sangha",
    src: "https://links.papareact.com/zof",
    profile: "https://links.papareact.com/l4v",
  },
  {
    name: "Elon Musk",
    src: "https://links.papareact.com/4zn",
    profile: "https://links.papareact.com/kxk",
  },
  {
    name: "Jeff Bezos",
    src: "https://links.papareact.com/k2j",
    profile: "https://imageio.forbes.com/specials-images/imageserve/5bb22ae84bbe6f67d2e82e05/0x0.jpg?format=jpg&crop=1012,1013,x627,y129,safe&height=416&width=416&fit=bounds",
    // profile: "https://links.papareact.com/kxk",
  },
  {
    name: "Mark Zuckerberg",
    src: "https://links.papareact.com/xql",
    profile: "https://links.papareact.com/snf",
  },
  {
    name: "Bill Gates",
    src: "https://links.papareact.com/4u4",
    profile: "https://links.papareact.com/zvy",
  },
];

function Stories() {
  return <div className="flex justify-center space-x-3 mx-auto">
    {stories.map((story) => (
      <StoryCard key={story.src} name={story.name} src={story.src} profile={story.profile} />
    ))} 
  </div>;
}

export default Stories;
